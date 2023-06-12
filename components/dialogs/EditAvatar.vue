<template lang="pug">
.xd-edit-avatar.card
  .card-content
    vue-croppie(
      ref="editAvatar",
      :enableOrientation="true",
      :boundary="boundary",
      :viewport="viewport",
      :enableResize="false",
      v-if="boundary && viewport"
    )

    .actions.row.justify-center
      b-button(
        type="is-primary",
        :loading="isUploading",
        @click.prevent="fnCropAvatar()"
      ) Crop
      b-button(
        type="is-primary",
        outlined,
        @click.prevent="fnCancelCrop()",
        :disabled="isUploading"
      ) Cancel
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XDEditAvatar',
  props: {
    file: { type: null, default: null },
  },
  data() {
    return {
      croppedImage: null,
      isUploading: false,
      boundary: null,
      viewport: null,
    }
  },
  computed: {
    ...mapFields('signup', ['avatar', 'avatarCropped']),
  },
  created() {
    const files = this.file.target.files || this.file.dataTransfer.files
    if (!files.length) return

    const reader = new FileReader()
    reader.onload = (e) => {
      this.$refs.editAvatar.bind({
        url: e.target.result,
      })
    }

    reader.readAsDataURL(files[0])
  },
  beforeMount() {
    window.addEventListener('resize', this.fnCheckWindowSize)
  },
  mounted() {
    this.fnCheckWindowSize()
  },
  methods: {
    ...mapActions({
      mediaUpload: 'media/upload',
    }),
    async fnCropAvatar() {
      this.isUploading = true

      try {
        const options = {
          format: 'png',
          circle: false,
        }

        await this.$refs.editAvatar.result(options, (output) => {
          this.croppedImage = output
        })

        const { id } = await this.mediaUpload(this.croppedImage)
        this.avatar.objectID = id
        this.avatar.objectType = 'Photo'
        this.avatarCropped = this.croppedImage
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
        this.isUploading = false
        this.$parent.close()
      }
    },
    fnCheckWindowSize() {
      if (window.innerWidth < 768) {
        this.boundary = {
          height: 350,
        }

        this.viewport = {
          width: 250,
          height: 250,
          type: 'circle',
        }
        return
      }

      this.boundary = {
        width: 500,
        height: 500,
      }

      this.viewport = {
        width: 350,
        height: 350,
        type: 'circle',
      }
    },
    fnCancelCrop() {
      this.$root.$emit('evtRtClearAvatarInput')
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-edit-avatar::v-deep {
  .card-content {
    .actions {
      .button {
        min-width: 150px;
        height: 42px;
        text-transform: uppercase;
        margin: 0 5px;
      }
    }
  }
}
</style>
