<template lang="pug">
.xm-mentions-medias(:class="mediasMediumLength")
  ._media(v-for="(media, index) in mediasMedium.slice(0, 3)", :key="index")
    img(:src="media.photoURL")
    .count.row.items-center.justify-center(
      v-if="index === 2 && countExcludedMedias > 0"
    ) +{{ countExcludedMedias }}
</template>

<script>
export default {
  name: 'XMMentionsMedias',
  props: {
    medias: { type: Array, default: () => [] },
  },
  computed: {
    mediasMedium() {
      const mediasMedium = this.medias.filter((x) => x?.type === '640x360')
      return mediasMedium
    },
    mediasMediumLength() {
      if (this.mediasMedium.length >= 4) {
        return 'medias-multiple'
      }

      return `medias-${this.mediasMedium.length}`
    },
    countExcludedMedias() {
      const countExcludedMedias = this.mediasMedium.slice(3)
      return countExcludedMedias.length
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-mentions-medias::v-deep {
  column-gap: 4px;
  column-count: 2;
  column-fill: initial;
  height: 315px;
  margin: 0 -15px 10px;

  ._media {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .count {
      background-color: rgba($black, 0.6);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      font-size: 2.2857rem;
      cursor: pointer;
      border-bottom-right-radius: 8px;
    }
  }

  &.medias-1 {
    column-count: 1;
    column-gap: 0;
  }

  &.medias-3,
  &.medias-multiple {
    ._media {
      &:not(:first-child) {
        height: calc(315px / 2 - 2px);
      }

      &:last-child {
        margin-top: 4px;
      }
    }
  }
}
</style>
