<template lang="pug">
.xm-home-club-slider
  hooper(:settings="hooperSettings", style="height: 100%")
    slide(v-for="(feature, index) in featured", :key="index")
      XAHomeClubSlide(:feature="feature")
</template>

<script>
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  name: 'XMHomeClubSlider',
  components: {
    Hooper,
    Slide,
    XAHomeClubSlide: () => import('~/components/atoms/Home/ClubSlide'),
  },
  data() {
    return {
      featured: [],
    }
  },
  computed: {
    hooperSettings() {
      const hooperSettings = {
        trimWhiteSpace: true,
        wheelControl: false,
        mouseDrag: false,
        itemsToShow: 1,
        itemsToSlide: 1,
        autoPlay: true,
        infiniteScroll: true,
        playSpeed: 3000,
      }

      return hooperSettings
    },
  },
  mounted() {
    this.fnRetrieveFeatured()
  },
  methods: {
    async fnRetrieveFeatured() {
      try {
        const { getFeatured } = await this.$api.getFeatured()
        this.featured = getFeatured
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-home-club-slider::v-deep {
  height: 100%;
  width: 100%;
}
</style>
