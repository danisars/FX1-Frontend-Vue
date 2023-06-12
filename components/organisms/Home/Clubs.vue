<template lang="pug">
.xo-home-clubs
  .container.is-max-widescreen
    h2.txt-lg A Growing<br/>Number of Sports

    h2 Leagues
    .row.justify-between
      .left-club-content.col
        XMHomeClubSlider
      .right-club-content.flex-column.justify-between
        .text-contents
          h3 Want to see your sport on FX1?
          p Are you a fan of a sport that you would like to see on FX1? Awesome! Simply get in touch and let us know what you would like to see.
          .actions
            b-button(
              type="is-primary",
              tag="router-link",
              to="/contact"
            ) Contact Us
</template>

<script>
export default {
  name: 'XOHomeClubs',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
    XMHomeClubSlider: () => import('~/components/molecules/Home/ClubSlider'),
  },
}
</script>

<style lang="scss" scoped>
.xo-home-clubs::v-deep {
  background-color: $secondary_b;

  @include max-width(1023px) {
    padding: 80px 0 0;
  }

  h2 {
    margin-bottom: 25px;

    &.txt-lg {
      width: 100%;
      max-width: 640px;
      margin-bottom: 80px;

      @include max-width(1023px) {
        max-width: 370px;
        margin-bottom: 50px;
      }
    }
  }

  .left-club-content {
    min-height: 440px;
    margin-right: 30px;

    @include max-width(1023px) {
      margin: 0 0 30px;
      width: 100%;
      flex: none;
    }
  }

  .right-club-content {
    background-color: #2a4e55;
    border-radius: 10px;
    width: 375px;
    padding: 50px 45px 30px;

    @include max-width(1023px) {
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
    }

    @include max-width(767px) {
      padding: 50px 30px 30px;
    }

    ._icon {
      opacity: 0.2;
    }

    .actions {
      margin: 50px 0 0;

      .button {
        width: 235px;
        height: 82px;
        text-transform: uppercase;
      }
    }

    .text-contents {
      h3 {
        @include max-width(1023px) {
          font-size: 1.5714rem;
          line-height: 2.4286rem;
        }
      }

      p {
        font-size: 1.1429rem;
        font-weight: 300;
        line-height: 2rem;
        letter-spacing: -0.28px;
        color: rgba($white, 0.8);

        a {
          color: rgba($white, 0.8);
        }

        .contact-us {
          color: $primary !important;
        }
      }
    }
  }
  .actions {

    @include max-width(1000px) {
      .button {
        position: relative !important;
        margin-top: 50px;
      }
    }

    @include max-width(767px) {
      margin: 30px 0 25px;
    }

    .button {
      // width: 315px;
      position: absolute;
      bottom: 30px;
      width: 200px;
      height: 105px;
      text-transform: uppercase;
    }
  }
}
</style>
