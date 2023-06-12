<template lang="pug">
.xp-live.col(:class="!isLoggedIn && 'is-logged-out'")
  .page-content.bg-image(v-bar)
    .vuebar
      .explore-page(v-if="!lockerRoomLoading && !paramsValidationActive")
        .row.items-left.back-arrow
          nuxt-link(to="/explore")
            img(:src="require('~/assets/images/explore-event/backArrow.svg')")
          .soccer(v-if="game && Object.keys(game).length > 0")
            img(:src="sportIcon")
            p {{ game.sport }}

        .content__container
          .row.items-center.jusitfy-content-center.main-dev(
            :class="gameStatus == 2 ? 'livescores' : ''"
          )
            .col.text-center.logo
              .circle(:style="{ backgroundColor: '#' + game.team1Color }") {{ game.team1Name || game.team1DisplayName || game.team1Nickname || game.team1City }}
              h2 {{ game.team1Name || game.team1DisplayName || game.team1Nickname || game.team1City }}
              p AWAY

            .col.text-center.center-time
              div(v-if="gameStatus == 1")
                img.center-image(
                  v-if="showExploreLeagueImage",
                  :src="require('~/assets/images/explore-event/EUROPALeague.svg')"
                )
                .date-time {{ dateTimeFormat }}
                div(v-if="!hideTimer")
                  h2.time {{ timeLeft }}
                  p HR MIN SEC

              .match-full(v-if="gameStatus == 3")
                h2.full-time Full-Time
                .show-scores-text
                  p Show scores
                  label.switch
                    input(
                      type="checkbox",
                      :checked="showScore",
                      v-model="showScore"
                    )
                    span.slider.round

              .scores(v-if="gameStatus == 3 && showScore && !scoreIsNull")
                .team1Score
                  p {{ game.team1Score }}
                .divider
                .team2Score
                  p {{ game.team2Score }}
              .score-error(v-if="gameStatus == 3 && showScore && scoreIsNull")
                p An error has occurred

              div(v-if="gameStatus == 2")
                .live
                  img(
                    :src="require('~/assets/images/explore-event/livesignal.svg')"
                  )
                  span Live
                .scores
                  .team1Score
                    p {{ game.team1Score }}
                  .divider
                  .team2Score
                    p {{ game.team2Score }}
                p.points {{ game.timeLeft }}

              b-button.is-uppercase.remind-me(
                v-if="gameStatus == 1",
                :class="reminderSet ? 'removereminder' : 'setreminder'",
                :loading="isReminderLoad",
                @click="setUnsetReminder()",
                type="is-primary"
              ) {{ reminderSet ? 'REMOVE REMINDER' : 'REMIND ME' }}
                img(:src="require('~/assets/images/explore-event/bell.svg')")
              nuxt-link.is-uppercase.remind-me.upcomingGames(
                v-if="gameStatus == 3",
                to="/explore",
                :class="reminderSet ? 'removereminder' : 'setreminder'",
                :loading="isReminderLoad",
                type="is-primary"
              ) SEE UPCOMING GAMES

            .col.text-center.logo
              .circle.rightcircle(
                :style="{ backgroundColor: '#' + game.team2Color }"
              ) {{ game.team2Name || game.team2DisplayName || game.team2Nickname || game.team2City }}
              h2 {{ game.team2Name || game.team2DisplayName || game.team2Nickname || game.team2City }}
              p HOME

      XALoader(v-else)
      .show-modal(v-if="!lockerRoomLoading", @click="showChat('public')")
        img(:src="require('~/assets/images/explore-event/show-modal.svg')")
      div(v-if="showLoadingPlayer")
        b-button.is-primary.close(@click="closeStreaming") close
        iframe.iframeStyles(
          v-if="showLoadingPlayer",
          :src="iframeSrc",
          tile="Live Streaming"
        )

      XOExploreEventFooter(
        @showChat="showChat",
        :game="game",
        :showChat="isShowChat",
        :privateChannel="privateChannel"
      )
      XOExploreEventChat(
        v-if="game && channelSlug",
        :showModal="isShowChat",
        :activeChat="activeChat",
        :channelSlug="channelSlug",
        :privateChannel="privateChannel",
        :game="game",
        :lockerRoom="lockerRoom",
        @cancel="isShowChat",
        @hide="isShowChat = false",
        @switchChat="switchChat",
        @setPrivateChannel="setPrivateChannel"
      )
</template>

<script>
import moment from 'moment'
import { mapFields } from 'vuex-map-fields'
import XOExploreEventFooter from '~/components/organisms/ExploreEvent/Footer.vue'
export default {
  name: 'Explore',
  components: {
    XOExploreEventFooter,
    XOExploreEventChat: () =>
      import('~/components/organisms/ExploreEvent/Chat.vue'),
    XALoader: () => import('~/components/atoms/Loader'),
  },
  props: {
    lockerRoom: { type: Object, default: () => {} },
    paramsValidationActive: {
      type: Boolean,
    },
  },
  data() {
    return {
      game: {},
      isShowChat: false,
      showExploreLeagueImage: false,
      showLoadingPlayer: false,
      hideTimer: false,
      showScore: false,
      channelSlug: null,
      channelActive: null,
      socket: null,
      gameStatus: 1, // 1 Is for UpComming games, 2 is for Live Games and 3 is Over Games
      iframeSrc: '',
      reminderSet: false,
      timeLeft: '0 : 0 : 0',
      endpoint: null,
      activeChat: '',
      isReminderLoad: false,
      interval: null,
      timerInterval: null,
      privateChannel: null,
      style: {
        backgroundImage: `url('@/assets/images/explore-event/Background.png') !important;`,
      },
    }
  },
  computed: {
    ...mapFields('app', ['selectedGameEventRoom']),
    ...mapFields('user', ['userID']),
    ...mapFields('locker-room', ['lockerRoomLoading']),
    dateTimeFormat() {
      if (this.lockerRoom && this.lockerRoom.Game) {
        return moment(this.lockerRoom.Game?.date)
          .local()
          .format('ddd DD MMM | HH:mm')
      }
      return ''
    },
    sportIcon() {
      return Object.keys(this.lockerRoom?.Game).length > 0
        ? require(`~/assets/images/Sports/${this.lockerRoom.Game.sport.replace(
            ' ',
            '-'
          )}.svg`)
        : null
    },
    scoreIsNull() {
      return this.game.team1Score === null || this.game.team2Score === null
    },
  },
  watch: {
    lockerRoom: {
      deep: true,
      handler() {
        this.initEventRoom(this.lockerRoom.Game)
      },
    },
    paramsValidationActive: {
      handler(value) {
        if (!value && this.$route.query.privateShow) {
          this.activeChat = 'private'
          this.isShowChat = true
        }
      },
    },
  },
  async created() {
    this.socket = this.$nuxtSocket({
      channel: '/',
      auth: {
        token: this.$store.state.auth.token || null,
        type: 'desktop',
      },
      transports: ['websocket'],
    })

    if (this.selectedGameEventRoom) {
      await this.initEventRoom(this.selectedGameEventRoom)
    }
  },
  mounted(){
    this.interval = setInterval(async () => {
      if(this.lockerRoom && this.lockerRoom.Game) {
        const gameID = this.lockerRoom.Game.gameID
        const { getGame }  = await this.$api.getGame({ gameID });
        this.updateEventRoom(getGame)
      }
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
    clearInterval(this.timerInterval)
  },
  methods: {
    initEventRoom(game) {
      try {
        this.game = game
        this.channelActive = this.lockerRoom.ChannelGroups[0].Channels[0]
        this.channelSlug = this.lockerRoom.ChannelGroups[0].Channels[0].slug

        const userIsOwner = this.lockerRoom.ChannelGroups[0].Channels.findIndex(
          (channel) => channel.Roles?.Owners[0]?.User.id === this.userID
        )
        const userIsJoiner =
          this.lockerRoom.ChannelGroups[0].Channels.findIndex((channel) =>
            channel.Roles?.Joiners.find(
              (joiner) => joiner.User.id === this.userID
            )
          )
        this.privateChannel =
          userIsOwner !== -1 || userIsJoiner !== -1
            ? this.lockerRoom.ChannelGroups[0].Channels[
                userIsOwner !== -1 ? userIsOwner : userIsJoiner
              ]
            : null
        this.updateEventRoom(this.game)

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
        this.$store.dispatch('locker-room/setLockerRoomLoading', false)
      }
    },
    updateEventRoom(game){
      this.game = game
      if (this.game) {
        if (this.game?.isLive) {
          this.game.GameStatus = 2
          this.gameStatus = 2
        }

        if (moment().isAfter(moment(this.game.date)) && !this.game?.isLive) {
          this.game.GameStatus = 3
          this.gameStatus = 3
        }

        if (
          !this.game.timeLeft &&
          moment().isBefore(moment(this.game.date))
        ) {
          this.game.GameStatus = 1
          this.gameStatus = 1
        }
        this.reminderSet = this.game.isReminded
        if (this.game && this.game.date) {
          this.timerInterval = setInterval(() => {
            // let date1  = game.date;
            const date1 = moment(this.game.date)
            const date2 = moment(new Date())
            // Get the duration between the two dates
            const duration = moment.duration(date1.diff(date2))
            const totalHours = date1.diff(date2, 'hours')
            // Extract hours, minutes, and seconds from the duration
            const minutes = duration.minutes()
            const seconds = duration.seconds()
            if (totalHours < 0 || totalHours > 24) {
              this.hideTimer = true
            }
            this.timeLeft = totalHours + ' : ' + minutes + ' : ' + seconds
          }, 1000)
        }
      }
    },
    closeStreaming() {
      this.showLoadingPlayer = false
    },
    showChat(chat) {
      this.activeChat = chat
      this.isShowChat = true
    },
    switchChat(chat) {
      this.activeChat = chat
    },
    async setPrivateChannel(channel) {
      await this.$emit('setLockerRoom')
      this.privateChannel = channel
    },
    async setUnsetReminder() {
      this.isReminderLoad = true
      this.endpoint = 'setGameReminder'
      if (this.reminderSet) {
        this.endpoint = 'unsetGameReminder'
      }

      try {
        const response = await this.$api[this.endpoint]({
          gameID: this.lockerRoom.Game.gameID.toString(),
        })
        this.reminderSet = !this.reminderSet
        if (!this.reminderSet) {
          this.$toast.success(
            `Thanks for setting a reminder for the upcoming match! We'll send you an email reminder before the match starts!`,
            {
              duration: 1000,
              position: 'bottom-left',
              className: 'fx1-success',
              iconPack: 'mdi',
              icon: 'check-circle-outline',
            }
          )
        } else {
          this.$toast.success(
            `Reminder is removed. We won’t send you a reminder before the match starts.`,
            {
              duration: 1000,
              position: 'bottom-left',
              className: 'fx1-success',
              iconPack: 'mdi',
              icon: 'check-circle-outline',
            }
          )
        }
        this.isReminderLoad = false
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
        this.isReminderLoad = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// Check Box Slider Design
.switch {
  position: relative;
  display: inline-block;
  width: 37px;
  height: 17px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 19px;
  width: 19px;
  top: -1px;
  left: -4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #886bf2;
}

input:focus + .slider {
  box-shadow: 0 0 1px #886bf2;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.show-scores-text {
  margin-top: 20px;
  p {
    font-size: 20px;
    line-height: 22px;
    text-transform: initial;
    display: inline-block;
    margin-right: 15px;
    @include max-width(767px) {
      display: inline-block !important;
      font-size: 11px;
    }
    @include max-width(400px) {
      margin-right: 10px;
    }
  }
  @include max-width(400px) {
    width: 130%;
  }
}

.iframeStyles {
  height: calc(100% - 170px) !important;
  width: 100%;
  position: fixed;
  left: 0px;
  height: 63%;
  top: 80px;
}
.close {
  position: fixed;
  right: 8px;
  margin-right: 10px;
  z-index: 100000;
  top: 10;
  width: 44px;
  height: 50px;
}
.watch-on {
  margin: auto;
  margin-top: 10px;
  position: relative;
  text-align: center;
  span {
    display: inline-block;
    position: absolute;
    margin-top: 72px;
    margin-left: -62px;
  }
  .watch-link {
    display: inline-block;
    margin-left: 15px;
    cursor: pointer;
    width: 70px;
    margin-top: 5px;
    img {
      width: 82px;
      height: 82px;
      @include max-width(767px) {
        width: 42px;
        height: 42px;
      }
    }
  }
}
.watch-on-text {
  margin-top: 5px;
}

.xp-live::v-deep {
  .bg-image {
    background-image: url('@/assets/images/explore-event/Background.png') !important;
    background-size: cover; /* Sets the background image to cover the entire container */
    background-repeat: no-repeat; /* Prevents the image from repeating */
    background-position: center; /* Center the image */
  }
  .page-content {
    font-family: 'Rotunda';
    font-style: normal;
    .vuebar {
      width: 100% !important;
      padding: 24px 32px 0px 32px !important;
      box-sizing: border-box !important;

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      .back-arrow {
        margin-top: -8px;
        a {
          margin-top: 5px;
        }
      }
      .show-modal {
        position: absolute;
        top: 30px;
        right: 20px;
        cursor: pointer;
        @include max-width(427px) {
          display: none;
        }
      }
      .soccer {
        padding: 8px;
        min-width: 135px;
        height: 40px;
        margin-left: 36px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        img {
          float: left;
          margin-right: 10px;
        }
        p {
          min-width: 87px;
          float: right;
          height: 24px;
          font-weight: 600;
          font-size: 22px;
          line-height: 24px;
          letter-spacing: -0.66px;
          color: #ffffff;
        }
      }
      .livescores {
        @include max-width(845px) {
          gap: 0px !important;
        }
      }
      .main-dev {
        padding: 0px;
        gap: 60px;
        width: 831px;
        margin: auto;
        margin-top: -5px;
        @include max-width(1200px) {
          margin-top: 10px;
        }
        text-transform: uppercase;
        .circle {
          border-radius: 100%;
          height: 235px;
          font-size: 20px;
          text-align: center;
          line-height: 242px;
        }
        .logo {
          h2 {
            font-weight: 500;
            font-size: 32px;
            margin-top: 25px;
          }
          p {
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            margin-top: 20px;
          }
        }
        .center-time {
          .live {
            margin: auto;
            margin-top: -46px;
            position: relative;
            width: 117px;
            height: 42px;
            /* accent/red */
            background: #f85454;
            border-radius: 8px;
            justify-content: center;
            align-items: center;
            padding: 4px 12px;
            gap: 8px;
            @include max-width(767px) {
              margin-top: 0px;
            }
            @include max-width(500px) {
              margin-top: 30px;
            }
            img {
              display: inline-block;
              margin-left: -35px;
              margin-top: 5px;
            }
            span {
              display: inline-block;
              position: absolute;
              margin-top: 6px;
              text-transform: capitalize;
              margin-left: 6px;
            }
          }
          .scores {
            margin-top: 30px;
            font-weight: 500;
            font-size: 3vw;
            /* identical to box height */
            text-transform: uppercase;
            /* achromats/white */
            color: #ffffff;
            .team1Score {
              justify-content: center;
              align-items: center;
              padding: 10px;
              gap: 8px;
              width: 91px;
              height: 85px;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 5px;
              display: inline-block;
              @include max-width(1100px) {
                width: 70px;
                height: 60px;
                font-size: 3.2vw;
              }
              @include max-width(667px) {
                width: 42px;
                height: 36px;
                font-size: 25px;
                padding: 0px;
                position: relative;
              }
              @include max-width(350px) {
                width: 35px;
                height: 26px;
                font-size: 15px;
              }
            }
            .divider {
              display: inline-block;
              padding: 2px;
              background: white;
              margin: 12px;
              height: 5px;
              width: 25px;
              @include max-width(667px) {
                width: 15px;
                height: 5px;
              }
              @include max-width(500px) {
                width: 15px;
                height: 5px;
                margin: 5px;
              }
              @include max-width(350px) {
                width: 12px;
                height: 0px;
                margin: 3px;
              }
            }
            .team2Score {
              justify-content: center;
              display: inline-block;
              align-items: center;
              padding: 10px;
              gap: 8px;
              width: 91px;
              height: 85px;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 5px;
              @include max-width(1100px) {
                width: 70px;
                height: 60px;
                font-size: 3.2vw;
              }
              @include max-width(667px) {
                width: 42px;
                height: 36px;
                font-size: 25px;
                padding: 0px;
                position: relative;
              }
              @include max-width(350px) {
                width: 35px;
                height: 26px;
                font-size: 16px;
              }
            }
          }
          .score-error {
            padding-top: 30px;
          }
          .points {
            font-weight: 400;
            font-size: 20px;
            line-height: 22px;
            color: #f5f5f5;
            margin-top: 10px;
          }
        }
        .date-time {
          font-weight: 500;
          margin: auto;
          margin-top: 30px;
          font-size: 18px;
          line-height: 22px;
          padding: 10px;
          gap: 8px;
          width: 205px;
          height: 42px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          align-self: stretch;
        }
        h2.time {
          font-weight: 600;
          font-size: 40px;
          line-height: 45px;
          margin-top: 30px;
        }
        h2.full-time {
          font-weight: 600;
          font-size: 40px;
          margin-top: 10px;
          line-height: 45px;
          @include max-width(814px) {
            font-size: 30px;
          }
        }
        h2.time + p {
          margin-top: 10px;
          font-weight: 400;
          font-size: 20px;
          line-height: 22px;
          word-spacing: 35px;
          margin-left: 15px;
        }
        .setreminder {
          background: #f85454;
        }
        .removereminder {
          background: none;
          border: none !important;
        }
        .remind-me {
          margin-top: 20px;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          justify-content: center;
          align-items: center;
          padding: 12px 24px;
          gap: 10px;
          width: 205px;
          height: 42px;
          border-radius: 5px;
          color: $white;
          img {
            position: absolute;
          }
        }
        .upcomingGames {
          display: flex;
          margin: 15px auto;
          padding: 0;
          @include max-width(500px) {
            font-size: 8px;
          }
        }
      }

      @include max-width(1024px) {
        padding: 24px 57px 40px 40px !important;
      }

      @include max-width(767px) {
        padding: 30px 7px 30px 5px !important;
      }

      @include max-width(420px) {
        padding: 24px 16px !important;
        width: 100% !important;
      }

      @include max-width(919px) {
        .main-dev {
          width: 100% !important;
          .circle {
            width: 150px;
            margin: auto;
            height: 150px;
            line-height: 158px;
          }
          h2 {
            font-weight: 500;
            font-size: 28px;
          }
          .date-time {
            font-size: 16px;
            line-height: 18px;
          }
          h2.time {
            font-weight: 700;
            font-size: 36px;
            line-height: 40px;
          }
          h2.time + p {
            font-size: 16px;
            line-height: 18px;
          }
        }
      }

      @include max-width(814px) {
        .soccer {
          p {
            font-size: 18px;
            line-height: 20px;
          }
        }
        .main-dev {
          width: 100% !important;
          .circle {
            width: 150px;
            margin: auto;
            height: 150px;
            line-height: 158px;
          }
          h2 {
            font-weight: 500;
            font-size: 24px;
          }
          .date-time {
            font-size: 12px;
            line-height: 18px;
            width: 160px;
          }
          h2.time {
            font-weight: 700;
            font-size: 32px;
            width: 160px;
            line-height: 40px;
          }
          h2.time + p {
            font-size: 12px;
            line-height: 18px;
          }
        }
      }

      @include max-width(767px) {
        .soccer {
          p {
            font-size: 18px;
            line-height: 23px;
          }
        }
        .center-image {
          display: none;
        }
        .main-dev {
          padding: 0px;
          gap: 0px !important;
          width: 100% !important;
          .circle {
            width: 120px;
            margin: auto;
            font-size: 14px;
            height: 120px;
            line-height: 129px;
          }
          .logo h2,
          p {
            display: none;
          }
          .scores p {
            display: block !important;
          }

          h2 {
            font-weight: 500;
            font-size: 18px !important;
          }
          .date-time {
            font-size: 12px;
            line-height: 18px;
            width: 160px;
          }
          .setreminder {
            width: 160px;
            font-size: 12px;
            line-height: 18px;
          }
          h2.time {
            font-weight: 700;
            font-size: 32px;
            width: 100%;
            line-height: 40px;
            word-spacing: 13px;
          }
          h2.time + p {
            display: none;
          }
        }
      }

      @include max-width(500px) {
        .soccer {
          margin-left: 5px;
          margin-top: 0px;
          min-width: auto;
          p {
            font-size: 14px;
            line-height: 26px;
            font-weight: 300;
            min-width: auto;
          }
        }
        .main-dev {
          padding: 0px;
          margin-top: -10px;
          gap: 0px !important;
          width: 100% !important;
          .circle {
            width: 80px;
            margin: auto;
            font-size: 12px;
            height: 80px;
            line-height: 85px;
          }
          .center-time {
            margin-left: -11px !important;
          }

          h2 {
            font-weight: 500;
            font-size: 18px !important;
          }
          .date-time {
            font-size: 12px;
            line-height: 18px;
            width: 133px;
            padding: 5px;
            padding-top: 12px;
          }
          .setreminder {
            width: 135px;
            font-size: 12px;
            line-height: 18px;
          }
          .upcomingGames {
            font-size: 8px !important;
          }
          h2.time {
            font-size: 13px !important;
            margin-top: 8px;
            line-height: 40px;
            word-spacing: 7px;
          }
        }
        .watch-on-text {
          display: none;
        }
        .watch-on {
          display: inline-block;
          width: 100% !important;
          padding-right: 15px;
          padding-left: 5px;
        }
      }
      @include max-width(400px) {
        .main-dev {
          .circle {
            margin: 0px !important;
            width: 70px;
            margin: auto;
            font-size: 10px;
            height: 70px;
            line-height: 76px;
          }
          .rightcircle {
            float: right;
          }
        }
      }
      @include max-width(350px) {
        .main-dev {
          .date-time,
          .setreminder {
            font-size: 9px;
            width: 110px;
          }
        }
      }
      @include max-width(300px) {
        .main-dev {
          .circle {
            margin: 0px !important;
            width: 60px;
            margin: auto;
            font-size: 10px;
            height: 60px;
            line-height: 64px;
          }
        }
      }
    }
    .vuebar::-webkit-scrollbar {
      display: none;
    }
    &.vb {
      > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
        opacity: 0;

        > .vb-dragger-styler {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: rotate3d(0, 0, 0, 0);
          transform: rotate3d(0, 0, 0, 0);
          -webkit-transition: background-color 100ms ease-out,
            margin 100ms ease-out, height 100ms ease-out;
          transition: background-color 100ms ease-out, margin 100ms ease-out,
            height 100ms ease-out;
          background-color: #08252c;
          margin: 5px 2px 0;
          border-radius: 20px;
          height: calc(100% - 10px);
          display: block;
        }

        &:hover {
          > .vb-dragger-styler {
            background-color: #08252c;
            height: 100%;
          }
        }
      }

      &.vb-scrolling-phantom {
        > .vb-dragger {
          > .vb-dragger-styler {
            background-color: #08252c;
          }
        }
      }

      &.vb-dragging {
        > .vb-dragger {
          > .vb-dragger-styler {
            background-color: #08252c;
            height: 100%;
          }
        }
      }

      &.vb-dragging-phantom {
        > .vb-dragger {
          > .vb-dragger-styler {
            background-color: #08252c;
          }
        }
      }

      &:hover {
        > .vb-dragger {
          opacity: 0.8;
        }
      }
    }
  }

  &.is-logged-out {
    .page-content {
      @include max-width(767px) {
        height: 100vh;
      }
    }
  }
}
</style>
