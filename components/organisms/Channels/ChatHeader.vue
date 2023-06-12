<template lang="pug">
.xo-channels-chat-header.row.items-center.justify-between
  .left-chat-header.row.col
    .back.row(@click.prevent="fnGoBack()")
      img(src="~assets/images/LockerRoom/back.svg")
    h3.col # {{ name }}
  .right-chat-header
    .row.items-center.justify-end(v-if="!isLive")
      XAChannelsAccount
      XAChannelOptions
    .row.items-center.justify-end(v-else @click="closeLive")
      b-icon(icon="close" style="cursor:pointer" )

  .support(v-if="!isSupporting")
    b-button(type="is-white", @click.prevent="fnShowCommunityRules()")
      .row.items-center
        .logo: XAAvatar(:image="avatar", :name="name", size="22px")
        ._label Support
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XOChannelsChatHeader',
  components: {
    XAChannelsAccount: () => import('~/components/atoms/Channels/Account'),
    XAChannelOptions: () => import('~/components/atoms/Channels/Options'),
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  mixins: [dialogs],
  props: {
    isLive: { type: Boolean, default: false },
    isSupporting: { type: Boolean, default: true },
  },
  data() {
    return {
      isMobile: false,
    }
  },
  computed: {
    ...mapFields('app', ['showLiveChat']),
    ...mapFields('locker-room', ['lockerRoomActive']),
    channel() {
      return this.$parent?.channel || {}
    },
    name() {
      return this.channel?.name || null
    },
    club() {
      return this.lockerRoomActive?.Club || null
    },
    league() {
      return this.lockerRoomActive?.League || null
    },
    lockerRoomName() {
      return this.club?.name || this.league?.name || null
    },
    avatar() {
      return (
        this.club?.Avatar?.PhotoURL || this.league?.Avatar?.PhotoURL || null
      )
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.fnCheckWindowSize)
  },
  mounted() {
    this.fnCheckWindowSize()
  },
  methods: {
    closeLive(){
      // console.log("closeLive")
     this.showLiveChat = false
    },
    fnGoBack() {
      if (this.isSupporting) {
        this.$router.push({
          path: '/locker-room',
        })
        return
      }

      if (this.isMobile) {
        this.$router.push({
          path: '/locker-room',
        })
        return
      }

      this.$router.push({
        path: '/locker-room/explore',
      })
    },
    fnShowCommunityRules() {
      this.fnShowCommunityRulesDialog()
    },
    fnCheckWindowSize() {
      if (window.innerWidth < 768) {
        this.isMobile = true
        return
      }

      this.isMobile = false
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-channels-chat-header::v-deep {
  border-bottom: 1px solid rgba(#e7e8e8, 0.2);
  min-height: 85px;
  padding: 0 30px;
  width: 100%;

  @include max-width(767px) {
    min-height: 55px;
    padding: 0 15px;
  }

  .left-chat-header {
    padding-right: 20px;

    .back {
      margin-right: 20px;
      display: none;

      @include max-width(767px) {
        display: flex;
      }
    }

    h3 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .right-chat-header {
    > .row {
      > div {
        &:not(:first-child) {
          margin-left: 25px;
        }
      }
    }
  }

  .support {
    .button {
      height: 42px;
      color: $primary;
      text-transform: uppercase;

      .logo {
        margin-right: 10px;
      }
    }
  }
}
</style>
