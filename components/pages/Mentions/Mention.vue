<template lang="pug">
.xp-mention.flex-column.col
  XOMentionsHeader(:notification-type="type")
  .mention-container.col
    .details.row
      span.username.mr-1 {{ username }}
      span.mr-1.text-weight-light {{ type === 'Reply' ? 'replied to you in' : 'mentioned you in' }}
      a.row(@click.prevent="fnRedirectToLockerRoom()")
        span.mr-1 # {{ channelName }}
        span.mr-2.text-weight-light.in in
        span.row
          img.mr-1(
            src="~assets/images/v2/LockerRoom/mentions-locker-room.svg",
            alt="Locker room"
          )
          | {{ lockerRoomName }}
    //- template(v-if="type === 'Reply'")
    //-   XMMentionsSingleItem(:message="message", is-original-message)
    //-   XMMentionsSingleItem(:message="message", show-reply)
    //- template(v-else)
    //-   XMMentionsSingleItem(:message="message")
    XMMentionsSingleItem(
      v-for="(message, index) in messages.slice(0, 3)",
      :key="index",
      :message="message"
    )
  XOChannelsChatInput(:is-supporting="isSupported", is-notification)
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import XOMentionsHeader from '~/components/organisms/Mentions/Header.vue'
import XOChannelsChatInput from '~/components/organisms/Channels/ChatInput.vue'
// import XMMentionsSingleItem from '~/components/molecules/Mentions/SingleItem.vue'
import XMMentionsSingleItem from '~/components/molecules/v2/Mentions/SingleItem.vue'

export default {
  name: 'XPMention',
  components: { XOMentionsHeader, XOChannelsChatInput, XMMentionsSingleItem },
  props: {
    notificationWithMessages: { type: Object, default: () => {} },
  },
  computed: {
    ...mapGetters({
      getLockerRoomSupporting: 'lockerRoom/getLockerRoomSupporting',
    }),
    ...mapFields('locker-room', ['lockerRoomReply']),
    notification() {
      return this.notificationWithMessages?.Notification || null
    },
    type() {
      return this.notification?.type || null
    },
    chatID() {
      return this.notification?.chatID || null
    },
    lockerRoom() {
      return this.notification?.LockerRoom || null
    },
    lockerRoomName() {
      return this.lockerRoom?.name || null
    },
    lockerRoomSlug() {
      return this.lockerRoom?.slug || null
    },
    isSupported() {
      const isOnList = this.getLockerRoomSupporting.filter(
        (x) => x?.slug === this.lockerRoomSlug
      )
      const isSupporting = !!isOnList.length

      return isSupporting || this.lockerRoom?.isSupported || false
    },
    message() {
      return this.notification?.Message || null
    },
    messageText() {
      return this.message?.text || null
    },
    messagePhotoURLs() {
      return this.message?.PhotoURLs || []
    },
    messageUserID() {
      return this.message?.User?.id || null
    },
    messagePhotoURLsSmall() {
      const messagePhotoURLsSmall = this.messagePhotoURLs.filter(
        (x) => x?.type === '200sq'
      )
      return messagePhotoURLsSmall
    },
    user() {
      return this.message?.User || null
    },
    username() {
      return this.user?.username || null
    },
    channelName() {
      return this.notification?.channelName || null
    },
    channelSlug() {
      return this.notification?.channelSlug || null
    },
    messages() {
      return this.notificationWithMessages?.Messages || null
    },
  },
  mounted() {
    const {
      username,
      messageText,
      chatID,
      messagePhotoURLsSmall,
      messageUserID,
    } = this
    this.lockerRoomReply = {
      name: username,
      text: messageText,
      Media: messagePhotoURLsSmall,
      chatID,
      userID: messageUserID,
    }
  },
  methods: {
    ...mapActions({
      setNotificationActive: 'notification/setNotificationActive',
    }),
    async fnRedirectToLockerRoom() {
      await this.setNotificationActive(this.notificationWithMessages)
      this.$router.push({
        path: `/locker-room/${this.lockerRoomSlug}/${this.channelSlug}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-mention::v-deep {
  height: calc(var(--vh, 1vh) * 100 - 80px);

  @include max-width(767px) {
    height: calc(var(--vh, 1vh) * 100 - 70px);
  }

  .mention-container {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #08252c $secondary;
    scrollbar-base-color: #08252c;
    padding: 20px 30px;
    width: 100%;

    &::-webkit-scrollbar {
      width: 15px;
    }

    &::-webkit-scrollbar-track {
      background-color: $secondary;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #08252c;
      border-radius: 10px;
      border: 3px solid $secondary;
    }

    &::-webkit-scrollbar-thumb:vertical:hover {
      background-color: #08252c;
    }

    > .details {
      font-size: 0.9286rem;
      font-weight: 500;
      line-height: 14px;
      color: #94a6aa;
      margin-bottom: 15px;

      .username {
        color: #c3cdcf;
      }

      a {
        color: #c3cdcf;

        .in {
          color: #94a6aa;
        }
      }
    }
  }
}
</style>
