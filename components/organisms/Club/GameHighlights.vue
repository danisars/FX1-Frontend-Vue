<template lang="pug">
.xo-club-game-highlights
  .header-highlights.row.justify-between
    h2._title NFT game day highlights
    .actions.row.items-center
      ._label Explore all
      .slider-navigation.row.items-center
        .btn-prev.row.items-center(@click.prevent="fnPrevSlide()"): img(
          src="~assets/images/Club/slider-navigation-left.svg"
        )
        .btn-next.row.items-center.justify-center(
          @click.prevent="fnNextSlide()"
        ): img(
          src="~assets/images/Club/slider-navigation-right.svg"
        )

  XMClubGameHighlightsSlider
</template>

<script>
export default {
  name: 'XOClubGameHighlights',
  components: {
    XMClubGameHighlightsSlider: () =>
      import('~/components/molecules/Club/GameHighlightsSlider'),
  },
  methods: {
    fnPrevSlide() {
      this.$root.$emit('evtRtPrevSlide')
    },
    fnNextSlide() {
      this.$root.$emit('evtRtNextSlide')
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-club-game-highlights::v-deep {
  margin-bottom: 30px;
  padding: 50px 50px 0;
  background-color: $white;
  border-radius: 10px;

  .header-highlights {
    color: $secondary;
  }

  .actions {
    font-size: 1.1429rem;
    line-height: 1.4286rem;

    .slider-navigation {
      margin-left: 30px;

      .btn-prev,
      .btn-next {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
      }

      .btn-next {
        background-color: $secondary;
        color: $white;
      }
    }
  }
}
</style>
