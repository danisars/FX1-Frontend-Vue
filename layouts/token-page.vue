<template lang="pug">
.xl-token-default
  XTLockerRoomHeader
  nuxt
  XTDefaultFooter
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  name: 'XLToken',
  components: {
    XTDefaultFooter: () => import('~/components/templates/Default/Footer'),
    XTLockerRoomHeader: () => import('~/components/templates/LockerRoom/Header')
  },
  middleware: 'refreshToken',
  computed: {
    ...mapFields('user', ['userProfile', 'userID', 'userName', 'userAvatar']),
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
    authToken: {
      deep: true,
      handler(value) {
        if (value) {
          this.fnGetMyProfileDetails()
        }
      },
    },
  },
  async mounted() {
    const html = document.querySelector('html')
    html.style.overflowY = 'scroll'

    // retrieving user details
    await this.fnRefreshToken()
    await this.fnCheckProfileDetails()
    await this.fnGetMyProfileDetails()
  },
  methods: {
    ...mapActions({
      refreshToken: 'auth/refreshToken',
      authLogOut: 'auth/authLogOut',
    }),
    async fnCheckProfileDetails() {
      if (!this.isLoggedIn) return
      try {
        const { Me } = await this.$api.getMyUserID()
        this.userID = Me?.id

        if (!Me) {
          this.authLogOut()
        }
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
    async fnGetMyProfileDetails() {
      if (!this.isLoggedIn) return
      try {
        const { Me } = await this.$api.getMyProfile()
        this.userProfile = Me
        this.userID = Me?.id
        this.userName = Me?.username || Me?.name
        this.userAvatar = Me?.Avatar?.PhotoURL
        this.fnSubscibeFCM(Me?.id)
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
.xl-token-default {
  overflow: hidden;
}
.xl-token-default::v-deep {
  color: $white;

  .__nuxt-error-page {
    position: relative;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;
    min-height: calc(100vh - 683px);
  }
}
</style>
