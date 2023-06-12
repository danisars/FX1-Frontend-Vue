<template lang="pug">
.xa-channels-chat-item-bookmark.row.items-center: b-icon(icon="bookmark-outline")
</template>

<script>
export default {
  name: 'XAChannelsChatItemBookmark',
}
</script>

<style lang="scss" scoped>
.xa-channels-chat-item-bookmark::v-deep {
  opacity: 0.3;
  margin-top: 5px;
  cursor: pointer;
}
</style>
