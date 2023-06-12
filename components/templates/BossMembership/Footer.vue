<template lang="pug">
.xt-default-footer
  XODefaultFooterNavigation
  XODefaultFooterCopyright
</template>

<script>
export default {
  name: 'XTDefaultFooter',
  components: {
    XODefaultFooterNavigation: () =>
      import('~/components/organisms/Default/Footer/Navigation'),
    XODefaultFooterCopyright: () =>
      import('~/components/organisms/Default/Footer/Copyright'),
  },
}
</script>

<style lang="scss" scoped>
.xt-default-footer::v-deep {
  background-color: $secondary_b;
  min-height: 130px;
  .xo-default-footer-navigation {
    border-top: 1px solid #1c3e45;
  }
}
</style>
