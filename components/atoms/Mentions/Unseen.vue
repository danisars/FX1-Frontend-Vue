<template lang="pug">
.xa-mentions-unseen(v-if="isLoggedIn && unseenNotifications > 0")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'XAMentionsUnseen',
  computed: {
    ...mapGetters({
      getUserProfile: 'user/getUserProfile',
      isMentions: 'notification/getMentions'
    }),
    unseenNotifications() {
      return this.getUserProfile?.unseenNotifications || this.isMentions
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-mentions-unseen::v-deep {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: $primary;
  position: absolute;
  top: 15px;
  right: 18px;
  z-index: 1;
}
</style>
