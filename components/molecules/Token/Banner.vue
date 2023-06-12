<template lang="pug">
.token-banner.row
  .overlay
  .container.is-max-widescreen
    .content-middle.text-center
      h1.token-h1 Watch live sports online with friends, get paid in $FX1
      h2.token-h2-c FX1 is redefining how we consume and interact with live streamed sports. Fans earn $FX1 by watching live sports and hosting shows on FX1, and all earned tokens can be used for purchases or staked for yield.

      .actions
        a.button.is-primary(
          href="https://app.uniswap.org/#/swap?outputCurrency=0x610C584F1275f0f7c982Af0aC7883Ff4Dba661Bd",
          target="_blank"
        ) Buy $FX1
        a.button.is-primary(
          href="https://www.dextools.io/app/en/ether/pair-explorer/0x87B958067FD665f3937de4439450B4950Eb68e15",
          target="_blank"
        ) View Chart
      span.address Contract Address:
        span 0x610C584F1275f0f7c982Af0aC7883Ff4Dba661Bd
</template>

<script>
export default {
  name: 'TokenBanner',
  methods: {
    showAlertMessage() {
      this.$toast.success('$FX1 available to purchase mid to late April', {
        duration: 5000,
        position: 'bottom-left',
        className: 'fx1-success',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.token-banner::v-deep {
  background-image: url('~assets/images/Token/empty-boxing-arena.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 950px;
  width: auto;
  position: relative;
  overflow: hidden;
  padding: 200px 0 200px;

  @include max-width(1700px) {
    padding: 150px 0 200px;
  }

  @include max-width(1400px) {
    padding: 120px 0 200px;
  }

  @include max-width(1215px) {
    padding: 200px 0 200px;
  }

  @include max-width(700px) {
    background-size: cover;
    background-position: 40% 50%;
  }

  @include max-width(500px) {
    padding: 170px 0 0px;
    min-height: 100vh;
    background-position: 40% 50%;
  }

  .overlay {
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(24, 120, 141, 0.25);
    z-index: 1;
    position: absolute;
  }

  .content-middle {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: auto;
    max-width: 962px;

    .actions {
      margin: 50px 0 25px;

      .button {
        width: 235px;
        height: 82px;
        text-transform: uppercase;
        margin-left: 10px;
        margin-right: 10px;
      }

      .button:last-child {
        background-color: $secondary;
      }
    }

    h2 {
      font-size: 1.5714rem;
      line-height: 2.4286rem;
      letter-spacing: -0.66px;
      max-width: 700px;
      margin: auto;
    }

    .launch-text {
      span {
        color: rgba($white, 0.8);
      }
    }
  }

  // RESPONSIVE
}
</style>
