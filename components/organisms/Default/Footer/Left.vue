<template lang="pug">
.xo-default-footer-left.row.items-center.col
  h3.mobile.text-weight-light Feedback and club/organization inquires welcome at #[span.text-primary hello@fx1.io]
  .logo: img(src="~assets/images/logo.svg", width="96", height="40")
  h3.desktop.text-weight-light Feedback and club/organization inquires welcome at #[span.text-primary hello@fx1.io]
  .copyright &copy; FX1 {{ date }}
</template>

<script>
export default {
  name: 'XODefaultFooterLeft',
  computed: {
    date() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-default-footer-left::v-deep {
  @include max-width(1023px) {
    justify-content: space-between;
  }

  @include max-width(767px) {
    padding: 25px 0;
  }

  .logo {
    margin-right: 50px;

    @include max-width(1023px) {
      margin: 0;
    }
  }

  h3 {
    color: rgba($white, 0.7);

    &.desktop {
      @include max-width(767px) {
        display: none;
      }
    }

    &.mobile {
      display: none;
      border-bottom: 1px solid #1c3e45;
      margin: 0 -15px 25px;
      padding: 0 15px 25px;

      @include max-width(767px) {
        display: block;
      }
    }
  }

  .copyright {
    color: #839295;
    font-size: 0.8571rem;
    line-height: 1rem;
    letter-spacing: -0.1px;
    display: none;

    @include max-width(1023px) {
      display: block;
    }
  }
}
</style>
