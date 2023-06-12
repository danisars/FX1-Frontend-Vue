<template lang="pug">
.xm-home-catalogs-stay-connected
  img.desktop(
    src="~assets/images/Home/catalog-5.png",
    width="411",
    height="398",
    alt="Stay connected with friends through sports"
  )
</template>

<script>
export default {
  name: 'XMHomeCatalogsStayConnected',
}
</script>

<style lang="scss" scoped>
.xm-home-catalogs-stay-connected::v-deep {

  @include max-width(810px) {
    right: -31%;
    text-align: left;
    background-size: 800px;
    background-position: top -145px right 0;
  }

  @include max-width(767px) {
    right: unset;
    background-position: top -110px center;
    text-align: center;
    padding: 30px 0 10px;
  }

  @include max-width(480px) {
    right: -5%;
    background-size: 660px;
  }

  img {
    margin-right: -9%;
    position: relative;

    @include max-width(1215px) {
      margin-right: 10.7%;
    }

    @include max-width(1023px) {
      margin-right: 3.2%;
    }

    @include max-width(810px) {
      margin-right: 0;
      right: -8.6%;
    }

    @include max-width(768px) {
      right: -3%;
      max-width: 310px;
      width: 100%;
    }

    @include max-width(767px) {
      right: 0%;
    }

    @include max-width(480px) {
      max-width: 270px;
      right: 0%;
    }
  }
}
</style>
