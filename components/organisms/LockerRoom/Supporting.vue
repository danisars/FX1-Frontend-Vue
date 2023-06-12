<template lang="pug">
.xo-locker-room-supporting
  XMLockerRoomSupportingItem(
    v-for="(item, index) in supporting",
    :key="index",
    :item="item"
  )

  XMLockerRoomSupportingItemMobile(
    v-for="(item, index) in supporting",
    :key="`${index}-mobile`",
    :item="item",
    @click="fnShowLockerRoomChannels(item)"
  )
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import XMLockerRoomSupportingItem from '~/components/molecules/LockerRoom/Supporting/Item.vue'
import XMLockerRoomSupportingItemMobile from '~/components/molecules/LockerRoom/Supporting/ItemMobile.vue'

export default {
  name: 'XOLockerRoomSupporting',
  components: {
    XMLockerRoomSupportingItem,
    XMLockerRoomSupportingItemMobile,
  },
  props: {
    supporting: { type: Array, default: () => [] },
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
  },
  methods: {
    fnShowLockerRoomChannels(item) {
      this.lockerRoomActive = item
    },
  },
}
</script>
