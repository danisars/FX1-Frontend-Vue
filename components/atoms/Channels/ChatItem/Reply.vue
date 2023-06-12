<template lang="pug">
.xa-channels-chat-item-reply.row.items-center.justify-center(
  @click.prevent="$emit('click', $event)"
): img(
  src="~assets/images/Club/reply.svg",
  alt="Reply"
)
</template>

<script>
export default {
  name: 'XAChannelsChatItemReply',
}
</script>

<style lang="scss" scoped>
.xa-channels-chat-item-reply::v-deep {
  background-color: #08252c;
  width: 72px;
  height: 40px;
  border-radius: 8px;
  padding: 0 10px;
  position: absolute;
  top: -20px;
  right: 10px;
  z-index: 1;
  cursor: pointer;

  @include max-width(1180px) {
    display: none;
  }

  img {
    opacity: 0.3;
  }
}
</style>
