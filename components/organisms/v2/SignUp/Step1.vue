<template lang="pug">
.xo-signup-step-1.step-content.row
  .left-content.row.items-center.justify-center
    .form-container
      .form-header
        h1 {{ signupLockerRoomSupporting ? 'Sign up to support a club' : 'Sign up' }}
        h4.text-weight-light Already have an account? #[nuxt-link(:to="{ name: 'signin', query: filteredQuery, params: $route.params }") Sign in]

      form(action="#", @submit.prevent="")
        .mb-5: XAFormsInput(
          v-model="username",
          placeholder="Username",
          :disabled="isSubmitting",
          @enter="fnSignupViaEmail()",
          @input="fnUsernameValidation()",
          :loading="isChecking",
          :error="validation.firstError('username') || usernameUniqueError"
        )

        .mb-5: XAFormsInput(
          v-model="email",
          placeholder="Email",
          :disabled="isSubmitting || isDisableInputEmail",
          @enter="fnSignupViaEmail()",
          :error="validation.firstError('email')"
        )

        .mb-6: XAFormsInput(
          v-model="password",
          type="password",
          placeholder="Password",
          :disabled="isSubmitting",
          @enter="fnSignupViaEmail()",
          :error="validation.firstError('password')"
        )

        .actions
          .mb-4: b-button.btn-next(
            type="is-primary",
            :loading="isSubmitting",
            :disabled="isDisableSignUpButton",
            @click.prevent="fnSignupViaEmail()"
          ) Sign Up

          .row
            .btn-google.row.items-center.justify-center(
              :class="[isSubmitting && 'disabled']",
              @click.prevent="fnSignupViaGoogle()"
            )
              ._icon.row: img(src="~assets/images/Auth/google.svg")
              .value Sign Up with Google
            //- .btn-apple.row.items-center.justify-center: img(
            //-   src="~assets/images/Auth/apple.svg"
            //- )
  XMSignUpRightContent
</template>

<script>
import debounce from 'lodash/debounce'
import { Validator } from 'simple-vue-validator'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
  validators: {
    username(value) {
      return Validator.value(value)
        .required('Sorry, a username is required')
        .custom(() => {
          if (!/^[A-Za-z0-9\\_]+$/.test(value)) {
            return 'Please use only letters, numbers and underscores for your username'
          }
        })
        .minLength(
          3,
          'Please ensure your username is between 3 to 18 characters in length'
        )
        .maxLength(
          18,
          'Please ensure your username is between 3 to 18 characters in length'
        )
    },
    email(value) {
      return Validator.value(value)
        .required('Sorry, we need a email to send you important updates')
        .email(`Hmmm, that email doesn't look right, maybe try again?`)
    },
    password(value) {
      return Validator.value(value)
        .required('Sorry, please enter a secure password')
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
  },
  name: 'XOSignUpStep1',
  components: {
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
    XMSignUpRightContent: () =>
      import('~/components/molecules/SignUp/RightContent'),
  },
  data() {
    return {
      isSubmitting: false,
      isChecking: false,
      usernameUniqueError: null,
    }
  },
  computed: {
    ...mapFields('signup', [
      'username',
      'email',
      'password',
      'firstName',
      'lastName',
      'avatarSocial',
      'signupLockerRoomSupporting',
      'signupOwnerManagerInvite',
      'signupMethod',
    ]),
    isDisableSignUpButton() {
      return (
        !this.username ||
        !this.email ||
        !this.password ||
        this.usernameUniqueError
      )
    },
    isDisableInputEmail() {
      return !!this.signupOwnerManagerInvite
    },
    filteredQuery() {
      const { step, ...filtered } = this.$route.query
      return filtered
    },
  },
  methods: {
    ...mapActions({
      authSignupWithEmail: 'auth/authSignupWithEmail',
      authLoginWithGoogle: 'auth/authLoginWithGoogle',
      authLogOut: 'auth/authLogOut',
    }),
    fnUsernameValidation: debounce(async function () {
      if (!this.username) return
      this.isChecking = true
      try {
        const { username } = this
        const { userNameExists } = await this.$api.userNameExists({ username })
        if (userNameExists) {
          this.usernameUniqueError = 'Username already exists.'
          return
        }
        this.usernameUniqueError = null
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
        this.isChecking = false
      }
    }, 300),
    fnSignupViaEmail() {
      this.isSubmitting = true
      this.signupMethod = 'email'
      this.$validate().then(async (success) => {
        if (success) {
          const { email, password } = this
          try {
            const result = await this.authSignupWithEmail({ email, password })

            if (result?.additionalUserInfo?.isNewUser) {
              this.$router.push({
                name: 'signup',
                query: { ...this.$route.query, step: 2 },
                params: { ...this.$route.params },
              })
              return
            }

            this.$toast.error(
              'Sorry, this email address is already in use. Please try another.',
              {
                duration: 5000,
                position: 'top-center',
              }
            )
            this.authLogOut()
          } catch (e) {
            const message = e.toString()
            const findError = (error) => {
              if (message.includes(error)) {
                return message
              }
            }

            switch (message) {
              case findError('email-already-in-use'):
                this.$toast.error(
                  'Sorry, this email address is already in use. Please try another.',
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
        } else {
          this.isSubmitting = false
        }
      })
    },
    async fnSignupViaGoogle() {
      this.validation.reset()
      this.isSubmitting = true
      this.signupMethod = 'google'

      try {
        const result = await this.authLoginWithGoogle()
        if (!result) return
        if (result?.additionalUserInfo?.isNewUser) {
          const {
            additionalUserInfo: {
              // eslint-disable-next-line camelcase
              profile: { family_name, given_name, picture, email },
            },
          } = result

          this.email = email
          // eslint-disable-next-line camelcase
          this.firstName = given_name
          // eslint-disable-next-line camelcase
          this.lastName = family_name
          this.avatarSocial = picture

          this.$router.push({
            name: 'signup',
            query: { ...this.$route.query, step: 2 },
            params: { ...this.$route.params },
          })
          return
        }

        this.$toast.error(
          'Sorry, this email address is already in use. Please try another.',
          {
            duration: 5000,
            position: 'top-center',
          }
        )
        this.authLogOut()
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
    },
  },
}
</script>
