<template lang="pug">
.xa-forms-avatar.row.justify-center
  croppa(
    v-model="avatar",
    :width="size",
    :height="size",
    :placeholder="placeholder",
    :placeholder-font-size="placeholderFontSize",
    :zoom-speed="5",
    :show-remove-button="false",
    :image-border-radius="imageBorderRadius",
    canvas-color="#f8f8f8",
    show-loading,
    disable-rotation,
    prevent-white-space,
    @file-choose="fnShowAvatarActions()"
  )
  .actions.row.justify-center(v-if="showActions")
    .accept(@click.prevent="fnAcceptAvatar()"): b-icon(icon="check")
    ._delete(@click.prevent="fnRemoveAvatar()"): b-icon(icon="close")
</template>

<script>
export default {
  name: 'XAFormsAvatar',
  props: {
    size: { type: Number, default: 200 },
    placeholder: { type: String, default: 'Choose an avatar' },
    rounded: { type: Boolean, default: false },
    circle: { type: Boolean, default: false },
  },
  data() {
    return {
      avatar: null,
    }
  },
  computed: {
    placeholderFontSize() {
      return this.size * 0.09
    },
    imageBorderRadius() {
      let imageBorderRadius

      if (this.rounded) imageBorderRadius = 1000
      if (this.circle) imageBorderRadius = 10

      return imageBorderRadius
    },
    showActions: {
      get() {
        return this.avatar?.hasImage() || false
      },
      set(value) {
        return value
      },
    },
  },
  methods: {
    fnShowAvatarActions() {
      this.showActions = true
    },
    fnRemoveAvatar() {
      this.avatar.remove()
    },
    fnAcceptAvatar() {
      this.avatar.remove()
      // const url = this.avatar.generateDataUrl()
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-forms-avatar::v-deep {
  .actions {
    width: 100%;
    margin-top: 10px;

    .accept,
    ._delete {
      margin: 0 10px;
      cursor: pointer;
    }

    .accept {
      color: $success;
    }

    ._delete {
      color: $danger;
    }
  }
}
</style>
