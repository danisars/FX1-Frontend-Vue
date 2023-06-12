<template lang="pug">
.xm-club-news.flex-column.justify-between
  .actions.row.items-center
    XABookmark.mr-4
    XAShare
  .details
    h3 Arteta will make a final attempt to keep striker Nketiah at Arsenal
    .time 30m ago
</template>

<script>
export default {
  name: 'XMClubNews',
  components: {
    XABookmark: () => import('~/components/atoms/Bookmark'),
    XAShare: () => import('~/components/atoms/Share'),
  },
}
</script>

<style lang="scss" scoped>
.xm-club-news::v-deep {
  background-image: url('https://picsum.photos/800');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 380px;
  border-radius: 10px;
  padding: 30px 30px 20px;
  margin-bottom: 25px;

  .details {
    background-color: $white;
    border-radius: 10px;
    color: $secondary;
    padding: 30px 30px 20px;

    h3 {
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      padding-bottom: 20px;
    }

    .time {
      opacity: 0.6;
    }
  }
}
</style>
