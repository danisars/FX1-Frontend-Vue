<template lang="pug">
.xp-forgot-password.auth-page
  .step-content.row
    .left-content.row.items-center.justify-center
      .form-container
        .form-header
          h1 Forgot Password
          h4.text-weight-light Enter the email address you used when you joined and we’ll send you instructions to reset your password

        form(action="#", autocomplete="off", @submit.prevent="")
          .mb-6
            XAFormsInput(
              v-model="email",
              placeholder="Email",
              @enter="fnSendInstructions()",
              :error="validation.firstError('email')",
              :disabled="isSubmitting"
            )

          .actions
            b-button.btn-next(
              type="is-primary",
              @click.prevent="fnSendInstructions()",
              :loading="isSubmitting",
              :disabled="isDisableSendButton"
            ) Send Instructions
    XMSignUpRightContent
</template>

<script>
import { mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'

export default {
  validators: {
    email(value) {
      return Validator.value(value).required('Email field is required').email()
    },
  },
  name: 'XPForgotPassword',
  components: {
    XMSignUpRightContent: () =>
      import('~/components/molecules/SignUp/RightContent'),
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
  },
  data() {
    return {
      email: null,
      isSubmitting: false,
    }
  },
  computed: {
    isDisableSendButton() {
      return !this.email
    },
  },
  methods: {
    ...mapActions({
      forgotPassword: 'auth/forgotPassword',
    }),
    fnSendInstructions() {
      this.isSubmitting = true

      this.$validate().then(async (success) => {
        if (success) {
          try {
            const { email } = this
            await this.forgotPassword({ email })

            const message =
              'Password reset email sent, please check your email for further instructions'
            const duration = 5000
            await this.fnSuccessToast(message, duration)

            this.$router.push({
              path: '/',
            })
          } catch (error) {
          } finally {
            this.isSubmitting = false
          }

          return
        }

        this.isSubmitting = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-forgot-password::v-deep {
  min-height: calc(100vh - 683px);

  .step-content {
    .left-content {
      @include max-width(1023px) {
        min-height: calc(100vh - 60px) !important;
        align-items: flex-start;
      }
    }
  }
}
</style>
