<template lang="pug">
nuxt-link.xm-home-sport.flex-column.justify-end(
  to="/locker-room/explore",
  :style="{ backgroundImage: `url(${coverPhoto})` }",
  @click.native="fnSetActiveSport()"
)
  .details.row.justify-between.items-center
    h3.name {{ name }}
    .is-available
      .status.available(v-if="status === 'Available'") Available
      .status.coming-soon(v-else) Coming Soon
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XMHomeSport',
  props: {
    sport: { type: Object, default: () => {} },
  },
  computed: {
    ...mapFields('app', ['activeSport']),
    name() {
      return this.sport?.name || ''
    },
    slug() {
      return this.sport?.slug || null
    },
    status() {
      return this.sport?.status || ''
    },
    coverPhoto() {
      return this.sport?.CoverPhoto?.PhotoURL || null
    },
    lockerRoomCount() {
      return this.sport?.LockerRooms?.count || 0
    },
  },
  methods: {
    fnSetActiveSport() {
      if (!this.lockerRoomCount) {
        this.activeSport = 'all'
        return
      }
      this.activeSport = this.name
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-home-sport::v-deep {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 30px;
  border-radius: 10px;
  color: $white;

  .details {
    h3 {
      @include max-width(1023px) {
        font-size: 1.5714rem;
        line-height: 2.4286rem;
      }
    }

    .is-available {
      .status {
        padding: 5px 10px;
        font-weight: 300;
        border-radius: 100px;

        &.available {
          background-color: $primary;
        }

        &.coming-soon {
          background-color: #886bf2;
        }
      }
    }
  }
}
</style>
