<template lang="pug">
.xa-channels-animated-dots.row
  .ball.ball-1
  .ball.ball-2
  .ball.ball-3
</template>

<script>
export default {
  name: 'XAChannelsAnimatedDots',
}
</script>

<style lang="scss" scoped>
.xa-channels-animated-dots::v-deep {
  position: relative;
  bottom: 5px;

  .ball {
    width: 2px;
    height: 2px;
    border-radius: 100px;
    background-color: rgba($white, 0.5);
    margin-right: 2.5px;
    animation: jump 1.2s linear infinite;
    position: relative;

    &.ball-2 {
      animation-delay: 0.2s;
    }

    &.ball-3 {
      animation-delay: 0.4s;
    }
  }
}

@keyframes jump {
  0% {
    top: 0;
  }
  35% {
    top: 3px;
  }
  70% {
    top: 0;
  }
}
</style>
