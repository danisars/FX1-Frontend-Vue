<template lang="pug">
.xm-signup-right-content(:class="$route.name")
  .contents.flex-column.justify-between
    nuxt-link.logo(to="/"): img(
      src="~assets/images/logo.svg",
      width="96",
      height="40"
    )

    .description.row.justify-between
      .item.row.items-center
        ._icon: img(src="~assets/images/Auth/support.svg")
        .text.col Show the world who you support

      .item.row.items-center
        ._icon: img(src="~assets/images/Auth/game-day.svg")
        .text.col Be there with your team on Game Day

      .item.row.items-center
        ._icon: img(src="~assets/images/Auth/leaderboard.svg")
        .text.col Level-up your rank in the fan leaderboard

      .item.row.items-center
        ._icon: img(src="~assets/images/Auth/access.svg")
        .text.col Access news, injury lists, player reports, and more
</template>

<script>
export default {
  name: 'XMSignUpRightContent',
}
</script>

<style lang="scss" scoped>
.xm-signup-right-content::v-deep {
  background-image: url('~assets/images/Auth/bg-right-content.svg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  padding: 50px;

  @include max-width(1023px) {
    background-position: center;
    padding: 50px 50px 35px;
    min-height: 345px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  @include max-width(767px) {
    padding: 30px 30px 15px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  &::before {
    top: 0;
    background-image: linear-gradient(rgba($secondary, 1), rgba($secondary, 0));
    height: 300px;

    @include max-width(1023px) {
      content: none;
    }
  }

  &::after {
    bottom: 0;
    background-image: linear-gradient(
      rgba($secondary, 0) 20%,
      rgba($secondary, 1) 60%
    );
    height: 500px;

    @include max-width(1023px) {
      background-image: linear-gradient(
          0deg,
          rgba(12, 53, 62, 0.4),
          rgba(12, 53, 62, 0.4)
        ),
        linear-gradient(180deg, rgba(12, 53, 62, 0) 52.63%, #0c353e 76.9%);
      height: 100%;
    }
  }

  .contents {
    position: relative;
    z-index: 2;
    height: 100%;

    @include max-width(1023px) {
      height: auto;
    }

    .logo {
      @include max-width(1023px) {
        display: none;
      }
    }

    .description {
      .item {
        background-color: rgba($white, 0.2);
        border-radius: 10px;
        padding: 20px;
        width: calc(100% / 2 - 7.5px);
        color: $white;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.28px;
        font-weight: 300;
        margin-bottom: 15px;

        @include max-width(767px) {
          width: 100%;
        }

        ._icon {
          opacity: 0.4;
          margin-right: 20px;
        }
      }
    }
  }

  &.signin,
  &.forgot-password,
  &.create-new-password {
    @include max-width(1023px) {
      display: none;
    }

    &::after {
      display: none;
    }

    &::before {
      background-image: linear-gradient(
        0deg,
        rgba(12, 53, 62, 0.2),
        rgba(12, 53, 62, 0.2)
      );
      width: 100%;
      height: 100%;
    }

    .contents {
      .description {
        display: none;
      }
    }
  }
}
</style>
