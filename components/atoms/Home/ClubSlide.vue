<template lang="pug">
nuxt-link.xa-home-club-slide.col.flex-column.justify-end(
  :to="`/locker-room/${slug}/${defaultChannelSlug}`",
  :style="{ backgroundImage: `url(${coverPhoto})` }"
)
  .details.row.items-center
    XAAvatar(:name="name", :image="avatar", size="48px")
    .col
      h3 {{ name }}
      .supporters {{ supporterCount }} supporters
</template>

<script>
export default {
  name: 'XAHomeClubSlide',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  props: {
    feature: { type: Object, default: () => {} },
  },
  computed: {
    name() {
      return this.feature?.name || null
    },
    club() {
      return this.feature?.Club || null
    },
    league() {
      return this.feature?.League || null
    },
    fanGroup() {
      return this.feature?.FanGroup || null
    },
    sports() {
      return this.feature?.Sports[0] || null
    },
    avatar() {
      return (
        this.club?.Avatar?.PhotoURL ||
        this.league?.Avatar?.PhotoURL ||
        this.fanGroup?.Avatar?.PhotoURL ||
        null
      )
    },
    coverPhoto() {
      return (
        this.club?.CoverPhoto?.PhotoURL ||
        this.league?.CoverPhoto?.PhotoURL ||
        this.fanGroup?.CoverPhoto?.PhotoURL ||
        this.sports?.CoverPhoto?.PhotoURL ||
        null
      )
    },
    supporterCount() {
      return this.feature?.supporterCount || 0
    },
    slug() {
      return this.feature?.slug || null
    },
    defaultChannelSlug() {
      return this.feature?.defaultChannelSlug || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-home-club-slide::v-deep {
  height: 100%;
  padding: 30px;
  color: $white;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .details {
    background-color: $primary;
    min-height: 105px;
    width: 100%;
    max-width: 325px;
    border-radius: 10px;
    padding: 0 25px;

    @include max-width(1023px) {
      max-width: 100%;
    }

    .xa-avatar {
      margin-right: 15px;
    }
  }
}
</style>
