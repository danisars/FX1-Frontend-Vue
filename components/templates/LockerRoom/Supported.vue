<template lang="pug">
.xt-locker-room-supported.row
  XOLockerRoomChannels(v-if="!isLive")
  .chat-container.col.flex-column(:class="{ 'h100vh' : isLive}")
    XOChannelsChatHeader(:isLive="isLive")
    .chat-history-container.col(v-bar)
      .vuebar
        XOChannelsChatHistory(
          :chats="chats",
          :show-infinite-loading="showInfiniteLoading",
          :users-typing="usersTyping"
        )

      .scroll-to-bottom.row.items-center.justify-center(
        v-if="showScrollToBottom",
        @click.prevent="fnScrollToBottom('smooth')"
      ): b-icon(
        icon="chevron-down",
        custom-size="mdi-24px"
      )
    XOChannelsChatInput(is-supporting :isLive="isLive")
  XTLockerRoomSidebarRight(v-if="showOnlineMembers && !isLive")
  XMChannelsChatLightbox
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import XOLockerRoomChannels from '~/components/organisms/LockerRoom/Channels.vue'
import XOChannelsChatInput from '~/components/organisms/Channels/ChatInput.vue'

export default {
  name: 'XTLockerRoomSupported',
  components: {
    XOLockerRoomChannels,
    XOChannelsChatInput,
    XOChannelsChatHeader: () =>
      import('~/components/organisms/Channels/ChatHeader'),
    XOChannelsChatHistory: () =>
      import('~/components/organisms/Channels/ChatHistory'),
    XTLockerRoomSidebarRight: () =>
      import('~/components/templates/LockerRoom/SidebarRight'),
    XMChannelsChatLightbox: () =>
      import('~/components/molecules/Channels/ChatLightbox'),
  },
  data() {
    return {
      showInfiniteLoading: false,
      showScrollToBottom: false,
      media: [],
    }
  },
  computed: {
    ...mapFields('app', ['showOnlineMembers']),
    ...mapFields('user', ['userProfile']),
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
    usersTyping() {
      const users = this.$parent?.usersTyping.filter(
        (x) => x !== this.userProfile?.username
      )

      return users || []
    },
  },
  watch: {
    chats: {
      deep: true,
      handler() {
        this.fnScrollToBottom()
      },
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.fnCheckWindowSize)
  },
  mounted() {
    this.$root.$on('evtRtScrollToBottom', () => {
      this.fnScrollToBottom()
    })

    this.$root.$on('evtRtShowScrollToBottom', (value) => {
      this.showScrollToBottom = value
    })

    this.fnCheckWindowSize()

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
    fnScrollToBottom(behavior = 'auto') {
      // const lastElement = Array.from(
      //   document.querySelectorAll('.xm-channels-chat-item')
      // ).pop()

      const element = document.querySelector('.xa-channels-typing')

      element?.scrollIntoView({ behavior, block: 'end' })
      this.showInfiniteLoading = true
    },
    fnCheckWindowSize() {
      if (window.innerWidth <= 768) {
        this.showOnlineMembers = false
        return
      }

      this.showOnlineMembers = true
    },
  },
}
</script>

<style lang="scss" scoped>
.xt-locker-room-supported::v-deep {
  width: 100%;

  .h100vh{
    height: 100vh !important;
    border-left: 1px solid #385860 !important;
  }

  .xo-locker-room-channels {
    height: calc(var(--vh, 1vh) * 100 - 80px);
  }

  .chat-container {
    height: calc(var(--vh, 1vh) * 100 - 80px);

    @include max-width(767px) {
      height: calc(var(--vh, 1vh) * 100 - 70px);
    }

    .chat-history-container {
      position: relative;

      .scroll-to-bottom {
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 1;
        background-color: #08252c;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
      }

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
