<template lang="pug">
.xo-home-after-banner
  .container.is-max-widescreen
    .row.justify-between
      XMHomeChatWith
      XMHomeLevelUp
      XMHomeBeKnow
      XMHomeSupportYourTeam

    .separator
</template>

<script>
export default {
  name: 'XOHomeAfterBanner',
  components: {
    XMHomeChatWith: () => import('~/components/molecules/Home/ChatWith'),
    XMHomeLevelUp: () => import('~/components/molecules/Home/LevelUp'),
    XMHomeBeKnow: () => import('~/components/molecules/Home/BeKnow'),
    XMHomeSupportYourTeam: () =>
      import('~/components/molecules/Home/SupportYourTeam'),
  },
}
</script>

<style lang="scss" scoped>
.xo-home-after-banner::v-deep {
  position: relative;
  margin-top: -100px;
  z-index: 1;

  @include max-width(767px) {
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
      @include max-width(767px) {
        width: 100%;
        margin-bottom: 30px;
      }
    }

    .text {
      padding-left: 25px;

      @include max-width(767px) {
        padding-left: 0;
        flex: none;
        width: 100%;
      }

      h3 {
        margin-bottom: 5px;

        @include max-width(1023px) {
          font-size: 1.5714rem;
          line-height: 2.4286rem;
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

    @include max-width(767px) {
      margin: 0;
    }
  }
}
</style>
