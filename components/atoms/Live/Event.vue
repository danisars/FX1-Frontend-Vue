<template lang="pug">
  div.xa-live-slide.flex-column.event(
    :class="upcoming && 'event--upcoming'"
  )
    nuxt-link(
      :to="eventPath"
    )
      .preview(:style="{ backgroundImage: backgroundColor }")
        .versus(:class="{'versus-live': !upcoming}")
          .team(v-if="slide.team1Logo")
            img(:src="slide.team1Logo")
          .team(v-else)
            img(:src="require('~/assets/images/dummy-event/white-round.svg')")
            span(style="color: #1c1c1e") {{ team1Name }}
          .versus-stats(v-if="!upcoming")
            .versus-score {{slide.team1Score}} : {{slide.team2Score}}
            .versus-details {{slide.timeLeft}}
          .team(v-if="slide.team2Logo")
            img(:src="slide.team2Logo")
          .team(v-else)
            img(:src="require('~/assets/images/dummy-event/white-round.svg')")
            span(style="color: #1c1c1e") {{ team2Name }}
      .b-live(v-if="!upcoming")
        img(:src="require('~/assets/images/Live/stream-white.svg')")
        span Live
      .remind(v-if="upcoming && !isRetrieving")
        img.remind__img(
          :src="require('~/assets/images/Live/bell.svg')",
          @click.stop.prevent="setUnsetReminder",
          v-if="!slide.isReminded"
        )
        img.remind__img(
          :src="require('~/assets/images/Live/bell-filled.svg')",
          @click.stop.prevent="setUnsetReminder",
          v-else
        )
        .remind__btn(v-if="slide.isReminded") Reminder is set
    div.description(
      :class="!excitementLevel(slide) ? 'bordered' : ''"
    )
      .event-data
        .subtitle
          span {{ leagueCode }}
        .event__upcoming(v-if="upcoming")
          span.event__date {{ date }}
          span.separator ·
          span.event__time {{ time }}
      .title {{ sportHeadline }}
      .partners(v-if="slide.links.length")
        .partner(v-for="(link, index) in slide.links", :key="index")
          img(:src="link.iconUrl")
      div.free(v-else)
        .free-text Free
    div.banner(
      v-if="excitementLevel (slide)"
      :class="excitementLevel(slide) === 'HOT'? 'yellow' : ''"
    )
      p {{ excitementLevel(slide) }}
      span Excitement Level
      img(
        ref="icon"
        :src="require('~/assets/images/tooltip-icon.svg')"
      )
    .popover(
      v-if="excitementLevel(slide)"
      ref="popover"
    )
      .popover-header Excitement Level
      p.popover-subheader The excitement rating is generated using a complex set of variables to understand how exciting a game is at any moment in the game.
      .popover-container
        .popover-box.popover-box-hot
          span.popover-label HOT
        span.level-label Drop everything, you must watch this game!
      .popover-container
        .popover-box.popover-box-epic
          span.popover-label EPIC
        span.level-label A crazy and exciting game you will be entertained by.
</template>
<script>
import { mapMutations } from 'vuex'
import moment from 'moment'
import tippy from 'tippy.js'
import 'tippy.js/animations/shift-toward-extreme.css'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XALiveSlide',
  mixins: [dialogs],
  props: {
    slide: {
      type: Object,
      default: () => {},
    },
    upcoming: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      imgBanner: require('~/assets/images/dummy-event/bgevent.png'),
      endpoint: null,
      isRetrieving: false,
    }
  },
  computed: {
    team1Name() {
      return (
        this.slide?.team1Name ||
        this.slide?.team1DisplayName ||
        this.slide?.team1Nickname ||
        this.slide?.team1City ||
        ''
      )
    },
    team1Color() {
      return this.slide?.team1Color || ''
    },
    team2Name() {
      return (
        this.slide?.team2Name ||
        this.slide?.team2DisplayName ||
        this.slide?.team2Nickname ||
        this.slide?.team2City ||
        ''
      )
    },
    team2Color() {
      return this.slide?.team2Color || ''
    },
    date() {
      return moment(this.slide?.date).format('D MMM YYYY')
    },
    timeLeft() {
      return (this.slide.timeLeft || '00') + 'm left' || 'N/A'
    },
    time() {
      if (this.slide.date) {
       return moment(this.slide?.date).format('h:mm a')
      }
      return 'TBD'
    },
    sportHeadline() {
      return `${this.team1Name} VS ${this.team2Name}`
    },
    leagueCode() {
      return this.slide?.leagueCode.toUpperCase() || ''
    },
    eventPath() {
      if (this.slide.gameID) {
        return (
          '/' +
          this.slide.sport +
          '/' +
          this.slide.leagueCode +
          '/' +
          (this.slide.team1Name ||
            this.slide.team1DisplayName ||
            this.slide.team1Nickname ||
            this.slide.team1City) +
          '-vs-' +
          (this.slide.team2Name ||
            this.slide.team2DisplayName ||
            this.slide.team2Nickname ||
            this.slide.team2City) +
          '/' +
          this.slide.gameID
        )
          .toLowerCase()
          .replace(/\s/g, '-')
      }
      return '/explore'
    },
    backgroundColor () {
      if (!this.team1Color || !this.team2Color) {
        return `url(${this.imgBanner})`
      } else {
        return `linear-gradient(115deg, #${this.team1Color.toUpperCase()} 0%, #${this.team1Color.toUpperCase()} 50%, #${this.team2Color.toUpperCase()} 50%, #${this.team2Color.toUpperCase()} 100%)`
      }
    },
    // isReminded() {
    //   return this.slide.isReminded;
    // }
  },
  mounted() {
    tippy(this.$refs.icon, {
      content: this.$refs.popover,
      placement: 'bottom-end',
      animation: 'shift-toward-extreme',
      duration: [200, 300],
      maxWidth: 300,
      offset: [0, 3],
      trigger: 'mouseenter click'
    })
  },
  methods: {
    ...mapMutations('app', [
      'updateSelectedGameID',
      'setSelectedGameEventRoom',
    ]),
    async setUnsetReminder() {
      this.isRetrieving = true
      this.endpoint = 'setGameReminder'
      if (this.slide.isReminded) {
        this.endpoint = 'unsetGameReminder'
      }
      this.slide.isReminded = !this.slide.isReminded
      try {
        const response = await this.$api[this.endpoint]({
          gameID: this.slide.gameID.toString(),
        })
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.error(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      } finally {
        this.isRetrieving = false
      }
    },
    updateSelectedGame() {
      this.updateSelectedGameID(this.slide.gameID)
      this.setSelectedGameEventRoom(this.slide)
    },
    excitementLevel (slide){
      const excitementLevels = {
        HOT: 'HOT',
        EPIC: 'EPIC'
      }
      return excitementLevels[slide.excitementLevel] || false
    },
  },
}
</script>

<style lang="scss" scoped>
.popover {
  max-width: 275px;
  padding: 9px 9px;
  border-radius: 8px;;
  background-color: #2B4E55;
  color: #fff;

  &-header {
    padding: 10px 0;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
  }

  &-subheader {
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
  }

  &-box {
    padding: 2px 6px;
    margin: 8px 10px 8px 0;
    border-radius: 4px;

    &-hot {
      background-color: #FFAF23;
    }

    &-epic {
      background-color: #F85454;
    }
  }

  &-container {
    display: flex;
    align-items: center;
    margin: 10px 0 5px 0;

    .level-label {
      font-weight: 300;
      font-size: 14px;
      line-height: 15px;
    }
  }

  &-label {
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
  }
}

/* TODO: temporary*/
.preview {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.versus {
  display: flex;
  padding: 32px 23px 8px 23px;
  justify-content: space-between;
  align-items: center;

  &-live {
    padding: 32px 0px 8px 0px !important;
  }

  &-stats {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 8px 4px;
    width: 82px;
    max-height: 61px;
    background-color: #08252C;
    border-radius: 4px;
    color: white;
  }

  &-score {
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
  }

  &-details {
    text-align: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
  }

  @include max-width(534px) {
    padding: 8px 0;
    padding-top: 14px;
  }
}


.team {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 70px;
  max-height: 70px;

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
  }

  @media screen and (max-width: 534px) {
    width: 56px;
    height: 56px;
    margin-top: 25px;
  }

  span {
    position: absolute;
    top: calc(50% - 8px);
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Rotunda';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 11px;
    text-transform: uppercase;
    text-align: center;
    color: #08252C;
    @include max-width(534px) {
      font-weight: 600;
      font-size: 8px;
      line-height: 9px;
      top: calc(50% - 3px);
    }
  }
}
.xa-live-slide::v-deep {
  position: relative;
  max-width: 254px;
  flex-wrap: nowrap;
  min-height: 328px;
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;

  &.event--upcoming {
    @include max-width(534px) {
      min-height: 295px;
    }

    .description {
      @include max-width(534px) {
        padding-bottom: 4px;
      }
    }

    .subtitle {
      margin-top: 0 !important;
    }
  }

  @include max-width(534px) {
    max-width: 164px;
  }

  width: fit-content;

  display: flex;

  .preview {
    height: 140px;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    width: 254px;
    padding: 10px 12px;

    @include max-width(534px) {
      width: 164px;
      padding: 6px 8px;
    }

  }

  .b-live {
    position: absolute;
    top: 8px;
    left: 11px;
    display: flex;
    width: fit-content;
    padding: 3px 13px;
    font-size: 1rem;
    background: #f85454;
    color: $white;
    border-radius: 8px;

    @include max-width(534px) {
      margin: 3px;
    }

    img {
      width: 1.428rem;
      height: 1.428rem;
      margin-right: 8px;
    }
  }

  .more-friends,
  .more-friends-mobile,
  .or-watch {
    white-space: nowrap;
    color: #94a6aa;
    display: flex;
    padding-top: 0px;
  }

  .or-watch {
    padding-top: 5px;
  }

  .more-friends-mobile,
  .more-friends {
    margin-left: 12px;
    padding: 6px;
    font-size: 12px;
  }

  .more-friends-mobile {
    display: none;
  }

  @include max-width(534px) {
    .more-friends {
      display: none;
    }
    .more-friends-mobile {
      display: block;
      margin-bottom: 10px;
    }
  }
  .banner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 44px;
    background-color: #F85454;
    color: #FFFFFF;
    border-top: unset;
    background-color: #08252C;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    z-index: 4;

    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 13px;
      margin-top: 7px;
      margin-left: -20px;
      @include max-width(534px) {
        font-size: 10px;
        margin-left: -6px;
        margin-top: 2px;
      }
    }
    p {
      font-weight: 500;
      font-size: 28px;
      line-height: 31px;
      text-transform: uppercase;

      @include max-width(534px) {
        font-size: 16px;
        margin-left: 4px;
      }
    }

    img {
      margin-bottom: 5px;
      z-index: 7;
      @include max-width(534px) {
        margin-right: 4px;
      }
    }
  }
  .yellow {
    background-color: #FFAF23;
  }
  .description {
    border-top: unset;
    background-color: #08252C;
    padding: 8px 12px;
    flex: 1;
    display: flex;
    flex-direction: column;

    @include max-width(534px) {
      padding: 12px 8px;
    }
    .event-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;

      .event__upcoming {
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        line-height: 15px;

        @include max-width(534px) {
          font-size: 10px;
          line-height: 13px;
          margin-bottom: 5px;
        }
      }

      .subtitle {
        margin-bottom: 0 !important;
        font-weight: 700;
        font-size: 12px;
        line-height: 13px;
        color: #c3cdcf;

        @include max-width(534px) {
          font-size: 10px;
          line-height: 13px;
        }
      }
    }

    .title {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: $white;
      margin-bottom: 35px;;
      height: 40px;

      @include max-width(534px) {
        font-size: 14px;
        line-height: 1.3;
      }
    }
    .partners {
      display: flex;

      @include max-width(534px) {
        padding-bottom: 0;
      }

      .partner {
        margin-right: 8px;
        border-radius: 100px;
        background: $white;
        width: 24px;
        height: 24px;
        display: flex;
        padding: 4px;
      }
    }

    .free {
      width: 27px;
      border: 1px solid #385960;
      border-radius: 8px;
      padding: 6px 24px;

      &-text {
        font-weight: 400;
        font-size: 13px;
        line-height: 14px;
        color: white;
        margin-left: -13px;
      }
    }

    .partners-b {
      padding: 0px 0 10px 0;
      display: flex;
      float: right;

      @include max-width(534px) {
        padding-bottom: 0;
      }

      .partner {
        margin-right: -8px;
        border-radius: 100px;
        background: $white;
        width: 28px;
        height: 28px;
        display: flex;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .z5 {
        z-index: 5;
      }

      .z4 {
        z-index: 4;
      }

      .z3 {
        z-index: 3;
      }

      .z2 {
        z-index: 2;
      }

      .z1 {
        z-index: 1;
      }
    }
  }
}
.bordered {
  display: flex;
  justify-content: space-around;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
}
.separator {
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;

  @include max-width(767px) {
    margin-left: 4px;
    margin-right: 4px;
  }
}

.remind {
  top: 0;
  left: 0;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.remind__img {
  position: absolute;
  right: 16.31px;
  top: 12px;
}

.remind__btn {
  background-color: #e6e9ea;
  font-weight: 400;
  position: absolute;
  line-height: 19px;
  color: $secondary-dark;
  border-radius: 8px;
  border: none;
  left: 23%;
  top: 10px;
  padding: 4px 12px;
  font-size: 16px;
  border-radius: 8px;

  @include max-width(534px) {
    margin: 2px;
    font-size: 10px;
    line-height: 11px;
    padding: 4px 6px;
  }

  &--active {
    display: inline-block;
  }
}
</style>
