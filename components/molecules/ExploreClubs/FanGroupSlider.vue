<template lang="pug">
.xm-explore-clubs-fan-group-slider
  .row.justify-between
    .col
      h2 Fan Groups
    .actions.row(:class="`slider-${countLockerRooms}`")
      .btn-action.btn-prev.row.items-center.justify-center(
        @click.prevent="fnPreviousSlide()"
      ): b-icon(
        icon="chevron-left"
      )
      .btn-action.btn-next.row.items-center.justify-center(
        @click.prevent="fnNextSlide()"
      ): b-icon(
        icon="chevron-right"
      )

  hooper(:settings="hooperSettings", style="height: auto", ref="sportSlider")
    slide(v-for="(lockerRoom, index) in lockerRooms", :key="index")
      XAExploreClubsSportSlide(:lockerRoom="lockerRoom")
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import { VueScreenSizeMixin } from 'vue-screen-size'
import XAExploreClubsSportSlide from '~/components/atoms/ExploreClubs/SportSlide.vue'

export default {
  name: 'XMExploreClubsFanGroupSlider',
  components: { Hooper, Slide, XAExploreClubsSportSlide },
  mixins: [VueScreenSizeMixin],
  props: {
    fanGroups: { type: Array, default: () => [] },
  },
  data() {
    return {
      showNavigationActions: false,
    }
  },
  computed: {
    ...mapFields('app', ['activeSport']),
    hooperSettings() {
      const hooperSettings = {
        trimWhiteSpace: true,
        wheelControl: false,
        mouseDrag: false,
        breakpoints: {
          1441: {
            itemsToShow: 4.2,
            infiniteScroll: this.lockerRooms.length > 4,
          },
          1025: {
            itemsToShow: 3.2,
            infiniteScroll: this.lockerRooms.length > 3,
          },
          768: {
            itemsToShow: 2.1,
            infiniteScroll: this.lockerRooms.length > 2,
          },
          0: {
            itemsToShow: this.lockerRooms.length > 1 ? 1.1 : 1,
            mouseDrag: true,
            infiniteScroll: this.lockerRooms.length > 1,
          },
        },
      }

      return hooperSettings
    },
    leagueName() {
      return this.fanGroup?.leagueName || null
    },
    lockerRooms() {
      return this.fanGroups || []
    },
    countLockerRooms() {
      const countLockerRooms = this.lockerRooms.length || 0

      if (countLockerRooms > 4) {
        return 'multiple'
      }

      return countLockerRooms
    },
  },
  watch: {
    activeSport: {
      deep: true,
      handler() {
        this.$refs?.sportSlider?.updateWidth()
      },
    },
  },
  methods: {
    fnPreviousSlide() {
      this.$refs?.sportSlider?.slidePrev()
    },
    fnNextSlide() {
      this.$refs?.sportSlider?.slideNext()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-explore-clubs-fan-group-slider::v-deep {
  margin-top: 80px;

  @include max-width(768px) {
    margin-top: 50px;
  }

  h2 {
    margin-bottom: 50px;
  }

  .actions {
    .btn-action {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      background-color: #2a4e55;

      &:not(:first-child) {
        margin-left: 20px;
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

  .hooper {
    margin: 0 -10px;

    @include max-width(767px) {
      margin: 0 -7px;
    }

    .hooper-list {
      .hooper-track {
        .hooper-slide {
          padding: 0 10px;

          @include max-width(767px) {
            padding: 0 7px;
          }
        }
      }
    }
  }
}
</style>
