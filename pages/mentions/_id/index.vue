<template lang="pug">
XPMention(:notification-with-messages="notificationWithMessages")
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'
import XPMention from '~/components/pages/Mentions/Mention.vue'
import meta from '~/mixins/meta'

export default {
  components: { XPMention },
  mixins: [meta],
  layout: 'locker-room',
  async asyncData({ app, route }) {
    const id = route.params.id
    // const { getNotification } = await app.$api.getNotification({ id })

    const { getNotificationWithMessages } =
      await app.$api.getNotificationWithMessages({ id })

    return { notificationWithMessages: getNotificationWithMessages }
  },
  computed: {
    ...mapGetters({
      getUserProfile: 'user/getUserProfile',
    }),
  },
  created() {
    this.metaTitle = 'Mentions & Replies'
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

    this.fnReadNotification()
  },
  beforeDestroy() {
    this.$root.$off('evtRtSendMessage')
  },
  methods: {
    async fnReadNotification() {
      const ids = [this.$route.params?.id]

      try {
        await this.$api.readNotification({ notificationIDs: ids })
      } catch (error) {}
    },
    async fnSendMessage(message, reply, media, mentionsUserIDs) {
      const {
        getUserProfile: { username, name, id, Avatar },
      } = this

      const chat = {
        User: {
          username: username || name || 'FX1 User',
          Avatar,
          id,
        },
        chatID: uuidv4(),
        text: message,
        channelSlug: this.notificationWithMessages?.Notification?.channelSlug,
        lockerRoomSlug:
          this.notificationWithMessages?.Notification?.LockerRoom?.slug,
        repliedTo: reply
          ? {
              User: {
                username: reply?.name,
                id: reply?.id,
              },
              text: reply?.text,
              chatID: reply?.chatID,
              Media: reply?.Media.length ? reply?.Media : null,
            }
          : null,
        Media: media.length ? media : null,
        MentionedUserIDs: mentionsUserIDs,
      }

      await this.socket.emit('send-message', chat, (resp) => {
        console.log(resp)
      })

      this.$nextTick(() => {
        const {
          channelSlug,
          LockerRoom: { slug },
        } = this.notificationWithMessages?.Notification || {}
        this.$router.push({
          path: `/locker-room/${slug}/${channelSlug}`,
        })
      })
    },
  },
}
</script>
