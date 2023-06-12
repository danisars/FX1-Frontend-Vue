<template lang="pug">
XPTerms
</template>

<script>
import meta from '~/mixins/meta'

export default {
  components: {
    XPTerms: () => import('~/components/pages/Terms'),
  },
  mixins: [meta],
  created() {
    this.metaTitle = 'Terms'
  },
  mounted() {
    const params = { pageName: 'Terms', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
