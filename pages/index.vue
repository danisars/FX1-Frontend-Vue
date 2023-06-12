<template lang="pug">
XPHome
</template>

<script>
import meta from '~/mixins/meta'

export default {
  name: 'PageIndex',
  components: {
    XPHome: () => import('~/components/pages/Home'),
  },
  mixins: [meta],
  // async beforeCreate() {
  //   const isLoggedIn = this.$store.state.auth.isLoggedIn
  //   const onHomePageLoad = this.$store.state.app.onHomePageLoad

  //   if (isLoggedIn && !onHomePageLoad) {
  //     const {
  //       Me: { Supporting },
  //     } = await this.$api.getMyProfileSupporting()

  //     if (!Supporting) return
  //     if (Supporting.length) {
  //       this.$router.push({
  //         path: `/locker-room/${Supporting[0]?.slug}/${Supporting[0]?.defaultChannelSlug}`,
  //       })
  //       return
  //     }

  //     this.$router.push({
  //       path: '/locker-room/explore',
  //     })
  //   }
  // },
  created() {
    this.metaTitle = 'Show the world who you support - FX1'
  },
  mounted() {
    const params = { pageName: 'Home', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
