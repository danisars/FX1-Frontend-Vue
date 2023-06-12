<template lang="pug">
.xp-token
  .circle-1
  .circle-2
  .circle-3
  .roadmap-background
  .circle-4
  .all-other
    SocialsSection
    VideoSection
    HowToBuySection
    WhyFx1Section
    HowDoesFx1Section
    NFTfanSection
    ReferFriendSection
    RoadmapSection
    TeamSection
    PartnersSection
    WhitepaperSection
    FAQSection
</template>

<script>
export default {
  name: 'TokenAfterBanner',
  components: {
    VideoSection: () => import('~/components/molecules/Token/VideoSection.vue'),
    HowToBuySection: () =>
      import('~/components/molecules/Token/HowToBuySection.vue'),
    WhyFx1Section: () =>
      import('~/components/molecules/Token/WhyFx1Section.vue'),
    HowDoesFx1Section: () =>
      import('~/components/molecules/Token/HowDoesFx1Section.vue'),
    NFTfanSection: () =>
      import('~/components/molecules/Token/NFTfanSection.vue'),
    ReferFriendSection: () =>
      import('~/components/molecules/Token/ReferFriendSection.vue'),
    RoadmapSection: () =>
      import('~/components/molecules/Token/RoadmapSection.vue'),
    TeamSection: () => import('~/components/molecules/Token/TeamSection.vue'),
    PartnersSection: () =>
      import('~/components/molecules/Token/PartnersSection.vue'),
    WhitepaperSection: () =>
      import('~/components/molecules/Token/WhitepaperSection.vue'),
    SocialsSection: () =>
      import('~/components/molecules/Token/SocialsSection.vue'),
    FAQSection: () => import('~/components/molecules/Token/FAQSection.vue'),
  },
}
</script>

<style lang="scss" scoped>
$added-top-roadmap: 5%;
$added-top-faq: 0.6%;
$added-other-circles: 0.5%;

.xp-token::v-deep {
  background-color: $secondary-dark;
  min-height: calc(100vh - 683px);
  position: relative;

  // For Mobile
  @include max-width(500px) {
    overflow-x: hidden;
  }

  .circle-1 {
    top: -54.6%;
    position: absolute;
    background-image: url('~assets/images/Home/bg-circles.png');
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    opacity: 0.4;
    zoom: 1.3;

    // Tablet
    @include max-width(1021px) {
      zoom: 0.9;
    }

    // Mobile
    @include max-width(500px) {
      top: -55.4%;
      background-size: 150% !important;
    }
    @include max-width(361px) {
      top: -54.4%;
      background-size: 150% !important;
    }
  }

  .circle-2 {
    top: 3.9 - $added-other-circles;
    bottom: 0%;
    position: absolute;
    background-image: url('~assets/images/Token/CirclesAndLight1.png');
    background-repeat: no-repeat;
    width: 100%;
    height: auto;
    overflow: hidden;
    z-index: 1;
    opacity: 0.7;

    // @include max-width(1300px) {
    //   top: -1.4%;
    // }

    // // Tablet
    // @include max-width(1021px) {
    //   top: -2.1%;
    // }

    // // Tablet
    // @include max-width(986px) {
    //   top: -0.4%;
    //   background-size: 80% !important;
    // }

    // Tablet
    @include max-width(830px) {
      top: 0.5%;
      background-size: 80% !important;
    }

    // Mobile
    @include max-width(500px) {
      top: 3.4%;
      background-size: 100% !important;
    }
  }

  .circle-3 {
    top: 19.5%;
    left: 27%;
    position: absolute;
    background-image: url('~assets/images/Token/CirclesAndLight3.png');
    background-repeat: no-repeat;
    width: 100%;
    height: 30%;
    overflow: hidden;
    z-index: 1;
    zoom: 1.2;
    opacity: 0.7;

    @include max-width(1920px) {
      top: 23%;
      left: 29%;
    }

    @include max-width(1650px) {
      top: 23%;
      left: 25%;
    }

    @include max-width(1500px) {
      top: 22%;
      left: 23%;
    }

    @include max-width(1480px) {
      top: 21.7%;
    }

    // Tablet
    @include max-width(1021px) {
      top: 23%;
      background-size: 100% !important;
    }

    @include max-width(953px) {
      top: 23.2%;
      background-size: 100% !important;
    }

    // Mobile
    @include max-width(500px) {
      top: 25.6%;
      left: 0;
      background-size: 100% !important;
    }
    @include max-width(400px) {
      top: 25.9%;
      left: 0;
      background-size: 100% !important;
    }
  }

  .roadmap-background {
    // top: 40.4%;
    //  top: 45.2%;
    top: 52.2%;
    left: calc(50% - 1399px);
    right: calc(50% - 1399px);
    position: absolute;
    background-image: url('~assets/images/Token/Roadmap.svg');
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 2200px;
    margin: auto;
    height: 2701px;
    overflow: hidden;
    z-index: 1;

    @include max-width(1710px) {
      // top: 40.8%;
      // top: 45%;
      top: 52%;
    }

    @include max-width(1550px) {
      // top: 41.2%;
      // top: 45%;
      top: 52%;
    }

    @include max-width(1378px) {
      // top: 45.6%;
      top: 52%;
    }

    @include max-width(1368px) {
      // top: 45.5%;
      top: 52%;
    }

    @include max-width(1200px) {
      background-image: url('~assets/images/Token/Roadmap-Tablet.svg');
      background-size: 35%;
      // top: 47.2%;
      top: 52%;
      right: 20%;
    }

    @include max-width(1132px) {
      //  top: 47.6%;
      top: 52%;
    }

    @include max-width(1056px) {
      //   top: 48.0%;
      top: 52%;
    }

    @include max-width(1034px) {
      top: 48.1%;
      // top: 52%;
      left: calc(51% - 1399px);
    }

    @include max-width(1020px) {
      //  top: 44.6%;
      top: 52%;
      left: calc(51% - 1399px);
    }

    @include max-width(930px) {
      // top: 45.4%;
      top: 52%;
      left: calc(55% - 1399px);
    }

    @include max-width(914px) {
      //   top: 45.3%;
      top: 52%;
      left: calc(55% - 1399px);
    }

    @include max-width(840px) {
      //  top: 45.6%;
      top: 52%;
      left: calc(57% - 1399px);
    }

    @include max-width(808px) {
      left: calc(59% - 1399px);
    }

    @include max-width(770px) {
      left: calc(61% - 1399px);
    }

    @include max-width(734px) {
      background-image: none;
    }
  }

  .circle-4 {
    top: 89.1% + $added-top-faq;
    position: absolute;
    background-image: url('~assets/images/Token/CirclesAndLight4.png');
    background-repeat: no-repeat;
    background-size: 60%;
    width: 100%;
    height: 10%;
    background-position: center 0;
    overflow: hidden;
    z-index: 1;
    opacity: 0.7;

    @include max-width(1820px) {
      background-size: 59% + $added-top-faq;
    }

    @include max-width(1662px) {
      background-size: 64% + $added-top-faq;
    }

    @include max-width(1566px) {
      background-size: 69% + $added-top-faq;
    }

    @include max-width(1506px) {
      background-size: 73% + $added-top-faq;
    }

    @include max-width(1402px) {
      background-size: 81% + $added-top-faq;
    }

    // Mobile
    @include max-width(500px) {
      top: 89%;
      background-size: 170% !important;
    }
  }

  h2 {
    &.txt-lg {
      font-size: 5rem;
      line-height: 5.7143rem;
      letter-spacing: -2.1px;

      @include max-width(1023px) {
        font-size: 2.2857rem;
        line-height: 3.2857rem;
      }
    }
  }
}
</style>
