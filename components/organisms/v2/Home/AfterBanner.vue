<template lang="pug">
.xo-home-after-banner
  .container.is-max-widescreen
    .row.justify-between
      XMHomeAfterBannerBattle
      XMHomeAfterBannerDiscover
      XMHomeAfterBannerPersonalize
      XMHomeAfterBannerEarn

    .separator
</template>

<script>
export default {
  name: 'XOHomeAfterBanner',
  components: {
    XMHomeAfterBannerBattle: () =>
      import('~/components/molecules/v2/Home/AfterBanner/Battle.vue'),
    XMHomeAfterBannerDiscover: () =>
      import('~/components/molecules/v2/Home/AfterBanner/Discover.vue'),
    XMHomeAfterBannerPersonalize: () =>
      import('~/components/molecules/v2/Home/AfterBanner/Personalize.vue'),
    XMHomeAfterBannerEarn: () =>
      import('~/components/molecules/v2/Home/AfterBanner/Earn.vue'),
  },
}
</script>

<style lang="scss" scoped>
.xo-home-after-banner::v-deep {
  position: relative;
  margin-top: -100px;
  z-index: 1;

  @include max-width(1250px) {
    margin-top: -50px;
  }

  .after-banner-content {
    background-color: #2a4e55;
    border-radius: 10px;
    min-height: 132px;
    width: calc(100% / 2 - 15px);
    padding: 20px 30px;
    margin-bottom: 30px;

    @include max-width(768px) {
      width: 100%;
    }

    ._icon {
      @include max-width(1250px) {
        width: 100%;
        margin-bottom: 10px;
      }
    }

    .text {
      padding-left: 25px;

      @include max-width(1250px) {
        padding-left: 0;
        flex: none;
        width: 100%;
      }

      h3 {
        margin-bottom: 5px;
        font-size: 1.5rem;
        letter-spacing: -0.78px;

        @include max-width(1023px) {
          font-size: 1.5714rem;
          line-height: 2.4286rem;
        }

        small {
          font-size: 1rem;
          font-weight: 300;
        }
      }

      p {
        font-size: 1.1429rem;
        line-height: 2rem;
        letter-spacing: -0.28px;
        font-weight: 300;
        color: rgba($white, 0.8);
      }
    }
  }

  .separator {
    background-color: #2a4e55;
    width: 100%;
    height: 1px;
    margin: 100px 0 0;

    @include max-width(1250px) {
      margin: 0;
    }
  }
}
</style>
