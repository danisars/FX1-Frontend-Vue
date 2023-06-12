<template lang="pug">
.benefits-section.row
  img.circles(src="~assets/images/Boss-Membership/circle-2.png", alt="circles")
  .container.token-container
    .row
      .col
        h2 What are the benefits?
        .top-margin-a
        .row.content-container
          .card
            .flex-column.items-start
              .svg-icon: img(src="~assets/images/Boss-Membership/electro.svg")
              p.token-p Your own “Game Boss” membership NFT to promote on your FX1 profile
          .card
            .flex-column.items-start
              .svg-icon: img(src="~assets/images/Boss-Membership/rupor.svg")
              p.token-p Voting rights on product release schedules, and company direction
          .card
            .flex-column.items-start
              .svg-icon: img(src="~assets/images/Boss-Membership/feedback.svg")
              p.token-p Access to early release products for testing and feedback
          .card
            .flex-column.items-start
              .svg-icon: img(src="~assets/images/Boss-Membership/rocket.svg")
              p.token-p Receive quarterly company updates, usually reserved for shareholders
          .card
            .flex-column.items-start
              .svg-icon: img(src="~assets/images/Boss-Membership/membership.svg")
              p.token-p Access to a the private membership Locker Room on FX1
          .card
            .flex-column.items-start
              .svg-icon: img(src="~assets/images/Boss-Membership/keys.svg")
              p.token-p Access to early releases on Fan Avatar NFT collections
</template>

<script>
export default {
  name: 'ForWho',
}
</script>

<style lang="scss" scoped>
.benefits-section::v-deep {
  width: 100%;
  position: relative;
  padding: 200px 0 0;
  z-index: 2;

  .circles {
    width: 100%;
    max-width: unset;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -30%);
    overflow: hidden;
    z-index: -1;

    @include max-width(1025px) {
      width: 75%;
      transform: translate(-50%, 0);
      top: unset;
      left: 5%;
      bottom: -35%;
    }
    @include max-width(500px) {
      display: none;
    }
  }

  .top-margin-a {
    margin-top: 110px;
    @include max-width(1025px) {
      margin-top: 60px;
    }
  }

  .top-margin-b {
    margin-top: 70px;
  }

  h2 {
    font-size: 60px;
    text-align: center;
    @include max-width(1025px) {
      font-size: 36px;
      line-height: 40px;
      font-weight: 600;
    }
    @include max-width(500px) {
      font-size: 28px;
      line-height: 31px;
      font-weight: 700;
      text-align: left;
    }
  }

  .content-container {
    margin-right: -30px;
    @include max-width(1025px) {
      margin-right: -20px;
    }
    @include max-width(500px) {
      margin-right: 0;
    }
    .card {
      background-color: $secondary;
      border-radius: 20px;
      margin-bottom: 30px;
      padding: 20px;
      flex-basis: calc(100% / 3 - 30px);
      margin-right: 30px;

      @include max-width(1025px) {
        flex-basis: calc(100% / 2 - 20px);
        margin-right: 20px;
      }

      @include max-width(500px) {
        flex-basis: 100%;
        margin-right: 0;
      }
    }

    .token-p {
      margin-top: 10px;
      font-size: 23px !important;
      line-height: 32px !important;
    }
  }

  // Mobile
  @include max-width(500px) {
    padding: 100px 0;

    .top-margin-b {
      margin-top: 0px !important;
    }
  }
}
</style>
