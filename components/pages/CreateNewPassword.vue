<template lang="pug">
.xp-create-new-password.auth-page
  .step-content.row
    .left-content.row.items-center.justify-center
      .form-container
        .form-header
          h1 Create new password

        form(action="#", autocomplete="off", @submit.prevent="")
          .mb-5
            XAFormsInput(
              v-model="password",
              type="password",
              placeholder="New password",
              :disabled="isSubmitting",
              :error="validation.firstError('password')"
            )

          .mb-6
            XAFormsInput(
              v-model="passwordConfirmation",
              type="password",
              placeholder="Confirm new password",
              :disabled="isSubmitting",
              :error="validation.firstError('passwordConfirmation')"
            )

          .actions
            b-button.btn-next(
              type="is-primary",
              :loading="isSubmitting",
              @click.prevent="fnSetNewPassword()",
              :disabled="isDisableSaveButton"
            ) Save
    XMSignUpRightContent
</template>

<script>
import { mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'

export default {
  validators: {
    password(value) {
      return Validator.value(value)
        .required('Password field is required')
        .custom(() => {
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              value
            )
          ) {
            return 'Please ensure your password is at least 8 characters in length, and contains one number, upper and lowercase letters and one special character'
          }
        })
    },
    'passwordConfirmation, password'(passwordConfirmation, password) {
      return Validator.value(passwordConfirmation)
        .required('Password confirmation field is required')
        .match(password, 'Please enter the same password in both fields')
    },
  },
  name: 'XPCreateNewPassword',
  components: {
    XMSignUpRightContent: () =>
      import('~/components/molecules/SignUp/RightContent'),
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
  },
  data() {
    return {
      password: null,
      passwordConfirmation: null,
      isSubmitting: false,
    }
  },
  computed: {
    isDisableSaveButton() {
      return !this.password || !this.passwordConfirmation
    },
  },
  methods: {
    ...mapActions({
      checkActionCode: 'auth/checkActionCode',
      resetPassword: 'auth/resetPassword',
    }),
    fnSetNewPassword() {
      this.isSubmitting = true
      this.$validate().then(async (success) => {
        if (success) {
          try {
            const actionCode = this.$route.query?.c
            const result = await this.checkActionCode({ actionCode })

            if (result) {
              try {
                const { password } = this
                await this.resetPassword({ actionCode, password })

                const message =
                  'Password changed. Please login with new password'
                const duration = 5000
                await this.fnSuccessToast(message, duration)

                this.$router.push({
                  path: '/signin',
                })
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
              }
            }
          } catch (e) {
            const message = e.toString()
            const findError = (error) => {
              if (message.includes(error)) {
                return message
              }
            }

            switch (message) {
              case findError('invalid-action-code'):
                this.$toast.error(
                  'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
                  {
                    duration: 5000,
                    position: 'top-center',
                  }
                )
                break

              default:
                break
            }
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
.xp-create-new-password::v-deep {
  .step-content {
    .left-content {
      @include max-width(1023px) {
        min-height: calc(100vh - 60px) !important;
        align-items: flex-start;
      }

      .form-container {
        form {
          .actions {
            .button {
              width: 230px;

              @include max-width(767px) {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
