<template lang="pug">
.xo-home-sports
  .container.is-max-widescreen
    h2 Sports

    .sports.row.justify-between
      XMHomeSport(
        v-for="(sport, index) in sports",
        :key="index",
        :sport="sport"
      )
      .more-to-come.flex-column.justify-between
        ._icon: img(
          src="~assets/images/Home/more-to-come.svg",
          alt="More to come"
        )
        .text: h3 Plus many more to come...
</template>

<script>
import orderBy from 'lodash/orderBy'

export default {
  name: 'XOHomeSports',
  components: {
    XMHomeSport: () => import('~/components/molecules/Home/Sport'),
  },
  data() {
    return {
      sports: [],
    }
  },
  mounted() {
    this.fnRetrieveSports()
  },
  methods: {
    async fnRetrieveSports() {
      try {
        const {
          getSports: { items },
        } = await this.$api.getSportsHomePage()

        this.sports = orderBy(items, ['status'], ['asc'])
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.success(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-home-sports::v-deep {
  background-color: $secondary_b;
  padding: 100px 0;

  @include max-width(1023px) {
    padding: 80px 0 50px;
  }

  h2 {
    margin-bottom: 50px;
  }

  .sports {
    .xm-home-sport,
    .more-to-come {
      width: calc(100% / 3 - 15px);
      margin-bottom: 20px;
      min-height: 260px;

      @include max-width(1023px) {
        width: calc(100% / 2 - 10px);
      }

      @include max-width(767px) {
        width: 100%;
        min-height: 185px;
      }
    }

    .more-to-come {
      background-color: #2a4e55;
      border-radius: 10px;
      padding: 30px;

      @include max-width(1023px) {
        width: 100%;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        min-height: auto;
      }

      ._icon {
        opacity: 0.2;

        @include max-width(1023px) {
          margin-right: 30px;
        }

        @include max-width(767px) {
          width: 100%;
          margin: 0 0 30px;
        }
      }

      h3 {
        @include max-width(1023px) {
          font-size: 1.5714rem;
          line-height: 2.4286rem;
        }
      }
    }
  }
}
</style>
