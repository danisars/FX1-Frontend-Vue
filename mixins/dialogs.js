export default {
  methods: {
    fnShowClubRegistrationDialog() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/ClubRegistration').default,
        width: 500,
        canCancel: false,
      })
    },
    fnShowCreateChannelDialog(details = {}) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/CreateChannel').default,
        canCancel: false,
        customClass: 'right-dialog',
        width: 575,
        props: {
          details,
        },
      })
    },
    fnShowCreateChannelGroupDialog(details = {}) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/CreateChannelGroup').default,
        canCancel: false,
        customClass: 'right-dialog',
        width: 575,
        props: {
          details,
        },
      })
    },
    fnShowInviteManagersDialog() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/InviteManagers').default,
        canCancel: false,
        customClass: 'right-dialog',
        width: 575,
      })
    },
    fnShowCommunityRulesDialog(details = {}) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/CommunityRules').default,
        canCancel: false,
        customClass: 'right-dialog',
        width: 700,
        props: {
          details,
        },
      })
    },
    fnShowEditAvatarDialog(file) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/EditAvatar').default,
        canCancel: false,
        width: 575,
        props: {
          file,
        },
      })
    },
    fnShowRemoveManagerDialog(details) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/RemoveManager').default,
        canCancel: false,
        width: 450,
        props: {
          details,
        },
      })
    },
    fnShowPermissionsDialog() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/Permissions').default,
        canCancel: false,
        customClass: 'right-dialog',
        width: 700,
      })
    },
    fnShowDeleteChannelDialog(details) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/DeleteChannel').default,
        canCancel: false,
        width: 450,
        props: {
          details,
        },
      })
    },
    fnShowDeleteChannelGroupDialog(details) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/DeleteChannelGroup').default,
        canCancel: false,
        width: 450,
        props: {
          details,
        },
      })
    },
    fnShowDeleteMessageDialog(details) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/DeleteMessage').default,
        canCancel: false,
        width: 360,
        props: {
          details,
        },
      })
    },
    fnShowInvitationDialog(details) {
      const isMobile = window.innerWidth <= 427
      const modalWidth = isMobile ? 338 : 418

      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/Invitations').default,
        canCancel: false,
        width: modalWidth,
        props: {
          details,
        },
      })
    },
    fnShowLeaveGroupDialog(details) {
      const isMobile = window.innerWidth <= 427
      const modalWidth = isMobile ? 338 : 418

      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/LeaveGroup').default,
        canCancel: false,
        width: modalWidth,
        props: {
          details,
        },
      })
    },
  },
}
