<template lang="pug">
.xm-locker-room-header-right.row.items-center.justify-end(
  :class="isLoggedIn && 'is-logged-in'"
)
  template(v-if="isLoggedIn")
    .desktop-view.row.items-center
      XAMyLocation(v-if="$route.path != '/error'")
      b-dropdown.user-menu(
        aria-role="list",
        position="is-bottom-left",
        append-to-body,
        :mobile-modal="false"
      )
        template(#trigger="{ active }")
          XAMyAvatar
        b-dropdown-item(aria-role="listitem", @click="fnLogOut()")
          .menu-section
            img(src="~assets/images/Auth/logout-icon.svg")
            .logout.marg-left Log out

    .mobile-view
      .mobile-menu.row(@click.prevent="showMobileMenu = true")
        b-icon(icon="menu", custom-size="mdi-36px")
      XALoggedInMobileView(v-if="showMobileMenu")
  template(v-if="!isLoggedIn")
    .desktop-view.row.items-center
      XAMyLocation(v-if="$route.path != '/error'")
      b-button.btn-signup(
        type="is-primary",
        tag="router-link",
        to="/signin"
      ) Sign In

    .mobile-view
      .mobile-menu.row(@click.prevent="showMobileMenu = true")
        b-icon(icon="menu", custom-size="mdi-36px")
      XALoggedInMobileView(v-if="showMobileMenu")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'XMLockerRoomHeaderRight',
  components: {
    XALockerRoomHeaderSearch: () =>
      import('~/components/atoms/LockerRoom/Header/Search'),
    XMLockerRoomHeaderNotifications: () =>
      import('~/components/molecules/LockerRoom/Header/Notifications'),
    XAMyLocation: () =>
      import('~/components/atoms/MyLocation'),
    XAMyAvatar: () => import('~/components/atoms/MyAvatar'),
    XALoggedInMobileView: () => import('~/components/molecules/LockerRoom/Header/LoggedInMobileView'),
  },
  data() {
    return {
      showMobileMenu: false,
    }
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
  mounted() {
    // console.log("isLoggedIn: ", this.isLoggedIn);
    this.$root.$on('evtRtShowMobileMenu', (value) => {
      this.showMobileMenu = value
    })
  },
}
</script>

<style lang="scss" scoped>
.menu-section {
  display: flex !important;
  align-items: center !important;
  .marg-left {
    margin-left: 10px;
  }
  .logout {
    color: $primary !important;
  }
}
.xm-locker-room-header-right::v-deep {

  height: 100%;

  @include max-width(1023px) {
    width: 100%;
    max-width: 75px;
  }

  @include max-width(767px) {
    width: auto;
    max-width: unset;
  }

  &.is-logged-in {
    width: 100%;

    @include max-width(767px) {
      width: auto;
      max-width: unset;
    }
  }

  .desktop-view {

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

  .mobile-view {
    display: none;

    @include max-width(1023px) {
      display: block;
    }
  }
}
</style>
