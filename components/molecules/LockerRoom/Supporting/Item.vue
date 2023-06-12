<template lang="pug">
nuxt-link.xm-locker-room-supporting-item.item.row.justify-center(
  :class="[slug === $route.params.slug && 'active']",
  :to="`/locker-room/${slug}/${channelSlug}`",
  exact
)
  .avatar-supporting
    XAAvatar(:image="avatar", :name="name", :size="avatarSize")
    .has-notif(v-if="totalUnreadMessagesCount")
      b-tag(rounded, type="is-danger") {{ totalUnreadMessagesCount }}
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import find from 'lodash/find'

export default {
  name: 'XMLockerRoomSupportingItem',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      avatarSize: '50px',
    }
  },
  computed: {
    ...mapFields('notification', ['lockerRoomList']),
    ...mapFields('locker-room', ['lockerRoomActive']),
    slug() {
      return this.item?.slug || '/'
    },
    name() {
      return this.item?.name || null
    },
    channelSlug() {
      return this.item?.defaultChannelSlug || '/'
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
      const unRead = find(this.lockerRoomList, { slug: this.item?.slug })
      if (unRead)
        return unRead?.totalUnreadMessagesCount >= 100
          ? '99+'
          : unRead?.totalUnreadMessagesCount
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
    lockerRoomActiveSlug() {
      return this.lockerRoomActive?.slug || null
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
.xm-locker-room-supporting-item::v-deep {
  @include max-width(767px) {
    display: none;
  }
}
</style>
