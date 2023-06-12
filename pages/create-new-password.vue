<template lang="pug">
XPCreateNewPassword
</template>

<script>
export default {
  name: 'PageCreateNewPassword',
  components: {
    XPCreateNewPassword: () => import('~/components/pages/CreateNewPassword'),
  },
  layout: 'auth',
  mounted() {
    const params = {
      pageName: 'Create new password',
      isLoggedIn: this.isLoggedIn,
    }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
