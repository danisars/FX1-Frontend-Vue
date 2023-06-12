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

  //- .live-match._icon.row.items-center.justify-center: nuxt-img(src="~assets/images/Live/stream-white.svg", alt="LiveMatch")
  //-   .value
  //-     h4 Live match

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
    margin-bottom: 39px;
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

  // @include max-width(370px) {
  //   margin: auto;
  //   left: 0;
  //   right: 0;
  //   margin-top: 54px;
  //   margin-bottom: 39px;
  //   min-width: 260px;
  // }

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
        height: 51px;
        margin: 3px 15px;
        background-color: #F8F8F8;
        border-radius: 5px;
        text-align: left;

        p {
          font-size: 14px;
          margin-top: 16.5px;
          margin-left: 15px;
        }

        &.first {
          background-color: transparent !important;
          margin-bottom: 0px;

          p {
            font-size: 16px;
            margin-left: 0px !important;
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

    h4 {
      font-size: 0.93rem;
      margin-left: -33px;
      margin-top: 2px;
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

  // Game Day

  .game-day {
    .text-contents {
      border: none;
      .game-day-text {
        padding: 14px;
      }
      .live-updates {
        width: 60%;
        height: 60px;
        outline: none;
        border: none;
      }
      .highlights {
        width: 50%;
        height: 60px;
        outline: none;
      }
      .game-chat {
        width: 50%;
        height: 60px;
        outline: none;
      }
      .behind-the-scene {
        width: 50%;
        height: 60px;
        outline: none;
      }
      //&.button {
      //  width: 50%;
      //  height: 60px;
      //  outline: none;
      //  padding: 14px;
      //}
      &.button {
        box-sizing: border-box;
        width: 150%;
        height: 45px;
        border: none white;
        padding: 14px;
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

    @include max-width(768px) {
      width: 48px;
      height: 48px;

      img {
        width: 22px;
      }

      .nuxt-img {
        color: $white;
        background-color: #f85454;
      }
    }

    &.live-match {
      bottom: 100px;
      right: -15px;

      @include max-width(768px) {
        right: -5px;
      }
    }

    &.participants {
      top: 93%;
      left: 13%;

      @include max-width(767px) {
        left: -10px;
      }
    }
  }
  .participants {
    bottom: 19%;
    left: -20%;
    background-color: $white;
    width: 50px;
    height: 34px;
    border-radius: 5px;
    //padding: 10px 15px;
    position: relative;
    top: 5%;
    //z-index: 2;

    @include max-width(767px) {
      left: -10px;
    }

    ._icon {
      background-color: $white;
      margin-right: 15px;
      margin-top: 5px;

      @include max-width(767px) {
        width: 100%;
        max-width: 24px;
        margin-right: 10px;
      }
    }
  }

  .game-day {
    top: 30px;
    right: -30px;
    color: $black;
    background-color: $white;
    align-content: space-between;

    .text-contents {
      position: absolute;
      bottom: 40px;
      right: -30px;
      width: 58%;
      background-color: $white;
      height: 312px;
      left: 275px;
      top: 25px;
      padding-left: 25px;
      border-radius: 4px;

      //div {
      //  background-color: grey;
      //  color: $secondary;
      //  font-weight: 300;
      //  padding: 12px 20px;
      //  max-width: max-content;
      //  border-radius: 5px;
      //  margin-top: 10px;
      //
      //  @include max-width(767px) {
      //    font-size: 0.8571rem;
      //    line-height: 14px;
      //  }
      //}

      // switch back to using google/cloud-sdk:latest
      // more comments to commit????

      button {
        //background-color: grey;
        //color: $secondary;
        //font-weight: 300;
        //padding: 12px 20px;
        //max-width: max-content;
        //border-radius: 5px;
        //margin-top: 10px;
        box-sizing: border-box;
        width: 100%;

        @include max-width(767px) {
          font-size: 0.8571rem;
          line-height: 14px;
        }
      }
    }

    @include max-width(768px) {
      right: -15px;
    }

    @include max-width(427px) {
      right: -10px;
    }
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

    @include max-width(767px) {
      left: 0;
      width: 170px;
    }

    ._icon {
      //margin-right: 5px;
      margin-top: 1px;
      width: 40px;

      @include max-width(767px) {
        width: 100%;
        max-width: 24px;
        margin-right: 10px;
      }
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

        @include max-width(767px) {
          font-size: 0.7143rem;
          line-height: 12px;
        }
      }
    }
  }
}
</style>
