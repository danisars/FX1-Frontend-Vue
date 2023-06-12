<template lang="pug">
.for-who-section.row
  .container.token-container
    .row
      .col
        h2.text-center Who is it for?
        .top-margin-a
        .row.content-container
          .item
            .row.items-center
              .svg-icon: img(
                src="~assets/images/Boss-Membership/problems-solving.svg"
              )
              p.token-p Anyone that cares about the problem we’re solving
          .item
            .row.items-center
              .svg-icon: img(
                src="~assets/images/Boss-Membership/exclusive-club.svg"
              )
              p.token-p Those that want to be part of an exclusive club
          .item
            .row.items-center
              .svg-icon: img(
                src="~assets/images/Boss-Membership/fans-future-drops.svg"
              )
              p.token-p Fans that want early access to future NFT drops
</template>

<script>
export default {
  name: 'ForWho',
}
</script>

<style lang="scss" scoped>
.for-who-section::v-deep {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 150px 0 0;
  z-index: 2;

  @include max-width(1025px) {
    padding: 120px 0 0;
  }

  .top-margin-a {
    margin-top: 110px;
    @include max-width(1025px) {
      margin-top: 85px;
    }
  }

  .top-margin-b {
    margin-top: 70px;
  }

  h2 {
    font-size: 60px;
    font-weight: 500;
    @include max-width(1021px) {
      font-size: 36px;
      line-height: 40px;
      font-weight: 700;
    }
    @include max-width(500px) {
      font-size: 28px;
      line-height: 31px;
      text-align: left;
    }
  }

  .content-container {
    margin-right: -30px;
    @include max-width(1025px) {
      margin-right: -25px;
      justify-content: center;
    }
    @include max-width(500px) {
      margin-right: 0;
    }
    .item {
      background: transparent;
      margin-bottom: 30px;
      margin-right: 30px;
      flex-basis: calc(100% / 3 - 30px);
      @include max-width(1025px) {
        flex-basis: calc(100% / 2 - 25px);
        margin-right: 25px;
      }
      @include max-width(500px) {
        flex-basis: 100%;
        margin-bottom: 60px;
        margin-right: 0;
      }
    }
    .svg-icon {
      max-width: 30%;
      margin-right: 10px;
      @include max-width(500px) {
        width: 80px;
        height: 80px;
      }
    }
    .token-p {
      max-width: 65%;
      font-size: 24px;
      @include max-width(500px) {
        font-size: 18px !important;
        line-height: 28px !important;
        font-weight: 300;
      }
    }
  }

  // Mobile
  @include max-width(500px) {
    padding: 0 0 50px;

    .top-margin-b {
      margin-top: 0px !important;
    }
  }
}
</style>
