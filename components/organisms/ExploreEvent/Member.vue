<template lang="pug">
.xo-explore-chat-message 
    div.row.member(@click="$emit('showChat')")
        div.col-2.user-avatar-left
          XAAvatar(:image="chatMember.photoURL", v-if="!chatMember.photoURL && !showPhoto" :name="chatMember.username", size="36px")
          XAAvatar(:image="chatMember.photoURL", v-if="chatMember.photoURL && showPhoto" :name="chatMember.username", size="36px") 
          .is-online
        div.col-10
            p.user-name {{chatMember.username}}
                 
</template>

<script>
export default {
  name: 'XOExploreChatMember',
  components: {
      XAAvatar: () => import('~/components/atoms/Avatar')
  },
  props: {
    member: {
      type: Object
    }
  },
  data () {
    return {
      chatMember: {},
      showPhoto: false,
    }
  },
  watch: {
    member: {
            deep: true,
      immediate: true,
     async handler(value) {
      this.chatMember = this.member;
      const input = {
          objectID: this.member.Avatar.objectID,
          objectType: this.member.Avatar.objectType,
          isSport: false
        }
        const { getPhotoURLs } = await this.$api.getPhotoURLs({ input })
        this.chatMember.photoURL = getPhotoURLs[0];
        this.showPhoto = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.xo-explore-chat-message::v-deep {
    margin: 12px;

        .member {
            cursor:pointer;
        }
        .user-avatar-left {
          position: relative;
        .is-online {
          background-color: #2ddc1e;
          width: 12px;
          height: 12px;
          border: 2px solid #08252c;
          border-radius: 50%;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        }
        .user-name {
            font-family: "Rotunda";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            margin-left: 20px;
            color: #FFFFFF;
            margin-top: 14px;
        }
}
</style>
