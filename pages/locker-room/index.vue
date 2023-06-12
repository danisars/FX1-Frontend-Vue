<template lang="pug">
.xp-locker-room.col
  XOLockerRoomChannels
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'PageLockerRoom',
  components: {
    XOLockerRoomChannels: () =>
      import('~/components/organisms/LockerRoom/Channels'),
  },
  layout: 'locker-room',
  // asyncData({ store, redirect }) {
  //   const isLoggedIn = store.state.auth.isLoggedIn
  //   if (!isLoggedIn) return

  //   const supporting = store.state['locker-room']?.lockerRoomSupporting
  //   if (!supporting.length) return redirect('/locker-room/explore')
  // },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
  },
  mounted() {
    const params = { pageName: 'Locker room', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
  methods: {
    fnCheckWindowSize() {
      if (window.innerWidth >= 768) {
        this.$router.push({
          path: '/locker-room/explore',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-locker-room::v-deep {
  height: calc(var(--vh, 1vh) * 100 - 70px);

  .xo-locker-room-channels {
    display: block;
  }
}
</style>
