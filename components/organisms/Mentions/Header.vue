<template lang="pug">
.xo-mentions-header
  .main.row.items-center(v-if="routeName === 'mentions-id'")
    .back.row(@click.prevent="fnGoBack()"): img(
      src="~assets/images/LockerRoom/back.svg"
    )
    template(v-if="notificationType === 'Reply'")
      h3 Reply
    template(v-else)
      h3 Mention
  .main.row.items-center.justify-between(v-else)
    h3 Mentions & Replies
    //- .mark-as-read.text-weight-light(@click.prevent="fnMarkAllAsRead()") Mark All As Read
    b-button.mark-as-read(
      :loading="isSubmitting",
      type="is-text",
      @click.prevent="fnMarkAllAsRead()"
    ) Mark All As Read

  .sub.row.items-center.justify-between(v-if="routeName === 'mentions'")
    div Show unread only
    .actions
      b-field.toggle-read: b-switch(v-model="unreadOnly")
</template>

<script>
export default {
  name: 'XOMentionsHeader',
  props: {
    notifications: { type: Array, default: () => [] },
    notificationType: { type: String, default: '' },
  },
  data() {
    return {
      unreadOnly: false,
      isSubmitting: false,
    }
  },
  computed: {
    routeName() {
      return this.$route?.name || null
    },
    notificationIDs() {
      const notificationsIDs = this.notifications.map((x) => x?.id)
      return notificationsIDs
    },
  },
  watch: {
    unreadOnly: {
      deep: true,
      handler(value) {
        if (value) {
          this.$root.$emit('evtRtToggleNotifications', true)
          return
        }

        this.$root.$emit('evtRtToggleNotifications', false)
      },
    },
  },
  methods: {
    fnGoBack() {
      this.$router.push({
        path: '/mentions',
      })
    },
    async fnMarkAllAsRead() {
      this.isSubmitting = true
      const { notificationIDs } = this

      try {
        await this.$api.readNotification({ notificationIDs })
        this.$root.$emit('evtRtMarkAllAsRead')
      } catch (error) {
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-mentions-header::v-deep {
  width: 100%;

  .main {
    min-height: 85px;
    border-bottom: 1px solid rgba(#e7e8e8, 0.2);
    padding: 0 30px;

    @include max-width(767px) {
      min-height: 56px;
      padding: 0 20px;
    }

    .back {
      cursor: pointer;
      margin-right: 15px;
    }

    .mark-as-read {
      cursor: pointer;
      user-select: none;
      color: $white;
      font-weight: 300;
      text-decoration: none;
      background-color: transparent;
      outline: none;
      box-shadow: none;
    }
  }

  .sub {
    min-height: 50px;
    border-bottom: 1px solid rgba(#e7e8e8, 0.2);
    padding: 0 30px;

    @include max-width(767px) {
      padding: 0 20px;
    }

    .actions {
      .toggle-read {
        .switch {
          input[type='checkbox'] {
            &:checked {
              + .check {
                background-color: #886bf2;
                box-shadow: 0 0 0.5em rgba(#886bf2, 0.8);
              }
            }
          }
        }
      }
    }
  }
}
</style>
