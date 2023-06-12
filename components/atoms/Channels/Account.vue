<template lang="pug">
.xa-channels-account(
  :class="isSupported && 'is-supported'",
  :title="isSupported && title",
  @click.prevent="fnToggleOnlineMembers()"
)
  b-icon(icon="account-multiple-outline")
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XAChannelsAccount',
  computed: {
    ...mapFields('app', ['showOnlineMembers']),
    ...mapFields('locker-room', ['lockerRoomActive']),
    title() {
      return this.showOnlineMembers ? 'Hide member list' : 'Show member list'
    },
    isSupported() {
      return this.lockerRoomActive?.isSupported || false
    },
  },
  methods: {
    fnToggleOnlineMembers() {
      if (!this.isSupported) return
      this.showOnlineMembers = !this.showOnlineMembers
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-channels-account::v-deep {
  opacity: 0.5;

  &.is-supported {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
