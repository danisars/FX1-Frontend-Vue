<template lang="pug">
.xd-remove-manager.card
  .card-content
    h3 Remove Manager
    .text-weight-light Are you sure you want to remove #[span.text-weight-medium {{ name }}]?

    .actions.row.justify-end
      b-button(type="is-primary", @click.prevent="fnShowRemoveManagerToast()") Remove
      b-button.ml-3(type="is-text", @click.prevent="$parent.close()") Cancel
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XDRemoveManager',
  props: {
    details: { type: Object, default: () => {} },
  },
  data() {
    return {
      removeUser: false,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    name() {
      return this.details?.name || null
    },
    lockerRoomID() {
      return this.details?.lockerRoomID || null
    },
    userID() {
      return this.details?.memberID || null
    },
    role() {
      return this.details?.role.toLowerCase() || null
    },
    isPermission() {
      return this.details?.isPermission || false
    },
  },
  methods: {
    ...mapActions({
      setLockerRoomDeletedManagers: 'locker-room/setLockerRoomDeletedManagers',
      setLockerRoomUndoDeletedManagers:
        'locker-room/setLockerRoomUndoDeletedManagers',
      setLockerRoomPermissions: 'locker-room/setLockerRoomPermissions',
    }),
    async fnShowRemoveManagerToast() {
      if (this.isPermission) {
        const { userID, role } = this
        await this.setLockerRoomPermissions({ type: 'delete', userID, role })
      } else {
        await this.setLockerRoomDeletedManagers(this.userID)
        this.removeUser = true
      }

      this.$toast.success(`User ${this.name} removed`, {
        duration: 5000,
        position: 'bottom-left',
        className: 'fx1-success',
        iconPack: 'mdi',
        icon: 'check-circle-outline',
        action: {
          text: 'Undo',
          onClick: (_, toastObject) => {
            if (this.isPermission) {
              const { userID, role } = this
              this.setLockerRoomPermissions({ type: null, userID, role })
            } else {
              this.setLockerRoomUndoDeletedManagers(this.userID)
              this.removeUser = false
            }
            toastObject.goAway(0)
          },
        },
        onComplete: () => {
          this.fnRemoveManager()
        },
      })

      this.$parent.close()
    },
    async fnRemoveManager() {
      if (!this.removeUser) return
      try {
        const { lockerRoomID, userID, role } = this
        await this.$api.removeUserManagerialRole({ lockerRoomID, userID, role })

        // retrieve locker room details
        const { getLockerRoom } = await this.$api.getLockerRoom({
          slug: this.$route.params?.slug,
        })
        this.lockerRoomActive = getLockerRoom
        this.$root.$emit('evtRtGetMyProfileDetails')
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.success(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-remove-manager::v-deep {
  .card-content {
    h3 {
      margin-bottom: 10px;
    }

    .actions {
      margin-top: 30px;

      .button {
        &.is-text {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
