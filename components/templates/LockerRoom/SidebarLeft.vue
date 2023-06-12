<template lang="pug">
.xt-locker-room-sidebar-left(v-bar)
  .vuebar
    template(v-if="isLoggedIn")
      XOLockerRoomSupporting(
        :supporting="supporting",
        v-if="supporting.length"
      )
    nuxt-link.item.row.items-center.justify-center(
      to="/locker-room/explore",
      exact
    )
      .avatar-supporting
        .xa-avatar.row.items-center.justify-center: img.icon-add(
          src="~assets/images/LockerRoom/add.svg",
          alt="Explore club"
        )
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import XOLockerRoomSupporting from '~/components/organisms/LockerRoom/Supporting.vue'

export default {
  name: 'XTLockerRoomSidebarLeft',
  components: {
    XOLockerRoomSupporting,
  },
  props: {
    supporting: { type: Array, default: () => [] },
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
  },
}
</script>

<style lang="scss" scoped>
.xt-locker-room-sidebar-left::v-deep {
  width: 100%;
  max-width: 95px;
  height: calc(var(--vh, 1vh) * 100 - 80px);
  background-color: #08252c;

  @include max-width(1024px) {
    max-width: 80px;
  }

  @include max-width(767px) {
    height: calc(var(--vh, 1vh) * 100 - 70px);
  }

  .vuebar {
    padding: 30px 0;

    @include max-width(767px) {
      padding: 20px 0;
    }

    .item {
      margin-bottom: 15px;
      position: relative;

      &::before {
        content: '';
        width: 20px;
        height: 100%;
        background-color: $white;
        position: absolute;
        top: 0;
        left: -16px;
        border-radius: 20px;
        opacity: 0;
      }

      .avatar-supporting {
        border: 5px solid #08252c;
        border-radius: 50%;
        background-color: $secondary;

        .xa-avatar {
          border: 2px solid #08252c;
          width: 50px;
          height: 50px;
          border-radius: 50%;

          .icon-add {
            opacity: 0.5;
          }
        }
      }

      &.active {
        &::before {
          opacity: 1;
        }

        .avatar-supporting {
          border-color: #2a4e55;

          .xa-avatar {
            border-color: $white;
          }
        }
      }
    }
  }

  &.vb {
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
