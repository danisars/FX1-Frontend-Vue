<template lang="pug">
.xm-locker-room-header-left(:class="isLoggedIn && 'is-logged-in'")
  .logo: nuxt-link(to="/"): img(
    src="~assets/images/LOGO_header.svg",
    alt="FX1",
  )
</template>

<script>
export default {
  name: 'XMLockerRoomHeaderLeft',
}
</script>

<style lang="scss" scoped>
.xm-locker-room-header-left::v-deep {
  width: 100%;
  max-width: 250px;
  margin-top: auto;
  margin-bottom: auto;


  @include max-width(1023px) {
    width: auto;
    max-width: unset;
  }

  &.is-logged-in {
    width: auto;
    max-width: unset;
  }

  .logo {
    margin-top: 2px;

    @include max-width(767px){
      max-width: 39px;
      margin-top: 4px;
      margin-left: 2px;
    }

    a {
      display: block;

      img {
        @include max-width(767px) {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
