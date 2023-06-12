<template lang="pug">
.xp-locker-room
</template>

<script>
export default {
  name: 'PageLockerRoom',
  async asyncData({ app, route, redirect }) {
    const slug = route?.params?.slug

    const { getLockerRoom } = await app.$api.getLockerRoom({ slug })

    if (!getLockerRoom) redirect('/locker-room/explore')

    const { defaultChannelSlug } = getLockerRoom || {}
    redirect(`/locker-room/${slug}/${defaultChannelSlug}`)
  },
}
</script>
