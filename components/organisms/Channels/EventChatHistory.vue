<template lang="pug">
.xo-channel-chat-history.flex-column(@contextmenu.prevent="")
  infinite-loading(
    direction="top",
    :distance="300",
    @infinite="fnRetrieveNextChats",
    ref="infiniteLoading",
    v-show="(chats.length >= 10 && showInfiniteLoading) || !filteredLocalChats.length"
  )
    div(slot="spinner"): XAChannelsChatLoader
    div(slot="no-more")
    div(slot="no-results")
  XMChannelsChatItem(
    v-for="(addedChat, index) in filteredAddedChats",
    :key="`${index}-added-chat`",
    :chat="addedChat",
    :scroll-to-bottom="false"
  )
  XMChannelsChatItem(
    v-for="(chat, index) in filteredLocalChats",
    :key="`${index}-chat`",
    :chat="chat",
    :is-last="index === filteredLocalChats.length - 1"
  )
  XAChannelsTyping(:users-typing="usersTyping")
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'

export default {
  name: 'XOChannelsChatHistory',
  components: {
    XMChannelsChatItem: () =>
      import('~/components/molecules/Channels/ChatItem'),
    XAChannelsChatLoader: () =>
      import('~/components/atoms/Channels/ChatLoader'),
    XAChannelsTyping: () => import('~/components/atoms/Channels/Typing'),
  },
  props: {
    chats: { type: Array, default: () => [] },
    showInfiniteLoading: { type: Boolean, default: false },
    usersTyping: { type: Array, default: () => [] },
    channelSlug: { type: String, default: '' },
  },
  data() {
    return {
      cursor: 10,
      addedChats: [],
      localChats: this.chats || [],
    }
  },
  computed: {
    ...mapFields('messages', ['messageNext']),
    ...mapFields('user', ['userProfile', 'userID']),
    ...mapGetters({
      getChatDeletedForEveryone: 'chats/getChatDeletedForEveryone',
      getChatDeletedForSelf: 'chats/getChatDeletedForSelf',
    }),
    filteredLocalChats() {
      const deletedEveryoneChats = this.localChats.filter((x) => {
        return (
          !x?.isDeletedEveryone &&
          !this.getChatDeletedForEveryone.includes(x?.chatID)
        )
      })

      const deletedSelfChats = deletedEveryoneChats.filter((x) => {
        if (x?.User?.id === this.userID) {
          return (
            !x?.isDeletedSelf && !this.getChatDeletedForSelf.includes(x?.chatID)
          )
        }

        return x
      })

      return deletedSelfChats
    },
    filteredAddedChats() {
      const deletedEveryoneChats = this.addedChats.filter((x) => {
        return (
          !x?.isDeletedEveryone &&
          !this.getChatDeletedForEveryone.includes(x?.chatID)
        )
      })

      const deletedSelfChats = deletedEveryoneChats.filter((x) => {
        if (x?.User?.id === this.userID) {
          return (
            !x?.isDeletedSelf && !this.getChatDeletedForSelf.includes(x?.chatID)
          )
        }

        return x
      })

      return deletedSelfChats
    },
  },
  watch: {
    chats: {
      deep: true,
      handler(newV) {
        this.cursor = 10
        this.addedChats = []
        this.localChats = newV
        this.fnRetrieveNextChats(this.$refs.infiniteLoading.stateChanger, true)
      },
    },
  },

  mounted() {
    this.$root.$on('evtRtUpdateChatList', (chat) => {
      const indexLocalChats = this.localChats.findIndex((x) => {
        return x?.chatID === chat?.chatID
      })

      const indexAddedChats = this.addedChats.findIndex((x) => {
        return x?.chatID === chat?.chatID
      })

      if (this.localChats[indexLocalChats]) {
        this.localChats[indexLocalChats].text = chat?.text
        this.localChats[indexLocalChats].isEdited = chat?.isEdited
      }

      if (this.addedChats[indexAddedChats]) {
        this.addedChats[indexAddedChats].text = chat?.text
        this.addedChats[indexAddedChats].isEdited = chat?.isEdited
      }
    })
  },
  methods: {
    async fnRetrieveNextChats($state, reset = false) {
      if (reset) {
        $state.reset()
        return
      }
      try {
        const params = {
          channelSlug: this.channelSlug,
          count: 10,
          cursor: this.cursor,
        }
        const {
          getMessagesByChannelSlug: { items, next },
        } = await this.$api.getMessagesByChannelSlug(params)

        this.cursor = next

        if (items.length) {
          if (this.filteredLocalChats.length) {
            this.addedChats.unshift(...items)
          } else {
            this.localChats.unshift(...items)
          }
          $state.loaded()
          return
        }
        $state.complete()
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.success(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-channel-chat-history::v-deep {
  min-height: 100%;

  .infinite-loading-container {
    margin-bottom: 20px;
  }
}
</style>
