<template lang="pug">
.token-whitepaper-section.row
  .container.token-container-howToBuy.text-center
    WhitePaperEmbedVideo
    .row
      .col.actions
        b-button(
          type="is-primary",
          @click.prevent="downloadFile()"
        ) Download Whitepaper


</template>

<script>
export default {
  name: 'whitepaperSection',
  components: {
    WhitePaperEmbedVideo: () => import('~/components/molecules/Token/WhitePaperEmbedVideo.vue')
  },
  methods: {
    downloadFile() {
      const link = document.createElement('a');
      link.href = '/FX1_Whitepaper__V1.0.pdf';
      link.download = '';
      link.target = '_blank';
      link.click();
    },
    showAlertMessage() {
      this.$toast.success(
        '$FX1 available to purchase mid to late April',
        {
          duration: 5000,
          position: 'bottom-left',
          className: 'fx1-success',
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.token-whitepaper-section::v-deep {
  width: auto;
  position: relative;
  overflow: hidden;
  z-index: 2;
  padding: 100px 0 150px;

  .actions {
    margin: 20px 12px !important;
  }

  .button {
    margin-top: 25px;
    width: 250px !important;
    height: 60px;
    border-radius: 8px;
  }

  .top-margin-a {
    margin-top: 80px;
  }

  .top-margin-b {
    margin-top: 40px;
  }

  .top-margin-c {
    margin-top: 20px;
  }

  .actions {
    margin: 12px;
  }

  .purple-text {
    color: $purples;
  }

  .main-box {
    position: relative;
    box-shadow: 0px 25px 77px -10px rgba(255, 255, 255, 0.2);
    border: 1px solid #385960;
    border-radius: 8px;
    background-color: $secondary;
    margin: 12px;
    height: 500px;
    padding: 25px 0;

    .section-left {
      img {
        width: auto;
        height: 450px;
      }
    }

    .section-right {
      margin-top: 5%;
      width: 72% !important;

      @include max-width(1650px) {
        margin-top: 6%;
      }

      @include max-width(1580px) {
        margin-top: 7%;
      }

      @include max-width(1530px) {
        width: 82% !important;
      }

      @include max-width(1450px) {
        margin-top: 8.5%;
      }
    }

    .text-yellow {
      color: #FFAF23 !important;
    }
  }

   // Tablet
  @include max-width(1021px) {
    .main-box {
      margin: 0px;
    }
    .section-right {
      margin-left: 7%;
    }
  }

  // Mobile
  @include max-width(500px) {
    padding: 50px 0 50px;

    .top-margin-b {
      margin-top: 5px;
    }

    .actions {
      margin: 20px 0px !important;
    }

    .main-box {
      margin: 0px;
      height: auto;
      box-shadow: 0px 5px 15px -1px rgba(255, 255, 255, 0.2);

      .section-right {
        margin-top: 0%;
        width: 100% !important;
        padding: 20px;
      }

      .section-left {
        img {
          padding: 20px 20px 0px 20px;
          width: 100%;
          height: auto;
        }
      }

      .section-right {
        width: 100% !important;
      }
    }
  }
}
</style>
