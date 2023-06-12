<template lang="pug">
.xp-user-invite
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
  name: 'PageUserInvite',
  async asyncData({ app, route }) {
    const id = route?.query?.accept
    try {
      let invitedUserExists
      const { getUserInvite } = await app.$api.getUserInvite({ id })
      if (!getUserInvite) return

      const type = getUserInvite.type

      if (type !== 'InviteToPrivateChannel') {
        ;({ invitedUserExists } = await app.$api.invitedUserExists({ id }))
      }
      return { invitedUserExists, getUserInvite, type, id }
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    ...mapFields('signup', ['email']),
  },
  async mounted() {
    // await this.authLogOut()
    if (!this.getUserInvite) {
      this.showErrorToast('Invalid invitation link')
      return
    }

    if (this.type === 'InviteToPrivateChannel') {
      if (this.isLoggedIn) {
        try {
          const { acceptInvitationToPrivateChannel } =
            await this.$api.acceptInvitationToPrivateChannel({
              token: this.id,
            })

          const redirectUrl = acceptInvitationToPrivateChannel.objectID
          const startIndex = redirectUrl.indexOf('io') + 2
          const substringUrl = redirectUrl.substring(startIndex)
          this.$router.push(substringUrl)
        } catch (e) {
          this.showError(e)
        }
        return
      }

      this.$router.push({
        name: `signup`,
        query: {
          step: 1,
          accept: this.id,
        },
      })
    } else {
      if (this.isLoggedIn) await this.authLogOut()
      if (this.invitedUserExists === undefined) {
        this.$store.dispatch('signup/setSignUpOwnerManagerInvite', null)
        this.showErrorToast('Invalid invitation link')
        return
      }
      await this.setSignUpOwnerManagerInvite(this.getUserInvite)
      const {
        data: { emailAddress },
      } = this.getUserInvite
      this.email = emailAddress
      if (this.invitedUserExists) {
        this.$router.push({
          path: '/signin',
        })
        return
      }
      this.$router.push({
        path: '/signup?step=1',
      })
      const params = { pageName: 'Invite manager', isLoggedIn: this.isLoggedIn }
      this.$mixpanelClient.trackViewPage(params)
    }
  },
  methods: {
    ...mapActions({
      authLogOut: 'auth/authLogOut',
      setSignUpOwnerManagerInvite: 'signup/setSignUpOwnerManagerInvite',
    }),
    showErrorToast(message) {
      this.$toast.error(message, {
        duration: 3000,
        position: 'top-center',
      })
      this.$router.push({
        path: '/',
      })
    },
    showError(e) {
      const message = e.toString()
      const findError = (error) => {
        if (message.includes(error)) {
          return message
        }
      }
      switch (message) {
        case findError('cannot create or join more'):
          this.$toast.error(
            'You cannot create or join more than one private group per game.',
            {
              duration: 5000,
              position: 'top-center',
            }
          )
          break

        default:
          break
      }

      this.$router.push({
        path: '/',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-user-invite::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  background-color: $white;
}
</style>
