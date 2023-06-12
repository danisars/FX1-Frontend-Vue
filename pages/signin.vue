<template lang="pug">
XPSignIn
</template>

<script>
export default {
  name: 'PageSignIn',
  components: {
    XPSignIn: () => import('~/components/pages/SignIn'),
  },
  layout: 'auth',
  mounted() {
    const params = { pageName: 'Sign-in', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
