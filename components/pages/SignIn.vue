<template lang="pug">
.xp-sign-in.auth-page
  .step-content.row
    .left-content.row.items-center.justify-center
      .form-container
        .form-header
          h1 Sign In
          h4.text-weight-light New user? #[nuxt-link(to="/signup?step=1") Create an account]

        form(action="#", autocomplete="off")
          .mb-5: XAFormsInput#IEmail(
            v-model="email",
            placeholder="Email",
            :disabled="isSubmitting",
            @enter="fnLoginViaEmail()",
            :error="validation.firstError('email')"
          )
          .mb-3: XAFormsInput#IPassword(
            v-model="password",
            type="password",
            placeholder="Password",
            :disabled="isSubmitting",
            @enter="fnLoginViaEmail()",
            :error="validation.firstError('password')"
          )
          .forgot-password.mb-6: nuxt-link(to="/forgot-password") Forgot Password?

          .actions
            .mb-4: b-button#BSubmit.btn-next(
              type="is-primary",
              @click.prevent="fnLoginViaEmail()",
              :loading="isSubmitting"
            ) Sign In

            .row
              .btn-google.row.items-center.justify-center(
                :class="[isSubmitting && 'disabled']",
                @click.prevent="fnLoginViaGoogle()"
              )
                ._icon.row: img(src="~assets/images/Auth/google.svg")
                .value Sign In with Google
              //- .btn-apple.row.items-center.justify-center: img(
              //-   src="~assets/images/Auth/apple.svg"
              //- )

    XMSignUpRightContent
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'

export default {
  validators: {
    email(value) {
      return Validator.value(value)
        .required('Sorry, we need a email to send you important updates')
        .email(`Hmmm, that email doesn't look right, maybe try again?`)
    },
    password(value) {
      return Validator.value(value).required(
        'Sorry, please enter a secure password'
      )
    },
  },
  name: 'XPSignIn',
  components: {
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
    XMSignUpRightContent: () =>
      import('~/components/molecules/SignUp/RightContent'),
  },
  data() {
    return {
      email: null,
      password: null,
      isSubmitting: false,
      isNewUser: false,
      loginMethod: null,
      substringUrl: null,
      acceptInProcess: false,
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
      'signupOwnerManagerInvite',
      'signupLockerRoomSupporting',
      'signupMethod',
    ]),
    ...mapFields('user', ['userProfile', 'userID']),
  },
  watch: {
    isLoggedIn: {
      deep: true,
      handler() {
        this.fnRetrieveUserDetails()
      },
    },
  },
  methods: {
    ...mapActions({
      authLoginWithEmail: 'auth/authLoginWithEmail',
      authLoginWithGoogle: 'auth/authLoginWithGoogle',
      authLogOut: 'auth/authLogOut',
    }),
    fnLoginViaEmail() {
      this.isSubmitting = true
      this.loginMethod = 'Email'
      this.$validate().then(async (success) => {
        if (success) {
          try {
            const { email, password } = this
            await this.authLoginWithEmail({ email, password })
            await this.fnAfterLogin()
          } catch (e) {
            this.showError(e)

            this.isSubmitting = false
          }
        } else {
          this.isSubmitting = false
        }
      })
    },
    async fnLoginViaGoogle() {
      this.validation.reset()
      this.email = null
      this.password = null
      this.isSubmitting = true
      this.signupMethod = 'google'

      try {
        const result = await this.authLoginWithGoogle()
        if (!result) return
        if (result?.additionalUserInfo?.isNewUser) {
          // await this.fnCreateUser(result)
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

        this.loginMethod = 'Google'
        this.isNewUser = false
        this.fnAfterLogin()
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
    async fnCreateUser(result) {
      const {
        additionalUserInfo: {
          // eslint-disable-next-line camelcase
          profile: { family_name, given_name },
        },
        result: {
          user: { accessToken },
        },
      } = result

      const input = {
        username: null,
        // eslint-disable-next-line camelcase
        firstName: given_name,
        // eslint-disable-next-line camelcase
        lastName: family_name,
        Avatar: null,
      }

      try {
        await this.$api.createUser(
          { input },
          {
            Authorization: `Bearer ${accessToken}`,
          }
        )
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
    },
    async fnAfterLogin() {
      const params = {
        loginMethod: this.loginMethod,
        pageName: 'Sign-in',
      }

      this.$mixpanelClient.trackLogin(params)

      if (!this.$route.query.accept) {
        await this.fnAcceptInvite()
      } else {
        await this.fnAcceptPrivateInviation()
      }

      await this.fnRetrieveUserDetails()

      // this.$mixpanel.identify(this.userProfile?.uid)
    },
    async fnAcceptInvite() {
      if (!this.signupOwnerManagerInvite) return

      try {
        const { respondUserManagerialRoleInvite } =
          await this.$api.respondUserManagerialRoleInvite({
            id: this.signupOwnerManagerInvite?.id,
          })
        this.$router.push({
          path: respondUserManagerialRoleInvite?.objectID,
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
      } finally {
        this.signupOwnerManagerInvite = null
      }
    },
    async fnRetrieveUserDetails() {
      if (!this.isLoggedIn || this.acceptInProcess) return
      if (this.isNewUser) {
        this.fnDeleteUser()
        return
      }
      try {
        const { Me } = await this.$api.getMyProfile()
        this.userProfile = Me
        this.userID = Me?.id
        this.$mixpanel.identify(Me?.uid)

        if (this.signupLockerRoomSupporting) {
          const { urlSupport } = await this.fnSupportClub()
          this.$router.push({
            path: urlSupport,
          })
          return
        }

        if (this.substringUrl) {
          this.$router.push(this.substringUrl)
        } else if (!this.substring && !this.acceptInProcess) {
          this.$router.push({
            path: '/explore',
          })
        }
      } catch (error) {
        // console.log(error, 'error')
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
    },
    async fnSupportClub() {
      const {
        signupLockerRoomSupporting: { id, slug, defaultChannelSlug },
      } = this

      try {
        await this.$api.supportClub({
          lockerRoomID: id,
        })
        this.signupLockerRoomSupporting = null
        return {
          urlSupport: `/locker-room/${slug}/${defaultChannelSlug}` || null,
        }
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
    },
    async fnDeleteUser() {
      try {
        this.authLogOut()
        await this.$api.deleteFirebaseAccount()
      } catch (error) {}
    },
    async fnAcceptPrivateInviation() {
      this.acceptInProcess = true
      try {
        const { acceptInvitationToPrivateChannel } =
          await this.$api.acceptInvitationToPrivateChannel({
            token: this.$route.query.accept,
          })

        const redirectUrl = acceptInvitationToPrivateChannel.objectID
        const startIndex = redirectUrl.indexOf('io') + 2
        this.substringUrl = redirectUrl.substring(startIndex)

        this.acceptInProcess = false
      } catch (e) {
        this.showError(e)
      } finally {
        this.isSubmitting = false
        this.acceptInProcess = false
      }
    },
    showError(e) {
      const message = e.toString()
      const findError = (error) => {
        if (message.includes(error)) {
          return message
        }
      }

      switch (message) {
        case findError('user-not-found'):
          this.$toast.error('There is no user record found.', {
            duration: 5000,
            position: 'top-center',
          })
          break

        case findError('wrong-password'):
          this.$toast.error(
            'The password is invalid or the user does not have a password.',
            {
              duration: 5000,
              position: 'top-center',
            }
          )
          break

        case findError('cannot create or join more'):
          this.$toast.error(
            'You cannot create or join more than one private group per game.',
            {
              duration: 5000,
              position: 'top-center',
            }
          )
          break

        case findError('you must be logged in'):
          this.$toast.error(
            'Sorry, you must be logged in to take this action.',
            {
              duration: 5000,
              position: 'top-center',
            }
          )
          break

        case findError('Invite does not exist'):
          this.$toast.error(
            'User Invite does not exist.',
            {
              duration: 5000,
              position: 'top-center',
            }
          )
          break

        case findError('invitation is not valid'):
          this.$toast.error(
            'The invitation is not valid.',
            {
              duration: 5000,
              position: 'top-center',
            }
          )
          break

        case findError('Channel does not exist'):
          this.$toast.error(
            'The Private Channel does not exist.',
            {
              duration: 5000,
              position: 'top-center',
            }
          )
          break

        default:
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-sign-in::v-deep {
  .step-content {
    .left-content {
      @include max-width(1023px) {
        min-height: calc(100vh - 60px) !important;
        align-items: flex-start;
      }

      .form-container {
        form {
          .forgot-password {
            a {
              font-weight: 400;
              color: $secondary;
            }
          }
        }
      }
    }
  }
}
</style>
