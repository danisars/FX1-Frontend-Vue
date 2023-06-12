<template lang="pug">
XPMentions(
  :notifications="unreadNotifications || notifications",
  :is-retrieving="isRetrieving",
  :is-unread-only="isUnreadOnly"
)
</template>

<script>
import first from 'lodash/first'
import XPMentions from '~/components/pages/Mentions/Index.vue'
import meta from '~/mixins/meta'

export default {
  name: 'PageMentions',
  components: { XPMentions },
  mixins: [meta],
  layout: 'locker-room',
  data() {
    return {
      notifications: null,
      isRetrieving: true,
      unreadNotifications: null,
      isUnreadOnly: false,
    }
  },
  created() {
    this.metaTitle = 'Mentions & Replies'
  },
  async mounted() {
    await this.fnRetrieveNotifications()
    this.$root.$on('evtRtMarkAllAsRead', () => {
      this.fnMarkAllAsRead()
    })

    this.$root.$on('evtRtToggleNotifications', (isUnreadOnly) => {
      this.fnToggleNotifications(isUnreadOnly)
    })

    this.fnSeenNotifications()
  },
  methods: {
    async fnRetrieveNotifications() {
      // remove mention badge
      this.$store.commit('notification/setMentions', 0)
      // end
      this.isRetrieving = true
      try {
        const {
          getNotifications: { items },
        } = await this.$api.getNotifications({
          count: 100,
        })
        this.notifications = items
      } catch (error) {
      } finally {
        this.isRetrieving = false
      }
    },
    fnMarkAllAsRead() {
      this.notifications.map((x) => (x.isRead = true))
    },
    fnToggleNotifications(isUnreadOnly) {
      this.isUnreadOnly = isUnreadOnly
      if (isUnreadOnly) {
        const unreadOnly = this.notifications.filter((x) => x?.isRead === false)
        this.unreadNotifications = unreadOnly
        return
      }
      this.unreadNotifications = null
    },
    async fnSeenNotifications() {
      const firstNotification = first(this.notifications)

      try {
        await this.$api.seenNotification({
          lastNotificationID: firstNotification?.id,
        })
        this.$root.$emit('evtRtGetMyProfileDetails')
      } catch (error) {}
    },
  },
}
</script>
