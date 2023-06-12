<template lang="pug">
.xm-channels-chat-reply.row
  template(v-if="isDeletedEveryone")
    .col: .reply-message This message has been deleted
  template(v-else-if="isDeletedSelf && isMe")
    .col: .reply-message This message has been deleted
  template(v-else)
    .media-container(v-if="media")
      img(:src="photoURL")
    .col
      .reply-name {{ name }}
      .reply-message(v-html="message", v-linkified, v-if="message")
      .reply-message.photo(v-if="photoURL && !message") Photo
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XMChannelsChatReply',
  props: {
    reply: { type: Object, default: () => {} },
  },
  data() {
    return {
      imgURL: null,
    }
  },
  computed: {
    ...mapFields('user', ['userProfile']),
    user() {
      return this.reply?.User || null
    },
    name() {
      return this.user?.username || this.user?.name || null
    },
    message() {
      return this.reply?.text || null
    },
    media() {
      return this.reply?.Media || null
    },
    photoURL() {
      if (!this.media) return null
      return this.media[0]?.PhotoURL || this.imgURL || null
    },
    isDeletedEveryone() {
      return this.reply?.isDeletedEveryone || false
    },
    isDeletedSelf() {
      return this.reply?.isDeletedSelf || false
    },
    isMe() {
      return this.user?.username === this.userProfile?.username
    },
  },
  mounted() {
    this.fnRetrievePhotoURLs()
  },
  methods: {
    async fnRetrievePhotoURLs() {
      try {
        const input = {
          objectID: this.media[0]?.objectID,
          objectType: this.media[0]?.objectType,
          isSport: false,
          type: '200sq',
        }

        const { getPhotoURLs } = await this.$api.getPhotoURLs({ input })
        this.imgURL = getPhotoURLs[0]
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-channels-chat-reply::v-deep {
  border-left: 2px solid $white;
  padding-left: 10px;
  margin-bottom: 5px;

  .media-container {
    width: 38px;
    height: 38px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .reply-name {
    color: #886bf2;
    font-size: 1.0714rem;
    line-height: 18px;
    font-weight: 500;
    margin-bottom: 3px;
  }

  .reply-message {
    font-size: 0.8571rem;
    font-weight: 300;
    line-height: 14px;
    letter-spacing: -0.18px;
    opacity: 0.5;
    white-space: pre-wrap;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      color: $white;
    }

    &.photo {
      font-size: 15px;
      opacity: 1;
    }
  }
}
</style>
