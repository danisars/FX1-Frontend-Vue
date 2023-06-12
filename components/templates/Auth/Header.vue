<template lang="pug">
.xt-auth-header
  .row.items-center
    XOAuthHeaderLeft
</template>

<script>
export default {
  name: 'XTAuthHeader',
  components: {
    XOAuthHeaderLeft: () => import('~/components/organisms/Auth/Header/Left'),
  },
}
</script>

<style lang="scss" scoped>
.xt-auth-header::v-deep {
  background-color: $white;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 30px;
  min-height: 60px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 10;
  display: none;

  @include max-width(1023px) {
    display: flex;
  }
}
</style>
