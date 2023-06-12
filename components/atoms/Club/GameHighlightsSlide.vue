<template lang="pug">
.xa-club-game-highlights-slide
  .slide-content
    .img-container: img(src="https://picsum.photos/500")
    .contents
      ._title 2020 XTERRA Magnolia Hill Trail Run

      .row.justify-between
        .place.row
          ._icon: img(src="~assets/images/Club/place.svg")
          .value 121st
        .time.row
          ._icon: img(src="~assets/images/Club/time.svg")
          .value 03:59:00
        .distance.row
          ._icon: img(src="~assets/images/Club/distance.svg")
          .value 14km
</template>

<script>
export default {
  name: 'XAClubGameHighlightsSlide',
}
</script>

<style lang="scss" scoped>
.xa-club-game-highlights-slide::v-deep {
  background-color: $white;
  border-radius: 5px;
  box-shadow: 0px 4px 30px rgba(12, 53, 62, 0.15);
  // box-shadow: 0 0.5em 1em -0.125em rgb(0 0 0 / 10%), 0 0 0 1px rgb(0 0 0 / 2%);
  padding: 15px;

  .img-container {
    width: 100%;
    height: 365px;
    border-radius: 5px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .contents {
    ._title {
      font-size: 1.1429rem;
      line-height: 1.4286rem;
      font-weight: 500;
      margin-bottom: 20px;
    }

    ._icon {
      margin-right: 5px;
      margin-top: 1px;
    }

    // .value {
    //   font-size: 0.8571rem;
    //   line-height: 1.1429rem;
    // }
  }
}
</style>
