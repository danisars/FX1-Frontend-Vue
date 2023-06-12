<template lang="pug">
.xp-sign-up.auth-page
  XOSignUpStep1(v-if="activeRoute === 1")
  XOSignUpStep2(v-if="activeRoute === 2")
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XPSignUp',
  components: {
    XOSignUpStep1: () => import('~/components/organisms/v2/SignUp/Step1'),
    XOSignUpStep2: () => import('~/components/organisms/v2/SignUp/Step2'),
  },
  computed: {
    ...mapFields('signup', ['email', 'signupOwnerManagerInviteID']),
    activeRoute() {
      return parseInt(this.$route?.query?.step) || 0
    },
  },
  mounted() {
    const activeRoute = parseInt(this.$route.query?.step)

    if (activeRoute === undefined || activeRoute === 0 || isNaN(activeRoute)) {
      this.$router.push({
        query: { step: 1 },
      })
    }

    if (activeRoute >= 2) {
      this.$router.push({
        query: { step: 2 },
      })
    }

    // redirect to step 1 if vuex has no email
    if (!this.email) {
      this.$router.push({
        name: 'signup',
        query: { ...this.$route.query, step: 1 },
        params: { ...this.$route.params },
      })
    }
  },
}
</script>
