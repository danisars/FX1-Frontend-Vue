<template lang="pug">
.xa-channels-volume(@click.prevent="hasVolume = !hasVolume")
  b-icon(icon="volume-high", v-if="hasVolume")
  b-icon(icon="volume-off", v-else)
</template>

<script>
export default {
  name: 'XAChannelsVolume',
  data() {
    return {
      hasVolume: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.xa-channels-volume::v-deep {
  opacity: 0.5;
  cursor: pointer;
}
</style>
