<template lang="pug">
  .xo-live-streams(v-if="liveNowStreams.length > 0 || upcomingStreams.length > 0")
    h2 Recommended
    XMLiveSlider(
    v-if="liveNowStreams.length > 0"
    name="Live Now"
    :slides="liveNowStreams"
    :nextId="next"
    :childStatus="liveStatus"
    @next-slider="getSports"
    )
    XMLiveSlider(
    v-if="upcomingStreams.length > 0"
    name="Upcoming Streams"
    :slides="upcomingStreams"
    :nextId="next"
    :childStatus="upcomingStatus"
    @next-slider="getSports"
    :upcoming="true"
    )
</template>

<script>
import XMLiveSlider from '~/components/molecules/Live/Slider.vue'

export default {
  name: 'XOLiveRecommended',
  components: { XMLiveSlider },
  data() {
    return {
      isRetrieving: true,
      liveNowStreams: [],
      upcomingStreams: [],
      next: null,
      liveStatus:null,
      upcomingStatus:null
    }
  },
  async created() {
    await this.getSports('live', null, 10, true);
    await this.getSports('upcoming', null, 10, true);
  },
  watch: {
    "$store.state.app.activeSports": async function(val) {
      this.liveNowStreams = [];
      this.upcomingStreams = [];
      await this.getSports('live', null, 10, true);
      await this.getSports('upcoming', null, 10, true);
    },
    "$store.state.app.activePartners": async function(val) {
      this.liveNowStreams = [];
      this.upcomingStreams = [];
      await this.getSports('live', null, 10, true);
      await this.getSports('upcoming', null, 10, true);
    }
  },
  methods: {
    async getSports(status, next, count, isFirstTimeCall) {
      const inputParam = await this.createInput(status, next, count);
      try {
        this.isRetrieving = true;
        const games = await this.$api.getGames(inputParam)
        this.isRetrieving = false;
        this.updateListData(games.getGames.items, games.getGames.next,  status, isFirstTimeCall);

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
      } finally {
        this.isRetrieving = false;
      }
    },
    updateListData(items, next, status, isFirstTimeCall) {

      if (status === 'live') {
        this.liveNowStreams = isFirstTimeCall ? items : this.liveNowStreams.concat(items);
        this.next = next;
        this.liveStatus = status;
      }

      if (status === 'upcoming') {
        this.upcomingStreams = isFirstTimeCall ? items : this.upcomingStreams.concat(items);
        this.next = next;
        this.upcomingStatus = status;
      }

    },
    createInput(status, next, count) {
      let myParam = {
        next: next,
        type: status,
        count: count
      }
      if(this.$store.state.app.activeSports.length > 0) { 
        myParam['leagueCodes'] = this.$store.state.app.activeLeagues;
      }
      if(this.$store.state.app.activePartners.length > 0) { 
        myParam['partnerNames'] = this.$store.state.app.activePartnersString;
      }
      return myParam;
    }
  }
}
</script>

<style lang="scss" scoped>
.xo-live-streams::v-deep {
  margin-top: 30px;
  margin-bottom: 80px;

  @include max-width(1365px) {
    margin-top: 28px;
  }

  @include max-width(767px) {
    margin-top: 24px;
    margin-bottom: 66px;
  }

  h2 {
    letter-spacing: -2.1px;
    font-size: 32px;
    line-height: 1.8;
    @include min-width(768px) {
      font-size: 40px;
      line-height: 80px;
    }
  }

}
</style>
