<template lang="pug">
.xt-default-footer
  .get-app-connect-container(v-if="$route.path != '/error'")
    .container.is-max-widescreen
      .row.justify-between
        XODefaultFooterGetApp
        XODefaultFooterConnect

  XODefaultFooterNavigation
  XODefaultFooterCopyright
</template>

<script>
export default {
  name: 'XTDefaultFooter',
  components: {
    XODefaultFooterGetApp: () =>
      import('~/components/organisms/Default/Footer/GetApp'),
    XODefaultFooterConnect: () =>
      import('~/components/organisms/Default/Footer/Connect'),
    XODefaultFooterNavigation: () =>
      import('~/components/organisms/Default/Footer/Navigation'),
    XODefaultFooterCopyright: () =>
      import('~/components/organisms/Default/Footer/Copyright'),
  },
}
</script>

<style lang="scss" scoped>
.xt-default-footer::v-deep {
  background-color: $secondary;
  min-height: 130px;

  .get-app-connect-container {
    padding: 70px 0 50px;
    border-bottom: 1px solid #1c3e45;
  }
}
.row::v-deep {
  @include max-width(1025px) {
    .social-media {
      margin-top: 30px;
    }
  }
  @include max-width(769px) {
    align-items: unset;
    .xo-default-footer-get-app,
    .xo-default-footer-connect {
      width: calc(50% - 15px) !important;
      h3 {
        font-weight: 700;
        font-size: 28px;
        line-height: 31px;
      }
    }
    .xo-default-footer-get-app {
      padding: 24px 0 0;
      margin-bottom: 0;
      .app-logo {
        flex-direction: column;
        margin-top: 40px;
        a {
          img {
            max-width: 200px;
            margin-bottom: 20px;
          }
        }
      }
    }
    .xo-default-footer-connect {
      padding: 24px 16px 0 !important;
      .social-medias {
        justify-content: space-between;
        .social-media {
          flex-basis: calc(100% / 2);
          margin-right: unset !important;
        }
      }
    }
  }
  @include max-width(500px) {
    margin-top: 60px;
    .xo-default-footer-get-app,
    .xo-default-footer-connect {
      width: 100% !important;

      h3 {
        font-size: 20px;
        line-height: 22px;
      }
      p {
        max-width: 80%;
        font-size: 16px;
        line-height: 28px;
      }
    }
    .xo-default-footer-connect {
      padding: 24px 16px !important;
      margin-top: 60px;
      .social-medias {
        margin-top: 20px;
        .social-media {
          flex-basis: calc(100% / 1);
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
