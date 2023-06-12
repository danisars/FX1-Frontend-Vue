<template lang="pug">
.xa-locker-room-header-search
  // search input goes here
  ._icon.row: img(
    src="~assets/images/LockerRoom/search.svg",
    alt="FX1 Search",
    width="18",
    height="18"
  )
</template>

<script>
export default {
  name: 'XALockerRoomHeaderSearch',
}
</script>

<style lang="scss" scoped>
.xa-locker-room-header-search::v-deep {
  ._icon {
    opacity: 0.5;
  }
}
</style>
