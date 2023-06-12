<template lang="pug">
.xm-locker-room-supporting-item-mobile.item.row.justify-center(
  @click.prevent="$emit('click', $event)",
  :class="isActive && 'active'"
)
  .avatar-supporting
    XAAvatar(:image="avatar", :name="name", :size="avatarSize")
    .has-notif(v-if='totalUnreadMessagesCount')
      b-tag(rounded type='is-danger') {{totalUnreadMessagesCount}}
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import find from 'lodash/find'

export default {
  name: 'XMLockerRoomSupportingItemMobile',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  props: {
    item: { type: Object, default: () => {} },
  },
  data() {
    return {
      avatarSize: '50px',
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    ...mapFields('notification', ['lockerRoomList']),
    slug() {
      return this.item?.slug || '/'
    },
    name() {
      return this.item?.name || null
    },
    channelSlug() {
      return this.item?.defaultChannelSlug || '/'
    },
    lockerRoomActiveSlug() {
      return this.lockerRoomActive?.slug || null
    },
    isActive() {
      return this.slug === this.lockerRoomActiveSlug
    },
    club() {
      return this.item?.Club || null
    },
    league() {
      return this.item?.League || null
    },
    fanGroup() {
      return this.item?.FanGroup || null
    },
    totalUnreadMessagesCount() {
      const unRead =  find(this.lockerRoomList, { slug: this.item?.slug })
      if (unRead) return unRead?.totalUnreadMessagesCount >= 100 ? '99+' : unRead?.totalUnreadMessagesCount
      else return null
    },
    avatar() {
      return (
        this.club?.Avatar?.PhotoURL ||
        this.league?.Avatar?.PhotoURL ||
        this.fanGroup?.Avatar?.PhotoURL ||
        null
      )
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.fnCheckWindowSize)
  },
  mounted() {
    this.fnCheckWindowSize()
  },
  methods: {
    fnCheckWindowSize() {
      if (window.innerWidth < 1024) {
        this.avatarSize = '42px'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-locker-room-supporting-item-mobile::v-deep {
  display: none;

  @include max-width(767px) {
    display: flex;
  }
}
</style>
