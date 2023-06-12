<template lang="pug">
.xo-locker-room-management
  ._label.text-uppercase.text-weight-light Management

  .list
    XALockerRoomMember(
      v-for="(member, index) in owners",
      :key="`${index}-owner`",
      :member="member"
    )

    XALockerRoomMember(
      v-for="(member, index) in managers",
      :key="`${index}-manager`",
      :member="member"
    )

  .invite-managers.row(
    @click.prevent="fnShowInviteManagersDialog()",
    v-if="lockerRoomRole"
  )
    ._icon.row: img(
      src="~assets/images/LockerRoom/add.svg",
      alt="Invite managers"
    )
    ._label Invite managers
</template>

<script>
import orderBy from 'lodash/orderBy'
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XOLockerRoomManagement',
  components: {
    XALockerRoomMember: () => import('~/components/atoms/LockerRoom/Member'),
  },
  mixins: [dialogs],
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive', 'lockerRoomOnline']),
    lockerRoomRole() {
      return this.lockerRoomActive?.MyRole || null
    },
    roles() {
      return this.lockerRoomActive?.Roles || []
    },
    owners() {
      const owners = orderBy(
        this.roles?.Owners,
        ['isPrimaryOwner', 'User.username'],
        ['desc', 'asc']
      )
      return owners || []
    },
    managers() {
      const managers = orderBy(this.roles?.Managers, ['User.username'], ['asc'])
      return managers || []
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-locker-room-management::v-deep {
  padding: 30px;

  @include max-width(1024px) {
    padding: 30px 20px;
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

  .invite-managers {
    font-size: 1.0714rem;
    line-height: 1.4286rem;
    font-weight: 300;
    margin-left: 5px;
    margin-top: 25px;
    cursor: pointer;

    ._icon {
      margin-right: 20px;
      margin-top: -2px;
      opacity: 0.3;
    }

    ._label {
      opacity: 0.5;
    }
  }
}
</style>
