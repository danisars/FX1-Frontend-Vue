<template lang="pug">
.xa-loader(:style="[loaderSize]")
</template>

<script>
export default {
  name: 'XALoader',
  props: {
    size: { type: Number, default: 48 },
  },
  computed: {
    loaderSize() {
      const loaderSize = {
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderWidth: `${this.size / 10}px`,
      }

      return loaderSize
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-loader {
  border: 5px solid $primary;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
