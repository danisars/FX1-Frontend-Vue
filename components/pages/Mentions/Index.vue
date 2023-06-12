<template lang="pug">
.xp-mentions.flex-column.col
  XOMentionsHeader(:notifications="notifications")
  .mentions-list(v-if="!isRetrieving")
    template(v-if="notifications.length")
      XMMentionsListItem(
        v-for="(notification, index) in notifications",
        :key="index",
        :notification="notification"
      )
    template(v-else)
      .no-mentions-replies {{ isUnreadOnly ? 'No unread mentions or replies' : 'No new mentions or replies' }}
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import XOLockerRoomChannels from '~/components/organisms/LockerRoom/Channels.vue'
import XOMentionsHeader from '~/components/organisms/Mentions/Header.vue'
import XMMentionsListItem from '~/components/molecules/Mentions/ListItem.vue'

export default {
  name: 'XPMentions',
  components: { XOLockerRoomChannels, XOMentionsHeader, XMMentionsListItem },
  props: {
    notifications: { type: Array, default: () => [] },
    isRetrieving: { type: Boolean, default: true },
    isUnreadOnly: { type: Boolean, default: false },
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
  },
}
</script>

<style lang="scss" scoped>
.xp-mentions::v-deep {
  .mentions-list {
    overflow-y: auto;
    height: calc(var(--vh, 1vh) * 100 - 215px);
    scrollbar-width: thin;
    scrollbar-color: #08252c $secondary;
    scrollbar-base-color: #08252c;
    padding: 16px 30px;
    width: 100%;

    @include max-width(767px) {
      padding: 16px 20px;
      height: calc(var(--vh, 1vh) * 100 - 176px);
    }

    &::-webkit-scrollbar {
      width: 15px;
    }

    &::-webkit-scrollbar-track {
      background-color: $secondary;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #08252c;
      border-radius: 10px;
      border: 3px solid $secondary;
    }

    &::-webkit-scrollbar-thumb:vertical:hover {
      background-color: #08252c;
    }

    .no-mentions-replies {
      font-weight: 300;
      color: #94a6aa;
    }
  }
}
</style>
