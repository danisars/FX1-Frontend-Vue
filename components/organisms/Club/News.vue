<template lang="pug">
.xo-club-news.col
  h2 Club News
  .news-list.row.justify-between
    XMClubNews(v-for="n in 4", :key="n")
  .show-more.text-uppercase.text-weight-medium Show more
</template>

<script>
export default {
  name: 'XOClubNews',
  components: {
    XMClubNews: () => import('~/components/molecules/Club/News'),
  },
}
</script>

<style lang="scss" scoped>
.xo-club-news::v-deep {
  background-color: #08252c;
  padding: 50px;
  border-radius: 10px;
  margin-right: 30px;

  h2 {
    margin-bottom: 50px;
  }

  .show-more {
    cursor: pointer;
  }

  .news-list {
    .xm-club-news {
      width: 100%;

      @include min-width(1441px) {
        width: calc(100% / 2 - 12.5px);
      }
    }
  }
}
</style>
