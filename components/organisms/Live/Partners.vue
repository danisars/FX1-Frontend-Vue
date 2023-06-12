<template lang="pug">
.xo-live-sports
  span Partners
  .sports-list
    template(v-for="(sport, index) in partners")
      .sport(
        :class="[bActivePartners.indexOf(sport.slug) !== -1 && 'active', !sport.PhotoUrl && 'pure']",
        :key="index",
        @click.prevent="toggleActivePartner(sport.slug)"
      )
        ._icon(v-if="sport.Icon.PhotoURL")
          img(:src="sport.Icon.PhotoURL")
        ._name {{ sport.name }}
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'XOLivePartners',
  props: {
    partners: { type: Array, default: () => [] },
  },
  data: () => {
    return {
      dummyPartners: [
        {
          PhotoUrl: require('~/assets/images/dummy-partners/youtube.svg'),
          name: 'YoutubeTV',
          slug: 'youtube',
        },
        {
          PhotoUrl: require('~/assets/images/dummy-partners/spectrum.svg'),
          name: 'Spectrum',
          slug: 'spectrum',
        },
        {
          PhotoUrl: require('~/assets/images/dummy-partners/hulu.svg'),
          name: 'Hulu',
          slug: 'hulu',
        },
        {
          PhotoUrl: require('~/assets/images/dummy-partners/cbs.svg'),
          name: 'CBS',
          slug: 'cbs',
        },
        {
          PhotoUrl: require('~/assets/images/dummy-partners/espn.svg'),
          name: 'ESPN',
          slug: 'espn',
        },
        {
          PhotoUrl: require('~/assets/images/dummy-partners/cluchtv.svg'),
          name: 'Cluch TV',
          slug: 'cluchtv',
        },
        {
          name: 'Free',
          slug: 'free',
        },
      ],
    }
  },
  computed: {
    bActivePartners() {
      return this.$store.state.app.activePartners
    },
  },
  methods: {
    ...mapMutations('app', ['toggleActivePartner']),
  },
}
</script>

<style lang="scss" scoped>
.xo-live-sports::v-deep {
  display: flex;

  @include max-width(767px) {
    padding-top: 20px;
  }

  @include max-width(510px) {
    flex-direction: column;
    align-items: flex-start;
  }

  span {
    color: #94a6aa;
    font-size: 16px;
    line-height: 18px;
    width: 72px;
    margin-top: 12px;
    padding-top: 9px;
    margin-right: 23px;

    @include max-width(1023px) {
      margin-right: 32px;
    }

    @include max-width(767px) {
      margin-top: 5px;
      padding-top: 0;
      margin-bottom: 17px;
    }
  }

  .sports-list {
    display: flex;
    flex-wrap: wrap;

    .sport {
      margin-right: 24px;
      margin-bottom: 11px;
      margin-top: 12px;
      position: relative;
      color: #65676b;
      padding: 10.5px 7px 10.5px 35px;
      cursor: pointer;
      user-select: none;
      border: 1px solid #557278;
      border-radius: 116px;
      display: flex;
      align-items: center;
      color: $white;

      @include max-width(767px) {
        margin-top: 0;
        margin-bottom: 8px;
        margin-right: 8px;
      }

      &.pure {
        padding: 11px 17px;
      }

      ._icon {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 12px;
        top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-width: 100%;
          min-width: 100%;
          max-height: 100%;
          min-height: 100%;
        }
      }

      ._name {
        font-size: 14px;
        line-height: 15px;
        margin-left: 25px;

        @include max-width(767px) {
          font-size: 12px;
          line-height: 13px;
        }
      }

      &.active {
        color: #2a4e55;
        background-color: $white;
      }
    }
  }
}
</style>
