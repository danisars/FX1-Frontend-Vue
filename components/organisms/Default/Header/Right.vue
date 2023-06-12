<template lang="pug">
.xo-default-header-right.row.items-center
  .desktop-view.row.items-center
    nuxt-link(to="/signin", v-if="!isLoggedIn") Sign In
    b-button(type="is-primary", tag="router-link", to="/locker-room/explore") Find My Club
  .mobile-view
    .mobile-menu.row(@click.prevent="showMobileMenu = true")
      b-icon(icon="menu", custom-size="mdi-36px")
    XMLockerRoomHeaderGuestMenu(v-if="showMobileMenu")
  XMLockerRoomHeaderUserMenu(v-if="isLoggedIn")
  //- b-button(type="is-primary", @click.prevent="fnGoToRegisterInterest()") Register Interest
</template>

<script>
export default {
  name: 'XODefaultHeaderRight',
  components: {
    XMLockerRoomHeaderUserMenu: () =>
      import('~/components/molecules/LockerRoom/Header/UserMenu'),
    XMLockerRoomHeaderGuestMenu: () =>
      import('~/components/molecules/LockerRoom/Header/GuestMenu'),
  },
  data() {
    return {
      showMobileMenu: false,
    }
  },
  mounted() {
    this.$root.$on('evtRtShowMobileMenu', (value) => {
      this.showMobileMenu = value
    })
  },
  methods: {
    fnGoToRegisterInterest() {
      const registerInterest = document.getElementById(
        'xo-home-register-interest'
      )
      const registerInterestTop = registerInterest.offsetTop
      window.scrollTo(0, registerInterestTop)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-default-header-right::v-deep {
  a {
    text-transform: uppercase;
    color: $white;
    display: block;
  }

  .button {
    // width: 195px;
    width: 155px;
    height: 42px;
    display: flex;
    margin-left: 20px;
  }

  .xm-locker-room-header-user-menu {
    margin-left: 20px;
  }

  .desktop-view {
    @include max-width(1023px) {
      display: none;
    }
  }

  .mobile-view {
    display: none;
    flex-wrap: wrap;
    align-items: center;

    @include max-width(1023px) {
      display: flex;
    }
  }
}
</style>
