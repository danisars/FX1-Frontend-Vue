<template lang='pug'>
  .xd-delete-message.card
    .card-content
      h4 Delete message
      p.text-weight-light Are you sure you want to delete this message?

      .actions.flex-column.items-end
        b-button.btn-action.btn-delete(
          type="is-text",
          @click.prevent="fnDeleteForEveryone()"
        ) Delete for everyone
        b-button.btn-action.btn-delete(
          type="is-text",
          @click.prevent="fnDeleteForSelf()"
        ) Delete just for me
        b-button.btn-action.btn-cancel(
          type="is-text",
          @click.prevent="$parent.close()"
        ) Cancel
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'XDDeleteMessage',
  props: {
    details: {
      type: Object, default: () => {
      }
    }
  },
  computed: {
    chatID() {
      return this.details?.chatID || null
    }
  },
  methods: {
    ...mapActions({
      setChatDeletedForEveryone: 'chats/setChatDeletedForEveryone',
      setChatDeletedForSelf: 'chats/setChatDeletedForSelf'
    }),
    async fnDeleteForEveryone() {
      this.$parent.close()
      try {
        const params = {
          chatID: this.chatID,
          deleteForSelf: false,
          deleteForEveryone: true
        }

        await this.setChatDeletedForEveryone(this.chatID)
        this.$root.$emit('evtRtDeleteMessage', params)
      } catch (error) {
      }
    },
    async fnDeleteForSelf() {
      this.$parent.close()
      try {
        const params = {
          chatID: this.chatID,
          deleteForSelf: true,
          deleteForEveryone: false
        }

        await this.setChatDeletedForSelf(this.chatID)
        this.$root.$emit('evtRtDeleteMessage', params)
      } catch (error) {
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.xd-delete-message::v-deep {
  background-color: #08252c;
  color: $white;

  .card-content {
    padding: 25px 25px 10px;

    h4 {
      margin-bottom: 10px;
    }

    p {
      color: #c3cdcf;
    }

    .actions {
      margin-top: 30px;

      .btn-action {
        padding: 0;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 400;
        background-color: transparent;
        color: $white;
        outline: none;
        box-shadow: none;

        &:not(:last-child) {
          margin-bottom: 7px;
        }

        &.btn-delete {
          color: $primary;
        }
      }
    }
  }
}
</style>
