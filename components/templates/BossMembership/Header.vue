<template lang="pug">
.xt-default-header.row.items-center
  .container
    .row.items-center.justify-between
      XODefaultHeaderLeft
      client-only: XODefaultHeaderRight
</template>

<script>
export default {
  name: 'XTDefaultHeader',
  components: {
    XODefaultHeaderLeft: () =>
      import('./Left'),
    XODefaultHeaderRight: () =>
      import('./Right'),
  },
}
</script>

<style lang="scss" scoped>
.xt-default-header::v-deep {
  position: sticky;
  top: 0;
  min-height: 90px;
  margin-top: -90px;
  z-index: 10;
  // background-color: #2a4e55;
  background-color: transparent;

  @include max-width(1023px) {
    min-height: 70px;
  }
}
</style>
