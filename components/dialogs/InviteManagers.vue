<template lang="pug">
.xd-invite-managers.card
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
        h2 Invite managers
        template(v-for="(manager, index) in managers")
          .mb-5.row
            .email.col: XAFormsInput(
              v-model="manager.emailAddress",
              placeholder="Email",
              @enter="fnSendInvites()"
            )
            .role: XAFormsSelect(
              v-model="manager.role",
              :options="lockerRoomRole === 'manager' ? optionsManager : optionsOwner"
            )

        .add-more.row.items-center(@click.prevent="fnAddMoreManagers()")
          ._icon: img(src="~assets/images/Club/add-secondary.svg")
          .value Add more
      .actions
        b-button(
          type="is-primary",
          :disabled="isDisabledSendInvites",
          :loading="isSubmitting",
          @click.prevent="fnSendInvites()"
        ) Send Invites
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XDInviteManagers',
  components: {
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
    XAFormsSelect: () => import('~/components/atoms/Forms/Select'),
  },
  data() {
    return {
      managers: [{ emailAddress: '', role: 'manager' }],
      optionsOwner: [
        { label: 'Owner', value: 'owner' },
        { label: 'Manager', value: 'manager' },
      ],
      optionsManager: [{ label: 'Manager', value: 'manager' }],
      isSubmitting: false,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    isDisabledSendInvites() {
      const hasEmail = this.managers.some((x) => x.email === '')
      return hasEmail
    },
    lockerRoomID() {
      return this.lockerRoomActive?.id || null
    },
    lockerRoomRole() {
      return this.lockerRoomActive?.MyRole?.role || null
    },
  },
  mounted() {
    this.clearLockerRoomDeletedManagers()
    const params = { pageName: 'Invite Managers', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
  methods: {
    ...mapActions({
      clearLockerRoomDeletedManagers:
        'locker-room/clearLockerRoomDeletedManagers',
    }),
    fnAddMoreManagers() {
      if (this.managers.some((x) => x.emailAddress === '')) {
        this.$toast.error('Please fill up email field', {
          duration: 3000,
          position: 'top-center',
        })
        return
      }
      // if (this.managers.length >= 5) {
      //   this.$toast.success('Only 5 emails max per send invites', {
      //     duration: 3000,
      //     position: 'top-center',
      //   })
      //   return
      // }
      this.managers.push({
        emailAddress: '',
        role: 'manager',
      })
    },
    async fnSendInvites() {
      this.isSubmitting = true

      try {
        // send invite to user
        const { lockerRoomID } = this
        const input = this.managers
        await this.$api.inviteUserForManagerialRole({ lockerRoomID, input })

        this.$toast.success(`Awesome, your invite has been successfully sent`, {
          duration: 5000,
          position: 'bottom-left',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'email-outline',
        })

        this.$parent.close()

        // retrieve locker room details
        const { getLockerRoom } = await this.$api.getLockerRoom({
          slug: this.$route.params?.slug,
        })
        this.lockerRoomActive = getLockerRoom
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
  },
}
</script>

<style lang="scss" scoped>
.xd-invite-managers::v-deep {
  .card-content {
    form {
      .inputs {
        .email {
          margin-right: 8px;
        }

        .role {
          width: 100%;
          max-width: 150px;
        }

        .add-more {
          color: $secondary;
          opacity: 0.5;
          text-transform: uppercase;
          cursor: pointer;
          user-select: none;

          ._icon {
            margin-top: 2px;
            margin-right: 10px;
          }
        }
      }

      > .actions {
        margin-top: 50px;
      }
    }
  }
}
</style>
