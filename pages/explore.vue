<template lang="pug">
Explore
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import meta from '~/mixins/meta'

export default {
  name: 'PageLive',
  components: {
    Explore: () => import('~/components/pages/Explore'),
  },
  mixins: [meta],

  layout: 'explore',
  // async asyncData({ app }) {
  //   try {
  //     const {
  //       getSports: { items },
  //     } = await app.$api.getSports()

  //     return { sports: items }
  //   } catch (error) {}
  // },
  computed: {
    ...mapFields('live', ['lockerRoomActive']),
  },
  created() {
    this.metaTitle = 'Explore to find your sporting league or club - FX1'
  },
  mounted() {
    // this.lockerRoomActive = null
    const params = { pageName: 'Explore', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
