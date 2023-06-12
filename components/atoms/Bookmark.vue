<template lang="pug">
.xa-bookmark.row.items-center.justify-center: b-icon(
  icon="bookmark-outline",
  custom-size="mdi-18px"
)
</template>

<script>
export default {
  name: 'XABookmark',
}
</script>

<style lang="scss" scoped>
.xa-bookmark::v-deep {
  background-color: rgba($secondary, 50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
