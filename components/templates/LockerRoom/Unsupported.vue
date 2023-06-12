<template lang="pug">
.xt-locker-room-unsupported
  XOChannelsPreviewBanner(v-if="!isLive")
  .row
    XOLockerRoomChannels(v-if="!isLive")
    .chat-container.col.flex-column(:class="{ 'h100vh' : isLive}")
      XOChannelsChatHeader(:is-supporting="false" :isLive="isLive")

      .chat-history-container.col(v-bar): .vuebar: XOChannelsChatHistory(
        :chats="chats"
      )
      XOChannelsChatInput(:isLive="isLive")
  XMChannelsChatLightbox
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'XTLockerRoomUnsupported',
  components: {
    XOChannelsPreviewBanner: () =>
      import('~/components/organisms/Channels/PreviewBanner'),
    XOLockerRoomChannels: () =>
      import('~/components/organisms/LockerRoom/Channels'),
    XAChannelsAccount: () => import('~/components/atoms/Channels/Account'),
    XAChannelOptions: () => import('~/components/atoms/Channels/Options'),
    XOChannelsChatHeader: () =>
      import('~/components/organisms/Channels/ChatHeader'),
    XOChannelsChatHistory: () =>
      import('~/components/organisms/Channels/ChatHistory'),
    XOChannelsChatInput: () =>
      import('~/components/organisms/Channels/ChatInput'),
    XMChannelsChatLightbox: () =>
      import('~/components/molecules/Channels/ChatLightbox'),
  },
  data() {
    return {
      media: [],
    }
  },
  computed: {
    ...mapGetters({
      getMediaLightbox: 'media/getMediaLightbox',
    }),
    chats() {
      return this.$parent?.chats || []
    },
    channel() {
      return this.$parent?.channel || {}
    },
    isLive() {
      return this.$parent?.isLive || false
    },
  },
  mounted() {
    this.$root.$on('evtRtScrollToBottom', () => {
      this.fnScrollToBottom()
    })

    this.fnScrollToBottom()

    this.$root.$on('evtRtSetLightboxMedia', (value) => {
      this.media = value
    })

    this.$root.$on('evtRtShowLightbox', (index) => {
      if (this.media.length) {
        this.$refs.lightboxGallery?.showImage(index)
      }
    })
  },
  methods: {
    fnScrollToBottom() {
      const element = document.querySelector('.chat-history-container .vuebar')
      element.scrollTop = element.scrollHeight
    },
  },
}
</script>

<style lang="scss" scoped>
.xt-locker-room-unsupported::v-deep {
  width: 100%;

  .h100vh{
    height: 100vh !important;
    border-left: 1px solid #385860 !important;
  }

  .xo-locker-room-channels,
  .chat-container {
    height: calc(100vh - 170px);

    @include max-width(767px) {
      height: calc(100vh - 70px);
    }
  }

  .chat-container {
    .xo-channels-chat-header {
      @include max-width(767px) {
        background-color: $primary;
      }

      .right-chat-header {
        @include max-width(767px) {
          display: none;
        }
      }

      .support {
        display: none;

        @include max-width(767px) {
          display: block;
        }
      }
    }

    .chat-history-container {
      &.vb {
        > .vb-dragger {
          z-index: 5;
          width: 12px;
          right: 0;
          opacity: 0;

          > .vb-dragger-styler {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-transform: rotate3d(0, 0, 0, 0);
            transform: rotate3d(0, 0, 0, 0);
            -webkit-transition: background-color 100ms ease-out,
              margin 100ms ease-out, height 100ms ease-out;
            transition: background-color 100ms ease-out, margin 100ms ease-out,
              height 100ms ease-out;
            background-color: #08252c;
            margin: 5px 2px 0;
            border-radius: 20px;
            height: calc(100% - 10px);
            display: block;
          }

          &:hover {
            > .vb-dragger-styler {
              background-color: #08252c;
              height: 100%;
            }
          }
        }

        &.vb-scrolling-phantom {
          > .vb-dragger {
            > .vb-dragger-styler {
              background-color: #08252c;
            }
          }
        }

        &.vb-dragging {
          > .vb-dragger {
            > .vb-dragger-styler {
              background-color: #08252c;
              height: 100%;
            }
          }
        }

        &.vb-dragging-phantom {
          > .vb-dragger {
            > .vb-dragger-styler {
              background-color: #08252c;
            }
          }
        }

        &:hover {
          > .vb-dragger {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
