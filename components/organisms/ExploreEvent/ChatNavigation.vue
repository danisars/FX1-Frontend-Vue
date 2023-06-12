<template lang="pug">
.header
  XOExploreEventFooter(
    v-if="chat === 'public' || chat === 'members' || privateChannel",
    :game="game",
    :privateChannel="privateChannel",
    :insideNavigation="true"
  )
  .creation(v-if="chat === 'private' && !privateChannel")
    p Create a private group
    .steps
      span step {{ currentStep }} of {{ totalSteps }}
    img.close(
      @click="closeCreation",
      :src="require('~/assets/images/explore-event/remove.svg')"
    )
  .default(v-else)
    img(
      @click="hide",
      :src="require('~/assets/images/explore-event/chatIconArrowRight.svg')"
    )
    .navigation-btn(
      v-if="isLoggedIn",
      style="margin-left: 30px",
      :class="[chat === 'private' || activeChat === 'private-members' ? 'active' : '']",
      @click="switchChat('private')"
    ) {{ privateChannel ? privateChannel.name : 'My private group' }}
    .navigation-btn(
      :class="[chat === 'public' ? 'active' : '']",
      @click="switchChat('public')"
    ) Public
    //- .navigation-btn(
    //-   :class="[chat === 'public-members' ? 'active' : '']",
    //-   v-if="!isLoggedIn",
    //-   @click="showMembers('public-members')"
    //- )
    //-   img(:src="require('~/assets/images/explore-event/members-white.svg')")
    //-   span Members
  .sub-navigation(v-if="chat === 'private' && privateChannel")
    .sub-left
      img(
        :src="require('~/assets/images/explore-event/invite-friends.svg')",
        @click="showModal"
      )
      span Invite Friends
    .sub-right(@click="showMenu")
      img(:src="require('~/assets/images/explore-event/dots-icon.svg')")
      .sub-menu(
        v-if="showSubMenu",
        v-click-outside="() => showSubMenu = false"
      )
        ul
          li(@click="showMembers('private-members')")
            img(:src="require('~/assets/images/explore-event/members.svg')")
            span Members
          li(
            v-if="privateChannel && privateChannel.Roles.Owners[0].User.id !== userID",
            @click="showLeaveModal"
          )
            img(
              :src="require('~/assets/images/explore-event/leave-channel.svg')"
            )
            span Leave Group
  .members-header(
    v-if="chat === 'private-members' || chat === 'public-members'"
  )
    .members-left
      span MEMBERS {{ membersCount }}
    .members-right
      img.close(
        @click="closeMembers",
        :src="require('~/assets/images/explore-event/close.svg')"
      )
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'
import XOExploreEventFooter from '~/components/organisms/ExploreEvent/Footer.vue'

export default {
  name: 'XOChatNavigation',
  components: { XOExploreEventFooter },
  mixins: [dialogs],
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
    activeChat: {
      type: String,
      required: true,
    },
    privateChannel: {
      type: Object,
      default: () => {},
    },
    game: {
      type: Object,
      default: () => {},
    },
    lockerRoom: { type: Object, default: () => {} },
  },
  data() {
    return {
      chat: this.activeChat || null,
      layout: 'default',
      chatExist: false,
      showSubMenu: false,
    }
  },
  computed: {
    ...mapFields('user', ['userID']),
    membersCount() {
      if (this.chat === 'private-members') {
        return this.privateChannel
          ? `${
              this.privateChannel.Roles.Joiners.length +
              this.privateChannel.Roles.Owners.length
            }`
          : 0
      } else if (this.chat === 'public-members') {
        return this.lockerRoom
          ? `${
              this.lockerRoom.ChannelGroups[0].Channels[0].Roles.Joiners
                .length +
              this.lockerRoom.ChannelGroups[0].Channels[0].Roles.Owners.length
            }`
          : 0
      }
      return 0
    },
  },
  watch: {
    activeChat: {
      handler(newV) {
        this.chat = newV
      },
    },
  },
  methods: {
    hide() {
      this.$emit('hide')
      this.showPrivate()
    },
    switchChat(chat) {
      this.showSubMenu = false
      this.$emit('switchChat', chat)
    },
    closeCreation() {
      this.showPublic()
    },
    showPrivate() {
      this.$emit('switchChat', 'private')
    },
    showPublic() {
      this.$emit('switchChat', 'public')
    },
    showMenu() {
      this.showSubMenu = true
    },
    showMembers(chat) {
      this.showSubMenu = false
      this.$emit('switchChat', chat)
    },
    closeMembers() {
      this.showSubMenu = false
      this.$emit('switchChat', 'private')
    },
    async leavePrivateChannel() {
      await this.$api.leavePrivateChannel({
        privateChannelID: this.privateChannel.id,
      })
      this.$emit('setPrivateChannel', null)
    },
    showModal() {
      const privateChannelID = this.privateChannel.id
      const gameID = this.$route.params.slug

      const teams = {
        team1:
          this.game?.team1Name ||
          this.game?.team1DisplayName ||
          this.game?.team1Nickname ||
          this.game?.team1City,
        team2:
          this.game?.team2Name ||
          this.game?.team2DisplayName ||
          this.game?.team2Nickname ||
          this.game?.team2City,
      }
      const details = { privateChannelID, gameID, teams }
      this.fnShowInvitationDialog(details)
    },
    showLeaveModal() {
      const privateChannelID = this.privateChannel.id
      const details = { privateChannelID }
      this.fnShowLeaveGroupDialog(details)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 15px;
  border-bottom: 1px solid #2a4e55;

  .default {
    display: flex;
    align-items: center;

    img {
      cursor: pointer;
    }
    .navigation-btn {
      margin-left: 30px;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 18px 0;
      cursor: pointer;
      color: $grey-mute;
      font-weight: 500;
      font-size: 14px;
      line-height: 25px;

      img {
        margin-right: 10px;
      }
    }
    .active {
      border-bottom: 1px solid $white;
      color: $white;
    }
  }
  .creation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10.9px 0;
    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 25px;
      color: $white;
    }
    .steps {
      font-weight: 400;
      font-size: 14px;
      line-height: 15px;
      color: $grey-mute;
    }
    .close {
      cursor: pointer;
    }
  }
  .sub-navigation {
    display: flex;
    align-items: center;
    padding: 20px 0;
    justify-content: space-between;
    position: relative;
    &:before {
      position: absolute;
      content: '';
      left: 50%;
      top: 0;
      width: calc(100% + 30px);
      display: block;
      height: 1px;
      background: #2a4e55;
      transform: translateX(-50%);
    }
    img {
      cursor: pointer;
    }
    .sub-left {
      display: flex;
      align-items: center;
      z-index: 3;

      span {
        margin-left: 10px;
        font-weight: 400;
        font-size: 14px;
        line-height: 15px;
        color: $white;
      }
    }
    .sub-right {
      position: relative;
      z-index: 3;
      .sub-menu {
        position: absolute;
        top: 30px;
        left: -135px;
        background: white;
        padding: 20px 25px;
        box-shadow: 0px 4px 10px rgba(10, 39, 46, 0.15);
        border-radius: 5px;
        z-index: 2;
        ul {
          display: flex;
          flex-direction: column;
          list-style-type: none;
          li {
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            line-height: 15px;
            color: $secondary;
            cursor: pointer;
            span {
              margin-left: 10px;
            }
          }
          li:last-child {
            color: $primary;
          }
          li:not(:last-child) {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .members-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    position: relative;
    &:before {
      position: absolute;
      content: '';
      left: 50%;
      top: 0;
      width: calc(100% + 30px);
      display: block;
      height: 1px;
      background: #2a4e55;
      transform: translateX(-50%);
    }
    .members-left {
      font-weight: 400;
      font-size: 14px;
      line-height: 15px;
      color: $grey-mute;
    }
    .members-right {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        cursor: pointer;
        position: relative;
        z-index: 3;
      }
    }
  }

  ::v-deep .explore-event-footer {
    display: none;
    position: relative;
    background: transparent;
    flex-direction: column;
    padding: 12px 12px 0 12px;
    .left {
      margin-bottom: 15px;
    }
    .chat {
      padding: 0;
      p {
        @include max-width(427px) {
          max-width: unset;
        }
      }
    }
    @include max-width(427px) {
      display: block;
    }
  }
}
</style>
