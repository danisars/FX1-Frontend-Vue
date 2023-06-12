<template lang="pug">
.xo-channels-preview-banner.row.items-center.justify-between
  .left-preview-banner.row.items-center.col
    .btn-explore
      b-button(
        type="is-white",
        outlined,
        tag="router-link",
        to="/locker-room/explore"
      )
        .row.items-center
          ._icon: img(src="~assets/images/Club/arrow-left.svg")
          ._label Explore
    .text-content.col: h3 {{ name }} preview. Support to join and start chatting
  .right-preview-banner
    .btn-support: b-button(
      type="is-white",
      @click.prevent="fnShowCommunityRules()"
    ) Support {{ name }}
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XOChannelsPreviewBanner',
  mixins: [dialogs],
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    name() {
      return this.lockerRoomActive?.name || null
    },
  },
  methods: {
    fnShowCommunityRules() {
      this.fnShowCommunityRulesDialog()
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-channels-preview-banner::v-deep {
  width: 100%;
  min-height: 90px;
  background-color: $primary;
  padding: 0 30px;

  @include max-width(1023px) {
    padding: 0 15px;
  }

  @include max-width(767px) {
    display: none;
  }

  .left-preview-banner {
    .btn-explore {
      .button {
        width: 140px;
        height: 42px;
        text-transform: uppercase;
        border-color: rgba($white, 0.3);
        background-color: transparent;
        color: $white;
        box-shadow: none;

        ._icon {
          margin-right: 10px;
          margin-top: 4px;
        }
      }
    }

    .text-content {
      padding: 0 30px;

      @include max-width(1023px) {
        padding: 0 15px;
      }
    }
  }

  .right-preview-banner {
    .btn-support {
      .button {
        min-width: 205px;
        height: 42px;
        color: $primary;
        text-transform: uppercase;
      }
    }
  }
}
</style>
