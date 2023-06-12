<template lang="pug">
XPContact
</template>

<script>
import meta from '~/mixins/meta'
import XPContact from '~/components/pages/Contact'

export default {
  components: { XPContact },
  mixins: [meta],
  created() {
    this.metaTitle = 'Contact'
  },
  mounted() {
    const params = { pageName: 'Contact us', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
