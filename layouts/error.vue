<template lang="pug">
.page-error
  XPPageNotFound
</template>


<script>
import XPPageNotFound from '../components/pages/PageNotFound'
export default {
  components: { XPPageNotFound },
  layout: 'error'
}
</script>

<style lang="scss" scoped>
.page-error::v-deep {
  background: url('~assets/images/error-image.png') no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: calc(100vh - 120px);
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    z-index: 1;
  }
  & > * {
    position: relative;
    z-index: 2;
  }
  @media screen and (max-width: 1280px) {
    min-height: calc(100vh - 150px);
  }
  @media screen and (max-width: 1024px) {
    min-height: calc(100vh - 180px);
  }
  @media screen and (max-width: 970px) {
    min-height: calc(100vh - 200px);
  }
  @media screen and (max-width: 500px) {
    background: url('~assets/images/error-image-mobile.png') no-repeat;
    background-size: cover;
    background-position: center;
    min-height: calc(100vh - 55px);
  }
}
</style>
