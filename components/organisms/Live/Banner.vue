<template lang="pug">
nuxt-link.xo-live-banner(
  :style="{ backgroundImage: `url(${getCoverImage})` }",
  :to="eventPath"
)
  .overlay
  .b-live(v-if="Object.keys(featuredGame).length > 0 && featuredGame.isLive")
    img(:src="require('~/assets/images/Live/stream-white.svg')")
    span Live
  .b-bottom(v-if="featuredGame")
    .b-title {{ (team1Name || '') + (team1Name && team2Name ? ' vs. ' : '') + (team2Name || '') }}
    //- .scores
    //-   .scores__teams
    //-     .scores__team
    //-       .scores__data
    //-         .scores__name {{ featuredGame.team1City + ' ' + featuredGame.team1Name }}
    //-         .scores__stats 00-00
    //-       .scores__value 0
    //-     .scores__separator :
    //-       .scores__header Top 0th
    //-     .scores__team
    //-       .scores__value.scores__value--second_team 0
    //-       .scores__data
    //-         .scores__name {{ featuredGame.team2City + ' ' + featuredGame.team2Name }}
    //-         .scores__stats 00-00
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'XOLiveBanner',
  props: {},
  data() {
    return {
      featuredGame: {},
      defaultBanner: require('~/assets/images/v2/Home/supporter-locker-room.png'),
    }
  },
  computed: {
    eventPath() {
      if (this.featuredGame.gameID) {
        return (
          '/' +
          this.featuredGame.sport +
          '/' +
          this.featuredGame.leagueCode +
          '/' +
          (this.featuredGame.team1Name ||
            this.featuredGame.team1DisplayName ||
            this.featuredGame.team1Nickname ||
            this.featuredGame.team1City) +
          '-vs-' +
          (this.featuredGame.team2Name ||
            this.featuredGame.team2DisplayName ||
            this.featuredGame.team2Nickname ||
            this.featuredGame.team2City) +
          '/' +
          this.featuredGame.gameID
        )
          .toLowerCase()
          .replace(/\s/g, '-')
      }
      return '/explore'
    },
    getCoverImage() {
      return this.featuredGame?.coverImage || this.defaultBanner
    },
    team1Name() {
      return (
        this.featuredGame?.team1Name ||
        this.featuredGame?.team1DisplayName ||
        this.featuredGame?.team1Nickname ||
        this.featuredGame?.team1City ||
        null
      )
    },
    team2Name() {
      return (
        this.featuredGame?.team2Name ||
        this.featuredGame?.team2DisplayName ||
        this.featuredGame?.team2Nickname ||
        this.featuredGame?.team2City ||
        null
      )
    },
  },
  async created() {
    try {
      const { getFeaturedGame } = await this.$api.getFeaturedGame()
      this.featuredGame = getFeaturedGame
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
    }
  },
  methods: {
    ...mapMutations('app', [
      'updateSelectedGameID',
      'setSelectedGameEventRoom',
    ]),
    updateSelectedGame() {
      this.updateSelectedGameID(this.featuredGame.gameID)
      this.setSelectedGameEventRoom(this.featuredGame)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-live-banner::v-deep {
  display: flex;
  cursor: pointer;
  border-radius: 10px;
  flex-direction: column;
  height: 320px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 28px;
  position: relative;

  .b-live {
    & span {
      display: inline-block;
      padding-top: 2px;
      color: #fff;
    }
  }

  .b-title {
    color: #fff;
  }
  .overlay {
    position: absolute;
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 41.29%,
      #000000 100%
    );
    height: 100%;
    width: 100%;
    border-radius: 10px;
    z-index: 2;
  }

  @include max-width(1365px) {
    margin-bottom: 27px;
  }

  @include max-width(1023px) {
    margin-bottom: 27px;
  }

  @include max-width(767px) {
    margin-bottom: 24px;
  }

  @include max-width(510px) {
    height: 180px;
  }

  .b-live {
    display: flex;
    width: fit-content;
    margin-left: 24.8px;
    margin-top: 20px;
    padding: 4px 12px;
    padding-top: 6px;
    font-size: 18px;
    line-height: 20px;
    background: #f85454;
    border-radius: 8px;
    z-index: 3;

    @include max-width(767px) {
      font-size: 16px;
      line-height: 18px;
      margin-top: 8px;
      margin-left: 8px;
    }

    img {
      margin-top: -2px;
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    span {
      color: white;
    }
  }

  .b-bottom {
    display: flex;
    margin-top: auto;
    margin-bottom: 0px;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 20px;
    z-index: 3;

    @include max-width(1023px) {
      flex-direction: column;
      margin-left: 24px;
      margin-right: 24px;
      margin-bottom: 18px;
    }

    @include max-width(767px) {
      margin-bottom: 16px;
      margin-left: 8px;
      margin-right: 8px;
    }

    .b-title {
      display: flex;
      font-weight: 400;
      font-size: 70px;
      line-height: 80px;
      letter-spacing: -2.4px;
      margin-bottom: 8px;
      color: white;
      :hover {
        color: white;
      }
      @include max-width(1120px) {
        font-size: 3.428rem;
      }

      @include max-width(1365px) {
        margin-bottom: 7px;
        margin-left: 1px;
      }

      @include max-width(1023px) {
        margin-bottom: 13px;
        letter-spacing: -2.2px;
      }

      @include max-width(767px) {
        font-size: 28px;
        line-height: 150%;
        letter-spacing: -2.2px;
        margin-bottom: 0;
      }
    }
  }
}

.scores {
  display: flex;
  flex-direction: column;
  padding-top: 23px;
}

.scores__teams {
  display: flex;
}

.scores__team {
  display: flex;
}

.scores__name {
  font-weight: 400;
  font-size: 17px;
  line-height: 19px;
  margin-bottom: 4px;

  @include max-width(767px) {
    font-size: 14px;
    line-height: 15px;
  }
}

.scores__stats {
  font-size: 16px;
  line-height: 18px;
  color: #c3cdcf;
  text-align: center;

  @include max-width(767px) {
    font-size: 12px;
    line-height: 13px;
  }
}

.scores__value {
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  margin-left: 31px;
  padding-top: 2.5px;

  @include max-width(767px) {
    font-weight: 400;
    font-size: 24px;
    line-height: 27px;
    margin-left: 8px;
  }

  &--second_team {
    margin: 0 33px 0 0;
    @include max-width(767px) {
      margin: 0 8px 0 0;
      padding-top: 3.5px;
    }
  }
}

.scores__separator {
  position: relative;
  font-weight: 500;
  font-size: 32px;
  margin: 0 9px;
  margin-top: -2px;

  @include max-width(767px) {
    font-weight: 400;
    font-size: 24px;
    line-height: 27px;
    margin-left: 7px;
    margin-right: 7px;
    padding-top: 6px;
  }
}

.scores__header {
  top: -14.5px;
  position: absolute;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  white-space: nowrap;
  left: -18px;

  @include max-width(767px) {
    font-size: 12px;
    line-height: 13px;
    top: -12px;
    left: -19px;
  }
}
</style>
