<template lang="pug">
.xm-club-game-highlights-slider
  //- swiper(ref="gameHighlightsSlider")
  //-   swiper-slide(v-for="n in 6", :key="n")
  //-     XAClubGameHighlightsSlide
</template>

<script>
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'

export default {
  name: 'XMClubGameHighlightsSlider',
  components: {
    // Swiper,
    // SwiperSlide,
    XAClubGameHighlightsSlide: () =>
      import('~/components/atoms/Club/GameHighlightsSlide'),
  },
  computed: {
    swiperSettings() {
      const swiperSettings = {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 3,
      }

      return swiperSettings
    },
  },
  mounted() {
    const slider = this.$refs.gameHighlightsSlider.swiperRef

    this.$root.$on('evtRtPrevSlide', () => {
      if (slider) {
        slider.slidePrev(500)
      }
    })

    this.$root.$on('evtRtNextSlide', () => {
      if (slider) {
        slider.slideNext(500)
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.xm-club-game-highlights-slider::v-deep {
  color: $secondary;

  .swiper-container {
    padding: 30px 0 50px;
  }
}
</style>
