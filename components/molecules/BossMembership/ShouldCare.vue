<template lang="pug">
.should-care-section.row
  .container.token-container
    .row
      .col.left-side
        h2 Why should I care?
        ul.token-u
          li.token-p Because once it sells out, you may never be able get one.
          .top-margin-a
          li.token-p We’re only releasing 100 spots; that’s not a high number.
      .col.right-side.text-center
        .video-container
          video.gameboss-video(src="GameBossMembership.mp4", controls)

          img.circles(
            src="~assets/images/Boss-Membership/circle-3.png",
            alt="circles"
          )
</template>

<script>
export default {
  name: 'SouldCare',
}
</script>

<style lang="scss" scoped>
.should-care-section::v-deep {
  width: 100%;
  position: relative;
  padding: 225px 0 0;
  z-index: 2;

  @include max-width(1025px) {
    padding: 140px 0 0;
  }

  .token-container .row {
    @include max-width(500px) {
      flex-direction: column;
    }
  }

  .top-margin-a {
    margin-top: 25px;
  }

  .top-margin-b {
    margin-top: 70px;
  }

  .circles {
    width: 400%;
    max-width: unset;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    z-index: -1;
  }

  .left-side {
    padding-right: 0%;

    h2 {
      font-size: 60px;
      @include max-width(1025px) {
        font-size: 36px;
        line-height: 40px;
        font-weight: 700;
      }
      @include max-width(500px) {
        font-size: 28px;
        line-height: 31px;
      }
    }

    ul.token-u {
      padding-left: 5%;
      margin-top: 50px;
      @include max-width(1025px) {
        margin-top: 60px;
      }
      @include max-width(500px) {
        margin-top: 40px;
      }
      li.token-p {
        font-size: 24px !important;
        line-height: 32px !important;
        @include max-width(1025px) {
          font-size: 18px !important;
          line-height: 28px !important;
        }
        @include max-width(500) {
          font-size: 16px !important;
        }
      }
      li:first-child {
        max-width: 85%;
      }
      li:last-child {
        max-width: 70%;
      }
    }
  }

  .right-side {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include max-width(500px) {
      margin-top: 70px;
      justify-content: center;
    }
    .video-container {
      position: relative;
      box-shadow: 0px 25px 77px -10px rgba(255, 255, 255, 0.2);
      max-height: 426px;
      @include max-width(1025px) {
        max-height: 287px;
      }
      .gameboss-video {
        width: 426px;
        @include max-width(1025px) {
          max-width: 287px;
        }
      }
    }
  }

  // Mobile
  @include max-width(500px) {
    padding: 0;

    .top-margin-b {
      margin-top: 0px !important;
    }
  }
}
</style>
