<template lang="pug">
.xp-token
  TokenBanner
  TokenAfterBanner
  //- XOTokenSecondSection
  //- XOHomeClubs
  //- XOHomeSports
  //- XOHomeWaitingFor
</template>

<script>
export default {
  name: 'XPToken',
  components: {
    TokenBanner: () => import('~/components/molecules/Token/Banner.vue'),
    TokenAfterBanner: () => import('~/components/molecules/Token/AfterBanner.vue'),
    XOHomeClubs: () => import('~/components/organisms/Home/Clubs.vue'),
    XOHomeSports: () => import('~/components/organisms/Home/Sports.vue'),
    XOHomeWaitingFor: () =>
      import('~/components/organisms/v2/Home/WaitingFor.vue'),
  },
}
</script>

<style lang="scss" scoped>
.xp-token::v-deep {
  background-color: #08252c;
  min-height: calc(100vh - 683px);

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
