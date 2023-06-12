<template lang="pug">
.xd-delete-channel.card
  .card-content
    h3 Delete Channel
    .text-weight-light Are you sure you want to delete #[span.text-weight-medium {{ name }}]?

    .actions.row.justify-end
      b-button(type="is-primary", @click.prevent="fnShowDeleteChannelToast()") Delete
      b-button.ml-3(type="is-text", @click.prevent="$parent.close()") Cancel
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XDRemoveChannel',
  props: {
    details: { type: Object, default: () => {} },
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    name() {
      return this.details?.channelName || null
    },
    id() {
      return this.details?.channelID || null
    },
    lockerRoomSlug() {
      return this.lockerRoomActive?.slug || null
    },
    lockerRoomDefaultChannelSlug() {
      return this.lockerRoomActive?.defaultChannelSlug || null
    },
  },
  methods: {
    ...mapActions({
      setChannelDeleted: 'channels/setChannelDeleted',
      setChannelUndoDeleted: 'channels/setChannelUndoDeleted',
      clearChannelDeleted: 'channels/clearChannelDeleted',
    }),
    fnShowDeleteChannelToast() {
      this.fnDeleteChannel()
      this.setChannelDeleted(this.id)

      this.$toast.success(`Channel ${this.name} has been removed`, {
        duration: 5000,
        position: 'bottom-left',
        className: 'fx1-success',
        iconPack: 'mdi',
        icon: 'check-circle-outline',
        action: {
          text: 'Undo',
          onClick: (_, toastObject) => {
            this.setChannelUndoDeleted(this.id)
            toastObject.goAway(0)
            this.fnUndoDeleteChannel()
          },
        },
        onComplete: () => {
          this.$router.push({
            path: `/locker-room/${this.lockerRoomSlug}/${this.lockerRoomDefaultChannelSlug}`,
          })
        },
      })

      this.$parent.close()
    },
    async fnDeleteChannel() {
      try {
        const { id } = this
        await this.$api.deleteChannel({ id })
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
    async fnUndoDeleteChannel() {
      try {
        const { id } = this
        await this.$api.undeleteChannel({ id })
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
.xd-delete-channel::v-deep {
  .card-content {
    h3 {
      margin-bottom: 10px;
    }

    .actions {
      margin-top: 30px;

      .button {
        &.is-text {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
