<template lang="pug">
.xo-home-banner.row
  .right-section.row.items-center.justify-center
    .img-container
      img(
        src="~assets/images/Home/img-banner.png",
        width="392",
        height="474",
        alt="Show the world who you support"
      )
      .chat._icon.row.items-center.justify-center: img(
        src="~assets/images/Home/chat.svg",
        width="32",
        height="32",
        alt="Chat"
      )
      .trophy._icon.row.items-center.justify-center: img(
        src="~assets/images/Home/trophy.svg",
        width="32",
        height="32",
        alt="Trophy"
      )
      .participants._icon.row.items-center.justify-center: img(
        src="~assets/images/Home/participants.svg",
        width="32",
        height="26",
        alt="Participants"
      )

  .container.is-max-widescreen
    .left-section
      h1 Show the world who you support
      h2.text-weight-light Finally, a place dedicated to allowing you to support your favorite sporting organization, club, or league like never before

      .actions
        b-button(
          type="is-primary",
          tag="router-link",
          to="/locker-room/explore"
        ) Find My Club
        //- b-button(
        //-   type="is-primary",
        //-   @click.prevent="fnGoToRegisterInterest()"
        //- ) REGISTER FOR EARLY ACCESS

      //- .launch-text Register interest now #[span.text-weight-light for our July 2022 platform launch]
</template>

<script>
export default {
  name: 'XOHomeBanner',
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
    background-position: top -225px center;
    position: absolute;
    top: 0;
    right: -25%;
    width: 100%;
    height: 100%;
    z-index: 0;
    padding-bottom: 80px;

    @include min-width(1440px) {
      right: -20%;
    }

    @include max-width(1000px) {
      right: -20%;
    }

    @include max-width(768px) {
      background-size: 1020px;
      background-position: top -167px center;
      right: -25%;
    }

    @include max-width(767px) {
      position: unset;
      top: unset;
      right: unset;
      padding-bottom: 0;
      background-position: center;
      background-size: 950px;
      min-height: 550px;
    }

    @include max-width(427px) {
      background-size: 810px;
    }

    .img-container {
      position: relative;

      @include max-width(1000px) {
        width: 100%;
        max-width: 350px;
      }

      @include max-width(768px) {
        max-width: 300px;
      }

      @include max-width(767px) {
        max-width: 350px;
        margin: 0 auto;
        text-align: center;
      }

      @include max-width(427px) {
        max-width: 90%;
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
          top: 30px;
          right: -30px;

          @include max-width(768px) {
            right: -15px;
          }

          @include max-width(427px) {
            right: -10px;
          }
        }

        &.trophy {
          bottom: 100px;
          right: -15px;

          @include max-width(768px) {
            right: -5px;
          }
        }

        &.participants {
          bottom: 40px;
          left: -20px;

          @include max-width(768px) {
            left: -10px;
          }
        }
      }
    }
  }

  .left-section {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 620px;

    @include max-width(1215px) {
      max-width: 55%;
    }

    @include max-width(1000px) {
      max-width: 50%;
    }

    @include max-width(900px) {
      max-width: 45%;
    }

    @include max-width(768px) {
      max-width: 50%;
    }

    @include max-width(767px) {
      max-width: 100%;
      padding: 30px 0;
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
