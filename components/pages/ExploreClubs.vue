<template lang="pug">
.xp-explore-clubs.col(:class="!isLoggedIn && 'is-logged-out'")
  .page-content(v-bar)
    .vuebar
      .page-title.row.items-center: h1 Explore sporting communities
      XOExploreClubsSports(:sports="sports", :active-sport="activeSport")
      XMExploreClubsSportSlider(
        v-for="(sport, index) in sports",
        :key="`${index}-all`",
        :sport="sport",
        v-show="activeSport === 'all'"
      )
      XOExploreClubsLeague(
        v-for="(sport, index) in sports",
        :key="`${index}-league`",
        :sport="sport",
        v-show="activeSport === sport.name"
      )
      XOExploreClubsFanGroup(
        v-for="(sport, index) in sports",
        :key="`${index}-fan-group`",
        :sport="sport",
        v-show="activeSport === sport.name"
      )
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import XOExploreClubsSports from '~/components/organisms/ExploreClubs/Sports.vue'
import XMExploreClubsSportSlider from '~/components/molecules/ExploreClubs/SportSlider.vue'
import XOExploreClubsLeague from '~/components/organisms/ExploreClubs/League.vue'
import XOExploreClubsFanGroup from '~/components/organisms/ExploreClubs/FanGroup.vue'

export default {
  name: 'XPExploreClubs',
  components: {
    XOExploreClubsSports,
    XMExploreClubsSportSlider,
    XOExploreClubsLeague,
    XOExploreClubsFanGroup,
  },
  computed: {
    ...mapFields('app', ['activeSport']),
    sports() {
      const sports = this.$parent?.sports?.filter((sport) => {
        return sport?.LockerRoomsByLeague.length
      })

      return sports || []
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-explore-clubs::v-deep {
  .page-content {
    .vuebar {
      width: calc(100% + 17px) !important;
      padding: 50px 67px 50px 50px !important;
      box-sizing: border-box !important;

      @include max-width(1023px) {
        padding: 40px 57px 40px 40px !important;
      }

      @include max-width(767px) {
        padding: 30px 47px 30px 30px !important;
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
