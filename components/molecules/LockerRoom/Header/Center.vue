<template lang="pug">
.xm-locker-room-header-center.row
  XALockerRoomHeaderNavigationButton(
    label="Explore",
    link="/explore",
    :inactiveIcon="require('~/assets/images/Live/stream-gray.svg')",
    :activeIcon="require('~/assets/images/Live/stream-white.svg')"
    :class="isExplore && 'active'"
  )
  XALockerRoomHeaderNavigationButton.is-mobile(
    label="Locker Rooms",
    link="/locker-room/explore",
    :inactiveIcon="require('~/assets/images/v2/LockerRoom/inactive-locker-room.svg')",
    :activeIcon="require('~/assets/images/v2/LockerRoom/active-locker-room.svg')",
    :class="isLockerRoom && 'active'"
  )
  XALockerRoomHeaderNavigationButton.locker-rooms.is-desktop(
    label="Locker Rooms",
    link="/locker-room/explore",
    :inactiveIcon="require('~/assets/images/v2/LockerRoom/inactive-locker-room.svg')",
    :activeIcon="require('~/assets/images/v2/LockerRoom/active-locker-room.svg')",
    :class="isLockerRoom && 'active'"
  )
  client-only
    XALockerRoomHeaderNavigationButton.mentions(
      v-if="isLoggedIn",
      label="Mentions",
      link="/mentions",
      :inactiveIcon="require('~/assets/images/v2/LockerRoom/inactive-mentions.svg')",
      :activeIcon="require('~/assets/images/v2/LockerRoom/active-mentions.svg')",
      :class="isMention && 'active'",
      :disabled="!isLoggedIn"
    )
      template(v-slot:unseen): XAMentionsUnseen
    template(v-slot:placeholder)
      .placeholder
        img(
          :src="require('~/assets/images/v2/LockerRoom/inactive-mentions.svg')",
          width="20",
          height="18"
        )
        nuxt-link(to="/mentions") Mentions
  XALockerRoomHeaderNavigationButton.locker-rooms.is-desktop(
    label="$FX1 Token",
    link="/token",
    width="24"
    height="24"
    max-width="unset"
    :inactiveIcon="require('~/assets/images/v2/LockerRoom/token.svg')",
    :activeIcon="require('~/assets/images/v2/LockerRoom/token-active.svg')"
  )
</template>

<script>
import { mapGetters } from 'vuex'
import XALockerRoomHeaderNavigationButton from '~/components/atoms/LockerRoom/Header/NavigationButton.vue'
import XAMentionsUnseen from '~/components/atoms/Mentions/Unseen.vue'

export default {
  name: 'XMLockerRoomHeaderCenter',
  components: {
    XALockerRoomHeaderNavigationButton,
    XAMentionsUnseen,
  },
  computed: {
    ...mapGetters({
      getLockerRoomSupporting: 'lockerRoom/getLockerRoomSupporting',
    }),
    isLockerRoom() {
      return this.$route?.params?.slug && this.$route.name.includes('locker-room')
    },
    isExplore() {
      return this.$route?.params?.slug || this.$route.name === 'explore'
    },
    lockerRoomSlug() {
      const supporting = this.getLockerRoomSupporting[0] || []
      const channelSlug = supporting?.slug
      const defaultSlug = supporting?.defaultChannelSlug

      if (this.getLockerRoomSupporting.length) {
        return `/locker-room/${channelSlug}/${defaultSlug}`
      }

      return '/'
    },
    isMention() {
      return this.$route?.params?.id
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-locker-room-header-center::v-deep {
  margin-left: auto;
  margin-right: 15px;

  @include max-width(767px) {
    margin-right: 31px;
  }

  .is-mobile {
    display: none;

    @include max-width(767px) {
      display: flex;
    }
  }

  .is-desktop {
    @include max-width(767px) {
      display: none;
    }
  }

  .mentions {
    @include max-width(767px) {
      margin-right: -3px;
    }
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    a {
      margin-top: 9px;
      color: #94a6aa;
      font-size: 1rem;
      font-weight: 500;
    }
  }
}
</style>
