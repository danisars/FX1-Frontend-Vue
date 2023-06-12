<template lang="pug">
.xm-locker-room-header-guest-menu
  .close(@click.prevent="fnToggleMobileMenu()"): b-icon(
    icon="close",
    custom-size="mdi-24px"
  )

  .navigation-menu
    template(v-if="isHomePage")
      nuxt-link(to="/locker-room/explore") Leagues & Clubs
      nuxt-link(to="/locker-room/explore") Customer Support
      nuxt-link(to="/about") About
      nuxt-link(to="/contact") Contact
      nuxt-link(to="/business") For Business
      template(v-if="!isLoggedIn")
        nuxt-link(to="/signup?step=1") Sign Up
        nuxt-link(to="/signin") Sign In
      nuxt-link(to="/locker-room/explore") Find My Club
    template(v-else)
      nuxt-link(to="/signup?step=1") Sign Up
      nuxt-link(to="/signin") Sign In
</template>

<script>
export default {
  name: 'XMLockerRoomHeaderGuestMenu',
  computed: {
    isHomePage() {
      return this.$route.name === 'index'
    },
  },
  methods: {
    fnToggleMobileMenu() {
      this.$root.$emit('evtRtShowMobileMenu', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-locker-room-header-guest-menu::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: #2a4e55;

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .navigation-menu {
    padding: 60px 0 50px;

    a {
      display: block;
      text-transform: none;
      font-size: 1.1429rem;
      font-weight: 300;
      border-top: 1px solid rgba($white, 0.2);
      padding: 15px 30px 0;
      margin-top: 15px;
      color: $white;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
