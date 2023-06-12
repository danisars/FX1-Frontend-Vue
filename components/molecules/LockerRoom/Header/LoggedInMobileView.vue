<template lang="pug">
.xm-locker-room-header-guest-menu
  .close(@click.prevent="fnToggleMobileMenu()"): b-icon(
    icon="close",
    custom-size="mdi-24px"
  )

  .navigation-menu
    template(v-if="isLoggedIn")
      .menu-section
        XAMyLocation(:inMobileMenu="true")
      .menu-section
        XAMyAvatar
        p.marg-left My Account
      nuxt-link(to="/token" v-if="isHomePage") $FX1 Token
      nuxt-link(to="/locker-room/explore" v-if="isHomePage") Customer Support
      nuxt-link(to="/about" v-if="isHomePage") About
      nuxt-link(to="/contact" v-if="isHomePage") Contact
      nuxt-link(to="/business" v-if="isHomePage") For Business
      .menu-section(@click.prevent="fnLogOut()")
        img(src="~assets/images/Auth/logout-icon.svg")
        .logout.marg-left Log out
    template(v-else)
      .menu-section
        XAMyLocation(:inMobileMenu="true")
      nuxt-link(to="/token" v-if="isHomePage") $FX1 Token
      nuxt-link(to="/locker-room/explore" v-if="isHomePage") Customer Support
      nuxt-link(to="/about" v-if="isHomePage") About
      nuxt-link(to="/contact" v-if="isHomePage") Contact
      nuxt-link(to="/business" v-if="isHomePage") For Business
      .menu-section
        b-button.btn-signin(
          type="is-primary",
          tag="router-link",
          to="/signin"
        ) Sign In
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'XMLoggedInMobileView',
  components: {
    XAMyLocation: () =>
      import('~/components/atoms/MyLocation'),
    XAMyAvatar: () => import('~/components/atoms/MyAvatar'),
  },
  computed: {
    isHomePage() {
      return this.$route.name === 'index'
    },
  },
  methods: {
    fnToggleMobileMenu() {
      this.$root.$emit('evtRtShowMobileMenu', false)
    },
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
.xm-locker-room-header-guest-menu::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background-color: #2a4e55;

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .btn-signin {
    text-transform: uppercase;
    width: 125px;
    height: 42px;
    cursor: pointer;
    color: $white;
    display: inline !important;
    padding: 9px 30px !important;
  }

  .logout {
    color: $primary !important;
  }
  .menu-section {
    display: flex;
    align-items: center;
    text-transform: none;
    font-size: 1.1429rem;
    font-weight: 300;
    border-top: 1px solid rgba($white, 0.2);
    padding: 15px 30px 0;
    margin-top: 15px;
    color: $white;
    .marg-left {
      margin-left: 10px;
    }

    &:first-child {
      margin-top: 0;
    }
  }

  .navigation-menu {
    padding: 60px 0 25px;

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
