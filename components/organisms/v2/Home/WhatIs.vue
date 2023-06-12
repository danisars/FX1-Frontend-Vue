<template lang="pug">
.xo-home-what-is
  .container.is-max-widescreen
    h2.txt-lg Who is FX1 Sports

    .row.justify-between-custom
      .left-what-is-content.col
        .text-contents
          p FX1 believes how we consume and interact with sports online is changing forever. As live streaming continues to explode we are entering into a new era of fandom for professional sports where watching sports online should be a community driven, fun and engaging experience.

      .middle-what-is-content.col
        .text-contents
          p FX1 is a next-gen interactive and gamified sports streaming aggregator that lets you watch live sports with friends, paying for only what you watch while also earning status, cash & prizes.

      .right-what-is-content.col
        .text-contents
          p Our mission is to be the one place to watch all the live streamed sports online, anywhere, anytime. Connecting fan communities from across the world with a new emerging social experience.

</template>

<script>
export default {
  name: 'XOHomeWhatIs',
}
</script>

<style lang="scss" scoped>
.xo-home-what-is::v-deep {
  background-color: $secondary;
  padding: 100px 0 150px;

  .justify-between-custom {
    justify-content: space-between;
  }

  @include max-width(1023px) {
    padding: 80px 0;
  }

  h2 {
    margin-bottom: 25px;

    &.txt-lg {
      width: 100%;
      max-width: 640px;
      margin-bottom: 80px;

      @include max-width(1023px) {
        max-width: 370px;
        margin-bottom: 50px;
      }
    }
  }

  // global text content
  .left-what-is-content, .middle-what-is-content,
  .right-what-is-content {
    //background-color: #08252c;
    background-color: #2a4e55;
    border-radius: 10px;
    width: 375px;
    padding: 50px 45px 40px;

    @include max-width(1023px) {
      margin: 0 0 30px !important;
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
      padding: 35px 30px 25px;
    }

    .text-contents {
      p {
        font-size: 1.1429rem;
        font-weight: 300;
        line-height: 2rem;
        letter-spacing: -0.28px;
        color: rgba($white, 0.8);
      }
    }
  }

  .middle-what-is-content {
    margin: 0 20px 0px 20px;

    @include max-width(1023px) {
      margin-left: 20px !important;
      margin-right: 20px !important;
    }
  }

  // RESPONSIVE SCREEN
  @include max-width(767px) {
    .left-what-is-content,
    .middle-what-is-content,
    .right-what-is-content {
      flex: none;
      margin-left: 0px !important;
      margin-right: 0px !important;
    }
  }
}
</style>
