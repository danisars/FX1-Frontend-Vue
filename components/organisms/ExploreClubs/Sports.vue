<template lang="pug">
.xo-explore-clubs-sports(v-smoothscrollbar)
  .sports-list.row.items-center
    .sport(
      :class="activeSport === 'all' && 'active'",
      @click.prevent="activeSport = 'all'"
    ): ._name All sports
    template(v-for="(sport, index) in sports")
      .sport(
        :class="activeSport === sport.name && 'active'",
        :key="index",
        @click.prevent="activeSport = sport.name"
      ): ._name {{ sport.name }}
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XOExploreClubsSports',
  props: {
    sports: { type: Array, default: () => [] },
  },
  computed: {
    ...mapFields('app', ['activeSport']),
  },
}
</script>

<style lang="scss" scoped>
.xo-explore-clubs-sports::v-deep {
  background-color: $white;
  border-radius: 10px;
  box-shadow: 0px 6px 20px rgba(153, 153, 153, 0.15);
  padding: 0 40px;

  @include max-width(1023px) {
    padding: 0 10px;
  }

  .sports-list {
    flex-wrap: nowrap;
    white-space: nowrap;

    .sport {
      color: #65676b;
      padding: 32px 15px;
      cursor: pointer;
      user-select: none;
      border-bottom: 2px solid transparent;
      margin: 0 10px;

      ._name {
        font-size: 1.5714rem;
        line-height: 2.4286rem;
        letter-spacing: -0.66px;

        @include max-width(1023px) {
          font-size: 1.1429rem;
          line-height: 2rem;
        }
      }

      &.active {
        color: $primary;
        border-color: $primary;
      }
    }
  }
}
</style>
