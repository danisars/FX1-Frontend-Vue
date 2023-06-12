<template lang="pug">
  .xo-live-games-by-sport(v-if="!isRetrieving && showLiveLeagues")
    h2 Live Games By Sport
    div(
      v-for="(game, index) in leagueCodesData"
      :key="game.code"
    )
      XMLiveSlider(
        v-if="game.items.length && leaguesBySport.includes(game.code)"
        :name="game.code"
        :slides="game.items"
        :nextId="next"
        :childStatus="leagueCodes[index]"
        @next-slider="getSports"
      )
</template>

<script>
import XMLiveSlider from '~/components/molecules/Live/Slider.vue'

export default {
  name: 'XOLiveGamesBySport',
  components: { XMLiveSlider },
  data() {
    return {
      leagueCodesData: [
        {
          code: "MLB",
          name: "Major League Baseball",
          items: []
        },
        {
          code: "WNBA",
          name: "Women's National Basketball Association",
          items: []
        },
        {
          code: "NBA",
          name: "National Basketball Association",
          items: []
        },
        {
          code: "NCAAB",
          name: "National Collegiate Athletic Association",
          items: []
        },
        {
          code: "NHL",
          name: "National Hockey League",
          items: []
        },
        {
          code: "MLS",
          name: "Major Soccer League",
          items: []
        },
        {
          code: "EPL",
          name: "Premier League",
          items: []
        },
        {
          code: "CONCACAF",
          name: "CONCACAF",
          items: []
        },
        {
          code: "EFL",
          name: "EFL Championship",
          items: []
        },
        {
          code: "UEFA",
          name: "UEFA Championship",
          items: []
        }
      ],
      isRetrieving: true,
      next: null,
      leagueCodeMap: {
        baseball: 'MLB',
        basketball: ['WNBA', 'NBA', 'NCAAB'],
        'ice-hockey': 'NHL',
        soccer: ['MLS', 'EPL', 'CONCACAF', 'EFL', 'UEFA']
      },
      leaguesBySport: [],
      activeSports: [],
      socket: null,
      liveGames: []
    }
  },
  computed: {
    leagueCodes() {
      return this.leagueCodesData.map(league => league.code)
    },
    showLiveLeagues() {
      const allLiveGames = this.leagueCodesData.flatMap(({ items }) => items)
      const filteredLiveGames = allLiveGames.map(item => {
        if (!this.activeSports.length) return true
        return this.activeSports.includes(item.competition)
      })
      return filteredLiveGames.includes(true)
    }
  },
  watch: {
    '$store.state.app.activeSports'(newValue) {
      this.activeSports = newValue.flatMap(item => this.leagueCodeMap[item])

      this.leaguesBySport = this.activeSports.length
        ? this.activeSports
        : this.leagueCodes
    }
  },
  async created() {
    this.leaguesBySport = this.leagueCodes
    this.isRetrieving = true;

    const promises = this.leagueCodes.map(code =>
      this.getSports(code.toLowerCase(), null, 10, true))

    await Promise.allSettled(promises)

    const hasItems = this.leagueCodesData.some(game => game.items.length > 0)
    if (hasItems) {
      this.isRetrieving = false
    }
  },
  methods: {
    getLiveGames(){
      this.socket = this.$nuxtSocket({
        channel: '/',
        auth: {
          token: this.$store.state.auth.token || null,
          type: 'desktop',
        },
        transports: ['websocket'],
      })

      this.socket.on('live-games', payload => {
        this.liveGames = payload.payload.games
      })
    },
    async getSports(leagueCodes, next, count, isFirstTimeCall) {
      try {

        this.getLiveGames()

        const { getGames } = await this.$api.getGames({
          next,
          count,
          leagueCodes,
          type: 'live'
        })
        this.updateListData(
          this.liveGames,
          getGames.next,
          leagueCodes.toUpperCase(),
          isFirstTimeCall
        )

      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.error(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      }
    },
    updateListData(items, next, leagueCodes, isFirstTimeCall) {
      const index = this.leagueCodes.indexOf(leagueCodes)

      if (index !== -1) {
        this.leagueCodesData[index].items = isFirstTimeCall
          ? items
          : this.leagueCodesData[index].items.concat(items)
        this.next = next
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.xo-live-games-by-sport::v-deep {
  margin-top: 30px;
  margin-bottom: 80px;

  @include max-width(767px) {
    margin-bottom: 60px;
  }

  h2 {
    font-size: 32px;
    line-height: 1.8;
    letter-spacing: -2.1px;

    @include min-width(768px) {
      font-size: 40px;
      line-height: 80px;
    }
  }

}
</style>
