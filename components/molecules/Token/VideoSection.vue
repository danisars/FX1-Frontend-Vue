<template lang="pug">
.token-video-section.row
  .container.token-container
      .content-middle.video-body.text-center
        EmbedVideo

      .top-margin-b

      .tokenonmics-red-box.row
        .tokenonmics-text.text-center
          h2
            b Tokenomics
        .same-width.maxsupply-text.text-center
          h2 250M
          p.token-p.light-text Max Supply
        .same-width.selltax-text.text-center
          h2 6%
          p.token-p.light-text Sell Tax
        .same-width.buytax-text.text-center
          h2 6%
          p.token-p.light-text Buy Tax
        .same-width.maxtransaction-text.text-center
          h2 0.5%
          p.token-p.light-text Max Transaction<br/>Anti-whale
        .same-width.maxwhale-text.text-center
          h2 1%
          p.token-p.light-text Max Wallet<br/>Anti-Whale

      .top-margin-b

      .logo-section.row
        .logo-left.col.text-left
          img(
            src="~assets/images/Token/proof-verification.png",
            alt="Register your club"
          )
          .top-margin-c
        .logo-right.col.text-right
          img(
            src="~assets/images/Token/verified-badge-stacked.png",
            alt="Register your club"
          )


</template>

<script>
export default {
  name: 'VideoSection',
  components: {
    EmbedVideo: () => import('~/components/molecules/Token/EmbedVideo.vue')
  },
}
</script>

<style lang="scss" scoped>
.token-video-section::v-deep {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 135px 0 200px;
  z-index: 2;

  .top-margin-a {
    margin-top: 150px;
  }

  .top-margin-b {
    margin-top: 230px;
  }

  .top-margin-c {
    margin-top: 0px;
  }

  .tokenonmics-red-box {
    width: 100%;
    // height: 184px;
    padding: 45px 0px; // Using for the height
    background: linear-gradient(268.82deg, #F85454 56.01%, rgba(248, 84, 84, 0) 122.21%);
    border-radius: 10px;

    .same-width {
      width: 14%;
    }

    .light-text {
      margin-top: 10px;
      letter-spacing: 0.5px;
    }

    .tokenonmics-text {
      width: 30%;
    }
  }

  .logo-section {
    img {
      width: 85%;
    }
  }

  .content-middle {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: auto;
    box-shadow: 0px 25px 77px -10px rgba(255, 255, 255, 0.2);
  }


  // Mobile
  @include max-width(500px) {
    padding: 100px 0 100px;

    .top-margin-a,
    .top-margin-b {
      margin-top: 80px;
    }

    .top-margin-c {
      margin-top: 20px;
    }

    .tokenonmics-red-box {
      display: block !important;
      text-align: center !important;
    }

    .same-width {
      width: 100% !important;
      margin-top: 20px;
    }

    .light-text {
      margin-top: 0px !important;
      letter-spacing: 0.5px;
    }

    .tokenonmics-text {
      width: 100% !important;
    }

    .logo-left,
    .logo-right,
    .text-right,
    .text-left {
      width: 100% !important;
      flex: none !important;
      text-align: center !important;
      margin-bottom: 20px;
    }

    .logo-left {
      padding: 0px 5px;
    }

    .logo-section {
      img {
        width: 90%;
      }
    }
  }
}
</style>
