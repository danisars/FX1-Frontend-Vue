<template lang="pug">
.xo-default-footer-get-app
  h3 Get App
  p We worked hard building our app to ensure you'll love using it

  .app-logo.row
    a.app-store(
      href="https://apps.apple.com/us/app/fx1/id1626034650",
      target="_blank"
    ): img(
      src="~assets/images/Default/app-store-group.svg",
      alt="App Store"
    )
    a.playstore(
      href="https://play.google.com/store/apps/details?id=io.fx1.sports",
      target="_blank"
    ): img(
      src="~assets/images/Default/google-play-group.svg",
      alt="Playstore"
    )
</template>

<script>
export default {
  name: 'XODefaultFooterGetApp',
}
</script>

<style lang="scss" scoped>
.xo-default-footer-get-app::v-deep {
  border-radius: 10px;
  width: calc(55% - 15px);

  @include max-width(1025px) {
    p {
      max-width: 80%;
    }
  }

  @include max-width(769px) {
    width: 100%;
    margin-bottom: 30px;
  }

  h3 {
    font-weight: 400;
    font-size: 44px;
    line-height: 49px;
    letter-spacing: 0.32px;
    margin-bottom: 12px;
  }

  p {
    font-weight: 100;
    font-size: 18px;
    line-height: 32px;
    color: $white;
  }

  .app-logo {
    margin-top: 20px;

    .app-store {
      margin-right: 15px;

      img {
        @include max-width(767px) {
          max-width: 150px;
        }
      }
    }

    .playstore {
      img {
        @include max-width(767px) {
          max-width: 150px;
        }
      }
    }
  }
}
</style>
