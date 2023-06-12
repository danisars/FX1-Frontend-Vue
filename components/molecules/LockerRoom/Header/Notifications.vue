<template lang="pug">
.xm-locker-room-header-notifications
  .actions
    ._icon.row: img(src="~assets/images/LockerRoom/notification.svg")
    .has-notif
  .lists
</template>

<script>
export default {
  name: 'XMLockerRoomHeaderNotifications',
}
</script>

<style lang="scss" scoped>
.xm-locker-room-header-notifications::v-deep {
  .actions {
    position: relative;
    cursor: pointer;

    ._icon {
      opacity: 0.9;
      position: relative;
      z-index: 0;
    }

    .has-notif {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $primary;
      position: absolute;
      top: -1px;
      right: -1px;
      z-index: 1;
    }
  }
}
</style>
