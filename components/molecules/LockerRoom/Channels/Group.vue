<template lang="pug">
.xm-locker-room-channels-group(v-if="isDeleted")
  .actions.row.items-center.justify-between(
    :class="[activeGroup && 'active-group']",
    @click.prevent.self="isOpen = !isOpen"
  )
    ._label.text-uppercase.col(@click.prevent="isOpen = !isOpen") {{ groupName }}
    .options.row(v-if="lockerRoomRole && activeGroup")
      b-dropdown.channel-options(
        aria-role="list",
        position="is-bottom-left",
        append-to-body
      )
        template(#trigger="{ active }")
          b-icon(icon="dots-horizontal")

        b-dropdown-item(
          aria-role="listitem",
          @click="fnShowEditChannelGroup()"
        ) Rename channel group
        b-dropdown-item(
          aria-role="listitem",
          @click="fnShowDeleteChannelGroup()"
        ) Delete channel group
    ._icon.row(@click.prevent="isOpen = !isOpen"): b-icon(
      :icon="isOpen ? 'chevron-up' : 'chevron-down'"
    )
  .channels(v-if="isOpen")
    XALockerRoomChannelsItem(
      v-for="(item, index) in channels",
      :key="index",
      :item="item"
    )
    .channel.add-channel.row.items-center(
      @click.prevent="fnCheckChannelCount()",
      v-if="isSupported && lockerRoomRole !== null"
    )
      ._icon: img(src="~assets/images/LockerRoom/add.svg", alt="Add channel")
      ._label Add channel
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'
import XALockerRoomChannelsItem from '~/components/atoms/LockerRoom/Channels/Item.vue'

export default {
  name: 'XMLockerRoomChannelsGroup',
  components: {
    XALockerRoomChannelsItem,
  },
  mixins: [dialogs],
  props: {
    channelGroup: { type: Object, default: () => {} },
    slug: { type: String, default: null },
  },
  data() {
    return {
      isOpen: true,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    ...mapFields('channels', ['channelActive', 'channelGroupDeleted']),
    groupName() {
      return this.channelGroup?.name || ''
    },
    channels() {
      return this.channelGroup?.Channels || []
    },
    channelGroupID() {
      return this.channelGroup?.id || null
    },
    isSupported() {
      return this.lockerRoomActive?.isSupported || false
    },
    channelCount() {
      return this.lockerRoomActive?.channelCount || 0
    },
    channelActiveGroupID() {
      return this.channelActive?.channelGroupID || null
    },
    lockerRoomRole() {
      return this.lockerRoomActive?.MyRole?.role || null
    },
    activeGroup() {
      if (!this.lockerRoomRole) return
      return this.channelGroupID === this.channelActiveGroupID
    },
    isDeleted() {
      return !this.channelGroupDeleted.includes(this.channelGroupID)
    },
  },
  methods: {
    fnCheckChannelCount() {
      if (this.channelCount >= 150) {
        this.$toast.success('You have reached the number of channels created', {
          duration: 5000,
          position: 'bottom-left',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'alert-circle-outline',
        })
        return
      }

      const { channelGroupID } = this

      const details = {
        channelGroupID,
      }

      this.fnShowCreateChannelDialog(details)
    },
    fnShowEditChannelGroup() {
      const { groupName, channelGroupID } = this
      const details = { groupName, channelGroupID, isEditing: true }
      this.fnShowCreateChannelGroupDialog(details)
    },
    fnShowDeleteChannelGroup() {
      const { groupName, channelGroupID } = this
      const details = { groupName, channelGroupID }
      this.fnShowDeleteChannelGroupDialog(details)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-locker-room-channels-group::v-deep {
  user-select: none;
  margin-bottom: 30px;

  > .actions {
    opacity: 0.7;
    cursor: pointer;
    margin-bottom: 10px;
    position: relative;
    padding: 9.5px 10px 9.5px 0;

    &::before {
      content: '';
      background-color: transparent;
      position: absolute;
      top: 0;
      left: -12px;
      border-radius: 5px;
      width: calc(100% + 12px);
      height: 100%;
      z-index: 0;
    }

    ._label,
    ._icon,
    .options {
      position: relative;
      z-index: 1;
    }

    ._label {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .options {
      margin: 0 7px 0 10px;
      height: 20px;
    }

    &.active-group {
      &::before {
        background-color: $secondary;
      }
    }
  }

  .channels {
    .channel {
      padding: 7.5px 0;
      cursor: pointer;
      opacity: 0.3;
      color: $white;
      position: relative;

      &::before {
        content: '';
        background-color: transparent;
        position: absolute;
        top: 0;
        left: -12px;
        border-radius: 5px;
        width: calc(100% + 12px);
        height: 100%;
        z-index: 0;
      }

      ._icon {
        font-size: 22px;
        line-height: 1;
        margin-right: 10px;

        .hash-tag {
          margin-top: 3px;
        }

        .lock {
          margin-top: 2px;
        }
      }

      ._label {
        font-size: 1.0714rem;
        line-height: 1.4286rem;
        padding-right: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      ._icon,
      ._label {
        position: relative;
        z-index: 1;
      }

      &.active {
        opacity: 1;

        &::before {
          background-color: $secondary;
        }
      }
    }
  }
}
</style>
