<template lang="pug">
.xa-channels-edit-to.row.items-center.justify-between(
  :class="media.length && 'has-media'"
)
  ._icon.row: img(src="~assets/images/LockerRoom/edit.svg")
  .details.col.row
    .media-container(v-if="media.length")
      img(:src="photoURL", v-if="photoURL")
    .col
      .name Edit
      ._message(v-html="message", v-if="message")
      ._message.photo(v-if="photoURL && !message") Photo
  .actions
    .close(@click.prevent="fnCancelEdit()"): b-icon(icon="close")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'XAChannelsReplyTo',
  data() {
    return {
      imgURL: null,
    }
  },
  computed: {
    ...mapGetters({
      getChatActive: 'chats/getChatActive',
    }),
    chatID() {
      return this.getChatActive?.chatID || null
    },
    message() {
      return this.getChatActive?.text || null
    },
    media() {
      return this.getChatActive?.Media || []
    },
    localMedia() {
      return this.getChatActive?.localMedia || null
    },
    photoURL() {
      if (this.localMedia) {
        this.fnResizeImage()
      }

      return this.imgURL || this.media[0]?.PhotoURL || null
    },
  },
  mounted() {
    this.$root.$on('evtRtCancelEdit', () => {
      this.fnCancelEdit()
    })

    this.$root.$on('evtRtHideEdit', () => {
      this.fnHideEdit()
    })
  },
  methods: {
    ...mapActions({
      setChatActive: 'chats/setChatActive',
      setChatShowEdit: 'chats/setChatShowEdit',
    }),
    fnCancelEdit() {
      this.setChatActive({})
      this.setChatShowEdit(false)
    },
    fnHideEdit() {
      this.setChatShowEdit(false)
    },
    async fnResizeImage() {
      if (!this.localMedia.length) return
      const file = this.localMedia[0]?.file
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

      if ((imgNaturalWidth || imgNaturalHeight) <= 50) {
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

      const [maxWidth, maxHeight] = [50, 50]
      const [imgWidth, imgHeight] = [imgNaturalWidth, imgNaturalHeight]
      const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight)

      canvas.width = imgWidth * ratio
      canvas.height = imgHeight * ratio

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      this.imgURL = canvas.toDataURL('image/png', 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-channels-edit-to::v-deep {
  margin-bottom: 20px;
  width: 100%;

  .details {
    border-left: 2px solid $white;
    margin-left: 30px;
    padding-left: 10px;
    padding-right: 30px;

    .media-container {
      width: 38px;
      height: 38px;
      border-radius: 4px;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .name {
      font-size: 1.0714rem;
      line-height: 18px;
      margin-bottom: 4px;
    }

    ._message {
      font-size: 12px;
      font-weight: 300;
      line-height: 14px;
      letter-spacing: -0.18px;
      color: rgba($white, 0.5);
      white-space: pre-wrap;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;

      &.photo {
        color: $white;
        font-size: 1rem;
      }
    }
  }

  .actions {
    .icon {
      opacity: 0.5;
      cursor: pointer;
    }
  }

  &.has-media {
    .details {
      padding-left: 10px;
    }
  }
}
</style>
