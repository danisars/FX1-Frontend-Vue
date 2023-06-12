<template lang="pug">
.xl-explore(:class="isLockerRoomRoot && 'locker-room-root'")
  XTLockerRoomHeader
  .row
    nuxt
</template>

<script>
import debounce from 'lodash/debounce'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import pick from 'lodash/pick'
import flattenDeep from 'lodash/flattenDeep'
import XTLockerRoomHeader from '~/components/templates/LockerRoom/Header.vue'

export default {
  name: 'XLLive',
  components: {
    XTLockerRoomHeader,
  },
  middleware: ['refreshToken', 'errorRedirect'],
  data() {
    return {
      supporting: [],
      socket: null,
      showChannels: false,
    }
  },
  computed: {
    ...mapFields('user', ['userProfile', 'userID', 'userName', 'userAvatar']),
    ...mapFields('locker-room', ['lockerRoomSupporting']),
    ...mapFields('signup', ['signupLockerRoomSupporting']),
    ...mapFields('app', ['onHomePageLoad', 'showLoader']),
    isLockerRoomRoot() {
      const route = this.$route.name
      return route === 'locker-room'
    },
    authToken() {
      return this.$store.state.auth.token || null
    },
  },
  watch: {
    isLoggedIn: {
      deep: true,
      handler() {
        this.fnGetMyProfileDetails()
      },
    },
    $route: {
      deep: true,
      handler() {
        // eslint-disable-next-line no-console
        console.log(
          `%cYou are not allowed here. Pasting anything here, will give hackers to access your account.`,
          'color: red; font-size: 32px; font-weight: 700;'
        )
      },
    },
    userProfile: {
      deep: true,
      handler(value) {
        if (value?.id) this.fnSocketSubscribe()
      },
    },
    authToken: {
      deep: true,
      handler(value) {
        if (value) {
          this.fnGetMyProfileDetails()
        }
      },
    },
  },
  created() {
    this.onHomePageLoad = true
  },
  beforeMount() {
    window.addEventListener('resize', this.fnCheckViewportHeight)
  },
  async mounted() {
    const html = document.querySelector('html')
    html.style.overflowY = 'hidden'

    this.$root.ChatSocket = this.$nuxtSocket({
      channel: '/',
      persist: 'main',
      transports: ['websocket'],
      auth: {
        token: this.$store.state.auth.token || null,
        type: 'desktop',
      },
    })

    this.fnSocketSubscribe()

    this.$root.ChatSocket.on('status-online', (data) => {
      this.$store.commit('locker-room/setLockerRoomOnline', data)
    })

    this.$root.ChatSocket.on('status-notify', () => {
      this.fnReloadLockerRoom()
    })

    this.$root.ChatSocket.on('status-notify-mentions', () => {
    this.$store.commit('notification/setMentions' , 1)
    })

    this.$root.$on('evtRtGetMyProfileDetails', () => {
      this.fnGetMyProfileDetails()
    })

    this.$root.$on('evtReloadLockerRoom', async (slug) => {
      if (slug)
        await this.$root.ChatSocket.emit('leave-channel', { channelSlug: slug })
      await this.fnReloadLockerRoom()
    })

    this.signupLockerRoomSupporting = null

    this.fnCheckViewportHeight()

    // retrieving user details
    await this.fnRefreshToken()
    await this.fnCheckProfileDetails()
    await this.fnGetMyProfileDetails()
  },
  methods: {
    ...mapActions({
      refreshToken: 'auth/refreshToken',
      setLockerRoomSupporting: 'lockerRoom/setLockerRoomSupporting',
    }),
    async fnCheckProfileDetails() {
      if (!this.isLoggedIn) return

      try {
        const { Me } = await this.$api.getMyUserID()
        this.userID = Me?.id
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.success(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      }
    },
    async setLockerRoomActive(Supporting) {
      if (!Supporting) return
      const ChannelGroups = await Supporting?.map((data) => data.ChannelGroups)
      const UnreadCount = await ChannelGroups?.map((data) =>
        data.map((e) =>
          e.Channels.map((channel) =>
            pick(channel, ['slug', 'unreadMessagesCount'])
          )
        )
      )
      const flattenValue = flattenDeep(UnreadCount)
      await this.$store.dispatch(
        'notification/setUnreadMessagesCount',
        flattenValue
      )
    },
    async setLockerRoomNotifyCount(Supporting) {
      if (!Supporting) return
      const initialCount = []
      await Supporting?.map((data) => {
        return initialCount.push({
          slug: data.slug,
          totalUnreadMessagesCount: data.totalUnreadMessagesCount,
        })
      })
      await this.$store.dispatch(
        'notification/setLockerRoomCount',
        initialCount
      )
    },
    fnReloadLockerRoom: debounce(async function () {
      if (!this.isLoggedIn) return
      try {
        const { Supporting } = await this.$api.Supporting()
        await this.setLockerRoomActive(Supporting)
        await this.setLockerRoomNotifyCount(Supporting)
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.success(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      }
    }, 1000),
    async fnGetMyProfileDetails() {
      if (!this.isLoggedIn) return
      try {
        const {
          Me: { Supporting },
        } = await this.$api.getMyProfileSupporting()
        this.lockerRoomSupporting = Supporting || []
        this.supporting = Supporting || []
        await this.setLockerRoomActive(this.supporting)
        await this.setLockerRoomNotifyCount(this.supporting)

        const { Me } = await this.$api.getMyProfile()

        this.userProfile = Me
        this.userID = Me?.id
        this.userName = Me?.username || Me?.name
        this.userAvatar = Me?.Avatar?.PhotoURL
        this.fnSubscibeFCM(Me?.id)
        const supportingMapped = Supporting.map((x) => {
          return { slug: x?.slug, defaultChannelSlug: x?.defaultChannelSlug }
        })

        await this.setLockerRoomSupporting(supportingMapped)
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.success(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      }
    },
    fnSubscibeFCM: debounce(async function (topic) {
      await this.$fireMess.subscribeToTopic({ topicName: topic })
    }, 500),
    fnSocketSubscribe: debounce(function () {
      if (this.userProfile)
        this.$root.ChatSocket.emit(
          'subscribe',
          {
            User: {
              id: this.userProfile?.id,
              username:
                this.userProfile?.username ||
                this.userProfile?.name ||
                'FX1 User',
            },
          },
          (resp) => {
            console.log(resp)
          }
        )
    }, 500),
    fnCheckViewportHeight() {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight / 100}px`
      )
    },
    async fnRefreshToken() {
      if (!this.isLoggedIn) return
      try {
        await this.refreshToken()
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.xl-explore::v-deep {
  color: $white;
  background-color: $secondary;
  .xt-locker-room-header {
    @include max-width(427px) {
      display: none;
    }
  }

  &.locker-room-root {
    .xt-locker-room-sidebar-left {
      display: block;
    }
  }

  .xt-locker-room-sidebar-left {
    @include max-width(767px) {
      display: none;
    }
  }

  .page-content {
    height: calc(var(--vh, 1vh) * 100 - 80px);

    @include max-width(767px) {
      height: calc(var(--vh, 1vh) * 100 - 56px);
    }
    @include max-width(427px) {
      height: calc(var(--vh, 1vh) * 100);
    }
    &.has-chat {
      height: 100%;
    }

    &.ps {
      .ps__rail-y {
        width: 8px;
        background-color: $secondary;

        .ps__thumb-y {
          width: 8px;
          background-color: #08252c;
        }
      }
    }
  }
}
</style>
