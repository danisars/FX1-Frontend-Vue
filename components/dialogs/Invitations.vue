<template lang="pug">
.xd-invitations.card(v-click-outside="() => $parent.close()")
  .card-content(v-if="actualLink")
    .close(@click.prevent="$parent.close()"): img(
      :src="require('~/assets/images/explore-event/close-modal.svg')"
    )
    h3 Invite friends to your group
    .links__container
      .link(
        v-for="link in links",
        :key="link.id",
        @click="link.function ? link.function() : null"
      )
        .normal(v-if="!link.social")
          img(:src="require(`~/assets/images/explore-event/${link.img}.svg`)")
          span {{ link.text }}
        ShareNetwork.social(
          v-else,
          :network="link.social ? link.social.to : null",
          :url="actualLink ? actualLink : ''",
          title="",
          :description="details.teams ? `Come and join me on FX1 to follow the game between the ${details.teams.team1} and the ${details.teams.team2}. Click the link below to join my private group.` : 'Come and join me on FX1. Click the link below to join my private group. '",
          quote="$FX1W",
          hashtags="vuejs,vite"
        )
          img(:src="require(`~/assets/images/explore-event/${link.img}.svg`)")
          span {{ link.text }}
        </ShareNetwork>
    .link-copied(v-if="showSubText")
      img(
        v-if="subText === 'Link is copied'",
        :src="require(`~/assets/images/explore-event/link-copied.svg`)"
      )
      span {{ subText }}
  XALoader(v-else)
</template>

<script>
export default {
  name: 'XDInvitations',
  components: {
    XALoader: () => import('~/components/atoms/Loader'),
  },
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      links: [
        {
          id: 0,
          img: 'copy-link',
          text: 'Copy link',
          function: this.copyLink,
        },
        {
          id: 1,
          img: 'telegram-link',
          text: 'Telegram',
          social: {
            to: 'Telegram',
          },
        },
        {
          id: 2,
          img: 'whatsapp-link',
          text: 'Whatsapp',
          social: {
            to: 'Whatsapp',
          },
        },
        {
          id: 3,
          img: 'signal-link',
          text: 'Signal',
          function: this.shareToSignal,
        },
      ],
      actualLink: null,
      showSubText: false,
      subText: '',
    }
  },
  async mounted() {
    const { getDynamicEventInviteLink } = await this.$api.getDynamicLink({
      privateChannelID: this.details?.privateChannelID,
      gameID: this.details?.gameID,
    })
    this.actualLink = getDynamicEventInviteLink
  },

  methods: {
    async copyLink() {
      // Navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(this.actualLink)
        this.subText = 'Link is copied'
        this.showSubText = true
      } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement('textarea')
        textArea.value = this.actualLink

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = 'absolute'
        textArea.style.left = '-999999px'

        document.body.prepend(textArea)
        textArea.select()

        try {
          document.execCommand('copy')
          this.subText = 'Link is copied'
          this.showSubText = true
        } catch (error) {
          console.error(error)
        } finally {
          textArea.remove()
        }
      }
    },
    shareToSignal() {
      if (
        navigator.protocolHandler &&
        navigator.protocolHandler.isProtocolHandlerRegistered('sgnl')
      ) {
        // Signal is installed on the user's device
        const signalUrl = `sgnl://share?url=${encodeURIComponent(
          this.actualLink
        )}&text=${encodeURIComponent('$FX1')}`
        window.open(signalUrl, '_blank')
      } else {
        // Signal is not installed on the user's device
        this.subText = 'Signal in not installed on your device'
        this.showSubText = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-invitations {
  min-height: 354px;
  background-color: $secondary;
  padding: 40px 60px 60px;
  @include max-width(427px) {
    min-height: 365px;
    padding: 30px 20px;
  }
  .card-content {
    padding: 0;

    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }

    h3 {
      margin-bottom: 30px;
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      letter-spacing: unset;
      color: $white;
      margin-bottom: 20px;
    }
    .links__container {
      display: flex;
      flex-direction: column;
      .link {
        background-color: #385960;
        padding: 11px;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;
        img {
          margin-right: 10px;
        }
        span {
          font-weight: 400;
          font-size: 16px;
          line-height: 18px;
          color: $white;
        }
        .normal,
        .social {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .link:active {
        transform: scale(0.95);
      }
      .link:not(:last-child) {
        margin-bottom: 16px;
      }
    }
    .link-copied {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 22px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0px);
      text-align: center;
      img {
        margin-right: 15px;
      }
      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 15px;
        letter-spacing: -0.66px;
        color: $dark-white;
      }
    }
  }
}
</style>
