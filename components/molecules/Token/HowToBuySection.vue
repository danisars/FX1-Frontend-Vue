<template lang="pug">
#howtobuy.token-howtobuy-section.row
  .container.token-container-howToBuy.text-center
    h1 How to Buy $FX1
    .top-margin-a
    .row.boxes
      .col.box-one.text-left
        h2.token-h2.top-layer Go to<br/>Uniswap
        p.token-p.middle-layer and connect up your wallet
        p.token-p.bottom-layer For anyone new to Uniswap, the below video is a great tutorial to follow:
          span.youtube Youtube
      .col.box-two.text-left
        h2.token-h2.top-layer From the<br/>Swap form,
        p.token-p.middle-layer choose FX1 as the “To” token your buying
    .row.boxes
      .col.box-three.text-left
        h2.token-h2.top-layer Choose<br/>the amount
        p.token-p.middle-layer of Ether you wish to swap for FX1
      .col.box-four.text-left
        h2.token-h2.top-layer Check<br/>conversion
        p.token-p.middle-layer and hit the SWAP button
    .top-margin-b
    .row
      .col.actions.text-right.btn-left
        a.button.is-primary(
          href="https://app.uniswap.org/#/swap?outputCurrency=0x610C584F1275f0f7c982Af0aC7883Ff4Dba661Bd",
          target="_blank"
        ) Buy $FX1
      .col.actions.text-left.btn-right
        a.button.is-primary(
          href="https://www.dextools.io/app/en/ether/pair-explorer/0x87B958067FD665f3937de4439450B4950Eb68e15",
          target="_blank"
        ) View Chart
    span.address Contract Address:
      span 0x610C584F1275f0f7c982Af0aC7883Ff4Dba661Bd
</template>

<script>
export default {
  name: 'HowToBuySection',
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
.token-howtobuy-section::v-deep {
  width: auto;
  position: relative;
  overflow: hidden;
  z-index: 2;

  .top-margin-a {
    margin-top: 80px;
  }

  .top-margin-b {
    margin-top: 40px;
  }

  .actions {
    margin: 12px 12px 25px;
  }

  .btn-left,
  .btn-right {
    a {
      width: 200px;
      height: 60px;
      border-radius: 8px;
    }
  }

  .btn-right {
    a {
      background-color: transparent;
      outline: 1px solid white;
    }
  }

  .boxes {
    .col {
      background-color: $secondary;
      height: 344px;
      background-position: right bottom;
      background-repeat: no-repeat;
      margin: 12px;
      border-radius: 10px;
      position: relative;

      .top-layer {
        position: absolute;
        top: 18%;
        left: 11%;
      }

      .middle-layer {
        width: 48%;
        position: absolute;
        top: 48%;
        left: 11%;
      }

      .bottom-layer {
        width: 65%;
        position: absolute;
        left: 11%;
        top: 65%;

        .youtube {
          color: $purples;
        }
      }

      @include max-width(1800px) {
        .top-layer {
          top: 13%;
        }

        .middle-layer {
          top: 43%;
        }

        .bottom-layer {
          top: 58%;
        }
      }

      @include max-width(1650px) {
        .middle-layer {
          width: 65%;
        }

        .bottom-layer {
          width: 75%;
        }
      }
    }

    .box-one {
      background-image: url('~assets/images/Token/FrameOne.svg');
    }

    .box-two {
      background-image: url('~assets/images/Token/FrameTwo.svg');
    }

    .box-three {
      background-image: url('~assets/images/Token/FrameThree.svg');
    }

    .box-four {
      background-image: url('~assets/images/Token/FrameFour.svg');
    }
  }

  // Tablet
  @include max-width(1021px) {
    .col {
      width: 100% !important;
      margin: 0px 0px 20px 0px !important;
      background-size: 100%;
    }

    .box-one,
    .box-three {
      margin-right: 15px !important;
    }

    .box-two,
    .box-four {
      margin-left: 15px !important;
    }

    .actions.text-right,
    .actions.text-left {
      text-align: center !important;
    }

    .btn-left,
    .btn-right {
      max-width: 30% !important;
      height: 60px !important;
      a {
        margin: 0px !important;
        width: 100% !important;
        height: 60px !important;
      }
    }

    .btn-right {
      margin-right: 20% !important;
      margin-left: 0% !important;
    }

    .btn-left {
      margin-left: 20% !important;
      margin-right: 3% !important;
    }
  }

  // Mobile
  @include max-width(500px) {
    .col {
      flex: none;
      width: 100% !important;
      display: block;
      max-height: 215px;
      margin: 0px 0px 20px 0px !important;
      background-size: 100%;
    }

    .top-margin-a {
      margin-top: 25px;
    }

    .actions.text-right,
    .actions.text-left {
      text-align: center !important;
    }

    .btn-left,
    .btn-right {
      max-width: 48% !important;
      height: 60px !important;
      a {
        margin: 0px !important;
        width: 100% !important;
        height: 60px !important;
      }
    }

    .btn-right {
      margin-left: 2% !important;
    }

    .btn-left {
      margin-right: 2% !important;
    }

    .top-margin-b {
      margin-top: 30px;
    }
  }
}
</style>
