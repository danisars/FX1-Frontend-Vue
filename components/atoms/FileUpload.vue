<template lang="pug">
.xa-file-upload(:class="isUploading && 'is-uploading'")
  img.img-file(:src="backgroundImage")
  XALoader(v-if="isUploading", :size="24")
  ._delete(@click.prevent="fnDeleteImage(); $emit('delete', $event)", v-else): img(
    src="~assets/images/LockerRoom/remove.svg"
  )
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'XAFileUpload',
  components: {
    XALoader: () => import('~/components/atoms/Loader'),
  },
  props: {
    file: { type: null, default: null },
  },
  data() {
    return {
      isUploading: true,
      backgroundImage: null,
      id: uuidv4(),
    }
  },
  computed: {
    ...mapGetters({
      getMediaFiles: 'media/getMediaFiles',
    }),
  },
  watch: {
    isUploading: {
      deep: true,
      immediate: true,
      handler(value) {
        if (!value) {
          const params = {
            objectID: this.id,
            objectType: 'Photo',
            isUploading: value,
          }

          this.updateMediaMessages(params)
        }
      },
    },
  },
  async mounted() {
    await this.fnResizeImage()

    const params = {
      objectID: this.id,
      objectType: 'Photo',
      isUploading: this.isUploading,
      file: this.file,
    }

    await this.setMediaMessages(params)

    const details = {
      file: this.backgroundImage,
      id: this.id,
    }
    await this.mediaChannelUpload(details)
    this.isUploading = false
  },
  methods: {
    ...mapActions({
      mediaChannelUpload: 'media/channelUpload',
      setMediaMessages: 'media/setMediaMessages',
      deleteMediaMessages: 'media/deleteMediaMessages',
      updateMediaMessages: 'media/updateMediaMessages',
    }),
    async fnResizeImage() {
      const file = this.file
      const reader = new FileReader()

      // Wait for the data url to be loaded from the file
      const dataURL = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result)
        reader.readAsDataURL(file)
      })

      // Wait for the image to be loaded
      const img = new Image()
      await new Promise((resolve) => {
        img.onload = resolve
        img.src = dataURL
      })

      const imgNaturalWidth = img.naturalWidth
      const imgNaturalHeight = img.naturalHeight

      if ((imgNaturalWidth || imgNaturalHeight) <= 1024) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = imgNaturalWidth
        canvas.height = imgNaturalHeight

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        this.backgroundImage = canvas.toDataURL('image/png', 1)
        return
      }

      // Resize the image with a canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const [maxWidth, maxHeight] = [1024, 1024]
      const [imgWidth, imgHeight] = [imgNaturalWidth, imgNaturalHeight]
      const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight)

      canvas.width = imgWidth * ratio
      canvas.height = imgHeight * ratio

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      this.backgroundImage = canvas.toDataURL('image/png', 1)
    },
    async fnDeleteImage() {
      try {
        this.deleteMediaMessages(this.id)
        await this.$api.deleteImages({
          objectIDs: this.id,
        })
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-file-upload::v-deep {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 15px;
  margin-bottom: 20px;
  background-color: $white;
  position: relative;

  .img-file {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  ._delete {
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 1;
    cursor: pointer;
  }

  &.is-uploading {
    .img-file {
      opacity: 0.5;
    }
  }
}
</style>
