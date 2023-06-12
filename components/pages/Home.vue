<template lang="pug">
.xp-home
  XOHomeBanner
  XOHomeAfterBanner
  XOHomeCatalogs
  XOHomeClubs
  XOHomeSports
  XOHomeWhatIs
  XOHomeWaitingFor
</template>

<script>
export default {
  name: 'XPHome',
  components: {
    XOHomeBanner: () => import('~/components/organisms/v2/Home/Banner.vue'),
    XOHomeAfterBanner: () =>
      import('~/components/organisms/v2/Home/AfterBanner.vue'),
    XOHomeCatalogs: () => import('~/components/organisms/v2/Home/Catalogs.vue'),
    XOHomeClubs: () => import('~/components/organisms/Home/Clubs.vue'),
    XOHomeSports: () => import('~/components/organisms/Home/Sports.vue'),
    XOHomeWhatIs: () => import('~/components/organisms/v2/Home/WhatIs.vue'),
    XOHomeWaitingFor: () =>
      import('~/components/organisms/v2/Home/WaitingFor.vue'),
    XOHomeWhatIs: () =>
      import('~/components/organisms/v2/Home/WhatIs.vue'),
  },
}
</script>

<style lang="scss" scoped>
.xp-home::v-deep {
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
