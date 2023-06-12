<template lang="pug">
.xa-channels-chat-item-image(@click.prevent="$emit('click', $event)")
  img(:src="photoURL", @load="fnScrollToBottom()")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'XAChannelsChatItemImage',
  props: {
    media: { type: null, default: null },
    index: { type: Number, default: 0 },
    scrollToBottom: { type: Boolean, default: false },
  },
  data() {
    return {
      imgURL: null,
    }
  },
  computed: {
    photoURL() {
      if (this.file) {
        this.fnResizeImage()
      }

      return this.imgURL || this.media?.PhotoURL || ''
    },
    file() {
      return this.media?.file || null
    },
  },
  methods: {
    ...mapActions({
      setMediaLightbox: 'media/setMediaLightbox',
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

      if ((imgNaturalWidth || imgNaturalHeight) <= 640) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = imgNaturalWidth
        canvas.height = imgNaturalHeight

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        this.imgURL = canvas.toDataURL('image/png', 1)
        return
      }

      // Resize the image with a canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const [maxWidth, maxHeight] = [640, 640]
      const [imgWidth, imgHeight] = [imgNaturalWidth, imgNaturalHeight]
      const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight)

      canvas.width = imgWidth * ratio
      canvas.height = imgHeight * ratio

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      this.imgURL = canvas.toDataURL('image/png', 1)
    },
    fnScrollToBottom() {
      if (!this.scrollToBottom) return
      this.$root.$emit('evtRtScrollToBottom')
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-channels-chat-item-image::v-deep {
  width: 100%;
  height: 100%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
