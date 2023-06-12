<template lang="pug">
.token-why-fx1-section.row#whyfx1
  .container.token-container
    .row
      .col.left-side
        h1 Why FX1 Sports
        .top-margin-a
        p.token-p FX1 believes how we consume and interact with sports online is changing forever. As live streaming continues to explode we are entering into a new era of fandom for professional sports where watching sports online should be a community driven, fun and engaging experience.
        .top-margin-a
        p.token-p FX1 is a next gen interactive and gamified sports streaming aggregator that lets you watch live sports with friends, paying for only what you watch while also earning status, cash & prizes.
        .top-margin-a
        p.token-p Our mission is to be the one place to watch all the live streamed sports online, anywhere, anytime. Connecting fan communities from across the world with a new emerging social experience.
      .col.right-side
        img(
          src="~assets/images/Token/mobile-shoe.png",
          alt="Why FX1"
        )


</template>

<script>
export default {
  name: 'WhyFx1Section'
}
</script>

<style lang="scss" scoped>
.token-why-fx1-section::v-deep {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 300px 0 150px;
  z-index: 2;

  .top-margin-a {
    margin-top: 25px;
  }

  .top-margin-b {
    margin-top: 230px;
  }

  .left-side {
    padding-right: 20%;

    @include max-width(1729px) {
      padding-right: 10%;
    }
  }

  .right-side {
    position: relative;

    img {
      top: -15%;
      right: 0%;
      position: absolute;
      min-width: 750px;

      @include max-width(1880px) {
        right: -10%;
        min-width: 700px;
      }

      @include max-width(1800px) {
        right: -10%;
        min-width: 700px;
      }

      @include max-width(1750px) {
        top: -12%;
        right: -15%;
      }

      @include max-width(1729px) {
        top: -10%;
        right: -25%;
        min-width: 750px;
      }

      @include max-width(1680px) {
        top: -7%;
        right: -25%;
        min-width: 700px;
      }

      @include max-width(1533px) {
        top: -4%;
        right: -30%;
        min-width: 700px;
      }

      @include max-width(1461px) {
        top: -2%;
        right: -36%;
        min-width: 700px;
      }
    }
  }

  // Tablet
  @include max-width(1021px) {

    .right-side {
      text-align: center !important;
    }

    img {
      margin-top: 0px !important;
      top: 0px !important;
      left: 0px !important;
      right: 0px !important;
      position: relative !important;
      min-width: 100% !important;
      width: 100% !important;
    }
  }
  @include max-width(904px) {
    img {
      margin-top: 50px !important;
    }
  }

  // Mobile
  @include max-width(500px) {
    padding: 100px 0 50px;

    .right-side {
      text-align: center !important;
    }

    img {
      margin-top: 100px !important;
      top: 0px !important;
      left: 0px !important;
      right: 0px !important;
      position: relative !important;
      min-width: 80% !important;
      width: 80% !important;
    }
  }
}
</style>
