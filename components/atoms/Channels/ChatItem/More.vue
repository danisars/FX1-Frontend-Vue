<template lang="pug">
.xa-channels-chat-item-more.row.items-center
  b-dropdown.reply-to(
    aria-role="list",
    append-to-body,
    position="is-bottom-left",
    :mobile-modal="false"
  )
    template(#trigger="{ active }")
      b-icon(icon="dots-horizontal", style="opacity: 0.5")

    b-dropdown-item(@click="fnReplyTo()") Reply
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XAChannelsChatItemMore',
  props: {
    details: { type: Object, default: () => {} },
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomReply']),
  },
  methods: {
    fnReplyTo() {
      const { name, message, chatID, Media } = this.details
      this.lockerRoomReply = { name, text: message, chatID, Media }

      const element = document.getElementById('chat-input')
      element.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-channels-chat-item-more::v-deep {
  margin-top: 5px;
  margin-left: 15px;
  cursor: pointer;
  display: none;

  @include max-width(1180px) {
    display: block;
  }
}
</style>
