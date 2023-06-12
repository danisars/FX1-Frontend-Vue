<template lang="pug">
.xo-live-streams(v-if="!isRetrieving")
  h2 Hot Rivalries
  XMLiveSlider(
    name="Live Now"
    :slides="liveNowStreams"
  )
</template>

<script>
import XMLiveSlider from '~/components/molecules/Live/Slider.vue'

export default {
  name: 'XOLiveHotRivalries',
  components: { XMLiveSlider },
  data() {
    return {
      isRetrieving: true,
      liveNowStreams: [],
    }
  },
  mounted() {
    this.fnRetrieveLeaguesBySport()
  },
  methods: {
    async fnRetrieveLeaguesBySport() {
      try {
        const slug = 'cricket'

        const {
          getSport: {
            LockerRooms: { items },
          },
        } = await this.$api.getSport({ slug })

        this.liveNowStreams = items
      } catch (error) {
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-live-streams::v-deep {
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