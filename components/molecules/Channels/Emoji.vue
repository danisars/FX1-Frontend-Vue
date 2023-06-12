<template lang="pug">
.xm-channels-emoji.row
  twemoji-picker(
    :emoji-data="emojiDataAll",
    :emoji-groups="emojiGroups",
    @emojiUnicodeAdded="fnAddEmoji($event)"
  )
    template(slot="twemoji-picker-button"): img(
      src="~assets/images/Club/emoji.svg"
    )
</template>

<script>
// import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json'
// import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json'

export default {
  name: 'XMChannelsEmoji',
  computed: {
    emojiDataAll() {
      return EmojiAllData
    },
    emojiGroups() {
      return EmojiGroups
    },
  },
  methods: {
    fnAddEmoji(e) {
      this.$root.$emit('evtRtInsertEmoji', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-channels-emoji::v-deep {
  #popper-container {
    width: 300px;

    #popper-inner {
      #emoji-container {
        #emoji-popup {
          width: 100% !important;

          .emoji-popover-inner {
            width: 100% !important;
            height: 300px !important;
          }
        }
      }
    }

    #arrow {
      &::before {
        content: none;
      }
    }
  }

  #popper-button {
    display: flex;
    flex-wrap: wrap;
    opacity: 0.5;
  }
}
</style>
