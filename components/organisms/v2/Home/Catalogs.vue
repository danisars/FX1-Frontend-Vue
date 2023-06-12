<template lang="pug">
.xo-home-section-catalogs
  .container.is-max-widescreen
    .content-section.claim-medal.row.items-center
      .left-content
        h2.mb-5 Real-time recommendations on what to watch
        h3.text-weight-thin Discover and easily find games that are in overtime or close in score, games that feature hot rivalries or players who are likely to produce exciting finishes.

      .right-content.col
        XMHomeCatalogsFanLeaderboard

    .content-section.explore-events.row.items-center
      .left-content
        h2.mb-5 A new way to watch sports online, socially
        h3.text-weight-thin Our custom built technology allows you to watch live sports events with friends using video, chat and audio.

      .right-content.col
        XMHomeCatalogsProudSupporter

    .content-section.be-right.row.items-center
      .left-content
        h2.mb-5 Create your own private or public groups
        h3.text-weight-thin Choose who you want to watch your game with. Invite just a handful of friends, or a wider community. You can edit group preferences, and set game reminders.

      .right-content.col
        XMHomeCatalogsDigitalFanAvatar

    .content-section.reply.row.items-center
      .left-content
        h2.mb-5 Stay connected with friends through sports
        h3.text-weight-thin Easily share the latest news, results, or game day highlights instantly with your friends. Interact and chat anytime, before, during, and after the game.

      .right-content.col
        XMHomeCatalogsStayConnected

    .content-section.celebrate.row.items-center
      .left-content
        h2.mb-5 Host live games and shows, grow your following
        h3.text-weight-thin Bring your community to FX1, stream your own shows, and host live sports games. Grow your audience, earn prizes and cash rewards.

      .right-content.col
        XMHomeCatalogsWinPrizes
</template>

<script>
export default {
  name: 'XOHomeCatalogs',
  components: {
    XMHomeCatalogsProudSupporter: () =>
      import('~/components/molecules/v2/Home/Catalogs/ProudSupporter.vue'),
    XMHomeCatalogsFanLeaderboard: () =>
      import('~/components/molecules/v2/Home/Catalogs/FanLeaderBoard.vue'),
    XMHomeCatalogsWinPrizes: () =>
      import('~/components/molecules/v2/Home/Catalogs/WinPrizes.vue'),
    XMHomeCatalogsDigitalFanAvatar: () =>
      import('~/components/molecules/v2/Home/Catalogs/DigitalFanAvatarNew.vue'),
    XMHomeCatalogsStayConnected: () =>
      import('~/components/molecules/v2/Home/Catalogs/StayConnected.vue'),
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-home-section-catalogs::v-deep {
  background-color: #08252c;
  padding: 50px 0 0;

  @include max-width(768px) {
    padding: 50px 0 0;
  }

  h2 {
    width: 100%;
    max-width: 750px;

    @include max-width(768px) {
      max-width: 400px;
    }

    small {
      font-size: 1.7143rem;
      font-weight: 300;
      line-height: 30px;
    }
  }

  h3 {
    @include max-width(768px) {
      font-size: 1.1429rem !important;
    }
  }

  // global left content and right content
  .left-content {
    max-width: 600px !important;
    @include max-width(767px) {
      max-width: 100% !important;
      padding-right: 0 !important;
      h2,
      h3 {
        max-width: 100% !important;
      }
    }
  }

  .right-content {
    @include max-width(767px) {
      text-align: center;
      margin-bottom: 30px;
    }
  }

  .content-section {
    position: relative;
    padding: 30px 50px;
    border-radius: 10px;
    margin-top: 100px;
    min-height: 450px;
    margin-bottom: 130px;

    @include max-width(1025px) {
      margin-bottom: 0px;
    }

    @include max-width(767px) {
      padding: 30px 20px;
      margin-bottom: 0px;
    }

    &::before {
      content: '';
      border-bottom: 70px solid transparent;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      width: calc(100% - 10px);
      position: absolute;
      top: -69px;
      left: 5px;

      @include max-width(767px) {
        border-bottom-width: 50px;
        border-left-width: 70px;
        border-right-width: 70px;
        top: -49px;
      }
    }

    &::after {
      content: '';
      background-image: linear-gradient(#08252c, rgba(8, 37, 44, 0));
      position: absolute;
      top: -70px;
      left: 0;
      width: 100%;
      height: 70px;

      @include max-width(767px) {
        height: 50px;
        top: -50px;
      }
    }
  }

  .explore-events {
    background-color: #886bf2;

    &::before {
      border-bottom-color: #886bf2;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }

  .claim-medal {
    background-color: $primary;

    &::before {
      border-bottom-color: $primary;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }

  .celebrate {
    background-color: #ffaf23;

    &::before {
      border-bottom-color: #ffaf23;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;
      color: #050505;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      // @include min-width(767px) {
      //   position: absolute;
      //   bottom: -7px;
      //   right: 50px;
      // }
      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }

  .be-right {
    background-color: #2a4e55;

    @include max-width(767px) {
      padding-top: 0;
    }

    &::before {
      border-bottom-color: #2a4e55;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include min-width(768px) {
        position: absolute;
        width: calc(100% - 50px);
        height: 100%;
        overflow: hidden;
      }

      @include max-width(767px) {
        flex: none;
        width: calc(100% + 40px);
        max-width: none;
        order: 1;
        overflow: hidden;
        margin: 0 -20px;
      }
    }
  }

  .reply {
    color: #1b424a !important;
    background-color: #ffffff;

    &::before {
      border-bottom-color: #ffffff;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include min-width(767px) {
        position: absolute;
        bottom: -7px;
        right: 50px;
      }

      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }
}
</style>
