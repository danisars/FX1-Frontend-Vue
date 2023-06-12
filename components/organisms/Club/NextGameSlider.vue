<template lang="pug">
.xo-next-game-slider
  //- swiper(ref="nextGameSlider")
  //-   swiper-slide(v-for="n in 3", :key="n")
  //-     XMNextGameSlide
</template>

<script>
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'

export default {
  name: 'XONextGameSlider',
  components: {
    // Swiper,
    // SwiperSlide,
    XMNextGameSlide: () => import('~/components/molecules/Club/NextGameSlide'),
  },
  computed: {
    swiperSettings() {
      const swiperSettings = {
        loop: false,
        spaceBetween: 10,
        slidesPerView: 1,
      }

      return swiperSettings
    },
  },
  mounted() {
    const slider = this.$refs.nextGameSlider.swiperRef
    slider.destroy = () => {}
  },
}
</script>

<style lang="scss" scoped>
.xo-next-game-slider::v-deep {
  margin-bottom: 30px;

  .swiper-container {
    .swiper-pagination {
      bottom: unset;
      top: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      padding: 35px 30px;
      z-index: 2;

      .swiper-pagination-bullet {
        background-color: transparent;
        opacity: 1;
        border: 1px solid $white;

        &.swiper-pagination-bullet-active {
          background-color: $white;
        }
      }
    }
  }
}
</style>
