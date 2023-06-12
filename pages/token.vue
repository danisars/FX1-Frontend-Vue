<template lang="pug">
XPToken
</template>

<script>
import meta from '~/mixins/meta'

export default {
  name: 'PageToken',
  components: {
    XPToken: () => import('~/components/pages/Token'),
  },
  mixins: [meta],
  layout: 'token-page',
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
    this.metaTitle = '$FX1 Token - FX1'
  },
  mounted() {
    const params = { pageName: 'Token', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
}
</script>
