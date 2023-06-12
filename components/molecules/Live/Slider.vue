<template lang="pug">
.xm-live-slider
  .row.justify-between
    .xm-live-slider-header
      .slider-title {{ name }}
    .actions.row(:class="`slider-${name}`")
      .btn-action.btn-prev.row.items-center.justify-center(
        @click.prevent="fnPreviousSlide()"
      ): img(
        :src="require('~/assets/images/slider/arrow-left.svg')"
      )
      .btn-action.btn-next.row.items-center.justify-center(
        @click.prevent="fnNextSlide()"
      ): img(
        :src="require('~/assets/images/slider/arrow-right.svg')"
      )
  hooper(
    v-if="showSlider",
    :settings="hooperSettings",
    style="height: auto; width: 110%",
    ref="slider"
  )
    slide(v-for="(slide, index) in slides", :key="index")
      XALiveEvent(:slide="slide" :upcoming="upcoming")
</template>

<script>
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import XALiveEvent from '~/components/atoms/Live/Event.vue'

export default {
  name: 'XMLiveSlider',
  components: {
    Hooper,
    Slide,
    XALiveEvent,
  },
  props: {
    name: { type: String, default: '-' },
    slides: { type: Array, default: () => [] },
    upcoming: { type: Boolean, default: () => false },
    nextId: { type: String, default: null },
    childStatus: { type: String, default: null }
  },
  data: () => {
    return {
      apiCallDataCount: 10,
      slideTracker: 0,
      countedSlides: 2,
      infiniteScroll: false,
      showButtons: true,
      showSlider: true,
      timeout: null,
      timer: null,
      itemsToSlide: 1
    }
  },
  computed: {
    hooperSettings() {
      const hooperSettings = {
        trimWhiteSpace: true,
        wheelControl: false,
        itemsToShow: this.countedSlides,
        infiniteScroll: false,
        mouseDrag: false,
        itemsToSlide: this.itemsToSlide,
        breakpoints: {
          0: {
            mouseDrag: true,
          },
        },
      }
      return hooperSettings
    },
  },
    mounted() {
    this.calculateSlides()
    window.addEventListener('resize', () => {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.calculateSlides()
        this.timer = null
      }, 100)
    })
  },
  methods: {
    fnPreviousSlide() {
      if (this.$refs?.slider?.currentSlide !== 0) {
        this.$refs?.slider?.slidePrev();
      }
    },
    async fnNextSlide() {
      // currentSlide checked with 9 because it has 10 records and the record started from 0.
      if (this.$refs?.slider?.currentSlide >= this.apiCallDataCount - this.countedSlides + this.slideTracker) {
        await this.$emit('next-slider', this.childStatus, this.nextId, this.apiCallDataCount, false);
        this.slideTracker += 10;
        this.$refs?.slider?.slideTo(this.$refs?.slider?.currentSlide - 0.5);
      }
      else {
        this.$refs?.slider?.slideNext()
      }
    },
    calculateSlides() {
      const slideSize = window.innerWidth > 534 ? 254 + 24 : 164 + 16
      const sliderWidth = this.$refs.slider.$el.clientWidth
      const slides = sliderWidth / slideSize
      this.countedSlides = slides
      // this.infiniteScroll = this.slides.length > slides
      this.showButtons = this.slides.length > slides
      this.showSlider = false
      this.$nextTick(() => {
        this.showSlider = true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-live-slider::v-deep {
  margin-top: 16px;
  margin-bottom: 60px;

  @include max-width(1023px) {
    margin-top: 17px;
  }

  .slider-title {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;

    @include max-width(767px) {
      font-size: 16px;
      line-height: 18px;
    }
  }

  .xm-live-slider-header {
    width: auto !important;
  }

  .actions {
    margin: 0 !important;
    margin-right: 5px !important;

    @include max-width(534px) {
      margin-right: 0 !important;
    }

    .btn-action {
      height: 20px;
      border-radius: 50%;
      cursor: pointer;

      &:not(:first-child) {
        margin-left: 38px;
      }

      &.no-prev,
      &.no-next {
        background-color: transparent;
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    &.slider-1,
    &.slider-2,
    &.slider-3,
    &.slider-4 {
      display: none;
    }

    @include max-width(1440px) {
      &.slider-1,
      &.slider-2,
      &.slider-3 {
        display: none;
      }

      &.slider-4 {
        display: flex;
      }
    }

    @include max-width(1024px) {
      &.slider-1,
      &.slider-2 {
        display: none;
      }

      &.slider-3,
      &.slider-4 {
        display: flex;
      }
    }

    @include max-width(767px) {
      &.slider-1 {
        display: none;
      }

      &.slider-2,
      &.slider-3,
      &.slider-4 {
        display: flex;
      }
    }

  }

  .swiper-container {
    .swiper-wrapper {
      .swiper-slide {
        width: calc(100% / 3 - 30px);

        @include min-width(1441px) {
          width: calc(100% / 4 - 30px);
        }
      }
    }
  }

  .hooper {

    @include max-width(767px) {
      margin-top: 3px;
    }
  }
}
</style>
