<template lang="pug">
.xa-locker-room-member.member.row.items-center.justify-between(
  v-if="isDeleted || role === 'supporter'"
)
  .left-content
    XAAvatar(:image="avatarURL", :name="name", size="36px")
    .is-online(v-if="isOnline")

  .center-content.col(:style="{ opacity: isOnline ? 1 : 0.5 + '!important' }")
    .name.text-weight-light {{ name }}
    .role.text-weight-light(v-if="role !== 'supporter'") {{ role }}
  .right-content(
    v-if="role !== 'supporter' && !isMe && lockerRoomRole === 'owner' && !isPrimaryOwner"
  )
    b-dropdown.managers-menu(
      aria-role="list",
      position="is-bottom-left",
      append-to-body
    )
      template(#trigger="{ active }")
        b-icon(icon="dots-horizontal")
      b-dropdown-item(
        aria-role="listitem",
        @click="fnShowRemoveManagerDialog({ name, lockerRoomID, memberID, role })"
      ) Remove
      b-dropdown-item(aria-role="listitem", @click="fnShowPermissionsDialog()") Edit permissions
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XALockerRoomMember',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  mixins: [dialogs],
  props: {
    member: {
      type: Object,
      default: () => {},
    },
    online: { type: Array, default: () => [] },
  },
  computed: {
    ...mapFields('locker-room', [
      'lockerRoomActive',
      'lockerRoomOnline',
      'lockerRoomDeletedManagers',
    ]),
    ...mapFields('user', ['userProfile']),
    user() {
      return this.member?.User || null
    },
    avatarURL() {
      return this.user?.Avatar?.PhotoURL || null
    },
    name() {
      return this.user?.username || this.user?.name || 'FX1 Member' || null
    },
    onlineUsers() {
      const onlineUsers = this.lockerRoomOnline
        ? this.lockerRoomOnline.map((e) => {
            return e?.User?.username
          })
        : []

      return onlineUsers
    },
    isOnline() {
      return this.onlineUsers.includes(this.name)
    },
    memberID() {
      return this.user?.id || null
    },
    userID() {
      return this.userProfile?.id || null
    },
    isMe() {
      return this.memberID === this.userID
    },
    lockerRoomID() {
      return this.lockerRoomActive?.id || null
    },
    lockerRoomMyRole() {
      return this.lockerRoomActive?.MyRole || null
    },
    lockerRoomRole() {
      return this.lockerRoomMyRole?.role || null
    },
    isDeleted() {
      return !this.lockerRoomDeletedManagers.includes(this.memberID)
    },
    isPrimaryOwner() {
      return this.member?.isPrimaryOwner || false
    },
    role() {
      return this.member?.role || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-locker-room-member::v-deep {
  cursor: pointer;
  user-select: none;
  margin-bottom: 20px;

  .left-content {
    position: relative;

    .is-online {
      background-color: #2ddc1e;
      width: 12px;
      height: 12px;
      border: 2px solid #08252c;
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  .center-content {
    padding: 0 15px;
    opacity: 0.5;

    .name {
      font-size: 1.0714rem;
      line-height: 1.4286rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .role {
      font-size: 0.8571rem;
      line-height: 1rem;
      text-transform: capitalize;
    }
  }

  .right-content {
    .icon {
      opacity: 0.5;
    }
  }
}
</style>
