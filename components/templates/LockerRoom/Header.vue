<template lang="pug">
.xt-locker-room-header.row
  XMLockerRoomHeaderLeft
  XMLockerRoomHeaderCenter
  .right-header
    client-only: XMLockerRoomHeaderRight
</template>

<script>
import XMLockerRoomHeaderLeft from '~/components/molecules/LockerRoom/Header/Left.vue'
import XMLockerRoomHeaderCenter from '~/components/molecules/LockerRoom/Header/Center.vue'
import XMLockerRoomHeaderRight from '~/components/molecules/LockerRoom/Header/Right.vue'

export default {
  name: 'XTLockerRoomHeader',
  components: {
    XMLockerRoomHeaderLeft,
    XMLockerRoomHeaderCenter,
    XMLockerRoomHeaderRight,
  },
}
</script>

<style lang="scss" scoped>
.xt-locker-room-header::v-deep {
  background-color: #2a4e55;
  min-height: 80px;
  position: sticky;
  top: 0;
  left: 0;
  padding: 0 40px;
  padding-right: 48px;
  padding-left: 48px;
  z-index: 11;

  @include max-width(1365px) {
    padding: 0 20px;
  }

  @include max-width(767px) {
    padding: 0 15px;
    min-height: 58px;
  }

}

.right-header{
  margin-left: auto;
}
</style>
