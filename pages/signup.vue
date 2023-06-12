<template lang="pug">
XPSignUp
</template>

<script>
export default {
  name: 'PageSignup',
  components: {
    XPSignUp: () => import('~/components/pages/SignUp'),
  },
  layout: 'auth',
  mounted() {
    const params = { pageName: 'Sign-up', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
