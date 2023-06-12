<template lang="pug">
.xm-home-chat-with.after-banner-content.row.items-center
  ._icon: img(src="~assets/images/Home/chat.svg", alt="Chat with other fans")
  .text.col
    h3 Chat with other fans like you
    p Discuss news and topics related to your club
</template>

<script>
export default {
  name: 'XMHomeChatWith',
}
</script>

<style lang="scss" scoped>
.xm-home-chat-with::v-deep {
  ._icon {
    img {
      width: 46px;
    }
  }
}
</style>
