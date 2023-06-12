<template lang="pug">
.xo-locker-room-supporters
  ._label.text-uppercase.text-weight-light Supporters

  .list
    XALockerRoomMember(
      v-for="(member, index) in supporters",
      :key="index",
      :member="member"
    )
</template>

<script>
import orderBy from 'lodash/orderBy'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XOLockerRoomSupporters',
  components: {
    XALockerRoomMember: () => import('~/components/atoms/LockerRoom/Member'),
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive', 'lockerRoomOnline']),
    userRole() {
      return this.lockerRoomActive?.role || null
    },
    roles() {
      return this.lockerRoomActive?.Roles || []
    },
    supporters() {
      const supporters = orderBy(
        this.roles?.Supporters,
        ['User.username'],
        ['asc']
      )
      return supporters || []
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-locker-room-supporters::v-deep {
  padding: 0 30px 30px;

  @include max-width(1024px) {
    padding: 0 20px 30px;
  }

  > ._label {
    opacity: 0.7;
    margin-bottom: 20px;
  }

  .list {
    .member {
      cursor: pointer;
      user-select: none;
      margin-bottom: 20px;

      > .name {
        padding: 0 15px;
        opacity: 0.5;
        font-size: 1.0714rem;
        line-height: 1.4286rem;
      }
    }
  }
}
</style>
