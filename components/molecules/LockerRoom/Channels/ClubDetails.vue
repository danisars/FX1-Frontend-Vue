<template lang="pug">
.xm-locker-room-channels-club-details
  h3 {{ name }}
  .supporters {{ supporterCount }} supporters
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XMLockerRoomChannelsClubDetails',
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    name() {
      return this.lockerRoomActive?.name
    },
    supporterCount() {
      return this.lockerRoomActive?.supporterCount || 0
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-locker-room-channels-club-details::v-deep {
  margin-bottom: 30px;

  .rank,
  .supporters {
    opacity: 0.5;
  }

  .upgrade {
    margin-top: 20px;

    .button {
      margin-top: 4px;
      height: 42px;

      ._icon {
        margin-top: 4px;
      }

      .value {
        letter-spacing: 0.8px;
      }
    }
  }
}
</style>
