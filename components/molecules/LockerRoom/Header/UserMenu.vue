<template lang="pug">
.xm-locker-room-header-user-menu
  .desktop-view.row.items-center
    XAMyLocation
    b-dropdown.user-menu(
      aria-role="list",
      position="is-bottom-left",
      append-to-body,
      :mobile-modal="false"
    )
      template(#trigger="{ active }")
        XAMyAvatar
      b-dropdown-item(aria-role="listitem", @click="fnLogOut()") Log out
  .mobile-view
    .mobile-menu.row(@click.prevent="showMobileMenu = true")
      b-icon(icon="menu", custom-size="mdi-36px")
    XMLockerRoomHeaderGuestMenu(v-if="showMobileMenu")
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XMLockerRoomHeaderUserMenu',
  data() {
    return {
      showMobileMenu: false,
    }
  },
  components: {
    XAMyLocation: () => import('~/components/atoms/MyLocation'),
    XAMyAvatar: () => import('~/components/atoms/MyAvatar'),
    XMLockerRoomHeaderGuestMenu: () =>
      import('~/components/molecules/LockerRoom/Header/GuestMenu'),
  },
  computed:{
    ...mapFields('user', ['userID']),
  },
  methods: {
    ...mapActions({
      authLogOut: 'auth/authLogOut',
      clearAuthDetails: 'auth/clearAuthDetails',
    }),
    async fnLogOut() {
      this.$fireMess.unSubscribeToTopic({ topicName:  this.userID })

      await this.authLogOut()
      const disconnect = this.$root.ChatSocket
        ? this.$root.ChatSocket.disconnect()
        : null

      await this.$router.push({
        path: '/',
      })

      this.clearAuthDetails()
      this.$mixpanel.reset()

      return disconnect
    },
  },
}
</script>
<style lang="scss" scoped>
.xm-locker-room-header-user-menu::v-deep {
  .desktop-view {
    display: flex;
    @include max-width(1023px) {
      display: none;
    }

    .btn-signin,
    .btn-signup {
      text-transform: uppercase;
      width: 125px;
      height: 42px;
      cursor: pointer;
      color: $white;
    }

    .btn-signin {
      opacity: 0.6;
    }
  }
}
</style>

