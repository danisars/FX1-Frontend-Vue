<template lang="pug">
.xo-explore-clubs-league(v-if="!isRetrieving")
  XMExploreClubsLeagueSlider(
    v-for="(league, index) in leagues",
    :key="index",
    :league="league"
  )
</template>

<script>
import XMExploreClubsLeagueSlider from '~/components/molecules/ExploreClubs/LeagueSlider.vue'

export default {
  name: 'XOExploreClubsLeague',
  components: { XMExploreClubsLeagueSlider },
  props: {
    sport: { type: Object, default: () => {} },
  },
  data() {
    return {
      isRetrieving: true,
      leagues: [],
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
          getSport: { LockerRoomsByLeague },
        } = await this.$api.getLeaguesBySport({ slug })
        this.leagues = LockerRoomsByLeague
      } catch (error) {
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>
