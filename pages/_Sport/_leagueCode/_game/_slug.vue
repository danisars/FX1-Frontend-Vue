<template lang="pug">
ExploreEvent(
  ref="explorevent",
  :paramsValidationActive="paramsValidationActive",
  :lockerRoom="room",
  @setLockerRoom="setLockerRoom"
)
</template>

<script>
import moment from 'moment'
import { mapFields } from 'vuex-map-fields'
import meta from '~/mixins/meta'

export default {
  name: 'XOLEventRoom',
  components: {
    ExploreEvent: () => import('~/components/pages/ExploreEvent'),
  },
  layout: 'explore-event',
  data() {
    return {
      game: {},
      paramsValidationActive: false,
      room: null,
    }
  },
  computed: {
    ...mapFields('app', ['selectedGameEventRoom']),
    ...mapFields('live', ['lockerRoomActive']),
  },
  mixins: [meta],
  async created() {
    if(!this.$route.params.leagueCode && !this.$route.params.game && !this.$route.params.slug ) {
      await this.$router.push('/error')
      return
    }
    this.paramsValidationActive = true
    this.metaTitle =
      this.$route.params.game +
      ' | ' +
      this.$route.params.leagueCode.toUpperCase()
    const gameID = this.$route.params?.slug
    if (!this.selectedGameEventRoom) {
      if (gameID) {
        this.$store.dispatch('locker-room/setLockerRoomLoading', true)
        const { getLockerRoom } = await this.$api.getLockerRoom({
          group: `Game:${gameID}`,
        })
        if (!getLockerRoom) {
          await this.$router.push('/error')
          return
        }
        this.room = getLockerRoom
        this.game = getLockerRoom.Game
        this.$store.dispatch('locker-room/setLockerRoomLoading', false)
      }
    } else {
      this.game = JSON.parse(JSON.stringify(this.selectedGameEventRoom))
    }
    this.validateUrl()
    this.metaTitle =
      (this.game?.team1Name ||
        this.game?.team1DisplayName ||
        this.game?.team1Nickname ||
        this.game?.team1City) +
      ' vs ' +
      (this.game?.team2Name ||
        this.game?.team2DisplayName ||
        this.game?.team2Nickname ||
        this.game?.team2City) +
      ' | ' +
      this.game?.leagueCode.toUpperCase() +
      ' | ' +
      moment(this.game?.date).local().format('DD MMMM YYYY')
  },
  mounted() {
    const params = { pageName: 'Event Room', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
  beforeDestroy() {
    this.$store.dispatch('locker-room/setLockerRoomPrivateChat', null)
  },
  methods: {
    validateSportParam() {
      return (
        this.$route.params.Sport.toLowerCase() ===
        this.game.sport.replace(/\s/g, '-').toLowerCase()
      )
    },
    validateLeagueCodeParam() {
      return (
        this.$route.params.leagueCode.toLowerCase() ===
        this.game.leagueCode.toLowerCase()
      )
    },
    validateGameParam() {
      const gameString =
        `${
          this.game.team1Name ||
          this.game.team1DisplayName ||
          this.game.team1Nickname ||
          this.game.team1City
        }` +
        '-vs-' +
        `${
          this.game.team2Name ||
          this.game.team2DisplayName ||
          this.game.team2Nickname ||
          this.game.team2City
        }`
      return (
        this.$route.params.game.toLowerCase().replace(/\s/g, '-') ===
        gameString.toLowerCase().replace(/\s/g, '-')
      )
    },
    validateSlugParam() {
      return (
        this.$route.params.slug.toLowerCase() === this.game.gameID.toString()
      )
    },
    validateUrl() {
      const sport = this.validateSportParam()
      const leagueCode = this.validateLeagueCodeParam()
      const game = this.validateGameParam()
      const slug = this.validateSlugParam()
      if (!sport || !leagueCode || !game || !slug) {
        this.$router.push({
          path: '/error',
        })
      }
      this.paramsValidationActive = false
    },
    async setLockerRoom() {
      const { getLockerRoom } = await this.$api.getLockerRoom({
        group: `Game:${this.$route.params?.slug}`,
      })
      this.room = getLockerRoom
    },
  },
}
</script>
