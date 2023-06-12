<template lang="pug">
XPLeaguesAndClubs
</template>

<script>
import meta from '~/mixins/meta'

export default {
  components: {
    XPLeaguesAndClubs: () => import('~/components/pages/LeaguesAndClubs'),
  },
  mixins: [meta],
  created() {
    this.metaTitle = 'Leagues & Clubs'
  },
  mounted() {
    const params = { pageName: 'Leagues & Clubs', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
