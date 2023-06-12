<template lang="pug">
XPAbout
</template>

<script>
import meta from '~/mixins/meta'

export default {
  components: {
    XPAbout: () => import('~/components/pages/About'),
  },
  mixins: [meta],
  created() {
    this.metaTitle = 'About'
  },
  mounted() {
    const params = { pageName: 'About', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
