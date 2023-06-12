<template lang="pug">
.xa-channels-chat-file
  input(ref="chatFile", type="file")
</template>

<script>
export default {
  name: 'XAChannelsChatFile',
  mounted() {
    this.$root.$on('evtRtChooseFile', () => {
      if (this.$refs.chatFile) {
        this.$refs.chatFile.click()
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.xa-channels-chat-file::v-deep {
  display: none;
}
</style>
