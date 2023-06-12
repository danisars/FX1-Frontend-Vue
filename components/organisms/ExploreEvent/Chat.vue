<template lang="pug">
.xo-explore-event-chat(
  :class="[showModal ? 'show' : 'hide', activeChat === 'private' && !privateChannel ? 'full-screen' : '']"
)
  XOChatNavigation(
    :showModal="showModal",
    :currentStep="currentStep",
    :totalSteps="totalSteps",
    :activeChat="activeChat",
    :game="game",
    :privateChannel="privateChannel",
    :lockerRoom="lockerRoom",
    @hide="$emit('hide')",
    @switchChat="switchChat",
    @setPrivateChannel="setPrivateChannel"
  )
  .chat-body.vuebar(
    style="padding: 0px !important",
    :class="[activeChat === 'private' && privateChannel ? 'vuebar-private' : activeChat === 'private' && !privateChannel ? 'vuebar-private-creation' : '']"
  )
    XOChatBody(
      :class="{ 'private-room': activeChat === 'private' || activeChat === 'public' }",
      :channelSlug="channelSlug",
      :game="game",
      :activeChat="activeChat",
      :currentStep="currentStep",
      :privateChannel="privateChannel",
      :lockerRoomProp="lockerRoom",
      @cancel="$emit('hide')",
      @changeStep="changeStep",
      @setPrivateChannel="setPrivateChannel"
    )
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
export default {
  name: 'XOExploreChat',
  components: {
    XOExploreChatMember: () =>
      import('~/components/organisms/ExploreEvent/Member.vue'),
    XOChatNavigation: () =>
      import('~/components/organisms/ExploreEvent/ChatNavigation.vue'),
    XOChatBody: () =>
      import('~/components/organisms/ExploreEvent/ChatBody.vue'),
  },
  props: {
    showModal: {
      type: Boolean,
    },
    channelSlug: {
      type: String,
      default: '',
    },
    game: {
      type: Object,
      default: () => {},
    },
    activeChat: {
      type: String,
      default: '',
    },
    privateChannel: {
      type: Object,
      default: () => {},
    },
    lockerRoom: { type: Object, default: () => {} },
  },
  data() {
    return {
      message: null,
      //   isShowChat: false,
      showInfiniteLoading: false,
      chats: [],
      channel: 'public',
      isLive: true,
      usersTyping: [],
      isSupporting: true,
      members: [],
      currentStep: 1,
      totalSteps: 2,
    }
  },
  computed: {
    ...mapFields('app', ['showOnlineMembers']),
    ...mapFields('user', ['userProfile']),
    ...mapGetters({
      getMediaLightbox: 'media/getMediaLightbox',
    }),
    totalMember() {
      return this.members.length
    },
  },
  methods: {
    showChat() {
      this.isShowChat = true
    },
    switchChat(chat) {
      this.$emit('switchChat', chat)
    },
    changeStep(step) {
      this.currentStep = step
    },
    setPrivateChannel(channel) {
      this.$emit('setPrivateChannel', channel)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-explore-event-chat::v-deep {
  position: fixed;
  font-family: 'Rotunda';
  width: 357px;
  height: 100%;
  bottom: 0;
  z-index: 11;
  background: #0c353e;
  border-left: 1px solid #385960;
  @include max-width(767px) {
    width: 100%;
    padding: 0px !important;
    .send-message-box {
      width: 100%;
    }
  }

  .chat-body {
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .chat-body::-webkit-scrollbar {
    display: none;
  }
  .vuebar {
    height: calc(100% - 66.6px) !important;
    @include max-width(427px) {
      height: calc(100% - 154px) !important;
    }
  }
  .vuebar-private {
    height: calc(100% - 132px) !important;
    @include max-width(427px) {
      height: calc(100% - 219px) !important;
    }
  }
  .vuebar-private-creation {
    height: calc(100% - 66.6px) !important;
  }
  .send-message-box {
    padding: 0px;
    gap: 12px;
    position: absolute;
    width: 357px;
    left: 0px;
    bottom: 0px;
    /* secondary dark/500 */
    background: #0c353e;
    border-top: 1px solid rgba(231, 232, 232, 0.2);

    .add-icon {
      display: inline-block;
      margin-top: 5px;
    }
    .message-input-field {
      display: inline-block;
      position: absolute;

      input {
        border: none !important;
        background: none;
        color: #94a6aa !important;
        width: 100%;
        height: 20px;
      }
      input::-webkit-input-placeholder {
        /* Edge */
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 20px;
        color: #94a6aa;
      }
    }
    .btn-actions {
      float: right;
      margin-top: 17px;
      margin-right: 17px;

      .send-btn {
        display: inline-block;
        margin-right: 21px;
        cursor: pointer;
      }
      .camera {
        display: inline-block;
        cursor: pointer;
      }
    }
  }
}
.show {
  right: 0 !important;
  transition: 0.5s;
}
.hide {
  right: -375px;
  transition: 0.5s;
}

@include max-width(767px) {
  .hide {
    height: 0px;
    right: 0px;
    transition: 0.5s;
    overflow: hidden;
    .send-message-box {
      display: none;
    }
  }
  .show {
    max-height: 475px;
    transition: 0.5s;
    .send-message-box {
      display: block;
    }
  }
  .full-screen {
    position: absolute;
    bottom: 0;
    max-height: unset;
  }

  .add-icon {
    width: 10% !important;
  }
  .message-input-field {
    width: 75% !important;
    .field .control input[type='text'] {
      width: 100% !important;
    }
  }
  .btn-actions {
    width: 15%;
    text-align: right;
  }
}

@include max-width(500px) {
  .send-message-box {
    .add-icon {
      width: 13% !important;
    }
    .message-input-field {
      width: 65% !important;
    }
    .btn-actions {
      width: 25%;
      text-align: right;
    }
  }
}
</style>
