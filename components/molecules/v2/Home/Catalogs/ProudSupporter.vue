<template lang="pug">
.xm-home-catalogs-proud-supporter
  .img-container

    .discover-basketball
      nuxt-img(src="/v2/Home/discover.jpg", format="webp")

    .participants.row.items-center.justify-center
      nuxt-img(src="/Home/participants.svg", width="30", height="30")

    .chat._icon.row.items-center.justify-center: img(
      src="~assets/images/Home/chat.svg",
      alt="Chat"
    )
    .play._icon.row.items-center.justify-center: img(
        src="~assets/images/v2/Home/play.svg",
        alt="Play"
    )
    .microphone._icon.row.items-center.justify-center: img(
        src="~assets/images/v2/Home/microphone.svg",
        alt="Microphone"
    )

  .live-match.row.items-center.justify-center
    ._icon: nuxt-img(src="~assets/images/Live/stream-white.svg", width="30", height="30")
    .value
      h4 Live match

</template>

<script>
export default {
  name: 'XMHomeCatalogsProudSupporter',
}
</script>

<style lang="scss" scoped>
.xm-home-catalogs-proud-supporter::v-deep {
  position: relative;

  @include max-width(767px) {
    width: 100%;
    max-width: 300px;
    margin: 0px auto 30px;
    bottom: 90px;
  }

  @include max-width(500px) {
    zoom: 0.8;
  }

  @include max-width(350px) {
    zoom: 0.6;
  }

  .discover-basketball {
    width: 100%;
    max-width: 379px;

    img {
      border-radius: 12px;
    }

    @include max-width(767px) {
      width: 300px;
      height: 173px;
      margin-top: 100px;
    }

    @include max-width(500px) {
      width: 100%;
      left: 0;
      img {
        width: 85%;
      }
    }
  }

  .live-match {
    zoom: 1;
  }

  @include max-width(767px) {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .img-container {
    position: relative;

    .discover {
      width: 100%;
      max-width: 373px;
      height: 462px;
      border-radius: 100px 10px;

      @include max-width(810px) {
        height: 375px;
      }

      @include max-width(767px) {
        height: 435px;
      }

      img {
        border-radius: 100px 10px;
        width: 100%;
        height: 100%;
        object-fit: cover;

        @include max-width(500px) {
          width: 90% !important;
        }
      }
    }

    @include max-width(1000px) {
      width: 100%;
      max-width: 350px;
    }

    @include max-width(767px) {
      max-width: 350px;
      text-align: center;
    }

    @include max-width(500px) {
      max-width: auto;
      width: auto;
    }


    ._icon {
      background-color: $white;
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
      }

      &.chat {
        top: -5%;
        right: -7%;

        @include max-width(1000px) {
          right: -13%;
        }

        @include max-width(767px) {
            left: 88%;
            top: 32%;
        }

        @include max-width(427px) {
          right: -10px;
        }
      }

      &.play {
        width: 48px;
        height: 48px;
        top: 70%;
        right: 5%;

        @include max-width(1000px) {
          right: -7%;
        }

        @include max-width(767px) {
          left: 78%;
          top: 92%;
        }

        @include max-width(500px) {
          left: 83%;
        }
      }

      &.microphone {
        top: 37%;
        left: -9%;
        width: 48px;
        height: 48px;

        @include max-width(767px) {
          left: -7%;
          top: 66%;
        }

        @include max-width(500px) {
          left: 0%;
        }
      }
    }
  }

  .participants {
    background-color: $white;
    width: 64px;
    height: 64px;
    border-radius: 5px;
    position: absolute;
    top: 84%;
    right: 76%;
    z-index: 1;

    @include max-width(767px) {
      left: 13%;
      top: 105%;
    }
  }

  .live-match {
    background-color: #f85454;
    width: 120px;
    height: 34px;
    border-radius: 18px;
    position: absolute;

    top: 5%;
    left: -12%;
    //z-index: 2;

    @include max-width(767px) {
      left: 0;
      width: auto;
      padding: 0px 5px;
      height: 26px;
      top: 39%;
    }

    ._icon {
      //margin-right: 5px;
      margin-top: 1px;
      width: 40px;

      @include max-width(767px) {
        width: 100%;
        max-width: 24px;
        margin-right: 7px;
      }
    }

    .value {
      color: $white;
      width: 65px;
      margin-bottom: 2px;
      //text-align: left;

      @include max-width(767px) {
        width: auto;
        padding-right: 5px;
      }

      p, h4 {
        //font-size: 0.8571rem;
        font-size: 0.93rem;
        line-height: 14px;

        @include max-width(767px) {
          line-height: 12px;
        }
      }
    }
  }

  //.discover-basketball {
  //  @include max-width(809px) {
  //    display: flex;
  //    flex-wrap: wrap;
  //  }
  //
  //  @include max-width(767px) {
  //    width: 100%;
  //    max-width: 80%;
  //  }
  //}
}
</style>
