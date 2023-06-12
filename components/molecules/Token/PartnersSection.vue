<template lang="pug">
.token-partners-section.row#partners
  .container.token-container-howToBuy.text-center
    h1 Partners
    .top-margin-a
    .row.boxes
      .col.box-one.text-left
        h2.token-h2.top-layer
          img(
            src="~assets/images/Token/block-logo.svg",
            alt="Block Logo"
          )
        p.token-p.middle-layer.purple-text.token-p2 Block8
        p.token-p.bottom-layer A leading blockchain development studio with a proven track record across Fintech, Proptech and Regtech. 

      .col.box-two.text-left
        h2.token-h2.top-layer
          img(
            src="~assets/images/Token/proof-logo.svg",
            alt="Proof Logo"
          )
        p.token-p.middle-layer.purple-text.token-p2 Proof
        p.token-p.bottom-layer Our official partner for our Fair Launch campaign, ensuring safety and confidence for all investors.
    .row.boxes
      .col.box-three.text-left
        h2.token-h2.top-layer
          img(
            src="~assets/images/Token/solidity.png",
            alt="Solidity Finance Logo"
          )
        p.token-p.middle-layer.purple-text.token-p2 Solidity Finance
        p.token-p.bottom-layer Our smart contracts are audited by Solidify Finance, who protect over $50 billion in on-chain value across 1,500+ projects.

      .col.box-four.text-left
        h2.token-h2.top-layer
          img(
            src="~assets/images/Token/assure-logo.svg",
            alt="Assure Defi Logo"
          )
        p.token-p.middle-layer.purple-text.token-p2 Assure DeFi
        p.token-p.bottom-layer An independent third party verification service that applies many of the same KYC requirements that are in place for IRL to the crypto-space.
          
</template>

<script>
export default {
  name: 'PartnersSection'
}
</script>

<style lang="scss" scoped>
.token-partners-section::v-deep {
  width: auto;
  position: relative;
  overflow: hidden;
  z-index: 2;
  padding: 100px 0 150px;

  .top-margin-a {
    margin-top: 80px;
  }

  .top-margin-b {
    margin-top: 40px;
  }

  .actions {
    margin: 12px;
  }

  .purple-text {
    color: $purples;
  }

  .boxes {
    .col {
      background-color: $secondary;
      height: 420px;
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
        position: absolute;
        left: 11%;
        right: 11%;
        top: 60%;
      }

      @include max-width(1700px) {
        .top-layer {
          top: 14%;
        }

        .middle-layer {
          top: 42%;
        }

        .bottom-layer {
          top: 55%;
        }

        img {
          width: 90%;
        }
      }
    }
  }

  // Tablet
  @include max-width(1021px) {
    .col {
      width: 100% !important;
      margin: 0px 0px 20px 0px !important;
      background-size: 100%;
    }

    .boxes {
      .box-one,
      .box-three {
        margin-right: 15px !important;
      }

      .box-two,
      .box-four {
        margin-left: 15px !important;
      }
    }
  }

  // Mobile
  @include max-width(500px) {
    padding: 50px 0 50px;

    .boxes {
      .col {
        height: 300px;
        margin: 0px 0px 15px 0px !important;

        .box-one,
        .box-three {
          margin-right: 0px !important;
        }

        .box-two,
        .box-four {
          margin-left: 0px !important;
        }

        img {
          width: 80%;
        }

        .top-layer {
          top: 14%;
        }

        .middle-layer {
          top: 42%;
        }

        .bottom-layer {
          top: 60%;
        }
      }
    }
  }
}
</style>
