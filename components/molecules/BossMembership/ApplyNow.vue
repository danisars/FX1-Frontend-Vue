<template lang="pug">
.apply-now
  .container.token-container.text-center
    .row.text-center
      .col
        .whatbox
          h1.token-h Don’t wait, apply now before they all sell out.
          .top-margin-a
          .row
            .col.btn-center
              a.button.is-primary(
                href="https://forms.gle/WhwoDuxJj3BVdg5U8"
                target="_blank"
              ) Apply Now
</template>

<script>
export default {
  name: 'ApplyNow',
}
</script>

<style lang="scss" scoped>
.apply-now::v-deep {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 135px 0;
  z-index: 2;

  @include max-width(1025px) {
    padding: 120px 0;

    .col {
      flex: none !important;
      width: 100% !important;
      margin: 0px !important;
    }

    .whatbox {
      padding: 40px 0px;
    }
  }
  @include max-width(500px) {
    padding: 100px 0;
  }

  .top-margin-a {
    margin-top: 60px;
    @include max-width(1025px) {
      margin-top: 40px;
    }
  }

  .btn-center {
    a {
      width: 200px;
      height: 60px;
      border-radius: 8px;
      font-size: 20px;
      font-weight: 500;

      @include max-width(500px) {
        width: 303px;
        max-width: 100%;
      }
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

    h1.token-h {
      max-width: 60%;
      margin: 0 auto;
      font-size: 60px;
      line-height: 67px;
      font-weight: 500;
      letter-spacing: unset;

      @include max-width(1025px) {
        max-width: 90%;
        font-size: 28px;
        line-height: 31px;
        font-weight: 600;
      }

      @include max-width(500px) {
        font-size: 20px;
        line-height: 22px;
      }
    }
  }
}
</style>
