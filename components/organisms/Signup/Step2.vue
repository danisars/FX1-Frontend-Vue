<template lang="pug">
.xo-signup-step2.step-content
  .container
    h1 Upload an avatar
    h3.text-weight-light Use default or upload yours

    .form-container
      .row.mb-6
        .avatar-container.row.items-center.justify-center
          .avatar.row.items-center.justify-center(:style="avatarStyles"): img(
            src="~assets/images/Auth/camera.svg",
            v-if="!avatarCropped"
          )

        .upload.row.items-center.justify-center
          .text-primary.text-weight-medium.text-uppercase.mr-1 Upload
          .text-weight-light.drag-drop or drag and drop
          input(type="file", accept="image/*", @input="fnEditAvatar($event)")

      .actions
        b-button.btn-next(
          type="is-primary",
          :loading="btnToDisable === 'btn-skip'",
          :disabled="btnToDisable === 'btn-save' || hasImage",
          @click.prevent="fnCreateUser('btn-skip')"
        ) Save
        b-button.btn-skip(
          type="is-primary",
          outlined,
          :loading="btnToDisable === 'btn-save'",
          :disabled="btnToDisable === 'btn-skip'",
          @click.prevent="fnCreateUser('btn-save')"
        ) Skip
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XOSignupStep2',
  mixins: [dialogs],
  data() {
    return {
      btnToDisable: '',
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
  },
  created() {
    this.fnConvertImageToBase64()
  },
  methods: {
    ...mapActions({
      mediaUpload: 'media/upload',
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
    async fnCreateUser(btnToDisable = '') {
      this.btnToDisable = btnToDisable

      try {
        const input = {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          avatar: btnToDisable === 'btn-skip' ? this.avatar : null,
        }

        await this.$api.createUser({ input })

        // clear sign up inputs
        this.username = null
        this.email = null
        this.password = null
        this.avatar = {}
        this.avatarCropped = null
        this.avatarSocial = null

        // redirect to locker room page
        this.$router.push({
          path: '/locker-room/explore',
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
        this.btnToDisable = ''
      }
    },
    fnEditAvatar(e) {
      const file = e
      this.fnShowEditAvatarDialog(file)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-signup-step2::v-deep {
  .form-container {
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

    .upload {
      width: 350px;
      height: 80px;
      border: 1px dashed #e5e5e5;
      border-radius: 5px;
      margin-left: 10px;
      font-size: 1.1429rem;
      line-height: 1.7143rem;
      letter-spacing: -0.28px;
      position: relative;

      .drag-drop {
        color: rgba($black, 0.5);
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

    .actions {
      .btn-next {
        width: 255px !important;
      }

      .btn-skip {
        margin-left: 20px;
      }
    }
  }
}
</style>
