<template lang="pug">
.xm-locker-room-channels-navigation
  .navigation-item.row.items-center(@click.prevent="fnCheckChannelCount()")
    ._icon: img(
      src="~assets/images/LockerRoom/add.svg",
      alt="Add channels group"
    )
    ._label.col Add channels group
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XMLockerRoomChannelsNavigation',
  mixins: [dialogs],
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
  },
  methods: {
    fnCheckChannelCount() {
      if (this.lockerRoomActive?.channelCount >= 150) {
        this.$toast.success('You have reached the number of channels created', {
          duration: 5000,
          position: 'bottom-left',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'alert-circle-outline',
        })
        return
      }

      this.fnShowCreateChannelGroupDialog()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-locker-room-channels-navigation::v-deep {
  margin: 0 0 30px;

  .navigation-item {
    color: $white;
    padding: 6.5px 0;
    font-size: 1.0714rem;
    line-height: 1.4286rem;
    position: relative;
    cursor: pointer;

    &::before {
      content: '';
      background-color: transparent;
      position: absolute;
      top: 0;
      left: -12px;
      border-radius: 5px;
      width: calc(100% + 12px);
      height: 100%;
      z-index: 0;
    }

    ._icon {
      margin-right: 15px;
      margin-top: 3px;
    }

    ._icon,
    ._label {
      position: relative;
      z-index: 1;
    }

    &.active {
      &::before {
        background-color: $secondary;
      }
    }
  }
}
</style>
