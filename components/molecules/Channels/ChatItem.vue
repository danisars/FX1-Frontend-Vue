<template lang="pug">
.xm-channels-chat-item(
  v-intersect="fnCheckIfInView",
  :class="showChatOptions && getChatActive.chatID === chatID && 'is-active'",
  @contextmenu.prevent="fnShowChatOptions($event)",
  v-longpress="fnDetectLongPress",
  ref="chatItem"
)
  .row
    XAAvatar.mr-4(:image="avatar", :name="name", size="48px")
    .details.col.row(:class="!message && 'no-text'")
      .left-details
        .row.user-details
          .row.col
            .name {{ name }}
            .date {{ date }}
            .is-edited(v-if="isEdited") , edited
          //- XAChannelsChatItemMore(
          //-   :details="{ name, message, chatID, Media }",
          //-   v-if="isSupported"
          //- )
        XMChannelsChatReply(v-if="reply", :reply="replyLocal || reply")
        XMChannelsChatMedias(
          :medias="localMedia || Media",
          :class="!message && 'no-text'",
          v-if="Media",
          :show-chat-options="showChatOptions",
          :scroll-to-bottom="scrollToBottom"
        )
        ._message.text-weight-light(v-html="message", v-linkified)
      //- .actions(v-if="isSupported")
        XAChannelsChatItemBookmark
        XAChannelsChatItemReply(@click="fnReplyTo()")
  .chat-options(
    v-if="showChatOptions && getChatActive.chatID === chatID",
    :style="{ top: chatPosition.top, left: chatPosition.left }",
    :id="chatID",
    @blur="fnHideChatOptions()"
  )
    .option(@click.prevent="fnReplyTo(); showChatOptions = false")
      ._icon: img(src="~assets/images/LockerRoom/Message/reply.svg")
      ._label Reply
    .option(
      @click.prevent="fnEditMessage(); showChatOptions = false",
      v-if="isMe"
    )
      ._icon: img(src="~assets/images/LockerRoom/Message/edit.svg")
      ._label Edit
    .option._delete(@click.prevent="fnShowDeleteMessage()", v-if="isMe")
      ._icon: img(src="~assets/images/LockerRoom/Message/delete.svg")
      ._label Delete
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import dialogs from '~/mixins/dialogs'

import XMChannelsChatReply from '~/components/molecules/Channels/ChatReply.vue'

export default {
  name: 'XMChannelsChatItem',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
    XAChannelsChatItemBookmark: () =>
      import('~/components/atoms/Channels/ChatItem/Bookmark'),
    XAChannelsChatItemReply: () =>
      import('~/components/atoms/Channels/ChatItem/Reply'),
    XAChannelsChatItemMore: () =>
      import('~/components/atoms/Channels/ChatItem/More'),
    XMChannelsChatMedias: () =>
      import('~/components/molecules/Channels/ChatMedias'),
    XMChannelsChatReply,
  },
  mixins: [dialogs],
  props: {
    chat: {
      type: Object,
      default: () => {},
    },
    scrollToBottom: { type: Boolean, default: true },
    isLast: { type: Boolean, default: false },
  },
  data() {
    return {
      isInView: true,
      imgURL: null,
      showChatOptions: false,
      chatPosition: {
        top: 0,
        left: 0,
      },
      isLongPress: false,
      isEditedLocal: false,
      replyLocal: null,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive', 'lockerRoomReply']),
    ...mapFields('user', ['userProfile']),
    ...mapGetters({
      getChatActive: 'chats/getChatActive',
      getChatDeletedForSelf: 'chats/getChatDeletedForSelf',
    }),
    message() {
      return this.chat?.text || ''
    },
    date() {
      const date = this.chat?.createdAt || this.chat?.date || new Date()
      const today = new Date()
      const isCurrentDate = moment(today).isSame(date, 'day')
      const days = moment(today).diff(date, 'days')

      if (isCurrentDate) {
        return moment(date).local().format('hh:mm a')
      } else if (days === 0) {
        return 'Yesterday ' + moment(date).local().format('hh:mm a')
      } else if (days <= 6) {
        return moment(date).local().format('dddd hh:mm a')
      } else {
        return moment(date).local().format('MM/DD/YY hh:mm a')
      }
    },
    user() {
      return this.chat?.User || null
    },
    name() {
      return this.user?.username || this.user?.name || null
    },
    userID() {
      return this.user?.id || null
    },
    avatar() {
      return this.user?.Avatar?.PhotoURL || null
    },
    isSupported() {
      const slug = this.$route?.params?.slug
      const supporting = this.$store.state.lockerRoom.supporting || []

      const active = supporting.filter((x) => {
        return x?.slug === slug
      })

      const isSupporting = !!active.length

      return isSupporting || this.lockerRoomActive?.isSupported || false
    },
    chatID() {
      return this.chat?.chatID || null
    },
    reply() {
      return this.chat?.RepliedTo || this.chat?.repliedTo || null
    },
    replyName() {
      return this.reply?.User?.username || null
    },
    replyMessage() {
      return this.reply?.text || null
    },
    Media() {
      return this.chat?.Media || null
    },
    repliedToMedia() {
      return this.reply?.Media || null
    },
    localMedia() {
      return this.chat?.localMedia || null
    },
    replyLocalMedia() {
      return this.chat?.replyLocalMedia || null
    },
    photoURL() {
      if (this.replyLocalMedia) {
        this.fnResizeImage()
      }

      return this.imgURL || this.repliedToMedia[0]?.PhotoURL || null
    },
    isMe() {
      return this.user?.id === this.userProfile?.id
    },
    isDeletedSelf() {
      return this.chat?.isDeletedSelf || false
    },
    isEdited() {
      return this.isEditedLocal || this.chat?.isEdited || false
    },
    repliedToChatID() {
      return this.chat?.repliedToChatID || null
    },
  },
  watch: {
    isInView: {
      deep: true,
      handler(value) {
        if (value) {
          this.$root.$emit('evtRtShowScrollToBottom', false)
          return
        }

        this.$root.$emit('evtRtShowScrollToBottom', true)
      },
    },
    chat: {
      deep: true,
      handler(value) {
        this.isEditedLocal = value?.isEdited
        this.replyLocal = value?.repliedTo
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.scrollToBottom) return
      this.$root.$emit('evtRtScrollToBottom')
    })
  },
  methods: {
    ...mapActions({
      setChatActive: 'chats/setChatActive',
      setChatShowEdit: 'chats/setChatShowEdit',
    }),
    fnReplyTo() {
      const { name, message, chatID, Media, localMedia, userID } = this
      this.lockerRoomReply = {
        name,
        text: message,
        chatID,
        Media,
        localMedia,
        userID,
      }

      const element = document.getElementById('chat-input')
      element.focus()
    },
    fnCheckIfInView(e) {
      if (this.isLast) {
        this.isInView = e.isIntersecting
      }
    },
    async fnResizeImage() {
      const file = this.replyLocalMedia[0]?.file
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
    fnShowChatOptions(e) {
      if (!this.isLoggedIn) return
      if (!e) return
      this.lockerRoomReply = null
      this.setChatShowEdit(false)

      const { chatID, text, repliedToChatID, Media, localMedia } =
        this.chat || {}

      const chat = {
        chatID: chatID || null,
        text: text || null,
        repliedToChatID:
          repliedToChatID || this.chat?.repliedTo?.chatID || null,
        Media: Media || null,
        localMedia: localMedia || null,
      }

      this.setChatActive(chat)

      const element = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - element.left
      const y = e.clientY - element.top

      const maxChatPositionLeft = e.currentTarget.clientWidth - 135

      this.chatPosition.left =
        x > maxChatPositionLeft ? `${maxChatPositionLeft}px` : `${x}px`
      this.chatPosition.top = `${y}px`

      this.$nextTick(() => {
        this.showChatOptions = true

        this.$nextTick(() => {
          const chatOptions = document.getElementById(this.chatID)
          chatOptions.setAttribute('tabindex', 0)
          chatOptions.focus()
        })
      })
    },
    fnHideChatOptions() {
      this.showChatOptions = false
      // this.setChatActive({})
    },
    fnEditMessage() {
      this.setChatShowEdit(true)

      this.$nextTick(() => {
        const element = document.getElementById('chat-input')
        element.focus()
      })
    },
    fnDetectLongPress(e) {
      if (!this.isLoggedIn) return
      this.setChatShowEdit(false)

      const { chatID, text, repliedToChatID, Media, localMedia } =
        this.chat || {}

      const chat = {
        chatID: chatID || null,
        text: text || null,
        repliedToChatID:
          repliedToChatID || this.chat?.repliedTo?.chatID || null,
        Media: Media || null,
        localMedia: localMedia || null,
      }

      this.setChatActive(chat)

      const element = e.target
      const parent = element.closest('.xm-channels-chat-item')
      const parentRect = parent.getBoundingClientRect()

      const x = e.clientX - parentRect.left
      const y = e.clientY - parentRect.top

      const maxChatPositionLeft = parent.clientWidth - 135

      this.chatPosition.left =
        x > maxChatPositionLeft ? `${maxChatPositionLeft}px` : `${x}px`
      this.chatPosition.top = `${y}px`

      this.$nextTick(() => {
        this.showChatOptions = true

        this.$nextTick(() => {
          const chatOptions = document.getElementById(this.chatID)
          chatOptions.setAttribute('tabindex', 0)
          chatOptions.focus()
        })
      })
    },
    fnShowDeleteMessage() {
      this.fnShowDeleteMessageDialog(this.chat)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-channels-chat-item::v-deep {
  font-size: 1.0714rem;
  line-height: 1.8571rem;
  position: relative;
  width: 100%;

  > .row {
    position: relative;
    z-index: 1;
  }

  .details {
    border-radius: 0px 10px 10px 10px;
    padding: 15px 20px 10px;
    background-color: #2a4e55;
    position: relative;
    max-width: max-content;

    @include max-width(767px) {
      padding: 15px 15px 10px;
    }

    .left-details {
      .user-details {
        margin-bottom: 5px;

        @include max-width(767px) {
          margin-bottom: 0;
        }
      }
    }

    &::before {
      content: '';
      background-image: url('~assets/images/Club/chat-border.svg');
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      left: -10px;
      width: 16px;
      height: 24px;
      z-index: 0;
    }

    .name {
      color: $warning;
      font-weight: 500;
    }

    .date,
    .is-edited {
      font-size: 0.8571rem;
      font-weight: 300;
      line-height: 1rem;
      letter-spacing: -0.18px;
      opacity: 0.5;
      margin-left: 10px;
      margin-top: 6px;
    }

    .is-edited {
      margin-left: 0;
    }

    ._message {
      opacity: 0.87;
      font-size: 1rem;
      white-space: pre-wrap;
      word-break: break-word;

      a {
        color: $white;
      }

      span {
        display: inline-block;
        font-size: 0;

        .mention {
          color: #886bf2;
          font-weight: 400;
          font-size: 1rem;
        }
      }
    }

    .reply {
      border-left: 2px solid $white;
      padding-left: 15px;
      margin-top: 10px;

      .reply-media-container {
        width: 38px;
        height: 38px;
        border-radius: 4px;
        margin-right: 10px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .reply-name {
        font-size: 0.9286rem;
        line-height: 1.1429rem;
        opacity: 0.67;
        margin-bottom: 3px;
      }

      .reply-message {
        font-size: 12px;
        line-height: 14px;
        letter-spacing: -0.18px;
        opacity: 0.5;
        white-space: pre-wrap;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        a {
          color: $white;
        }
      }
    }

    .actions {
      opacity: 0;

      @include max-width(1180px) {
        opacity: 1;
      }
    }

    &.no-text {
      padding-bottom: 3px;

      @include max-width(767px) {
        padding-bottom: 2px;
      }
    }
  }

  .chat-options {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    min-width: 135px;
    border-radius: 8px;
    background-color: #08252c;
    padding: 20px 0 10px;

    .option {
      font-size: 1.1429rem;
      font-weight: 300;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0 20px 10px;
      cursor: pointer;

      ._icon {
        display: flex;
        flex-wrap: wrap;
        width: 35px;
      }

      &._delete {
        color: $primary;
      }
    }
  }

  &::before {
    position: absolute;
    top: -2px;
    left: -30px;
    width: calc(100% + 60px);
    height: calc(100% + 4px);
    background-color: #557278;
    content: '';
    z-index: 0;
    opacity: 0;
    transition: 0.3s;
  }

  &:not(:last-child) {
    margin-bottom: 25px;
  }

  &:hover {
    .details {
      .actions {
        opacity: 1;
      }
    }
  }

  &.is-active {
    &::before {
      opacity: 1;
    }
  }
}
</style>
