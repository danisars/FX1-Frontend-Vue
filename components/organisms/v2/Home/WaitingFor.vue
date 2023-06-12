<!--suppress CssUnknownTarget -->
<template lang="pug">
  #xo-home-waiting-for.xo-home-waiting-for.row.items-center
    .right-section.row.items-center.justify-center
      .img-container
        .main-image
          nuxt-img(
            src="/v2/Home/main-image-soccer.jpg",
            width="393",
            height="462",
            alt="Love your team",
            format="webp"
          )
        .chat._icon.row.items-center.justify-center: img(
          src="~assets/images/Home/chat.svg",
          alt="Chat"
        )
        .trophy._icon.row.items-center.justify-center: img(
          src="~assets/images/Home/trophy.svg",
          alt="Trophy"
        )
        .participants._icon.row.items-center.justify-center: img(
          src="~assets/images/Home/participants.svg",
          alt="Participants"
        )

    .container.is-max-widescreen
      .left-section
        h2.txt-lg What are you<br/>waiting for?
        h3.text-weight-light Sign up for free, connect with friends, and your live game day experience

        .actions
          b-button(type="is-primary", tag="router-link", to="/signup?step=1") Create Account
</template>

<script>
import { Validator } from 'simple-vue-validator'

export default {
  validators: {
    email(value) {
      return Validator.value(value).required('Email field is required.').email()
    },
  },
  name: 'XOHomeWaitingFor',
  components: {
    XAFormsInput: () => import('~/components/atoms/Forms/Input.vue'),
  },
  data() {
    return {
      email: null,
      isSubmitting: false,
      isRegistered: false,
    }
  },
  methods: {
    fnRegisterInterest() {
      this.isSubmitting = true

      this.$validate().then(async (success) => {
        if (success) {
          try {
            const { email } = this
            const data = { email }
            await this.$api.registerInterest({ type: 'RegisterInterest', data })
            this.email = ''
            this.validation.reset()
            this.isRegistered = true
          } catch (error) {
            error?.response?.errors.forEach((error) => {
              this.$toast.success(error.message, {
                duration: 5000,
                position: 'bottom-left',
                className: 'fx1-success',
                iconPack: 'mdi',
                icon: 'alert-circle-outline',
              })
            })
          } finally {
            this.isSubmitting = false
          }
        } else {
          this.isSubmitting = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-home-waiting-for::v-deep {
  min-height: 680px;
  position: relative;
  overflow: hidden;

  .right-section {
    background-image: url('~assets/images/Home/bg-circles.png');
    background-repeat: no-repeat;
    background-size: 1120px;
    background-position: center;
    position: absolute;
    top: 0;
    right: -25%;
    width: 100%;
    height: 100%;
    z-index: 0;

    @include min-width(1441px) {
      right: -20%;
    }

    @include max-width(1000px) {
      right: -20%;
    }

    @include max-width(768px) {
      background-size: 1020px;
      background-position: top -167px center;
      right: -25%;
    }

    @include max-width(767px) {
      position: unset;
      top: unset;
      right: unset;
      padding-bottom: 0;
      background-position: center;
      background-size: 950px;
      min-height: 550px;
    }

    @include max-width(427px) {
      background-size: 810px;
    }

    .img-container {
      position: relative;

      @include max-width(1000px) {
        width: 100%;
        max-width: 350px;
      }

      @include max-width(768px) {
        max-width: 300px;
      }

      @include max-width(767px) {
        max-width: 350px;
        margin: 0 auto;
        text-align: center;
      }

      @include max-width(427px) {
        max-width: 90%;
      }

      .main-image {
        width: 100%;
        max-width: 373px;
        height: 462px;
        border-radius: 100px 10px;

        @include max-width(810px) {
          height: 375px;
        }

        @include max-width(767px) {
          height: 435px;
        }

        img {
          border-radius: 100px 10px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      ._icon {
        background-color: $white;
        width: 64px;
        height: 64px;
        border-radius: 5px;
        position: absolute;
        z-index: 1;

        @include max-width(768px) {
          width: 48px;
          height: 48px;

          img {
            width: 22px;
          }
        }

        &.chat {
          top: 30px;
          right: -30px;

          @include max-width(768px) {
            right: -15px;
          }

          @include max-width(427px) {
            right: -10px;
          }
        }

        &.trophy {
          bottom: 100px;
          right: -15px;

          @include max-width(768px) {
            right: -5px;
          }
        }

        &.participants {
          bottom: 40px;
          left: -20px;

          @include max-width(767px) {
            left: -10px;
          }
        }
      }
    }
  }

  .left-section {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 620px;

    @include max-width(1215px) {
      max-width: 55%;
    }

    @include max-width(1000px) {
      max-width: 50%;
    }

    @include max-width(900px) {
      max-width: 45%;
    }

    @include max-width(768px) {
      max-width: 50%;
    }

    @include max-width(767px) {
      max-width: 100%;
      padding: 30px 0 50px;
    }

    h2 {
      margin-bottom: 30px;
    }

    .actions {
      margin: 50px 0 0;

      .button {
        width: 235px;
        height: 82px;
        text-transform: uppercase;
      }
    }

    form {
      margin: 50px 0 0;
      width: 100%;
      max-width: 315px;

      @include max-width(427px) {
        max-width: 100%;
      }

      .actions {
        .button {
          width: 100%;
          height: 82px;

          &.is-registered {
            pointer-events: none;
          }
        }
      }
    }
  }
}
</style>
