<template lang="pug">
.xm-home-catalogs-win-prizes
  .fight: nuxt-img(src="/v2/Home/host-live-fight.jpg", format="webp")

  .stage: nuxt-img(src="/v2/Home/host-live-stage.jpg", format="webp")

  .winner.row: nuxt-img(src="/v2/Home/host-live-winner.jpg", format="webp")

  .microphone._icon.row.items-center.justify-center: nuxt-img(
    src="/v2/Home/microphone.svg",
    width="26",
    height="22"
  )

  .battle._icon.row.items-center.justify-center: nuxt-img(
    src="~assets/images/Live/stream.svg",
    width="22",
    height="22"
  )

  .online-text.row.items-center
    .row: nuxt-img(src="/v2/Home/participants-vector.svg", width="32", height="32")
    .value-b.col
      h4 1.4k online

  .level-up.row.items-center
    ._icon.row: nuxt-img(src="/v2/Home/medal.svg", width="32", height="32")
    .value.col
      h4 Level up!
      p Your rank is upgraded
  .level-up-rank.row

  //.text-contents.flex-column.items-end
  //  div # New competitor
  //  div # Winner
</template>

<script>
export default {
  name: 'XMHomeCatalogsWinPrizes',
}
</script>

<style lang="scss" scoped>
.xm-home-catalogs-win-prizes::v-deep {
  position: relative;
  right: 40px;
  bottom: 150px;

  @include max-width(1000px) {
    zoom: 0.9;
  }

  @include max-width(500px) {
    zoom: 0.8;
  }

  @include max-width(400px) {
    zoom: 0.7;
  }

  @include max-width(350px) {
    zoom: 0.65;
  }

  @include max-width(767px) {
    right: 0;
    width: 100%;
    max-width: 400px;
    margin: 0 auto 30px;
    height: 370px;
    bottom: -59px;
  }

  .img {
    height: auto;
    max-width: 100%;
    border-radius: 6%
  }

  .fight {
    position: absolute;
    z-index: 0;
    top: 55px;
    left: 5%;

    img {
      border-radius: 12px !important;
    }

    
  }

  .stage {
    position: absolute;
    z-index: 1;
    top: -30px;
    left: 30%;

    img {
      border-radius: 12px !important;
    }
  }

  .winner {
    position: absolute;
    z-index: 2;
    top: 90px;
    left: 42%;
    overflow: hidden;
    border-radius: 50%;
  }

  ._icon {
    width: 48px;
    height: 48px;
    border-radius: 5px;
    background-color: $white;
    position: absolute;
    z-index: 4;

    &.microphone {
      top: 25px;
      left: 40px;
      border-radius: 10%;
    }

    &.battle {
      top: 80px;
      left: 300px;
      border-radius: 10%;
    }
  }

  .online-text {
    background-color: #886BF2 !important;
    border-radius: 5px;
    padding: 7px 11px;
    position: absolute;
    top: 201px !important;
    border-radius: 12px;
    z-index: 2;
    left: 36px;

    img {
      width: 24px;
    }

    ._icon {
      margin-right: 15px;
      margin-top: 5px;
    }

    .value-b {
      color: $secondary;
      text-align: start;
      margin-left: 10px;
      color: white;
    }
  }

  .level-up {
    background-color: $white;
    width: 210px;
    border-radius: 5px;
    padding: 10px 15px;
    position: absolute;
    top: 250px;
    z-index: 2;
    left: 64px;

    ._icon {
      margin-right: 15px;
    }

    .value {
      color: $secondary;
      text-align: left !important;
      margin-left: 50px;

      p {
        font-size: 0.8571rem;
        line-height: 14px;
        text-align: end;
        margin-right: 5px;
      }
    }
  }


  .text-contents {
    position: absolute;
    bottom: 40px;
    right: -30px;
    width: 100%;

    div {
      background-color: $white;
      color: $secondary;
      font-weight: 300;
      padding: 12px 20px;
      max-width: max-content;
      border-radius: 5px;
      margin-top: 10px;
    }
  }
}
</style>
