<template lang="pug">
.xa-share.row.items-center.justify-center: img(src="~assets/images/share.svg")
</template>

<script>
export default {
  name: 'XAShare',
}
</script>

<style lang="scss" scoped>
.xa-share::v-deep {
  background-color: rgba($secondary, 50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
