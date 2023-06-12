<template lang="pug">
.socials-section.row
  .container.token-container
    .container.is-max-widescreen
      .row.justify-between
        XODefaultFooterGetApp
        XODefaultFooterConnect(:background="'#0C353E'", :padding="'24px 32px'")
</template>

<script>
export default {
  name: 'XTDefaultFooter',
  components: {
    XODefaultFooterGetApp: () =>
      import('~/components/organisms/Default/Footer/GetApp'),
    XODefaultFooterConnect: () =>
      import('~/components/organisms/Default/Footer/Connect'),
  },
}
</script>

<style lang="scss" scoped>
.socials-section {
  margin-top: 120px;
  position: relative;
  z-index: 99;
  .row {
    align-items: center;
    @include max-width(500px) {
      flex-direction: column;
    }
  }
}
.socials-section::v-deep {
  @include max-width(1025px) {
    .social-media {
      margin-top: 30px;
    }
  }

  @include max-width(767px) {
    .row {
      align-items: unset;
    }
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
          margin-right: unset;
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
