<template lang="pug">
.explore-event-footer(:class="[showChat ? 'chat-active' : '']")
  .left
    b
      span {{ game.leagueCode }}
      Champins : {{ game.team1Name || game.team1DisplayName || game.team1Nickname || game.team1City }} vs {{ game.team2Name || game.team2DisplayName || game.team2Nickname || game.team2City }}
    .date__container
      img(:src="require('~/assets/images/explore-event/calendar.svg')")
      p {{ gameDate }}
  .chat(
    v-if="!lockerRoomLoading && !insideNavigation && !showChat",
    @click="$emit('showChat', 'private')"
  )
    img(:src="require('~/assets/images/explore-event/create-private.svg')")
    p(v-if="privateSlug") Private group: {{ privateSlug }}
    p(v-else) Create a private group
  XALoader(v-if="lockerRoomLoading && !insideNavigation && !privateSlug")
  .chat(
    v-if="insideNavigation && !privateSlug && !lockerRoomPrivateChat && !showChat",
    @click="$emit('showChat', 'private')"
  )
    img(:src="require('~/assets/images/explore-event/create-private.svg')")
    p Create a private group
</template>

<script>
import moment from 'moment'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XOExploreEventFooter',
  components: {
    XALoader: () => import('~/components/atoms/Loader'),
  },
  props: {
    game: {
      type: Object,
      default: () => {},
    },
    showChat: {
      type: Boolean,
    },
    privateChannel: {
      type: Object,
      default: () => {},
    },
    insideNavigation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      message: null,
      privateSlug: this.privateChannel ? this.privateChannel.slug : null,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomLoading', 'lockerRoomPrivateChat']),
    gameDate() {
      return moment(this.game.date).local().format('DD MMMM YYYY')
    },
  },
  watch: {
    privateChannel: {
      handler(newV) {
        if (newV) {
          this.privateSlug = newV.slug
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.explore-event-footer {
  display: flex;
  justify-content: space-between;
  font-family: 'Rotunda';
  font-style: normal;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 92px;
  position: absolute;
  background: rgba(8, 37, 44, 0.9);
  padding: 16px 20px;

  @include max-width(500px) {
    height: auto;
    padding-bottom: 30px;
  }

  b {
    font-weight: 600;
    font-size: 22px;
    line-height: 24px;
    letter-spacing: -0.66px;
    span {
      text-transform: uppercase;
    }
  }
  .left {
    .date__container {
      display: flex;
      align-items: center;
      margin-top: 15px;
      @media (min-width: 375px) and (max-width: 767px) {
        margin-top: 0;
      }
    }
    img {
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      letter-spacing: -0.66px;
      margin-right: 10px;
    }
  }
  .xa-loader {
    right: 5%;
    left: unset;
  }
  .chat {
    height: 46px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 13px;
    cursor: pointer;
    @include max-width(600px) {
      height: 41px;
      padding: 9px;
      padding-left: 0px;
    }
    @include max-width(400px) {
      font-size: 13px;
      height: 40px;
    }

    img {
      margin-right: 5px;
    }
    p {
      margin-top: 2px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      /* identical to box height */
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #ffffff;

      @include max-width(427px) {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  @include max-width(600px) {
    b {
      font-size: 16px;
    }
  }
  @include max-width(350px) {
    b,
    p {
      font-size: 13px;
    }
  }
}

.chat-active {
  background-color: $secondary;
}
</style>
