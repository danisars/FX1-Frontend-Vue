<template lang="pug">
.xa-permissions-member.row.items-center(v-if="isRemoving")
  .details.row.items-center.col
    XAAvatar(:image="avatar", :name="name")
    h4._name {{ name }}
  .actions.row.items-center(v-if="role && !isMe && !isPrimaryOwner")
    XAFormsSelect(
      v-model="memberRole",
      :options="options",
      @input="setLockerRoomPermissions({ type: 'edit', userID: memberID, role: memberRole })"
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
        @click="fnShowRemoveManagerDialog({ name, memberID, role, isPermission: true })"
      ) Remove
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XAPermissionsMember',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
    XAFormsSelect: () => import('~/components/atoms/Forms/Select'),
  },
  mixins: [dialogs],
  props: {
    member: { type: Object, default: () => {} },
    role: { type: String, default: '' },
  },
  data() {
    return {
      options: [
        { label: 'Owner', value: 'owner' },
        { label: 'Manager', value: 'manager' },
      ],
      memberRole: this.role || null,
    }
  },
  computed: {
    ...mapFields('user', ['userProfile']),
    ...mapFields('locker-room', ['lockerRoomPermissions']),
    user() {
      return this.member?.User || null
    },
    name() {
      return this.user?.name || this.user?.username || 'FX1 Member'
    },
    avatar() {
      return this.user?.Avatar?.PhotoURL || null
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
    isRemoving() {
      const isRemoving = this.lockerRoomPermissions.filter(
        (x) => x.userID === this.memberID
      )

      return isRemoving[0]?.type !== 'delete'
    },
    isPrimaryOwner() {
      return this.member?.isPrimaryOwner || false
    },
  },
  methods: {
    ...mapActions({
      setLockerRoomPermissions: 'locker-room/setLockerRoomPermissions',
    }),
  },
}
</script>

<style lang="scss" scoped>
.xa-permissions-member::v-deep {
  min-height: 88px;
  background-color: #f8f8f8;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px 30px;

  .details {
    ._name {
      margin-left: 15px;
      color: $secondary;
    }
  }

  .actions {
    .xa-forms-select {
      .field {
        .control {
          .select {
            select {
              background-color: transparent;
            }
          }
        }
      }
    }

    .managers-menu {
      margin-left: 10px;

      .dropdown-trigger {
        .icon {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
