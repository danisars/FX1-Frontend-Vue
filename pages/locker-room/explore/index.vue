<template lang="pug">
XPExploreClubs
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import meta from '~/mixins/meta'

export default {
  name: 'PageLockerRoomCommunities',
  components: {
    XPExploreClubs: () => import('~/components/pages/ExploreClubs'),
  },
  mixins: [meta],
  layout: 'locker-room',
  async asyncData({ app }) {
    try {
      const {
        getSports: { items },
      } = await app.$api.getSports()
      return { sports: items }
    } catch (error) {}
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
  },
  created() {
    this.metaTitle = 'Explore to find your sporting league or club - FX1'
  },
  mounted() {
    this.lockerRoomActive = null
    const params = { pageName: 'Locker room', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
