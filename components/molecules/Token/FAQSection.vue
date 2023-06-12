<template lang="pug">
#faq.token-faq-section.row
  .container.token-container.text-center(v-show="!isLoading")
    h1 FAQ
    .top-margin-b
    .row
      .col.col-left
        .faqbox(@click.prevent="expand(0)")
          .row
            .col-L.text-left
              p.token-p3 What is $FX1?
            .col-R.text-right
              img(src="~assets/images/Token/arrow-up.svg", alt="Arrow Right")(
                v-if="expandOption[0]"
              )
              img(
                src="~assets/images/Token/arrow-right.svg",
                alt="Arrow Right"
              )(
                v-if="!expandOption[0]"
              )
            .row(v-if="expandOption[0]")
              p.token-p.inner-text.text-left FX1 brings your favorite live sports games and highlights in one place so you can watch online with friends, chat with fans, and earn rewards.
      .col.col-right
        .faqbox(@click.prevent="expand(1)")
          .row
            .col-L.text-left
              p.token-p3 How can my project get involved?
            .col-R.text-right
              img(src="~assets/images/Token/arrow-up.svg", alt="Arrow Right")(
                v-if="expandOption[1]"
              )
              img(
                src="~assets/images/Token/arrow-right.svg",
                alt="Arrow Right"
              )(
                v-if="!expandOption[1]"
              )
            .row(v-if="expandOption[1]")
              p.token-p.inner-text.text-left We would love to hear about any ideas you have for collaboration. Head over to our contact page and let us know what you’re thinking and we’ll get back to you.

    .top-margin-a

    .row
      .col.col-left
        .faqbox(@click.prevent="expand(2)")
          .row
            .col-L.text-left
              p.token-p3 Can I make a passive income?
            .col-R.text-right
              img(src="~assets/images/Token/arrow-up.svg", alt="Arrow Right")(
                v-if="expandOption[2]"
              )
              img(
                src="~assets/images/Token/arrow-right.svg",
                alt="Arrow Right"
              )(
                v-if="!expandOption[2]"
              )
            .row(v-if="expandOption[2]")
              p.token-p.inner-text.text-left You sure will be able to. Simply buy the token on launch, hold it and wait for the staking feature to go live on FX1.

      .col.col-right
        .faqbox(@click.prevent="expand(3)")
          .row
            .col-L.text-left
              p.token-p3 Will FX1 reduce my streaming costs?
            .col-R.text-right
              img(src="~assets/images/Token/arrow-up.svg", alt="Arrow Right")(
                v-if="expandOption[3]"
              )
              img(
                src="~assets/images/Token/arrow-right.svg",
                alt="Arrow Right"
              )(
                v-if="!expandOption[3]"
              )
            .row(v-if="expandOption[3]")
              p.token-p.inner-text.text-left FX1 is on a mission to redefine how people pay for streaming services. $FX1 will soon be able to be used to pay to watch games and receive discounts across streaming services.

    .top-margin-a

    .row
      .col.col-left
        .faqbox(@click.prevent="expand(4)")
          .row
            .col-L.text-left
              p.token-p3 Where can I buy $FX1?
            .col-R.text-right
              img(src="~assets/images/Token/arrow-up.svg", alt="Arrow Right")(
                v-if="expandOption[4]"
              )
              img(
                src="~assets/images/Token/arrow-right.svg",
                alt="Arrow Right"
              )(
                v-if="!expandOption[4]"
              )
            .row(v-if="expandOption[4]")
              p.token-p.inner-text.text-left $FX1 will be available to trade on Uniswap, a leading decentralized exchange. See the section above for any help needed using Uniswap.

      .col.col-right
        .faqbox(@click.prevent="expand(5)")
          .row
            .col-L.text-left
              p.token-p3 How do I connect with friends to watch sports on FX1?
            .col-R.text-right
              img(src="~assets/images/Token/arrow-up.svg", alt="Arrow Right")(
                v-if="expandOption[5]"
              )
              img(
                src="~assets/images/Token/arrow-right.svg",
                alt="Arrow Right"
              )(
                v-if="!expandOption[5]"
              )
            .row(v-if="expandOption[5]")
              p.token-p.inner-text.text-left We’re working hard to build out our streaming functionality to allow you to watch sports with friends. Sign up so you can stay up to date on feature releases.

    .top-margin-c

    .row.text-center
      .col
        .whatbox
          h1.token-h What are you waiting for?
          .top-margin-a
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
    .top-margin-e
      span.address Contract Address:
        span 0x610C584F1275f0f7c982Af0aC7883Ff4Dba661Bd
</template>

<script>
export default {
  name: 'FAQSection',
  data() {
    return {
      expandOption: [false, false, false, false, false, false],
      isLoading: false,
    }
  },
  methods: {
    expand(option) {
      this.isLoading = true
      for (let index = 0; index < this.expandOption.length; index++) {
        if (index === option) {
          this.expandOption[index] = !this.expandOption[index]
        } else {
          this.expandOption[index] = false
        }
      }
      this.isLoading = false
    },
    showAlertMessage() {
      this.$toast.info('$FX1 available to purchase mid to late April', {
        duration: 5000,
        position: 'bottom-left',
        className: 'fx1-success',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.token-faq-section::v-deep {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 100px 0 150px;
  z-index: 2;

  .top-margin-a {
    margin-top: 25px;
  }

  .top-margin-b {
    margin-top: 50px;
  }

  .top-margin-c {
    margin-top: 150px;
  }

  .top-margin-d {
    margin-top: 10px;
  }

  .top-margin-e {
    margin-top: 30px;
  }

  .col-left {
    margin-right: 1%;
  }

  .col-right {
    margin-left: 1%;
  }

  .actions {
    margin: 12px;
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

  .faqbox {
    background-color: $secondary-dark;
    border-radius: 8px;
    border: 1px solid #557278;
    padding: 20px;
    cursor: pointer;

    .inner-text {
      border-top: 1px solid #557278;
      padding-top: 23px;
      margin-top: 12px;
    }

    img {
      padding-top: 4px;
    }

    > .row {
      width: 100%;
    }

    .col-L {
      max-width: 85%;
      min-width: 0;
      width: auto;
      flex: 10000 1 0%;
    }

    .col-R {
      max-width: 15%;
      min-width: 0;
      width: auto;
      flex: 10000 1 0%;
    }
  }

  .whatbox {
    padding: 60px 0px;
    background: linear-gradient(
      268.82deg,
      rgba(136, 107, 242, 0.8) 56.01%,
      rgba(136, 107, 242, 0) 122.21%
    );
    border-radius: 12px;
  }

  .address {
    margin-top: 30px;
  }
  // Mobile
  @include max-width(1021px) {
    .col {
      flex: none !important;
      width: 100% !important;
      margin: 0px !important;
    }

    padding: 50px 0 50px;

    h1.token-h {
      font-size: 20px;
      letter-spacing: 0.01em;
      font-weight: bold;
    }

    .top-margin-a {
      margin-top: 0px !important;
    }

    .top-margin-c {
      margin-top: 100px;
    }

    .faqbox {
      position: relative !important;
      display: flex;
      margin-bottom: 15px !important;
    }

    .whatbox {
      padding: 30px 0px;
    }

    .actions.text-right,
    .actions.text-left {
      text-align: center !important;
    }

    .btn-left,
    .btn-right {
      max-width: 42% !important;
      height: 60px !important;
      a {
        margin: 0px !important;
        width: 100% !important;
        height: 60px !important;
      }
    }

    .btn-right,
    .btn-left {
      margin-left: 4% !important;
      margin-right: 4% !important;
      text-align: center !important;
    }

    .top-margin-c {
      margin-top: 35px !important;
    }

    .actions {
      text-align: center !important;
      margin-top: 25px !important;
    }
  }
}
</style>
