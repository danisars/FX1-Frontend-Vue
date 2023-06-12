<template lang="pug">
#whyfx1.game-boss-section.row
  .container.token-container
    .row
      .col.left-side
        h1 The Game Boss Membership
        .top-margin-a
        p.token-p The Game Boss Membership is an exclusive tier 1 membership group for those who want to be an integral part of the FX1 team and journey.
        .row
          .col.btn-apply
            a.button.is-primary(
              href="https://forms.gle/WhwoDuxJj3BVdg5U8"
              target="_blank"
            ) Apply Now
      .col.right-side
        .video-container
          video.gameboss-video(src="GameBossMembership.mp4", controls)

          img.circles(
            src="~assets/images/Boss-Membership/circle-1.png",
            alt="circles"
          )
  .shape
</template>
<script>
export default {
  name: 'GameBoss',
}
</script>

<style lang="scss" scoped>
.game-boss-section::v-deep {
  width: 100%;
  position: relative;
  padding: 300px 0 0;
  z-index: 2;
  @include max-width(1025px) {
    padding: 175px 0 0;
  }

  .token-container .row {
    @include max-width(500px) {
      flex-direction: column;
    }
  }

  .shape {
    width: 100%;
    height: 520px;
    position: absolute;
    bottom: -30%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.655842) 15.12%,
      #000000 46.29%,
      rgba(0, 0, 0, 0.668267) 73.22%,
      rgba(0, 0, 0, 0) 90.69%
    );
    opacity: 0.7;
    z-index: -1;
    @include max-width(1025px) {
      bottom: -80%;
    }
    @include max-width(500px) {
      display: none;
    }
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

  .top-margin-a {
    margin-top: 25px;
  }

  .top-margin-b {
    margin-top: 48px;
  }

  .left-side {
    h1 {
      letter-spacing: unset;
      @include max-width(1025px) {
        font-size: 48px;
        line-height: 54px;
        font-weight: 600;
      }

      @include max-width(500px) {
        font-size: 32px;
        line-height: 35px;
      }
    }

    .btn-apply {
      margin-top: 48px;

      @include max-width(1025px) {
        margin-top: 60px;
      }

      a {
        width: 200px;
        height: 60px;
        border-radius: 8px;
        font-size: 20px;
      }
    }

    p.token-p {
      font-size: 16px;
      line-height: 24px !important;
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
}
</style>
