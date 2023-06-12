<template lang="pug">
.xa-channels-chat-loader
  .row
    .mr-4: b-skeleton(circle, width="48px", height="48px")
    .col
      .mb-2(v-for="n in 3"): b-skeleton(height="14px", rounded)
</template>

<script>
export default {
  name: 'XAChannelsChatLoader',
}
</script>

<style lang="scss" scoped>
.xa-channels-chat-loader::v-deep {
  text-align: left;

  .b-skeleton {
    width: 100%;
    max-width: 200px;

    .b-skeleton-item {
      background: #2a4e55;
      border-radius: 3px;
    }
  }
}
</style>
