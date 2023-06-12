<template lang="pug">
nuxt-link.xm-mentions-list-item(
  :to="`/mentions/${notificationID}`",
  :class="isRead && 'is-read'"
)
  .item-container
    .details.row
      span.username.mr-1.text-weight-medium {{ messageUsername }}
      span.type.text-weight-light.mr-1
        template(v-if="notificationType === 'Reply'") replied to you in
        template(v-else) mentioned you in
      a.row(@click.prevent="fnRedirectToLockerRoom()")
        span.channel.mr-1 # {{ channelName }}
        span.mr-2.in in
        span.row.locker-room
          img.mr-1(
            src="~assets/images/v2/LockerRoom/mentions-locker-room.svg",
            alt="Locker room"
          )
          | {{ lockerRoomName }}

    ._message.row
      XAAvatar(:name="messageUsername", :image="messageUserAvatar")
      ._details.col
        template(v-if="notificationType === 'Reply'")
          .row.items-center
            .username {{ messageUsername }}
            .date {{ date }}
          .reply.row
            .reply-media(v-if="repliedToPhotoURLSmall"): img(
              :src="repliedToPhotoURLSmall"
            )
            .col
              .reply-username {{ replyUsername }}
              .reply-text(v-html="replyText")
          .text(v-html="messageText")
        template(v-else)
          .row.items-center
            .username {{ messageUsername }}
            .date {{ date }}
          .text(v-html="messageText")
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import XAAvatar from '~/components/atoms/Avatar.vue'

export default {
  name: 'XMMentionsListItem',
  components: { XAAvatar },
  props: {
    notification: { type: Object, default: () => {} },
  },
  computed: {
    notificationID() {
      return this.notification?.id || null
    },
    notificationType() {
      return this.notification?.type || null
    },
    channelName() {
      return this.notification?.channelName || null
    },
    lockerRoom() {
      return this.notification?.LockerRoom || null
    },
    lockerRoomName() {
      return this.lockerRoom?.name || null
    },
    lockerRoomSlug() {
      return this.lockerRoom?.slug || null
    },
    channelSlug() {
      return this.notification?.channelSlug || null
    },
    date() {
      const date = this.notification?.createdAt || new Date()
      const today = new Date()
      const isCurrentDate = moment(today).isSame(date, 'day')
      const days = moment(today).diff(date, 'days')

      if (isCurrentDate) {
        return moment(date).local().format('hh:mm a')
      } else if (days === 0) {
        return `${moment(date).local().format('hh:mm a')}, Yesterday`
      } else if (days <= 6) {
        return moment(date).local().format('hh:mm a, dddd')
      } else {
        return moment(date).local().format('hh:mm a, MM/DD/YY')
      }
    },
    isRead() {
      return this.notification?.isRead || false
    },
    message() {
      return this.notification?.Message || null
    },
    messageID() {
      return this.notification?.messageID || null
    },
    messageText() {
      return this.message?.text || null
    },
    messageUser() {
      return this.message?.User || null
    },
    messageUsername() {
      return this.messageUser?.username || null
    },
    messageUserAvatar() {
      return this.messageUser?.Avatar?.PhotoURL || null
    },
    repliedTo() {
      return this.message?.RepliedTo || null
    },
    replyText() {
      return this.repliedTo?.text || null
    },
    replyUsername() {
      return this.repliedTo?.User?.username || null
    },
    repliedToPhotoURLs() {
      return this.repliedTo?.PhotoURLs || null
    },
    repliedToPhotoURLSmall() {
      if (this.repliedToPhotoURLs) {
        const repliedToPhotoURLSmall = this.repliedToPhotoURLs.filter((x) => {
          return x?.type === '200sq'
        })

        return repliedToPhotoURLSmall[0]?.photoURL || null
      }

      return null
    },
  },
  methods: {
    ...mapActions({
      setNotificationActive: 'notification/setNotificationActive',
    }),
    async fnRedirectToLockerRoom() {
      await this.setNotificationActive(this.notification)
      this.$router.push({
        path: `/locker-room/${this.lockerRoomSlug}/${this.channelSlug}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-mentions-list-item::v-deep {
  margin-bottom: 15px;
  color: $white;
  display: block;

  .item-container {
    padding: 16px 32px;
    border: 1px solid #557278;
    cursor: pointer;
    border-radius: 12px;
    position: relative;
    margin-bottom: 1px;
    overflow: hidden;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05)
      ),
      #0c353e;

    &::before {
      content: '';
      background-color: #886bf2;
      width: 6px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .details {
      font-size: 0.9286rem;
      line-height: 24px;
      margin-bottom: 5px;
      color: #94a6aa;

      .username {
        color: #c3cdcf;
      }

      a {
        color: #c3cdcf;
        font-weight: 500;

        .in {
          font-weight: 300;
          color: #94a6aa;
        }
      }
    }

    ._message {
      ._details {
        margin-left: 15px;

        .username {
          color: #ffaf23;
          font-size: 0.9286rem;
          line-height: 26px;
          font-weight: 500;
          margin-right: 20px;
        }

        .date {
          font-size: 0.8571rem;
          line-height: 14px;
          font-weight: 300;
          color: #94a6aa;
        }

        .text {
          font-size: 1.0714rem;
          line-height: 24px;
          font-weight: 300;

          span {
            display: inline-block;

            .mention {
              font-weight: 400;
              color: #886bf2;
            }
          }
        }

        .reply {
          border-left: 2px solid $white;
          padding-left: 10px;
          margin-bottom: 5px;

          .reply-username {
            font-size: 0.9286rem;
            line-height: 14px;
            color: #886bf2;
            margin-bottom: 5px;
          }

          .reply-media {
            width: 38px;
            height: 38px;
            border-radius: 4px;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
              object-fit: cover;
            }
          }

          .reply-text {
            font-size: 12px;
            line-height: 13px;
            font-weight: 300;
            color: #c3cdcf;
            white-space: pre-wrap;
            word-break: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  &.is-read {
    .item-container {
      &::before {
        content: none;
      }
    }
  }
}
</style>
