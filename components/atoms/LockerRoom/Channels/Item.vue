<template lang="pug">
.xa-locker-room-channels-item(
  :class="lockerRoomRole && 'management'",
  v-if="isDeleted"
)
  nuxt-link.row.items-center.channel-link(
    :class="[showOptions && 'has-options', unreadMessagesCount && 'has-unread-messages']",
    :to="`${liveStream ? `/locker-room/${lockerRoomSlug}/live/${channelSlug}`:`/locker-room/${lockerRoomSlug}/${channelSlug}` }`",
    exact
  )
    .details.row.items-center
      ._icon.row(v-if="!liveStream"): img(src="~assets/images/Club/channel.svg", alt="Channel")
      ._icon.row(v-else): img(src="~assets/images/Live/stream.svg", alt="Channel")
      ._label.col {{ channelName }}
      .tag.is-rounded.has-text-white(
        v-if="unreadMessagesCount",
        style="background-color: #ef5151; width: 25px; font-size: 10px"
      ) {{ unreadMessagesCount }}

    .actions(@click.prevent="", v-if="lockerRoomRole")
      b-dropdown.channel-options(
        aria-role="list",
        position="is-bottom-left",
        append-to-body
      )
        template(#trigger="{ active }")
          b-icon(icon="dots-horizontal")

        b-dropdown-item(aria-role="listitem", @click="fnShowCreateChannel()") Rename channel
        b-dropdown-item(
          aria-role="listitem",
          v-if="lockerRoomRole === 'owner'",
          @click="fnShowRemoveChannel()"
        ) Delete channel
</template>

<script>
import find from 'lodash/find'
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XALockerRoomChannelsItem',
  mixins: [dialogs],
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showOptions: false,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    ...mapFields('notification', ['notificationList']),
    ...mapFields('channels', ['channelDeleted']),
    channelName() {
      return this.item?.name || ''
    },
    channelSlug() {
      return this.item?.slug || '/'
    },
    channelID() {
      return this.item?.id || null
    },
    channelDescription() {
      return this.item?.description || null
    },
    channelType() {
      return this.item?.type || null
    },
    channelGroupID() {
      return this.item?.channelGroupID || null
    },
    lockerRoomSlug() {
      return this.lockerRoomActive?.slug || '/'
    },
    lockerRoomRole() {
      return this.lockerRoomActive?.role || null
    },
    liveStream() {
      return this.item?.Livestream || null

    },
    unreadMessagesCount() {
      const unRead = find(this.notificationList, { slug: this.channelSlug })
      return unRead
        ? unRead.unreadMessagesCount >= 99
          ? '99+'
          : unRead.unreadMessagesCount
        : 0
    },
    isDeleted() {
      return !this.channelDeleted.includes(this.channelID)
    },
  },
  methods: {
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
.xa-locker-room-channels-item::v-deep {
  a {
    padding: 10px 10px 10px 0;
    cursor: pointer;
    opacity: 0.5;
    color: $white !important;
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

    .details {
      width: 100%;

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
    }

    > .actions {
      margin-bottom: 0;
      visibility: hidden;
    }

    &.active {
      opacity: 1;

      &::before {
        background-color: $secondary;
      }

      > .actions {
        visibility: visible;
      }
    }

    &.has-unread-messages {
      opacity: 1;
    }
  }

  &.management {
    margin-bottom: 5px;

    a {
      padding: 7px 10px 7px 0;
    }
  }
}
</style>
