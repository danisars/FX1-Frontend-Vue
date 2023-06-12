<template lang="pug">
.token-nft-fan-section.row
  .container.token-container
    .row
      .col.left-side
        h1 Fan Avatar Drop
        .top-margin-a
        .top-margin-b
        p.token-p By becoming one of the early holders of the $FX1 token, you’ll be in the draw to win your very own Fan Avatar from the first release of the FX1 Fan Avatar series.
        .top-margin-a
        ul.token-u
          li.token-p Be one of 30 potential holders of the first Fan Avatars to be released
          li.token-p The more $FX1 you buy on launch, the better chance you’ll have
          li.token-p If drawn, you’ll receive your NFT by way of a drop by June 2023
      .col.right-side.text-center
        img(
          src="~assets/images/Token/nft-fan-avatar.svg",
          alt="NFT Fan Avatar"
        )
    h2.what-can-you-do-h2 What you can do with your Fan Avatar
    .row.justify-content-center.what-can-you-do
      .col-3.fan-avatar-box
        img(
          src="~assets/images/Token/special-power.svg",
          alt="NFT Fan Avatar"
        )
        p Your Fan Avatar will give you special social powers on FX1
      .col-3.fan-avatar-box
        img(
          src="~assets/images/Token/gift.svg",
          alt="NFT Fan Avatar"
        )
        p Ability to earn more rewards and $FX1 tokens
      .col-3.fan-avatar-box
        img(
          src="~assets/images/Token/rocket.svg",
          alt="NFT Fan Avatar"
        )
        p Access to early releases on Fan Avatar NFT collections
      .col-3.fan-avatar-box
        img(
          src="~assets/images/Token/message.svg",
          alt="NFT Fan Avatar"
        )
        p Access to private Event Rooms featuring special guests
      .col-3.fan-avatar-box
        img(
          src="~assets/images/Token/contact.svg",
          alt="NFT Fan Avatar"
        )
        p Display and promote your Fan Avatar on your FX1 profile
      
    
      
          
</template>

<script>
export default {
  name: 'NFTfanSection'
}
</script>

<style lang="scss" scoped>
.token-nft-fan-section::v-deep {
  background: url('~assets/images/Token/FanAvatarBackground.svg');
  background-repeat: no-repeat;
  background-position: bottom left;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 150px 0;
  z-index: 2;
  background-position-y: 280px;

  .top-margin-a {
    margin-top: 25px;
  }

  .top-margin-b {
    margin-top: 70px;
  }

  .left-side {
    padding-right: 0%;
  }

  .right-side {
    position: relative;
    
    img {
    width: 100%;
    top: -22%;
    right: -10%;
    position: absolute;

      @include max-width(1800px) {
        top: -18%;
      }

      @include max-width(1705px) {
        top: -5%;
      }

      @include max-width(1480px) {
        top: 7%;
      }

      @include max-width(1280px) {
        top: 18%;
      }

      @include max-width(1260px) {
        top: 22%;
      }
      @include max-width(1025px) {
        right: 0%;
      }
    }
  }
  .what-can-you-do-h2 {
    margin-top: 216px;
    font-family: 'Rotunda';
    font-style: normal;
    font-weight: 700;
    font-size: 44px;
    line-height: 49px;
    /* identical to box height */
    letter-spacing: 0.02em;
  }
  .what-can-you-do {
    margin-top: 50px;
    justify-content: space-around;

    .fan-avatar-box {
      padding: 20px;
      gap: 20px;
      width: 406px;
      height: 231px;
      margin-top: 30px;
      /* dark/800 */
      background: #0C353E;
      border-radius: 20px;
      @include max-width(1492px) { 
        }
        @include max-width(1463px) { 
            width: 350px;
            height: 221px;
        }
        @include max-width(1388px) { 
            width: 330px;
            height: 211px;
        } 
        @include max-width(1313px) { 
            width: 315px;
            height: 211px;
        } 
        @include max-width(1313px) { 
            width: 290px;
            height: 200px;
        }
        @include max-width(767px) { 
            width: 270px;
            height: 200px;
        }
        @include max-width(619px) { 
            width: 250px;
            height: 200px;
        }
        @include max-width(560px) { 
            width: 100%;
            height: 200px;
        }

        p {
            /* web/body 0 */
            font-family: 'Rotunda';
            font-style: normal;
            font-weight: 300;
            font-size: 22px;
            line-height: 32px;
            /* or 133% */
            letter-spacing: 0.02em;
            color: #FFFFFF;
            @include max-width(1463px) { 
              font-size: 20px;
            }
            @include max-width(1400px) { 
              font-size: 18px;
            }
            @include max-width(1350px) { 
              font-size: 16px;
            }
            @include max-width(767px) { 
              font-size: 14px;
            }
            @include max-width(619px) { 
              font-size: 13px;
            }

        }
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
}
</style>
