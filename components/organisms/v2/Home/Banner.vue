<template lang="pug">
.xo-home-banner.row
  .right-section.items-center.justify-center
    .video-container
      EmbedVideo

  .container.is-max-widescreen
    .left-section
      h1 Experience the best moments in sports online with friends, anytime
      h2.text-weight-light FX1 brings your favorite live sports games and highlights in one place so you can watch online with friends, chat with fans, and earn rewards.

      .actions
        b-button(
          type="is-primary",
          tag="router-link",
          to="/explore"
        ) Explore Sports
</template>

<script>
export default {
  name: 'XOHomeBanner',
  components: {
    EmbedVideo: () => import('~/components/molecules/Token/EmbedVideo.vue')
  },
  methods: {
    fnGoToRegisterInterest() {
      const registerInterest = document.getElementById(
        'xo-home-register-interest'
      )
      const registerInterestTop = registerInterest.offsetTop
      window.scrollTo(0, registerInterestTop)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-home-banner::v-deep {
  background-color: $secondary;
  min-height: 765px;
  position: relative;
  overflow: hidden;
  padding: 100px 0 200px;

  @include max-width(768px) {
    min-height: 700px;
    padding: 100px 0 200px;
  }

  @include max-width(767px) {
    padding: 0 0 80px;
  }

  .right-section {
    background-image: url('~assets/images/Home/bg-circles.png');
    background-repeat: no-repeat;
    background-size: 1120px;
    background-position: top -150px center;
    position: absolute;
    top: 0;
    right: -25%;
    width: 100%;
    height: 100%;
    padding-bottom: 80px;

    .video-container {
      top: 30%;
      width: 26%;
      right: 37%;
      position: absolute;
      z-index: 1 !important;
      box-shadow: 0px 25px 77px -10px rgba(255, 255, 255, 0.2);

      @include max-width(1500px) {
        top: 32%;
        width: 30%;
        right: 34%;
      }

      @include max-width(900px) {
        width: 96%;
        top: 2%;
        right: 2%;
        left: 2%;
      }

      @include max-width(768px) {
        width: 94%;
        top: 3%;
        right: 3%;
        left: 3%;
      }

      @include max-width(545px) {
        width: 92%;
        top: 4%;
        right: 4%;
        left: 4%;
      }

      @include max-width(390px) {
        width: 90%;
        top: 3%;
        right: 5%;
        left: 5%;
      }
    }

    @include max-width(1070px) {
      right: -27%;
      width: 100%;
    }

    @include max-width(900px) {
      position: unset;
      top: unset;
      right: unset;
      padding-bottom: 0;
      background-position: center;
      background-size: 950px;
      min-height: 380px;
      margin-bottom: -6%;
      background-image: none;
    }

    @include max-width(768px) {
      background-size: 1020px;
      background-position: top -167px center;
      right: -25%;
      margin-bottom: -3%;
    }

    @include max-width(645px) {
      margin-bottom: -11%;
    }

    @include max-width(550px) {
      margin-bottom: -20%;
    }

    @include max-width(500px) {
      margin-bottom: -28%;
    }

    @include max-width(450px) {
      margin-bottom: -33%;
    }

    @include max-width(427px) {
      background-size: 810px;
      margin-bottom: -37%;
    }

    @include max-width(400px) {
      margin-bottom: -43%;
    }

    @include max-width(370px) {
      margin-bottom: -52%;
    }

    @include max-width(340px) {
      margin-bottom: -58%;
    }

  }

  .left-section {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 620px;

    @include max-width(1215px) {
      max-width: 55%;
      zoom: 0.9;
    }

    @include max-width(1025px) {
      max-width: 50%;
      zoom: 1.2;
    }

    @include max-width(1000px) {
      max-width: 50%;
    }

    @include max-width(900px) {
      max-width: 100%;
      padding: 0 0 30px;
      margin-top: 12%;
    }

    @include max-width(768px) {
      max-width: 100%;
    }

    @include max-width(767px) {

      h1 {
        line-height: 2.4286rem;
      }
    }

    h1 {
      margin-bottom: 30px;
    }

    .actions {
      margin: 50px 0 25px;

      @include max-width(767px) {
        margin: 30px 0 25px;
      }



      .button {
        // width: 315px;
        width: 235px;
        height: 82px;
        text-transform: uppercase;

        @include max-width(501px) {
          margin-left: 0px !important;
          margin-top: -10% !important;
          width: 160px !important;
        }

        @include max-width(380px) {
          margin-left: 0px !important;
          margin-top: -10% !important;
        }
      }
    }

    h2 {
      font-size: 1.5714rem;
      line-height: 2.4286rem;
      letter-spacing: -0.66px;

      @include max-width(1023px) {
        font-size: 1.1429rem;
        line-height: 2rem;
      }
    }

    .launch-text {
      span {
        color: rgba($white, 0.8);
      }
    }
  }
}
</style>
