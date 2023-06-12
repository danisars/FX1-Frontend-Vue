<template lang="pug">
.xo-default-header-left.row.items-center
  .logo: nuxt-link.row(to="/"): img(
    src="~/assets/images/logo.svg",
    width="96",
    height="40",
    alt="FX1"
  )
  //- XMDefaultHeaderNavigation
</template>

<script>
export default {
  name: 'XODefaultHeaderLeft',
  components: {
    XMDefaultHeaderNavigation: () =>
      import('~/components/molecules/Default/Header/Navigation'),
  },
}
</script>

<style lang="scss" scoped>
.xo-default-header-left::v-deep {

  .logo {
    margin-right: 100px;

    @include max-width(1023px) {
      margin-right: 0;
    }

    a {
      img {
        @include max-width(1023px) {
          max-width: 70px;
          max-height: 30px;
        }
      }
    }
  }
}
</style>
