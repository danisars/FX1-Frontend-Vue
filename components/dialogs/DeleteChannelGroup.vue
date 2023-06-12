<template lang="pug">
.xd-delete-channel-group.card
  .card-content
    h3 Delete Channel Group
    .text-weight-light Are you sure you want to delete #[span.text-weight-medium {{ name }}] channel group?

    .actions.row.justify-end
      b-button(
        type="is-primary",
        @click.prevent="fnShowDeleteChannelGroupToast()"
      ) Delete
      b-button.ml-3(type="is-text", @click.prevent="$parent.close()") Cancel
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XDDeleteChannelGroup',
  props: {
    details: { type: Object, default: () => {} },
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    id() {
      return this.details?.channelGroupID || null
    },
    name() {
      return this.details?.groupName || null
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
      setChannelGroupDeleted: 'channels/setChannelGroupDeleted',
      setChannelGroupUndoDeleted: 'channels/setChannelGroupUndoDeleted',
    }),
    fnShowDeleteChannelGroupToast() {
      this.fnDeleteChannelGroup()
      this.setChannelGroupDeleted(this.id)

      this.$toast.success(`Channel group ${this.name} has been removed`, {
        duration: 5000,
        position: 'bottom-left',
        className: 'fx1-success',
        iconPack: 'mdi',
        icon: 'check-circle-outline',
        action: {
          text: 'Undo',
          onClick: (_, toastObject) => {
            this.setChannelGroupUndoDeleted(this.id)
            toastObject.goAway(0)
            this.fnUndoDeleteChannelGroup()
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
    async fnDeleteChannelGroup() {
      try {
        const { id } = this
        await this.$api.deleteChannelGroup({ id })
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
    async fnUndoDeleteChannelGroup() {
      try {
        const { id } = this
        await this.$api.undeleteChannelGroup({ id })
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
.xd-delete-channel-group::v-deep {
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
