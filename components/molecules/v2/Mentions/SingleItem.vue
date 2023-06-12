<template lang="pug">
.xm-mentions-single-item
  .row
    XAAvatar.mr-4(:name="username", :image="avatar", size="48px")
    .details.col
      .row.justify-between.user-details
        .username {{ username }}
        .date {{ date }}
      .reply.row(v-if="repliedTo")
        .reply-media(v-if="repliedToPhotoURLSmall")
          img(:src="repliedToPhotoURLSmall")
        .col
          .reply-user {{ repliedToUsername }}
          .reply-text(v-html="repliedToText")
      XMMentionsMedias(v-if="photoURLs.length", :medias="photoURLs")
      .text(v-html="text")
</template>

<script>
import moment from 'moment'
import XAAvatar from '~/components/atoms/Avatar.vue'
import XMMentionsMedias from '~/components/molecules/Mentions/Medias.vue'

export default {
  name: 'XMMentionsSingleItem',
  components: { XAAvatar, XMMentionsMedias },
  props: {
    message: { type: Object, default: () => {} },
  },
  computed: {
    user() {
      return this.message?.User || null
    },
    username() {
      return this.user?.username || null
    },
    avatar() {
      return this.user?.Avatar?.PhotoURL || null
    },
    date() {
      const date = this.message?.createdAt || new Date()
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
    photoURLs() {
      return this.message?.PhotoURLs || []
    },
    text() {
      return this.message?.text || null
    },
    repliedTo() {
      return this.message?.RepliedTo || null
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
    repliedToUser() {
      return this.repliedTo?.User || null
    },
    repliedToUsername() {
      return this.repliedToUser?.username || null
    },
    repliedToText() {
      return this.repliedTo?.text || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-mentions-single-item::v-deep {
  margin-bottom: 25px;
  position: relative;
  width: 100%;
  max-width: 554px;

  > .row {
    position: relative;
    z-index: 1;
  }

  .details {
    border-radius: 0px 10px 10px 10px;
    padding: 15px 20px 10px;
    background-color: #2a4e55;
    position: relative;
    max-width: max-content;

    &::before {
      content: '';
      background-image: url('~assets/images/Club/chat-border.svg');
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      left: -10px;
      width: 16px;
      height: 24px;
      z-index: 0;
    }

    .user-details {
      margin-bottom: 10px;

      .username {
        font-size: 0.9286rem;
        line-height: 14px;
        color: #ffaf23;
      }

      .date {
        font-size: 12px;
        line-height: 13px;
        color: #94a6aa;
        margin-left: 20px;
      }
    }

    .reply {
      border-left: 2px solid $white;
      padding-left: 10px;
      margin-bottom: 10px;

      .reply-user {
        color: #886bf2;
        font-size: 0.9286rem;
        line-height: 14px;
        margin-bottom: 5px;
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

      .reply-media {
        width: 38px;
        height: 38px;
        border-radius: 4px;
        margin-right: 10px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }
      }
    }

    .text {
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 22px;

      span {
        display: inline-block;
        font-size: 0;

        .mention {
          font-size: 1rem;
          font-weight: 400;
          color: #886bf2;
        }
      }
    }
  }

  &.has-reply {
    &::before {
      content: '';
      background-color: #94a6aa;
      width: 1px;
      height: 100%;
      position: absolute;
      top: 48px;
      left: 24px;
      z-index: 0;
    }
  }
}
</style>
