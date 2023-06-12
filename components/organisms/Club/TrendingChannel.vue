<template lang="pug">
.xo-club-trending-channel
  ._icon: img(src="~assets/images/Club/trending.svg")

  .contents
    h2 Trending channels
    .list.row.justify-between
      .item.row.items-center.justify-between(
        v-for="(channel, index) in channels"
      )
        .col.row.items-center
          ._icon.row.items-center.justify-center.mr-4: img(
            src="~assets/images/Club/hash-tag.svg"
          )
          .value {{ channel }}
        b-icon.arrow-right(icon="chevron-right")
</template>

<script>
export default {
  name: 'XOClubTrendingChannel',
  data() {
    return {
      channels: [
        'Arsenal vs Manchester',
        'behind the scene',
        'fan membership',
        'fan VR memberships',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.xo-club-trending-channel::v-deep {
  background-color: $white;
  border-radius: 10px;
  padding: 50px 50px 30px;
  margin-bottom: 30px;

  > ._icon {
    margin-bottom: 90px;
  }

  .contents {
    h2 {
      color: $secondary;
      margin-bottom: 30px;
    }

    .list {
      .item {
        background-color: #f8f8f8;
        border-radius: 5px;
        padding: 10px;
        color: $secondary;
        font-size: 1.0714rem;
        line-height: 1.4286rem;
        width: calc(100% / 2 - 10px);
        margin-bottom: 20px;

        ._icon {
          width: 48px;
          height: 48px;
          background-color: $white;
          border-radius: 50%;
        }

        .arrow-right {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
