<template lang="pug">
.xt-locker-room-breadcrumbs(v-if="!showBreadcrumbs && isLoggedIn")
  .row.items-center
    .left-breadcrumbs.row.items-center
      .back.row(@click.prevent="fnGoBack()")
        img(src="~assets/images/LockerRoom/back.svg")
      h4 {{ title }}

    .right-breadcrumbs
</template>

<script>
export default {
  name: 'XTLockerRoomBreadcrumbs',
  computed: {
    title() {
      const route = this.$route.name

      if (route === 'locker-room-explore') {
        return 'Communities'
      }

      return route
    },
    showBreadcrumbs() {
      const pages = [
        'locker-room',
        'locker-room-slug-channel',
        'mentions',
        'mentions-id',
      ]
      const routeName = this.$route.name

      return pages.includes(routeName)
    },
  },
  methods: {
    fnGoBack() {
      this.$router.push({
        path: '/locker-room',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xt-locker-room-breadcrumbs::v-deep {
  padding: 0 15px;
  min-height: 60px;
  border-bottom: 1px solid rgba(#e7e8e8, 0.2);
  color: $white;
  position: sticky;
  top: 0px;
  z-index: 10;
  display: none;

  @include max-width(767px) {
    display: flex;
  }

  .back {
    margin-right: 20px;
  }
}
</style>
