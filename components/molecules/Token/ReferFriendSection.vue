<template lang="pug">
.refer-friend-section.row
  .container.token-container
    h1 Refer Friends, Earn $FX1
    .row
      .left-side
        .top-margin-b
        p.token-p Oh my, this just keeps getting better, doesn’t it! Refer a friend (or fo) to buy $100 or more of $FX1 and you’ll earn 3% of their purchase. It doesn’t stop there, the person you referred will also earn an additional 2%
      .col.right-side.text-center
        .top-margin-a
        .row.boxes
          .col.box-one.text-left
            h2.token-h2.top-layer Head Over
            p.token-p.middle-layer to our 
              a(href="https://fx1.referral-factory.com/yg5BPM/join" class="link") referral 
              a(href="https://fx1.referral-factory.com/yg5BPM/join" class="link token-p bottom-layer" style="width: 100%; margin-left: -21px; margin-top: 10px;") campaign page
          .col.box-two.text-left
            h2.token-h2.top-layer Enter
            p.token-p.middle-layer your wallet address, handle, and email
        .row.boxes
          .col.box-three.text-left
            h2.token-h2.top-layer Obtain
            p.token-p.middle-layer your custom referral link and share like crazy
          .col.box-four.text-left
            h2.token-h2.top-layer Sit back
            p.token-p.middle-layer and watch the free $FX1 roll in
    .row.game-boss
      .col
        video(src="GameBossMembership.mp4" controls)
      .col(style="min-height:300px")
        p Anyone who generates over $100,000 in referral purchases will also earn themselves a limited edition Game Boss Membership.
          
</template>

<script>
export default {
  name: 'NFTfanSection'
}
</script>

<style lang="scss" scoped>
.refer-friend-section::v-deep {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 150px 0;
  z-index: 2;

  .top-margin-a {
    margin-top: 25px;
  }

  .top-margin-b {
    margin-top: 32px;
  }

  .link {
    color: $purples;
  }
  .game-boss {
    margin-top: 50px;
    video {
    margin-left: 7%;
    width: 74%;
  @include max-width(500px) {
      width: 100%;
      margin-left: 0%;
  }
    }

    p {
        /* web/body 1 */
        font-family: 'Rotunda';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 32px;
        padding-top: 30%;
        letter-spacing: 0.01em;
        color: #FFFFFF;
    }
  }
  
  .left-side {
    padding-right: 0%;
    width: 520px;
    .token-p {
      /* web/body 1 */
      font-family: 'Rotunda';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 32px;
      /* or 178% */
      letter-spacing: 0.01em;
      color: #FFFFFF;
    }
  @include max-width(1348px) {
    width: 400px;
  }
  @include max-width(1223px) {
    width: 300px;
  }
    @include max-width(800px) {
    width: 100%;
  }
    
  }

  .right-side {
    position: relative;
    @include max-width(800px) {
    flex: none;
    width: 100% !important;
    display: block;
  }
  }
  // Mobile
  @include max-width(500px) {
    padding: 50px 0 50px;

    .top-margin-b {
      margin-top: 0px !important;
    }

    .right-side {
      img {
        top: 0%;
        position: relative;
        margin-top: 25px;
      }
    }
    
  }

  // Right Side
  .button {
    pointer-events: none;
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

  .boxes {

    .col {
      background-color: $secondary;
      width: 352px;
      height: 164px;
      background-position: right bottom;
      background-repeat: no-repeat;
      background-size: contain;
      margin: 12px;
      border-radius: 10px;
      position: relative;

      .top-layer {
        position: absolute;
        top: 18%;
        left: 11%;
        @include max-width(1115px) {
          font-size:35px;
        }
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
