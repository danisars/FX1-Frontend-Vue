<template lang="pug">
.boss-membership
  .all-other
    BossMembershipGameBoss
    BossMembershipBenefits
    BossMembershipForWho
    BossMembershipShouldCare
    BossMembershipApplyNow
</template>

<script>
export default {
  name: 'BossMembership',
  components: {
    BossMembershipGameBoss: () =>
      import('~/components/molecules/BossMembership/GameBoss.vue'),
    BossMembershipBenefits: () =>
      import('~/components/molecules/BossMembership/Benefits.vue'),
    BossMembershipForWho: () =>
      import('~/components/molecules/BossMembership/ForWho.vue'),
    BossMembershipApplyNow: () =>
      import('~/components/molecules/BossMembership/ApplyNow.vue'),
    BossMembershipShouldCare: () =>
      import('~/components/molecules/BossMembership/ShouldCare.vue'),
    TokenBanner: () => import('~/components/molecules/Token/Banner.vue'),
  },
}
</script>

<style lang="scss" scoped>
$added-top-roadmap: 5%;
$added-top-faq: 0.6%;
$added-other-circles: 0.5%;
.boss-membership {
  overflow: hidden;
}
.boss-membership::v-deep {
  background-color: #08252c;
  min-height: calc(100vh - 683px);

  // For Mobile
  @include max-width(500px) {
    overflow-x: hidden;
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
