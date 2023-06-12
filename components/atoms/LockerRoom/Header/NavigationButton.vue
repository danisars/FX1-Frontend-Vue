<template lang="pug">
nuxt-link.xa-locker-room-header-navigation-button.flex-column.justify-center(
  :class="[disabled && 'is-disabled']",
  :to="link",
  exact
)
  ._icon
    img.inactive(
      :src="inactiveIcon",
      :alt="label",
      :width="width",
      :height="height",
      :style="{ maxWidth: maxWidth }"
    )
    img.active(
      :src="activeIcon",
      :alt="label",
      :width="width",
      :height="height",
      :style="{ maxWidth: maxWidth }"
    )
  ._label {{ label }}
  slot(name="unseen")
</template>

<script>
export default {
  name: 'XALockerRoomHeaderNavigationButton',
  props: {
    label: { type: String, default: 'Navigation Button' },
    link: { type: String, default: '/' },
    inactiveIcon: { type: String, default: null },
    activeIcon: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    width: { type: String, default: '20' },
    height: { type: String, default: '18' },
    maxWidth: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.xa-locker-room-header-navigation-button::v-deep {
  color: #94a6aa;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4286rem;
  text-align: center;
  min-height: 80px;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
  user-select: none;
  position: relative;
  min-width: 84px;
  padding-top: 3px;

  &.locker-rooms {
    padding-left: 9px;
    padding-right: 12px;
  }

  @include max-width(767px) {
    font-size: 0.8571rem;
    line-height: 1.2857rem;
    margin: 0 4px;
    min-height: unset;
    min-width: 67px;
    font-size: 12px;
    line-height: 13px;
  }
  ._label {
    margin-top: 3px;
  }

  ._icon {
    position: relative;
    width: 20px;
    height: 20px;
    margin: 0 auto 5px;

    img {
      transition: 0.3s;
    }

    .active {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      opacity: 0;
    }

    .inactive {
      position: relative;
      z-index: 0;
      opacity: 1;
    }
  }

  &.active {
    ._label {
      @include max-width(767px) {
        margin-top: 1px;
      }
    }
  }

  &.active,
  &:hover {
    color: $white;
    border-color: $primary;

    ._icon {
      .active {
        opacity: 1;
      }

      .inactive {
        opacity: 0;
      }
    }
  }

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
