<template lang="pug">
.xl-auth
  XTAuthHeader
  nuxt
</template>

<script>
export default {
  name: 'XLAuth',
  components: {
    XTAuthHeader: () => import('~/components/templates/Auth/Header'),
  },
  middleware: 'guestOnly',
  mounted() {
    const html = document.querySelector('html')
    html.style.overflowY = 'scroll'
  },
}
</script>

<style lang="scss" scoped>
.xl-auth::v-deep {
  .auth-page {
    .step-content {
      min-height: 100vh;

      @include max-width(1023px) {
        display: block;
        min-height: calc(100vh - 60px);
      }

      .left-content,
      .xm-signup-right-content {
        width: 50%;

        @include max-width(1023px) {
          width: 100%;
        }
      }

      .left-content {
        @include max-width(1023px) {
          padding: 40px 0 50px;
          min-height: calc(100vh - 410px);
        }

        @include max-width(767px) {
          padding: 40px 30px 50px;
        }

        .form-container {
          .form-header {
            margin-bottom: 50px;
          }

          a {
            color: #886bf2;
            font-weight: 500;
          }
        }
      }
    }

    h1 {
      color: $secondary;
      margin-bottom: 15px;
    }

    h4 {
      color: rgba($secondary, 0.8);
    }

    .form-container {
      background-color: $white;
      width: 100%;
      max-width: 450px;

      .forgot-password {
        a {
          color: $secondary;
          letter-spacing: -0.28px;
        }
      }

      .actions {
        .btn-next {
          width: 310px;
          // width: 255px;
          height: 82px;
          text-transform: uppercase;

          @include max-width(767px) {
            width: 100%;
            height: 65px;
          }
        }

        .btn-google {
          color: $primary;
          border: 1px solid $primary;
          border-radius: 4px;
          // width: 255px;
          width: 310px;
          height: 42px;
          font-weight: 500;
          text-transform: uppercase;
          cursor: pointer;
          user-select: none;

          @include max-width(767px) {
            width: 100%;
          }

          ._icon {
            margin-right: 10px;
          }

          &.disabled {
            pointer-events: none;
            opacity: 0.7;
          }
        }

        .btn-apple {
          width: 42px;
          height: 42px;
          border-radius: 4px;
          cursor: pointer;
          user-select: none;
          border: 1px solid $primary;
          margin-left: 15px;
        }

        .btn-skip {
          width: 160px;
          height: 82px;
          text-transform: uppercase;

          @include max-width(767px) {
            height: 65px;
          }
        }
      }
    }
  }
}
</style>
