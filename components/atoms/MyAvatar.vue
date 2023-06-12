<template lang="pug">
.xa-my-avatar: XAAvatar(
  v-bind="$attrs",
  :name="name || userNameDefault",
  :image="avatarURL || userAvatarDefault",
  v-if="name || avatarURL"
)
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XAMyAvatar',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  data() {
    return {
      userNameDefault: null,
      userAvatarDefault: null,
    }
  },
  computed: {
    ...mapFields('user', ['userProfile', 'userName', 'userAvatar']),
    name() {
      return (
        this.$store.state.user.userName ||
        this.userProfile?.username ||
        this.userProfile?.name ||
        this.$store.state.auth.displayName ||
        null
      )
    },
    avatarURL() {
      return (
        this.$store.state.user.userAvatar ||
        this.userProfile?.Avatar?.PhotoURL ||
        null
      )
    },
  },
  watch: {
    '$store.state.auth.token': {
      deep: true,
      handler() {
        this.userNameDefault =
          this.$store.state.user.userName || this.userProfile?.username
        this.userAvatarDefault =
          this.$store.state.user.userAvatar ||
          this.userProfile?.Avatar?.PhotoURL
      },
    },
  },
}
</script>

<style lang="scss" scoped>

.xa-my-avatar::v-deep{

  .xa-avatar{
    @include max-width(767px) {
      width: 24px !important;
      height: 24px !important;
    }
  }
}

</style>
