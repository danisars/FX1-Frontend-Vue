<template lang="pug">
.xd-permissions.card
  .card-content
    .close(@click.prevent="$parent.close()"): img(
      src="~assets/images/LockerRoom/close-secondary.svg"
    )

    form.flex-column.justify-between(
      action="#",
      autocomplete="off",
      @submit.prevent=""
    )
      .inputs.col
        h2 Permissions

        .owners
          XAPermissionsMember(
            v-for="(owner, index) in owners",
            :key="`${index}-owner`",
            :member="owner",
            role="owner"
          )

        .managers
          XAPermissionsMember(
            v-for="(manager, index) in managers",
            :key="`${index}-manager`",
            :member="manager",
            role="manager"
          )

      .actions
        b-button(
          type="is-primary",
          :loading="isSubmitting",
          @click.prevent="fnUpdatePermissions()"
        ) Save
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XDPermissions',
  components: {
    XAPermissionsMember: () => import('~/components/atoms/Permissions/Member'),
  },
  data() {
    return {
      isSubmitting: false,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive', 'lockerRoomPermissions']),
    lockerRoomID() {
      return this.lockerRoomActive?.id || null
    },
    roles() {
      return this.lockerRoomActive?.Roles || []
    },
    owners() {
      return this.roles?.Owners || []
    },
    ownersMapped() {
      const ownersMapped = this.owners.map((x) => {
        return { type: null, userID: x?.User?.id, role: 'owner' }
      })

      return ownersMapped
    },
    managers() {
      return this.roles?.Managers || []
    },
    managersMapped() {
      // type value = edit / delete
      const managersMapped = this.managers.map((x) => {
        return { type: null, userID: x?.User?.id, role: 'manager' }
      })

      return managersMapped
    },
  },
  mounted() {
    this.lockerRoomPermissions = this.ownersMapped.concat(this.managersMapped)
    const params = { pageName: 'Permissions', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
  methods: {
    async fnUpdatePermissions() {
      this.isSubmitting = true
      try {
        const { lockerRoomID } = this
        const input = this.lockerRoomPermissions.filter((x) => x?.type !== null)
        await this.$api.updateLockerRoomUserRoles({ lockerRoomID, input })

        this.$toast.success('Permissions changes saved', {
          duration: 5000,
          position: 'bottom-left',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'check-circle-outline',
          action: {
            text: 'Undo',
            onClick: (_, toastObject) => {
              toastObject.goAway(0)
              this.fnUndoUpdatePermissions()
            },
          },
        })

        this.$parent.close()

        // retrieve locker room details
        const { getLockerRoom } = await this.$api.getLockerRoom({
          slug: this.$route.params?.slug,
        })
        this.lockerRoomActive = getLockerRoom
        this.lockerRoomPermissions = []
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
      } finally {
        this.isSubmitting = false
      }
    },
    async fnUndoUpdatePermissions() {
      const ownersMapped = this.owners.map((x) => {
        if (x?.isPrimaryOwner) {
          return { type: null, userID: x?.User?.id, role: 'owner' }
        } else {
          return { type: 'edit', userID: x?.User?.id, role: 'owner' }
        }
      })

      const managersMapped = this.managers.map((x) => {
        return { type: 'edit', userID: x?.User?.id, role: 'manager' }
      })

      try {
        const { lockerRoomID } = this

        const editLockerRoomPermissions = ownersMapped.concat(managersMapped)
        const input = editLockerRoomPermissions.filter((x) => x?.type !== null)
        await this.$api.updateLockerRoomUserRoles({ lockerRoomID, input })

        // retrieve locker room details
        const { getLockerRoom } = await this.$api.getLockerRoom({
          slug: this.$route.params?.slug,
        })
        this.lockerRoomActive = getLockerRoom
        this.editLockerRoomPermissions = []
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
.xd-permissions::v-deep {
  .card-content {
    form {
      > .actions {
        margin-top: 50px;
      }
    }
  }
}
</style>
