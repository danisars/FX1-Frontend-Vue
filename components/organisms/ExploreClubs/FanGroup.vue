<template lang="pug">
.xo-explore-clubs-fan-group(v-if="!isRetrieving && fanGroups.length")
  XMExploreClubsFanGroupSlider(:fan-groups="fanGroups")
</template>

<script>
import XMExploreClubsFanGroupSlider from '~/components/molecules/ExploreClubs/FanGroupSlider.vue'

export default {
  name: 'XOExploreClubsFanGroup',
  components: { XMExploreClubsFanGroupSlider },
  props: {
    sport: { type: Object, default: () => {} },
  },
  data() {
    return {
      isRetrieving: true,
      fanGroups: [],
    }
  },
  computed: {
    slug() {
      return this.sport?.slug || null
    },
  },
  mounted() {
    this.fnRetrieveLeaguesBySport()
  },
  methods: {
    async fnRetrieveLeaguesBySport() {
      try {
        const { slug } = this
        const {
          getSport: {
            FanGroupLockerRooms: { items },
          },
        } = await this.$api.getLeaguesBySport({ slug })
        this.fanGroups = items
      } catch (error) {
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>
