<template lang="pug">
.token-roadmap-section.row#roadmap
  .container.token-container-reduce.text-center
    h1 Roadmap
    .for-desktop-tablet
      .layer-top.text-left
        ul.token-u
          li.token-p Close pre-seed funding of 1.7M
          li.token-p Launch our custom-built website
          li.token-p Release our iOS and Android apps
          li.token-p Add NBA, NBL, WNBA Locker Rooms
          li.token-p Add app push notifications
          li.token-p Build our first smart contracts (ERC-721)
          li.token-p Add UFC, NFL, and NCAA Locker Rooms
          li.token-p Run our first live streaming event
          li.token-p Partner with Proof for token launch (ERC-20)
          li.token-p Add live sports streams across multiple sports
      .layer-middle.text-left
        ul.token-u
          li.token-p $FX1 token release
          li.token-p Public and private streamed sports rooms + audio and video
          li.token-p Encrypted one-to-one and group messages
          li.token-p Token rewards and gamification offering
          li.token-p Partner with leading streaming platforms
          li.token-p Play by play and real-time game data
          li.token-p Migrate smart contracts to Avalanche Network
          li.token-p NFT fan collection drops
      .layer-bottom.text-left
        ul.token-u
          li.token-p Form partnerships with major sports leagues
          li.token-p Create partnership with a global P.R agency
          li.token-p Official launch in Europe
          li.token-p List on major exchanges (Binance, Coinbase, Kraken, Crypto.com)
          li.token-p Official launch into Asia
  .container.token-container
    .for-mobile
      img(
        src="~assets/images/Token/Roadmap-Mobile-1.svg",
        alt="Phase 1 - Launch"
      )
      ul.token-u.text-left
        li.token-p Close pre-seed funding of 1.7M
        li.token-p Launch our custom-built website
        li.token-p Release our iOS and Android apps
        li.token-p Add NBA, NBL, WNBA Locker Rooms
        li.token-p Add app push notifications
        li.token-p Build our first smart contracts (ERC-721)
        li.token-p Add UFC, NFL, and NCAA Locker Rooms
        li.token-p Run our first live streaming event
        li.token-p Partner with Proof for token launch (ERC-20)
        li.token-p Add live sports streams across multiple sports
      img(
        src="~assets/images/Token/Roadmap-Mobile-2.svg",
        alt="Phase 1 - Launch"
      )
      ul.token-u.text-left
        li.token-p $FX1 token release
        li.token-p Public and private streamed sports rooms + audio and video
        li.token-p Encrypted one-to-one and group messages
        li.token-p Token rewards and gamification offering
        li.token-p Partner with leading streaming platforms
        li.token-p Play by play and real-time game data
        li.token-p Migrate smart contracts to Avalanche Network
        li.token-p NFT fan collection drops
      img(
        src="~assets/images/Token/Roadmap-Mobile-3.svg",
        alt="Phase 1 - Launch"
      )
      ul.token-u.text-left
        li.token-p Form partnerships with major sports leagues
        li.token-p Create partnership with a global P.R agency
        li.token-p Official launch in Europe
        li.token-p List on major exchanges (Binance, Coinbase, Kraken, Crypto.com)
        li.token-p Official launch into Asia
    
          
</template>

<script>
export default {
  name: 'RoadmapSection'
}
</script>

<style lang="scss" scoped>
.token-roadmap-section::v-deep {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 150px 0 0;
  z-index: 2;
  min-height: 2450px;

  @include max-width(1200px) {
    min-height: 2150px;
  }
  @include max-width(930px) {
    min-height: 1950px;
  }
  @include max-width(500px) {
    min-height: 1700px;
    padding: 50px 0 70px;
  }
  
  .for-mobile {
    display: none;
  }

  @include max-width(734px) {
    .for-desktop-tablet {
      display: none;
    }
    .for-mobile {
      display: block;
    }
  }

  .token-container-reduce {
    padding: 0px !important;
    margin: 0px !important;
    width: 100%;
    height: 100%;
    min-width: 100%;
    position: relative;
  }

  .top-margin-a {
    margin-top: 25px;
  }

  .top-margin-b {
    margin-top: 70px;
  }

  .left-side {
    padding-right: 20%;
  }

  .layer-top {
    position: absolute;
    top: 270px;
    left: 50%;

    @include max-width(1020px) {
      top: 200px;
    }
  }

  .layer-middle {
    position: absolute;
    top: 1020px;
    right: 50%;

    @include max-width(1200px) {
      top: 910px;
      left: 50%;
      right: 0%;
    }

    @include max-width(1020px) {
      top: 820px;
    }
  }

  .layer-bottom {
    position: absolute;
    top: 1770px;
    left: 50%;

    @include max-width(1200px) {
      top: 1555px;
    }

    @include max-width(1020px) {
      top: 1455px;
    }
  }
}
</style>
