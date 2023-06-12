<template lang="pug">
.xo-signup-step1.step-content
  .container
    h1 Sign Up
    h3.text-weight-light Start following your favourite club and join it’s community

    .form-container
      .mb-5: XAFormsInput(
        v-model="username",
        label="",
        placeholder="Username",
        :disabled="isSubmitting",
        @enter="fnSignupViaEmail()",
        @input="fnUsernameValidation()",
        :loading="isChecking",
        :error="validation.firstError('username') || usernameUniqueError"
      )
      .mb-5: XAFormsInput(
        v-model="email",
        label="",
        placeholder="Email",
        :disabled="isSubmitting",
        @enter="fnSignupViaEmail()",
        :error="validation.firstError('email')"
      )
      .mb-6: XAFormsInput(
        v-model="password",
        type="password",
        label="",
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
        .required('Username field is required.')
        .custom(() => {
          if (!/^[A-Za-z0-9\\_]+$/.test(value)) {
            return 'Please use only letters, numbers and underscore.'
          }
        })
    },
    email(value) {
      return Validator.value(value).required('Email field is required.').email()
    },
    password(value) {
      return Validator.value(value)
        .required('Password field is required.')
        .minLength(8)
    },
  },
  name: 'XOSignupStep1',
  components: {
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
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
    ]),
    isDisableSignUpButton() {
      return (
        !this.username ||
        !this.email ||
        !this.password ||
        this.usernameUniqueError
      )
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
      this.$validate().then(async (success) => {
        if (success) {
          const { email, password } = this
          try {
            const result = await this.authSignupWithEmail({ email, password })

            if (result?.additionalUserInfo?.isNewUser) {
              this.$router.push({
                path: '/signup?step=2',
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
      this.isSubmitting = true

      try {
        const result = await this.authLoginWithGoogle()
        if (!result) return
        if (result?.additionalUserInfo?.isNewUser) {
          const {
            additionalUserInfo: {
              // eslint-disable-next-line camelcase
              profile: { family_name, given_name, picture },
            },
          } = result

          // eslint-disable-next-line camelcase
          this.firstName = family_name
          // eslint-disable-next-line camelcase
          this.lastName = given_name
          this.avatarSocial = picture

          this.$router.push({
            path: '/signup?step=2',
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
