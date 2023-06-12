<template lang="pug">
XPForgotPassword
</template>

<script>
export default {
  name: 'PageForgotPassword',
  components: {
    XPForgotPassword: () => import('~/components/pages/ForgotPassword'),
  },
  layout: 'auth',
  mounted() {
    const params = { pageName: 'Forgot password', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
