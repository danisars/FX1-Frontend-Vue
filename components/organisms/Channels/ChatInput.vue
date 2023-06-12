<template lang="pug">
.xo-channels-chat-input.row(
  :class="[isSupporting ? 'is-supporting' : 'items-center', hasReply && 'has-reply']"
)
  XAChannelsReplyTo(v-if="hasReply", :can-cancel="!isNotification")
  XAChannelsEditTo(v-if="getChatShowEdit")
  .file-upload-container.row(v-if="getMediaFiles.length")
    XAFileUpload(
      v-for="(file, index) in getMediaFiles",
      :file="file",
      :key="file.name",
      @delete="fnDeleteImageOnLocal(file)"
    )
  .left-chat-input(v-if="isSupporting")
    template(v-if="!getChatShowEdit")
      input(
        type="file",
        ref="file",
        style="display: none",
        accept="image/x-png,image/jpeg,image/jpg,image/png,image/webp,image/avif,image/heic,image/heif,image/tiff,image",
        multiple,
        @input="fnSetMediaUpload"
      )
      ._icon.row(@click.prevent="$refs.file.click()" ): img(
        src="~assets/images/LockerRoom/add.svg"
      )
  .center-chat-input.col
    template(v-if="isSupporting")
      client-only
        XAChannelsInput
        XAChannelsChatFile
    template(v-else)
      .not-supporting.row.items-center(v-if="!isLive")
        ._icon.row: img(src="~assets/images/Club/chat.svg", alt="Chat")
        ._label.col Support {{ name }} to start chatting
  .right-chat-input.row(
    :class="[isSupporting ? 'items-start' : 'items-center', isLive && !isSupporting ? 'full-width' : '']"
  )
    //- XMChannelsEmoji
    //- .file.row(@click.prevent="fnChooseFile()"): img(
    //-   src="~assets/images/Club/file.svg"
    //- )
    .send.row(
      :class="[isUploading && 'is-uploading' , isLive && !isSupporting  ? 'hidden' : ''  ]",
      @click.prevent="fnSendMessage()"
    ): img(
      src="~assets/images/Club/send.svg",
      alt="Send"
    )
    .btn-support(v-if="!isSupporting" :class="{'expand' :  isLive}" ): b-button( :expanded="isLive"
      type="is-primary",
      @click.prevent="fnShowCommunityRules()"
    ) Support {{ name }}
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
import dialogs from '~/mixins/dialogs'
import XAChannelsInput from '~/components/atoms/Channels/ChatInput.vue'
import XAChannelsReplyTo from '~/components/atoms/Channels/ReplyTo.vue'

export default {
  name: 'XOChannelsChatInput',
  components: {
    XAChannelsInput,
    XAChannelsReplyTo,
    XAChannelsChatFile: () => import('~/components/atoms/Channels/ChatFile'),
    XMChannelsEmoji: () => import('~/components/molecules/Channels/Emoji'),
    XAFileUpload: () => import('~/components/atoms/FileUpload'),
    XAChannelsEditTo: () => import('~/components/atoms/Channels/EditTo'),
  },
  mixins: [dialogs],
  props: {
    isLive: { type: Boolean, default: false },
    isSupporting: { type: Boolean, default: false },
    isNotification: { type: Boolean, default: false },
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive', 'lockerRoomReply']),
    ...mapGetters({
      getMediaFiles: 'media/getMediaFiles',
      getMediaMessages: 'media/getMediaMessages',
      getChatActive: 'chats/getChatActive',
      getChatShowEdit: 'chats/getChatShowEdit',
    }),
    name() {
      return this.lockerRoomActive?.name || null
    },
    hasReply() {
      return !!this.lockerRoomReply
    },
    isUploading() {
      if (!this.getMediaMessages.length) return
      const isUploading = this.getMediaMessages.map((x) => {
        return x?.isUploading
      })

      const allUploaded = isUploading.every((element) => element === false)

      return !allUploaded
    },
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.clearMediaFiles()
      },
    },
  },
  methods: {
    ...mapActions({
      setMediaFiles: 'media/setMediaFiles',
      clearMediaFiles: 'media/clearMediaFiles',
      deleteMediaFiles: 'media/deleteMediaFiles',
    }),
    fnChooseFile() {
      this.$root.$emit('evtRtChooseFile')
    },
    fnShowCommunityRules() {
      this.fnShowCommunityRulesDialog()
    },
    fnSendMessage() {
      if (!this.isSupporting) return
      if (this.getMediaFiles.length > 10) {
        this.fnSuccessToast('Only 10 files are allowed to upload')
        return
      }
      this.$root.$emit('evtRtSetMessage')
    },
    fnSetMediaUpload(e) {
      this.$nextTick(() => {
        const files = e.target.files

        if (files.length > 10) {
          this.fnSuccessToast('Only 10 files are allowed to upload')
          return
        }

        const arrFiles = [...files]

        arrFiles.forEach((file) => {
          const cancelUpload = this.getMediaFiles.filter((x) => {
            return x?.name === file?.name
          })

          if (cancelUpload.length) return
          this.setMediaFiles(file)
        })

        this.$refs.file.value = null
      })
    },
    fnDeleteImageOnLocal(file) {
      this.deleteMediaFiles(file)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-channels-chat-input::v-deep {
  border-top: 1px solid rgba(#e7e8e8, 0.2);
  padding: 18.5px 30px;
  background-color: $secondary;
  position: relative;
  z-index: 1;

  .file-upload-container {
    width: 100%;
  }

  .left-chat-input {
    margin-right: 30px;
    min-width: 14px;

    ._icon {
      opacity: 0.5;
      margin-top: 1.5px;
      cursor: pointer;
    }
  }

  .center-chat-input {
    font-size: 1.0714rem;
    line-height: 1.4286rem;
    font-weight: 300;

    .not-supporting {
      ._icon {
        margin-top: 4px;
      }

      ._label {
        font-size: 1.0714rem;
        line-height: 1.4286rem;
        font-weight: 400;
        margin-left: 20px;

        @include max-width(1023px) {
          margin-left: 10px;
        }

        @include max-width(767px) {
          margin-left: 20px;
        }
      }
    }
  }

  .right-chat-input {
    .file {
      opacity: 0.5;
    }

    > div {
      margin-left: 30px;
      cursor: pointer;
    }

    .btn-support {
      @include max-width(767px) {
        display: none;
      }

      .button {
        min-width: 205px;
        height: 42px;
        text-transform: uppercase;
      }
    }

    .send {
      opacity: 0.2;
    }
  }

  &.is-supporting {
    padding: 26px 30px;

    .right-chat-input {
      .send {
        opacity: 1;

        &.is-uploading {
          opacity: 0.2;
        }
      }
    }
  }

  &.has-reply {
    // padding: 40px 30px 26px;
  }

  .full-width{
    width: 100%;
  }

  .expand{
    width: 100% !important;
    margin-left: 0 !important;
  }

  .hidden{
    display: none !important;
  }
}
</style>
