<template lang="pug">
.xm-channels-chat-lightbox(v-if="show")
  .back-drop(@click.prevent="fnHideLightbox()")
  .close(@click.prevent="fnHideLightbox()"): b-icon(
    icon="close",
    size="is-medium"
  )
  .media-slider
    hooper(
      :settings="hooperSettings",
      :initial-slide="initialSlide",
      style="height: 100%",
      ref="mediaSlider"
    )
      slide(v-for="(media, index) in getMediaLightbox", :key="index")
        .media-container.row.items-center.justify-center(
          @click.self.prevent="fnHideLightbox()"
        )
          nuxt-img(:src="media.src")

  .slider-navigation(v-if="getMediaLightbox.length > 1")
    .btn-navigation.btn-prev.row.items-center(@click.prevent="fnPrevSlide()"): b-icon(
      icon="chevron-left",
      size="is-large"
    )
    .btn-navigation.btn-next.row.items-center(@click.prevent="fnNextSlide()"): b-icon(
      icon="chevron-right",
      size="is-large"
    )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  name: 'XMChannelsChatLightbox',
  components: { Hooper, Slide },
  data() {
    return {
      show: false,
      initialSlide: 0,
    }
  },
  computed: {
    ...mapGetters({
      getMediaLightbox: 'media/getMediaLightbox',
    }),
    hooperSettings() {
      const hooperSettings = {
        itemsToShow: 1,
        itemsToSlide: 1,
        wheelControl: false,
        mouseDrag: false,
        infiniteScroll: true,
      }

      return hooperSettings
    },
  },
  beforeMount() {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        this.fnHideLightbox()
      }
    })
  },
  mounted() {
    this.$root.$on('evtRtShowLightbox', (value) => {
      this.show = value?.show
      this.initialSlide = value?.initialSlide
    })
  },
  methods: {
    ...mapActions({
      setMediaLightbox: 'media/setMediaLightbox',
    }),
    fnPrevSlide() {
      this.$refs.mediaSlider.slidePrev()
    },
    fnNextSlide() {
      this.$refs.mediaSlider.slideNext()
    },
    async fnHideLightbox() {
      await this.setMediaLightbox([])
      this.show = false
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-channels-chat-lightbox::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

  .back-drop {
    background-color: rgba($black, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .close {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 2;
    cursor: pointer;
  }

  .media-slider {
    width: 100%;
    height: 100%;

    .hooper {
      .hooper-list {
        .hooper-track {
          .hooper-slide {
            .media-container {
              height: 100%;
            }
          }
        }
      }
    }
  }

  .slider-navigation {
    .btn-navigation {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      cursor: pointer;

      &.btn-prev {
        left: 20px;
      }

      &.btn-next {
        right: 20px;
      }
    }
  }
}
</style>
