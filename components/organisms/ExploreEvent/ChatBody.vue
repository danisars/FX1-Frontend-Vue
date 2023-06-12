<template lang="pug">
.xp-locker-room-channels.row.col
  client-only
    template(v-if="!getLockerRoomIsLoading && pageLoaded")
      XTLockerRoomSupported(
        :channelSlug="channelSlug",
        :game="game",
        :activeChat="activeChat",
        :currentStep="currentStep",
        :privateChats="privateChats",
        :privateChannel="privateChannel",
        :lockerRoom="lockerRoom ? lockerRoom : lockerRoomProp",
        :onlineMembers="onlineMembers"
        :publicMembers="publicMembers",
        @cancel="cancel",
        @changeStep="changeStep",
        @getPrivateChannel="fnGetPrivateChannel"
      )
      .unsupported(v-if="!isLoggedIn", @click="signUp")
        .unsupported-btn LOG IN
        span Login or sign up to send messages!
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
export default {
  name: 'PageLockerRoomChannels',
  components: {
    XTLockerRoomSupported: () =>
      import('~/components/templates/LockerRoom/EventRoomChat'),
  },
  layout: 'locker-room',
  props: {
    channelSlug: {
      type: String,
      default: '',
    },
    game: {
      type: Object,
      default: () => {},
    },
    privateChannel: {
      type: Object,
      default: () => {},
    },
    activeChat: {
      type: String,
      required: true,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
    lockerRoomProp: { type: Object, default: () => {} },
  },

  data() {
    return {
      socket: null,
      pageLoaded: false,
      myEmitErrors: {},
      channel: null,
      oldChannel: null,
      isSupported: true,
      lockerRoom: null,
      chats: [],
      privateChats: [],
      usersTyping: [],
      onlineMembers: [],
      publicMembers: [],
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive', 'lockerRoomReply']),
    ...mapFields('user', ['userProfile']),
    ...mapFields('channels', ['channelActive']),
    ...mapFields('app', ['showLoader']),
    ...mapGetters({
      getMediaFilesLocal: 'media/getMediaFilesLocal',
      getLockerRoomIsLoading: 'lockerRoom/getLockerRoomIsLoading',
    }),
  },
  watch: {
    lockerRoomActive: {
      deep: true,
      handler(value) {
        this.isSupported = this.isSupported || value?.isSupported
      },
    },
    activeChat: {
      deep: true,
      handler() {
        this.fnConnectToChannel()
      },
    },
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.$root.$emit('evtRtCancelEdit')
        this.clearChatDeleted()
      },
    },
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
      auth: {
        token: this.$store.state.auth.token || null,
        type: 'desktop',
      },
      transports: ['websocket'],
    })
    this.$root.$on(
      'evtRtSendMessage',
      (message, reply, media, mentionsUserIDs) => {
        this.fnSendMessage(message, reply, media, mentionsUserIDs)
      }
    )

    this.$root.$on('evtRtEditMessage', (data) => {
      this.fnEditMessage(data)
    })

    this.$root.$on('evtRtDeleteMessage', (data) => {
      this.fnDeleteMessage(data)
    })

    this.$root.$on('leavePrtChat', (data) => {
      this.fnLeavePrivateChat(data)
    })

    // RECEIVED MESSAGE
    this.socket.on('on-message', (data) => {
      const { chat } = data
      if (chat.channelSlug === this.channelSlug) {
        this.chats.push(data.chat)
      } else if (chat.channelSlug === this.privateChannel?.slug) {
        this.privateChats.push(data.chat)
      }
    })

    // EDIT MESSAGE
    this.socket.on('on-edit-message', (data) => {
      if (!data.chat) return
      map(this.chats, function (chat) {
        if (chat.chatID === data.chat.chatID) {
          chat.text = data.chat.text
          chat.isEdited = true
        }
      })
      map(this.privateChats, function (chat) {
        if (chat.chatID === data.chat.chatID) {
          chat.text = data.chat.text
          chat.isEdited = true
        }
      })
    })

    // DELETE MESSAGE
    this.socket.on('on-delete-message', (data) => {
      if (!data.chat) return
      const publicIndex = findIndex(this.chats, { chatID: data.chat.chatID })
      const privateIndex = findIndex(this.privateChats, {
        chatID: data.chat.chatID,
      })

      if (data?.chat?.isDeletedEveryone) {
        if (publicIndex !== -1) {
          this.chats.splice(publicIndex, 1)
        } else if (privateIndex !== -1) {
          this.privateChats.splice(privateIndex, 1)
        }
        this.fnDeleteReply({
          chatID: data.chat.chatID,
          deleteForSelf: false,
          deleteForEveryone: true,
          chats: privateIndex !== 1 ? this.privateChats : this.chats,
        })
      }
    })

    // TYPING MESSAGE
    this.socket.on('on-typing-message', (data) => {
      this.usersTyping = data
    })

    // SERVER LOGS
    this.socket.on('logs', (data) => {
      if (data.call === 'on-channel-user-online') {
        this.publicMembers = data.payload.onlineUsers
      }
      console.log('SERVERLOGS', data)
    })

    this.socket.on('status-online', (data) => {
      this.onlineMembers = data
    })

    this.clearLockerRoomDeletedManagers()

    this.$root.$on('evtRtGetChannel', () => {
      this.fnGetChannel()
    })

    this.channelActive = this.channel

    this.$root.$on('evtRtIsTyping', (user) => {
      this.fnTypingMessage({ userName: user.userName, status: true })
    })

    this.$root.$on('evtRtDoneTyping', (user) => {
      this.fnTypingMessage({ userName: user.userName, status: false })
    })
    this.fnRetrievePageDetails()
    this.fnRetrieveIsSupported()

    // add set interval call to fix web socket issue
    const instance = this
    setInterval(() => {
      instance.socket.emit('ping')
    }, 1000)
    // end of set Interval call
  },
  beforeDestroy() {
    if (this.oldChannel) {
      this.$root.$emit('evtReloadLockerRoom', this.oldChannel)
    }
    this.$root.$off('evtRtSendMessage')
  },
  methods: {
    ...mapActions({
      clearLockerRoomDeletedManagers:
        'locker-room/clearLockerRoomDeletedManagers',
      clearChatDeleted: 'chats/clearChatDeleted',
      setLockerRoomIsLoading: 'lockerRoom/setLockerRoomIsLoading',
    }),
    async fnSendMessage(message, reply, media, mentionsUserIDs) {
      const {
        userProfile: { username, name, id, Avatar },
      } = this
      const chat = {
        User: {
          username: username || name || 'FX1 User',
          Avatar,
          id,
        },
        chatID: uuidv4(),
        text: message,
        channelSlug:
          this.activeChat === 'public'
            ? this.channelSlug
            : this.privateChannel?.slug,
        lockerRoomSlug: this.$route.params.slug,
        repliedTo: reply
          ? {
              User: {
                username: reply?.name,
                id: reply?.userID,
              },
              text: reply?.text,
              chatID: reply?.chatID,
              Media: reply?.Media,
            }
          : null,
        Media: media.length ? media : null,
        MentionedUserIDs: mentionsUserIDs,
      }
      await this.socket.emit('send-message', chat, (resp) => {
        console.log(resp)
      })

      chat.localMedia = this.getMediaFilesLocal || null
      chat.replyLocalMedia = reply?.localMedia || null

      if (this.activeChat === 'public') {
        this.chats.push(chat)
      } else if (this.activeChat === 'private') {
        this.privateChats.push(chat)
      }

      //   const lockerRoom = this.lockerRoomActive
      //   const channel = this.channelActive
      const LockerRoom = this.lockerRoom || this.lockerRoomProp
      this.channelActive = LockerRoom.ChannelGroups[0].Channels[0]

      this.$mixpanelClient.eventRoomtrackSendMessage({
        LockerRoom,
        game: this.game,
        reply,
      })

      this.$nextTick(() => {
        this.$root.$emit('evtRtScrollToBottom')
      })
    },
    async fnEditMessage({ chatID, text, repliedToChatID, Media }) {
      await this.socket.emit(
        'edit-message',
        {
          channelSlug:
            this.activeChat === 'public'
              ? this.channelSlug
              : this.privateChannel?.slug,
          chatID,
          text,
          repliedToChatID,
          Media,
        },
        () => {
          // console.log(resp)
        }
      )
    },
    async fnDeleteMessage({ chatID, deleteForSelf, deleteForEveryone }) {
      const activeChat =
        this.activeChat === 'public' ? this.chats : this.privateChats

      await this.socket.emit(
        'delete-message',
        {
          channelSlug:
            this.activeChat === 'public'
              ? this.channelSlug
              : this.privateChannel?.slug,
          chatID,
          isDeletedSelf: deleteForSelf,
          isDeletedEveryone: deleteForEveryone,
        },
        () => {
          this.fnDeleteReply({
            chatID,
            deleteForSelf,
            deleteForEveryone,
            activeChat,
          })
        }
      )
    },
    fnConnectToChannel(slug) {
      this.oldChannel = this.$route.params.channel || null
      if (this.oldChannel) {
        this.$root.$emit('evtReloadLockerRoom', this.oldChannel)
      }
      this.$store.dispatch('locker-room/setLockerRoomConnectingToChannel', true)
      this.socket.emit(
        'join-channel',
        {
          channelSlug:
            this.activeChat === 'public'
              ? this.channelSlug
              : slug || this.privateChannel?.slug,
        },
        (/* resp */) => {
          const lockerRoom = this.lockerRoomActive
          const channel =
            this.activeChat === 'public'
              ? this.channelSlug
              : this.privateChannel?.slug
          const params = {
            lockerRoom,
            channel,
            pageName: 'Event room channel',
            isLoggedIn: this.isLoggedIn,
          }
          this.$mixpanelClient.trackViewPage(params)

          this.$store.dispatch(
            'notification/clearActiveChannelNotification',
            this.$route.params.channel
          )
          this.reloadUnreadChats()
        }
      )
      this.$store.dispatch(
        'locker-room/setLockerRoomConnectingToChannel',
        false
      )
    },
    async fnGetChannel() {
      const slug = this.channelSlug
      const { getChannel } = await this.$api.getChannel({ slug })
      this.channel = getChannel
    },
    async fnGetPrivateChannel(privateId) {
      const id = privateId
      const slug = this.privateChannel?.slug
      const { getChannel } = slug
        ? await this.$api.getChannel({ slug })
        : id
        ? await this.$api.getChannel({ id })
        : null
      this.$emit('setPrivateChannel', getChannel)
      this.$store.dispatch('locker-room/setLockerRoomPrivateChat', getChannel)
      if (id && getChannel) {
        this.fnConnectToChannel(getChannel?.slug)
      }
    },
    async fnRetrievePageDetails() {
      const slug = this.$route?.params?.slug
      const slugChannel = this.channelSlug
      const slugPrivateChannel = this.privateChannel?.slug

      const params = {
        channelSlug: this.channelSlug,
      }
      const privateParams = {
        channelSlug: slugPrivateChannel,
      }
      // async await parallel
      const [
        {
          getMessagesByChannelSlug: { items },
        },
        { getChannel },
        { getLockerRoom },
      ] = await Promise.all([
        this.$api.getMessagesByChannelSlug(params),
        this.$api.getChannel({ slug: slugChannel }),
        this.$api.getLockerRoom({ slug }),
      ])

      if (slugPrivateChannel) {
        const [
          { getMessagesByChannelSlug: privateItems },
          { getChannel: privateChannel },
        ] = await Promise.all([
          this.$api.getMessagesByChannelSlug(privateParams),
          this.$api.getChannel({ slug: slugPrivateChannel }),
        ])
        this.privateChats = privateItems.items
        this.$emit('setPrivateChannel', privateChannel)
        this.$store.dispatch(
          'locker-room/setLockerRoomPrivateChat',
          privateChannel
        )
      }

      const chats = []
      chats.push(...items)

      this.isSupported = getLockerRoom?.isSupported
      this.channel = getChannel
      this.lockerRoom = getLockerRoom
      this.chats = chats
      this.pageLoaded = true

      await this.$store.dispatch(
        'locker-room/setLockerRoomActive',
        this.lockerRoom
      )
      this.lockerRoomReply = null
    },
    fnDeleteReply({ chatID, deleteForEveryone, deleteForSelf, chats }) {
      map(chats, function (data) {
        if (data.repliedTo?.chatID === chatID) {
          data.repliedTo = {
            ...{
              isDeletedEveryone: deleteForEveryone,
              isDeletedSelf: deleteForSelf,
            },
            ...data.repliedTo,
          }
        }
      })
    },
    fnTypingMessage({ userName, status }) {
      this.socket.emit(
        'typing-message',
        {
          channelSlug:
            this.activeChat === 'public'
              ? this.channelSlug
              : this.privateChannel?.slug,
          userName,
          isTyping: status,
        },
        (resp) => {
          console.log(resp)
        }
      )
    },
    async reloadUnreadChats() {
      if (!this.isLoggedIn) return
      const {
        Me: { Supporting },
      } = await this.$api.getMyProfileSupporting()

      if (!Supporting) return
      const initialCount = []
      await Supporting?.map((data) => {
        return initialCount.push({
          slug: data.slug,
          totalUnreadMessagesCount: data.totalUnreadMessagesCount,
        })
      })
      await this.$store.dispatch(
        'notification/setLockerRoomCount',
        initialCount
      )
    },
    async fnRetrieveIsSupported() {
      try {
        const {
          getLockerRoom: { isSupported },
        } = await this.$api.getLockerRoomIsSupported({
          slug: this.$route.params?.slug,
        })
        this.isSupported = isSupported
      } catch (error) {
      } finally {
        this.setLockerRoomIsLoading(false)
      }
    },

    fnLeavePrivateChat(data) {
      this.$emit('setPrivateChannel', data)
    },
    signUp() {
      this.$router.push('/signup?step=1')
    },
    changeStep(step) {
      this.$emit('changeStep', step)
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>
<style lang="scss" scoped>
.xp-locker-room-channels {
  height: 100%;
}
.show .unsupported {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  position: absolute;
  bottom: 0;

  .unsupported-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background: #f85454;
    color: $white;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 16px;
  }
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    color: $dark-white;
  }
}
</style>
