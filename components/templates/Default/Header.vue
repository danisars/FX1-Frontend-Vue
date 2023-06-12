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
      import('~/components/organisms/Default/Header/Left'),
    XODefaultHeaderRight: () =>
      import('~/components/organisms/Default/Header/Right'),
  },
}
</script>

<style lang="scss" scoped>
.xt-default-header::v-deep {
  position: sticky;
  top: 0;
  min-height: 90px;
  z-index: 10;
  background-color: #2a4e55;

  @include max-width(1023px) {
    min-height: 70px;
  }
}
</style>
