<template lang="pug">
.xp-live.col(:class="!isLoggedIn && 'is-logged-out'")
  .page-content(v-bar)
    .vuebar
      XOLiveBanner
      XOLiveSports(:sports="sportsWithIcons.items" title="Sport" rowId="sport")
      //- XOLiveSports(:sports="gamePartners.items" title="Partner" rowId="partner")
      //- XOLivePartners(:partners="gamePartners.items")
      .line-separator(style="border-bottom: 1px solid #385960")

      XOLiveRecommended
      //- XOLiveHotRivalries
      //- XOLiveCloseGames
      XOLiveLiveGamesBySport
      XOLiveUpcomingGamesBySport
</template>

<script>
import XOLiveBanner from '~/components/organisms/Live/Banner.vue'
import XOLiveSports from '~/components/organisms/Live/Sports.vue'
import XOLivePartners from '~/components/organisms/Live/Partners.vue'

import XOLiveRecommended from '~/components/organisms/Live/Recommended.vue'
import XOLiveHotRivalries from '~/components/organisms/Live/HotRivalries.vue'
import XOLiveCloseGames from '~/components/organisms/Live/CloseGames.vue'
import XOLiveLiveGamesBySport from '~/components/organisms/Live/LiveGamesBySport.vue'
import XOLiveUpcomingGamesBySport from '~/components/organisms/Live/UpcomingGamesBySport.vue'

export default {
  name: 'Explore',
  components: {
    XOLiveBanner,
    XOLiveSports,
    XOLivePartners,

    XOLiveRecommended,
    XOLiveHotRivalries,
    XOLiveCloseGames,
    XOLiveLiveGamesBySport,
    XOLiveUpcomingGamesBySport,
  },
  data() {
    return {
      sportsWithIcons: [],
      gamePartners: [],
      isRetrieving: true,
    }
  },
  computed: {
    // sports() {
    //   const sports = this.$parent?.sports?.filter((sport) => {
    //     return sport?.LockerRoomsByLeague.length
    //   })
    //   return sports || []
    // },
  },
  created() {
    this.getSportsWithIcon()
    // this.getGamePartners()
  },
  methods: {
    async getSportsWithIcon() {
      try {
        this.isRetrieving = true
        const response = await this.$api.getSportsWithIcon()
        this.sportsWithIcons = response.getSportsWithIcon
        this.isRetrieving = false
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
        this.isRetrieving = false
      }
    },
    async getGamePartners() {
      try {
        this.isRetrieving = true
        const response = await this.$api.getGamePartners()
        this.gamePartners = response.getGamePartners
        this.isRetrieving = false
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
        this.isRetrieving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.line-separator {
  margin-top: 4px;

  @include max-width(767px) {
    margin-top: 5px;
  }
}
.xp-live::v-deep {
  .page-content {
    .vuebar {
      width: calc(100% + 17px) !important;
      padding: 24px 65px 50px 48px !important;
      box-sizing: border-box !important;

      @include max-width(1024px) {
        padding: 24px 57px 40px 40px !important;
      }

      @include max-width(767px) {
        padding: 30px 47px 30px 30px !important;
      }

      @include max-width(420px) {
        padding: 24px 16px !important;
        width: 100% !important;
      }

      .page-title {
        background-color: #886bf2;
        border-radius: 10px;
        min-height: 320px;
        padding: 0 50px;
        margin-bottom: 30px;

        @include max-width(1023px) {
          min-height: 250px;
        }

        @include max-width(767px) {
          min-height: 155px;
          padding: 0 20px;
        }
      }
    }

    &.vb {
      > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
        opacity: 0;

        > .vb-dragger-styler {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: rotate3d(0, 0, 0, 0);
          transform: rotate3d(0, 0, 0, 0);
          -webkit-transition: background-color 100ms ease-out,
            margin 100ms ease-out, height 100ms ease-out;
          transition: background-color 100ms ease-out, margin 100ms ease-out,
            height 100ms ease-out;
          background-color: #08252c;
          margin: 5px 2px 0;
          border-radius: 20px;
          height: calc(100% - 10px);
          display: block;
        }

        &:hover {
          > .vb-dragger-styler {
            background-color: #08252c;
            height: 100%;
          }
        }
      }

      &.vb-scrolling-phantom {
        > .vb-dragger {
          > .vb-dragger-styler {
            background-color: #08252c;
          }
        }
      }

      &.vb-dragging {
        > .vb-dragger {
          > .vb-dragger-styler {
            background-color: #08252c;
            height: 100%;
          }
        }
      }

      &.vb-dragging-phantom {
        > .vb-dragger {
          > .vb-dragger-styler {
            background-color: #08252c;
          }
        }
      }

      &:hover {
        > .vb-dragger {
          opacity: 0.8;
        }
      }
    }
  }

  &.is-logged-out {
    .page-content {
      @include max-width(767px) {
        height: calc(var(--vh, 1vh) * 100 - 70px);
      }
    }
  }
}
</style>
