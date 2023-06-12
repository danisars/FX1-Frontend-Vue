<template lang="pug">
.xm-explore-clubs-sport-slider(v-if="!isRetrieving")
  .row.justify-between
    .col
      h2 {{ name }}
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
import { mapGetters } from 'vuex'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import XAExploreClubsSportSlide from '~/components/atoms/ExploreClubs/SportSlide.vue'

export default {
  name: 'XMExploreClubsSportSlider',
  components: {
    Hooper,
    Slide,
    XAExploreClubsSportSlide,
  },
  props: {
    sport: { type: Object, default: () => {} },
  },
  data() {
    return {
      lockerRooms: [],
      isRetrieving: true,
    }
  },
  async fetch() {
    await this.fnRetrieveSport()
  },
  computed: {
    ...mapGetters({
      getSportsList: 'sports/getSportsList',
    }),
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
    name() {
      return this.sport?.name || null
    },
    slug() {
      return this.sport?.slug || null
    },
    sportLockerRooms() {
      const sportLockerRooms = this.getSportsList?.filter((lockerRoom) => {
        return lockerRoom?.name === this.name
      })

      return sportLockerRooms[0]
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
    async fnRetrieveSport() {
      this.isRetrieving = true

      try {
        const { slug } = this
        const {
          getSport: {
            LockerRooms: { items },
          },
        } = await this.$api.getSport({ slug })
        this.lockerRooms = items
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.success(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      } finally {
        this.isRetrieving = false
      }
    },
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
.xm-explore-clubs-sport-slider::v-deep {
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
