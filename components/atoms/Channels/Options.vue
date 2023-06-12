<template lang="pug">
.xa-channels-options(:class="isSupported && 'is-supported'")
  template(v-if="isSupported")
    b-dropdown.channel-options(
      aria-role="list",
      position="is-bottom-left",
      append-to-body
    )
      template(#trigger="{ active }")
        b-icon(icon="dots-horizontal")
      b-dropdown-item(
        aria-role="listitem",
        @click="fnShowUnsupportToast()",
        v-if="lockerRoomRole === null"
      ) Unsupport club
      b-dropdown-item(
        aria-role="listitem",
        v-if="lockerRoomRole",
        @click="fnShowCreateChannel()"
      ) Rename channel
      b-dropdown-item(
        aria-role="listitem",
        v-if="lockerRoomRole === 'owner'",
        @click="fnShowRemoveChannel()"
      ) Delete channel
  template(v-else): b-icon(icon="dots-horizontal")
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XAChannelOptions',
  mixins: [dialogs],
  data() {
    return {
      unsupportClub: false,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    channel() {
      return this.$parent.channel || null
    },
    channelID() {
      return this.channel?.id || null
    },
    channelName() {
      return this.channel?.name || null
    },
    channelDescription() {
      return this.channel?.description || null
    },
    channelGroupID() {
      return this.channel?.channelGroupID || null
    },
    channelType() {
      return this.channel?.type || null
    },
    isSupported() {
      return this.lockerRoomActive?.isSupported || false
    },
    lockerRoomID() {
      return this.lockerRoomActive?.id || null
    },
    name() {
      return this.lockerRoomActive?.name || null
    },
    lockerRoomRole() {
      return this.lockerRoomActive?.MyRole?.role || null
    },
  },
  methods: {
    ...mapActions({
      deleteLockerRoomSupporting: 'locker-room/deleteLockerRoomSupporting',
    }),
    fnShowUnsupportToast() {
      this.unsupportClub = true
      this.$toast.success(`You're no longer supporting ${this.name}`, {
        duration: 5000,
        position: 'bottom-left',
        className: 'fx1-success',
        iconPack: 'mdi',
        icon: 'check-circle-outline',
        action: {
          text: 'Undo',
          onClick: (_, toastObject) => {
            this.unsupportClub = false
            toastObject.goAway(0)
          },
        },
        onComplete: () => {
          this.fnToggleSupportClub()
        },
      })
    },
    async fnToggleSupportClub() {
      if (!this.unsupportClub) return
      this.$router.push({
        path: '/locker-room/explore',
      })
      this.deleteLockerRoomSupporting(this.lockerRoomActive)
      try {
        const { lockerRoomID } = this
        await this.$api.unsupportClub({ lockerRoomID })
        this.$mixpanelClient.trackUnSupport({
          lockerRoom: this.lockerRoomActive,
          pageName: 'Locker room',
        })
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
    fnShowCreateChannel() {
      const {
        channelID,
        channelName,
        channelDescription,
        channelType,
        channelGroupID,
      } = this

      const details = {
        channelID,
        channelName,
        channelDescription,
        channelType,
        channelGroupID,
        isEditing: true,
      }

      this.fnShowCreateChannelDialog(details)
    },
    fnShowRemoveChannel() {
      const { channelID, channelName } = this
      const details = { channelID, channelName }
      this.fnShowDeleteChannelDialog(details)
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-channels-options::v-deep {
  cursor: pointer;
  opacity: 0.5;

  &.is-supported {
    opacity: 1;
  }
}
</style>
