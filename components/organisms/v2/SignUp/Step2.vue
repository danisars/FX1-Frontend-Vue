<template lang="pug">
.xo-signup-step-2.step-content.row
  .left-content.row.items-center.justify-center
    .form-container
      .form-header
        h1 Upload an avatar
        h4.text-weight-light Be yourself, a fictional character, or even your favourite player

      form(action="#", @submit.prevent="")
        .mb-5(v-if="signupMethod === 'google'"): XAFormsInput(
          v-model="username",
          placeholder="Username",
          :disabled="isSubmitting",
          @input="fnUsernameValidation()",
          :loading="isChecking",
          :error="validation.firstError('username') || usernameUniqueError"
        )

        .row.mb-6.upload-container
          .upload.row.items-center.justify-center
            .text-primary.text-weight-medium.text-uppercase.mr-1 Upload
            .text-weight-light.drag-drop or drag and drop
            input(
              type="file",
              accept="image/*",
              @input="fnEditAvatar($event)",
              ref="avatarInput"
            )

          .avatar-container.row.items-center.justify-center
            .avatar.row.items-center.justify-center(:style="avatarStyles"): img(
              src="~assets/images/Auth/camera.svg",
              v-if="!avatarCropped"
            )

        .actions
          b-button.btn-next(
            type="is-primary",
            :loading="btnToDisable === 'btn-skip'",
            :disabled="btnToDisable === 'btn-save' || hasImage || isDisabledSubmitButton",
            @click.prevent="fnCreateUser('btn-skip')"
          ) Save
          b-button.btn-skip(
            type="is-primary",
            outlined,
            :loading="btnToDisable === 'btn-save'",
            :disabled="btnToDisable === 'btn-skip' || isDisabledSubmitButton",
            @click.prevent="fnCreateUser('btn-save')"
          ) Skip
  XMSignUpRightContent
</template>

<script>
import debounce from 'lodash/debounce'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'
import dialogs from '~/mixins/dialogs'

export default {
  validators: {
    username(value) {
      return Validator.value(value)
        .required('Username field is required.')
        .custom(() => {
          if (!/^[A-Za-z0-9\\_]+$/.test(value)) {
            return 'Please use only letters, numbers and underscore'
          }
        })
        .minLength(
          3,
          'Please ensure your username is at least 3 characters in length and 18 characters maximum'
        )
        .maxLength(
          18,
          'Please ensure your username is at least 3 characters in length and 18 characters maximum'
        )
    },
  },
  name: 'XOSignUpStep2',
  components: {
    XMSignUpRightContent: () =>
      import('~/components/molecules/SignUp/RightContent'),
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
  },
  mixins: [dialogs],
  middleware: 'refreshToken',
  data() {
    return {
      btnToDisable: '',
      isChecking: false,
      usernameUniqueError: null,
      isSubmitting: false,
    }
  },
  computed: {
    ...mapFields('signup', [
      'username',
      'email',
      'password',
      'firstName',
      'lastName',
      'avatar',
      'avatarSocial',
      'avatarCropped',
      'signupLockerRoomSupporting',
      'signupOwnerManagerInvite',
      'signupMethod',
    ]),
    avatarStyles() {
      const avatarStyles = {
        backgroundImage: `url(${this.avatarCropped})`,
      }

      return avatarStyles
    },
    hasImage() {
      return !this.avatarCropped
    },
    isDisabledSubmitButton() {
      return this.usernameUniqueError
    },
  },
  created() {
    this.fnConvertImageToBase64()
  },
  mounted() {
    this.$root.$on('evtRtClearAvatarInput', () => {
      this.$refs.avatarInput.value = null
    })

    // MIXPANEL FOR STEP 2
    const params = { pageName: 'Sign-up', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
  methods: {
    ...mapActions({
      mediaUpload: 'media/upload',
      refreshToken: 'auth/refreshToken',
    }),
    fnConvertImageToBase64() {
      if (!this.avatarSocial) return

      const getBase64Image = (url) => {
        const img = new Image()
        img.setAttribute('crossOrigin', 'anonymous')
        img.onload = async () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)
          const dataURL = canvas.toDataURL('image/png')

          const { id } = await this.mediaUpload(dataURL)
          this.avatar.objectID = id
          this.avatar.objectType = 'Photo'
          this.avatarCropped = dataURL
        }
        img.src = url
      }

      getBase64Image(this.avatarSocial)
    },
    fnCreateUser(btnToDisable = '') {
      this.$validate().then(async (success) => {
        if (success) {
          this.btnToDisable = btnToDisable

          try {
            const input = {
              username: this.username,
              firstName: this.firstName,
              lastName: this.lastName,
              Avatar: btnToDisable === 'btn-skip' ? this.avatar : null,
            }

            const authToken = this.$store.state.auth.token
            await this.$api.createUser(
              { input },
              {
                Authorization: `Bearer ${authToken}`,
              }
            )
            await this.fnRefreshToken()
            this.fnAfterCreateUser()
          } catch (error) {
            this.btnToDisable = ''
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
      })
    },
    fnEditAvatar(e) {
      const file = e
      this.fnShowEditAvatarDialog(file)
    },
    async fnAfterCreateUser() {
      const capitalize = (str) => {
        const lower = str?.toLowerCase()
        return str?.charAt(0)?.toUpperCase() + lower?.slice(1)
      }

      const params = {
        username: this.username,
        emailAddress: this.email,
        avatar: this.avatarSocial ? 'Default' : 'Custom',
        registrationMethod: capitalize(this.signupMethod),
        pageName: 'Sign-up',
        avatarObjectID: this.avatar?.objectID || null,
        invited: !!this.$route.query.accept,
      }

      this.$mixpanelClient.trackRegisterAccount(params)
      this.fnFacebookEventSignup()

      const uid = this.$store.state.auth.uid
      const distinctID = this.$mixpanel.get_distinct_id()

      this.$mixpanel.alias(uid, distinctID)

      const { urlSupport } = await this.fnSupportClub()
      const { urlInvite } = await this.fnAcceptInvite()

      if (urlSupport) {
        this.$router.push({
          path: urlSupport,
        })
        return
      }

      if (urlInvite) {
        this.$router.push({
          path: urlInvite,
        })
        return
      }
      if (this.$route.query.accept) {
        await this.fnAcceptPrivateInviation()
        return
      }
      // redirect to locker room page
      await this.$router.push({
        path: '/locker-room/explore',
      })

      this.username = null
      this.email = null
      this.password = null
      this.avatar = {}
      this.avatarCropped = null
      this.avatarSocial = null
      this.firstName = null
      this.lastName = null
      this.signupMethod = null
    },
    async fnSupportClub() {
      if (!this.signupLockerRoomSupporting) return { urlSupport: null }

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
    async fnAcceptInvite() {
      if (!this.signupOwnerManagerInvite) return { urlInvite: null }

      try {
        const { respondUserManagerialRoleInvite } =
          await this.$api.respondUserManagerialRoleInvite({
            id: this.signupOwnerManagerInvite?.id,
          })
        return { urlInvite: respondUserManagerialRoleInvite?.objectID || null }
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
    async fnAcceptPrivateInviation() {
      try {
        const { acceptInvitationToPrivateChannel } =
          await this.$api.acceptInvitationToPrivateChannel({
            token: this.$route.query.accept,
          })

        const redirectUrl = acceptInvitationToPrivateChannel.objectID
        const startIndex = redirectUrl.indexOf('io') + 2
        const substringUrl = redirectUrl.substring(startIndex)
        this.$router.push(substringUrl)
      } catch (e) {
        this.showError(e)
      } finally {
        this.isSubmitting = false
      }
    },
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
    fnFacebookEventSignup() {
      window.fbq('trackCustom', 'Signup')
    },
    async fnRefreshToken() {
      if (!this.isLoggedIn) return
      try {
        await this.refreshToken()
      } catch (error) {}
    },
    showError(e) {
      const message = e.toString()
      const findError = (error) => {
        if (message.includes(error)) {
          return message
        }
      }

      switch (message) {
        case findError('cannot create or join more'):
          this.$toast.error(
            'You cannot create or join more than one private group per game.',
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
.xo-signup-step-2::v-deep {
  .form-container {
    form {
      .upload-container {
        .upload {
          width: 100%;
          max-width: 350px;
          height: 215px;
          border: 1px dashed #e5e5e5;
          border-radius: 5px;
          margin-right: 15px;
          font-size: 1.1429rem;
          line-height: 1.7143rem;
          letter-spacing: -0.28px;
          position: relative;

          @include max-width(767px) {
            width: calc(100% - 95px);
            height: 80px;
          }

          .drag-drop {
            color: rgba($black, 0.5);

            @include max-width(767px) {
              display: none;
            }
          }

          input[type='file'] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0;
            cursor: pointer;
          }
        }

        .avatar-container {
          width: 80px;
          height: 80px;
          border-radius: 5px;
          border: 1px solid #e5e5e5;

          .avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: #e5e5e5;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;

            img {
              opacity: 0.5;
            }
          }
        }
      }

      .actions {
        .btn-next {
          width: 255px !important;

          @include max-width(767px) {
            width: calc(100% - 110px) !important;
          }
        }

        .btn-skip {
          margin-left: 20px;

          @include max-width(767px) {
            width: 100%;
            max-width: 95px;
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
