<template lang="pug">
.page-not-found
  .text
    h3 404
    h1 Page does not exist
    p.text-mobile
      | This page may have been moved or deleted.
      br
      | Let's get you back on base.
    p.text-desktop This page may have been moved or deleted. Let's get you back on base.
  .actions: b-button.is-uppercase(type="is-primary" tag="router-link" to="/")
    span GO TO HOME PAGE
    img(src="~assets/images/Vector.svg")
</template>

<script>
export default {
  name: 'XPPageNotFound',
}
</script>

<style lang="scss" scoped>
.page-not-found::v-deep {
  height: 70vh;
  color: white;
  padding: 41px 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;

  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-mobile {
      @media screen and (min-width: 501px) {
        display: none;
      }
    }
    &-desktop {
      @media screen and (max-width: 500px) {
        display: none;
      }
    }
    h1 {
      font-weight: 500;
      font-size: 44px;
      line-height: 49px;
      color: white;
      margin-bottom: 20px;

      @media screen and (max-width: 500px){
        font-weight: 500;
        font-size: 28px;
        line-height: 31px;
        margin-bottom: 10px;
      }

    }

    h3 {
      font-weight: 300;
      font-size: 24px;
      line-height: 26px;
      margin-bottom: 30px;
      @media screen and (max-width: 1280px){
        margin-bottom: 5px;
      }
    }

    p {
      font-weight: 400;
      font-size: 18px;
      line-height: 32px;
      text-align: left;

      @media screen and (max-width: 1280px){
        font-size: 16px;
      }
      @media screen and (max-width: 500px){
        margin-bottom: 180px;
        font-weight: 400;
        font-size: 18px;
        line-height: 32px;
      }
    }
  }

  @media screen and (max-width: 1280px){
    height: 60vh;
    padding: 60px 20px;
  }

  @media screen and (min-width: 375px) and (max-width: 992px){
    height: 70vh;
    padding: 50px 10px;
  }
  @media screen and (max-width: 500px){
    height: 100vh;
    justify-content: space-between;
  }
  .img-container {
    width: 100%;
    max-width: 505px;
    margin: 0 auto 5px;

    img {
      width: 100%;
      height: auto;
    }
  }

  .actions {
    margin-top: 30px;
    @media screen and (max-width: 500px){
      margin-bottom: 40px;
    }

    a {
      width: 100%;
      max-width: 320px;
    }
    span {
      margin-right: 10px;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
    }
    .button {
      border-radius: 5px;
      max-width: 234px;
      height: 40px;

      @media screen and (max-width: 500px){
        min-width: 320px !important;
        height: 40px !important;
        margin-bottom: 30px !important;
      }
    }
    img {
      margin-top: 2px;
    }
  }

  @media screen and (max-width: 780px) {
    padding: 41px 15px;
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 1.5714rem;
      line-height: 2.2857rem;
    }

    h3 {
      font-size: 1rem;
      line-height: 1.4286rem;
    }
  }
}
</style>
