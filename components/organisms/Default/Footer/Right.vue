<template lang="pug">
.xo-default-footer-right &copy; FX1 {{ date }}
</template>

<script>
export default {
  name: 'XODefaultFooterRight',
  computed: {
    date() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-default-footer-right::v-deep {
  color: #839295;
  font-size: 0.8571rem;
  line-height: 1rem;
  letter-spacing: -0.1px;

  @include max-width(1023px) {
    display: none;
  }
}
</style>
