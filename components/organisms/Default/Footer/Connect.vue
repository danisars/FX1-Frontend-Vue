<template lang="pug">
.xo-default-footer-connect(
  :style="{ backgroundColor: background, padding: padding }"
)
  h3 Connect
  p Where you can find us

  .social-medias.row
    a.social-media.row.items-center.justify-center(
      v-for="(socialMedia, index) in socialMedias",
      :href="socialMedia.url",
      target="_blank"
    )
      img(
        :src="require(`~/assets/images/Default/${socialMedia.icon}.svg`)",
        :alt="socialMedia.label"
      )
      span {{ socialMedia.label }}
</template>

<script>
export default {
  name: 'XODefaultFooterConnect',
  props: {
    background: {
      type: String,
      default: '',
    },
    padding: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      socialMedias: [
        {
          label: 'Telegram',
          icon: 'telegram-footer',
          url: 'https://t.me/fx1_sports_portal',
        },
        {
          label: 'Twitter',
          icon: 'twitter-footer',
          url: 'https://twitter.com/FX1Sports',
        },
        {
          label: 'Medium',
          icon: 'medium-footer',
          url: 'https://medium.com/fx1sports',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.xo-default-footer-connect::v-deep {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: calc(45% - 15px);

  @include max-width(769px) {
    width: 100%;
  }

  h3 {
    font-weight: 400;
    font-size: 44px;
    line-height: 49px;
    letter-spacing: 0.32px;
    margin-bottom: 12px;
  }

  p {
    font-weight: 100;
    font-size: 18px;
    line-height: 32px;
    color: $white;
  }

  .social-medias {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    @include max-width(1023px) {
      justify-content: unset;
    }
    .social-media {
      display: flex;
      border-radius: 5px;
      align-items: center;

      span {
        font-weight: 300;
        font-size: 18px;
        line-height: 32px;
        color: $white;
        margin-left: 15px;
      }

      @include max-width(767px) {
        width: 50px;
      }

      &:not(:last-child) {
        margin-right: 15px;
        @include max-width(1023px) {
          margin-right: 40px;
        }
      }
    }
  }
}
</style>
