<template lang="pug">
.xt-locker-room-sidebar-right.flex-column
  .actions.row.items-center.justify-center
    h3.col Members
    .close.row(@click.prevent="showOnlineMembers = false"): img(
      src="~assets/images/LockerRoom/close.svg",
      alt="Close"
    )
  .col(v-bar)
    .vuebar
      XOLockerRoomManagement
      XOLockerRoomSupporters
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XTLockerRoomSidebarRight',
  components: {
    XOLockerRoomManagement: () =>
      import('~/components/organisms/LockerRoom/Management'),
    XOLockerRoomSupporters: () =>
      import('~/components/organisms/LockerRoom/Supporters'),
  },
  computed: {
    ...mapFields('app', ['showOnlineMembers']),
  },
}
</script>

<style lang="scss" scoped>
.xt-locker-room-sidebar-right::v-deep {
  width: 100%;
  max-width: 320px;
  height: calc(var(--vh, 1vh) * 100 - 80px);
  background-color: #08252c;

  @include max-width(1024px) {
    max-width: 200px;
  }

  @include max-width(768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    max-width: 100%;
    height: calc(var(--vh, 1vh) * 100);
  }

  .actions {
    padding: 0 30px;
    min-height: 85px;
    border-bottom: 1px solid rgba(#e7e8e8, 0.1);

    @include max-width(767px) {
      min-height: 55px;
    }

    .close {
      opacity: 0.3;
      cursor: pointer;
    }
  }

  .vb {
    > .vb-dragger {
      z-index: 5;
      width: 8px;
      right: 0;
      opacity: 0;

      > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0, 0, 0, 0);
        transform: rotate3d(0, 0, 0, 0);
        -webkit-transition: background-color 100ms ease-out,
          margin 100ms ease-out, height 100ms ease-out;
        transition: background-color 100ms ease-out, margin 100ms ease-out,
          height 100ms ease-out;
        background-color: $secondary;
        margin: 5px 2px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
      }

      &:hover {
        > .vb-dragger-styler {
          background-color: $secondary;
          height: 100%;
        }
      }
    }

    &.vb-scrolling-phantom {
      > .vb-dragger {
        > .vb-dragger-styler {
          background-color: $secondary;
        }
      }
    }

    &.vb-dragging {
      > .vb-dragger {
        > .vb-dragger-styler {
          background-color: $secondary;
          height: 100%;
        }
      }
    }

    &.vb-dragging-phantom {
      > .vb-dragger {
        > .vb-dragger-styler {
          background-color: $secondary;
        }
      }
    }

    &:hover {
      > .vb-dragger {
        opacity: 0.8;
      }
    }
  }
}
</style>
