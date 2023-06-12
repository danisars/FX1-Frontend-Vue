<template lang="pug">
.xm-channels-chat-medias.row(:class="mediaClasses", v-if="medias")
  .media-container(v-for="(media, index) in medias.slice(0, 3)", :key="index")
    XAChannelsChatItemImage(
      v-if="media.objectType === 'Photo' || media['type'].includes('image')",
      :media="media",
      :index="index",
      :scroll-to-bottom="scrollToBottom",
      @click="fnShowLightbox(index)"
    )
    .count.row.items-center.justify-center(
      v-if="index === 2 && countExcludedMedias > 0",
      @click.prevent="fnShowLightbox(2)"
    ) +{{ countExcludedMedias }}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'XMChannelsChatMedias',
  components: {
    XAChannelsChatItemImage: () =>
      import('~/components/atoms/Channels/ChatItem/Image'),
  },
  props: {
    medias: { type: Array, default: () => [] },
    showChatOptions: { type: Boolean, default: false },
    scrollToBottom: { type: Boolean, default: false },
  },
  data() {
    return {
      lightboxMedias: [],
    }
  },
  computed: {
    mediaClasses() {
      const mediaLength = this.medias.length

      switch (mediaLength) {
        case 0:
          return ''

        case 1:
          return 'media-1'

        case 2:
          return 'media-2'

        default:
          return 'media-multiple'
      }
    },
    countExcludedMedias() {
      const countExcludedMedias = this.medias.slice(3)
      return countExcludedMedias.length
    },
  },
  methods: {
    ...mapActions({
      setMediaLightbox: 'media/setMediaLightbox',
    }),
    async fnShowLightbox(index) {
      if (this.showChatOptions) return
      await this.fnRetrieveLargerImage()
      await this.setMediaLightbox(this.lightboxMedias)
      this.$root.$emit('evtRtShowLightbox', { show: true, initialSlide: index })
    },
    async fnRetrieveLargerImage() {
      const medias = this.medias || []
      const mappedMedias = medias.map((x) => {
        return {
          objectID: x?.objectID,
          objectType: x?.objectType,
          isSport: false,
          type: '1024',
        }
      })

      try {
        const { getPhotoURLs } = await this.$api.getPhotoURLs({
          input: mappedMedias,
        })
        this.lightboxMedias = getPhotoURLs.map((x) => {
          return { src: x, type: 'Photo' }
        })
      } catch (error) {}
    },
    fnHideLightbox() {
      this.$root.$emit('evtRtShowLightbox', { show: false, initialSlide: 0 })
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-channels-chat-medias::v-deep {
  margin: 0 -17px 10px;

  @include max-width(767px) {
    margin: 0 -13px 10px;
  }

  .media-container {
    width: 100%;
    height: 315px;
    position: relative;
    overflow: hidden;

    @include max-width(767px) {
      height: 225px;
    }

    @include max-width(480px) {
      height: 200px;
    }

    .count {
      background-color: rgba($black, 0.6);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      font-size: 2.2857rem;
      cursor: pointer;
      border-bottom-right-radius: 8px;
    }
  }

  &.media-2 {
    justify-content: space-between;

    .media-container {
      width: calc(100% / 2 - 2px);

      @include max-width(767px) {
        width: calc(100% / 2 - 1px);
      }
    }
  }

  &.media-multiple {
    display: block;

    .media-container {
      width: calc(55% - 2px);
      float: left;

      @include max-width(767px) {
        width: calc(55% - 1px);
      }

      &:not(:first-child) {
        height: calc(315px / 2 - 2px);
        float: right;
        width: calc(45% - 2px);

        @include max-width(767px) {
          height: calc(225px / 2 - 1px);
          width: calc(45% - 1px);
        }

        @include max-width(480px) {
          height: calc(200px / 2 - 1px);
        }
      }

      &:last-child {
        margin-top: 4px;

        @include max-width(767px) {
          margin-top: 2px;
        }
      }
    }

    &::after {
      content: '';
      clear: both;
      display: block;
    }
  }

  &.no-text {
    margin-bottom: 0;

    .media-container {
      &:first-child {
        .xa-channels-chat-item-image {
          img {
            border-bottom-left-radius: 8px;
          }
        }
      }

      &:last-child {
        .xa-channels-chat-item-image {
          img {
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
  }
}
</style>
