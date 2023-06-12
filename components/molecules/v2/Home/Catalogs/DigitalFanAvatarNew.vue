<template lang="pug">
.xm-home-catalogs-digital-fan-avatar
  .main-img: nuxt-img(
    src="/v2/Home/winner.png",
    format="webp"
  )
  .participants._icon.row.items-center.justify-center: nuxt-img(
    src="/v2/Home/fire.svg",
    alt="Fire"
  )

  .live-matchss.row.items-center.justify-center
    ._iconss.col: nuxt-img(src="~assets/images/Live/stream-white.svg", width="30", height="30")
    .valuess.col
      h4 Live match

  .game-day
    .text-contents.flex-column.items-start
      .small-tags.first
        p Game Day
      .small-tags
        p # live updates
      .small-tags
        p # highlights
      .small-tags
        p # game chat
      .small-tags.last
        p # behind the scene
</template>

<script>
export default {
  name: 'XMHomeCatalogsDigitalFanAvatar',
}
</script>

<style lang="scss" scoped>
.xm-home-catalogs-digital-fan-avatar::v-deep {
  zoom: 1;
  background-repeat: no-repeat;
  background-position: top -180px right 0;
  background-size: 890px;
  width: 30%;
  height: auto;
  text-align: center;
  position: relative;
  left: 50%;
  top: 15%;

  @include max-width(1250px) {
    zoom: 0.8;
  
    .main-img {
      img {
        width: 90%;
      }
    }
  }

  @include max-width(767px) {
    margin: auto;
    left: -30px;
    right: 0;
    margin-top: 54px;
    margin-bottom: 76px;
    min-width: 350px;

    .main-img {
      img {
        width: 100%;
      }
    }
  }

  @include max-width(500px) {
    min-width: 270px;
  }

  @include max-width(380px) {
    min-width: 240px;
  }

  @include max-width(350px) {
    min-width: 210px;
  }

  .main-img {
    width: 120%;
    img {
      width: 100%;
      margin-right: 0%;
    }
  }

  img {
    margin-right: -9%;
    position: relative;
    border-radius: 5%;
  }

  // Game Day

  .game-day {
    .text-contents {
      border: none;
      color: $secondary;
      
      .small-tags {
        width: 164px;
        margin: 3px 15px;
        background-color: #F8F8F8;
        border-radius: 5px;
        text-align: left;

        p {
          font-size: 14px;
          margin: 18px 0px 14px 15px;
          line-height: 1.2;
        }

        &.first {
          background-color: transparent !important;
          margin-bottom: 0px;

          p {
            font-size: 16px;
            margin-left: 0px !important;
            margin-bottom: 8px !important;
          }
        }

        &.last {
          margin-bottom: 15px !important;
        }
      }
    }
  }

  ._iconss {
    background-color: #f85454;
    height: 34px;
    border-radius: 18px;

    img {
      margin-top: 1px;
      margin-right: 3%;
      position: relative;
      border-radius: 5%;
    }
  }

  .valuess {
    color: $white;
    width: 65px;
    margin-left: 23px;

    @include max-width(500px) {
      margin-top: 3px;
      height: 31px;
      width: 85px;
    }

    h4 {
      font-size: 0.93rem;
      margin-left: -33px;
      margin-top: 2px;

      @include max-width(500px) {
        margin-left: -42px;
      }
    }
  }

  ._icon {
    color: $white;
    background-color: #f85454;
    width: 64px;
    height: 64px;
    border-radius: 5px;
    position: absolute;
    z-index: 1;

    &.live-match {
      bottom: 100px;
      right: -15px;
    }
  }
  .participants {
    width: 48px;
    height: 48px;
    background-color: $white;
    border-radius: 5px;
    top: 87%;
    left: 8%;
    position: absolute;

    img {
      margin-right: 0px !important;;
    }

    ._icon {
      background-color: $white;
      margin-right: 15px;
      margin-top: 5px;
    }
  }

  .game-day {
    zoom: 0.95;
    color: $black;
    background-color: $white;
    align-content: space-between;

    .text-contents {
      position: absolute;
      background-color: $white;
      left: 315px;
      top: 52px;
      border-radius: 4px;

      @include max-width(1250px) {
        top: 95px;
        left: 384px;
      }

      @include max-width(1215px) {
        top: 42px;
        left: 324px;
      }

      @include max-width(960px) {
        zoom: 0.9;
        top: 96px;
        left: 338px;
      }

      @include max-width(860px) {
        zoom: 0.8;
      }

      @include max-width(767px) {
        zoom: 0.9;
      }

      @include max-width(500px) {
        zoom: 0.7;
        left: 375px;
      }

      @include max-width(380px) {
        zoom: 0.6;
        left: 375px;
      }

      @include max-width(350px) {
        zoom: 0.55;
        left: 375px;
      }
    }
  }

  .live-matchss {
    background-color: #f85454;
    height: 34px;
    border-radius: 18px;
    position: absolute;
    top: 5%;
    left: -12%;
  }

  .live-match {
    //background-color: #f85454;
    width: 120px;
    height: 34px;
    border-radius: 18px;
    //padding: 10px 15px;
    position: absolute;

    top: 5%;
    left: -20%;
    //z-index: 2;

    ._icon {
      //margin-right: 5px;
      margin-top: 1px;
      width: 40px;
    }

    .value {
      color: $white;
      width: 65px;
      margin-bottom: 3px;
      //text-align: left;

      p, h4 {
        //font-size: 0.8571rem;
        font-size: 0.93rem;
        line-height: 14px;
      }
    }
  }
}
</style>