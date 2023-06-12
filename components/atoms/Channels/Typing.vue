<template lang="pug">
.xa-channels-typing.col.row.items-end
  .row.items-end(v-if="usersTyping.length > 2")
    .mr-1 {{ usersTyping[0] }}, {{ usersTyping[1] }} and others are typing
    XAChannelsAnimatedDots

  .row.items-end(v-if="usersTyping.length && usersTyping.length <= 2")
    .mr-1 {{ usersTyping[0] }}
    .mr-1(v-if="usersTyping[1]") and {{ usersTyping[1] }}
    .mr-1(v-if="usersTyping[1]") are typing
    .mr-1(v-else) is typing
    XAChannelsAnimatedDots
</template>

<script>
export default {
  name: 'XAChannelsTyping',
  components: {
    XAChannelsAnimatedDots: () =>
      import('~/components/atoms/Channels/AnimatedDots.vue'),
  },
  props: {
    usersTyping: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>
.xa-channels-typing::v-deep {
  padding: 5px 0 30px;
  font-size: 0.8571rem;
  font-weight: 300;
  line-height: 14px;
  color: rgba($white, 0.5);
}
</style>
