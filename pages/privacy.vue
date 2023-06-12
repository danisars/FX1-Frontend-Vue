<template lang="pug">
XPPolicy
</template>

<script>
import meta from '~/mixins/meta'

export default {
  components: {
    XPPolicy: () => import('~/components/pages/Policy'),
  },
  mixins: [meta],
  created() {
    this.metaTitle = 'Privacy'
  },
  mounted() {
    const params = { pageName: 'Privacy', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
