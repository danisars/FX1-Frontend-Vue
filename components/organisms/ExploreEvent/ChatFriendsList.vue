<template lang="pug">
.friends-list__container(v-if="friendsList")
  .friend(v-for="friend in friendsList", :key="friend.id")
    input(
      type="checkbox",
      :id="friend.id ? friend.id : friend.username",
      v-model="selectedFriends",
      :value="friend"
    )
    label(:for="friend.id ? friend.id : friend.username")
    .friend-avatar(:class="[userOnline(friend.id) ? 'online' : '']")
      img(
        v-if="friend.Avatar && friend.Avatar.PhotoURL",
        :src="friend.Avatar.PhotoURL"
      )
      .default-avatar(v-else) {{ friend.username.charAt(0).toUpperCase() }}
    span {{ friend.username }}
</template>

<script>
export default {
  name: 'XOChatFriendsList',
  props: {
    friendsList: {
      type: Array,
      default: () => [],
    },
    onlineMembers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedFriends: [],
    }
  },
  computed: {
    selectedFriendsIds() {
      return this.selectedFriends.map((friend) => friend.id)
    },
    onlineUsers() {
      const onlineUsers = this.onlineMembers
        ? this.onlineMembers.map((e) => {
            return e?.User?.id
          })
        : []

      return onlineUsers
    },
    userOnline() {
      return (user) => this.onlineUsers.includes(user)
    },
  },
  watch: {
    // Watch for changes to the selectedFriendsIds array
    selectedFriendsIds(newIds, oldIds) {
      this.$emit('setSelectedFriends', this.selectedFriends)
      console.log('Selected friends:', this.selectedFriends)
    },
  },
}
</script>

<style lang="scss" scoped>
.friends-list__container {
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  .friend {
    display: flex;
    align-items: center;
    margin-bottom: 23px;
    input[type='checkbox'] + label {
      display: block;
      margin: 0.2em;
      cursor: pointer;
      padding: 0.2em;
    }
    input[type='checkbox'] {
      display: none;
    }

    input[type='checkbox'] + label:before {
      content: '';
      width: 24px;
      height: 24px;
      border: 3px solid #94a6aa;
      border-radius: 5px;
      display: inline-block;
      padding-left: 0.2em;
      padding-bottom: 0.3em;
      margin-right: 0.2em;
      vertical-align: bottom;
      color: transparent;
      transition: 0.2s;
    }

    input[type='checkbox'] + label:active:before {
      transform: scale(0);
    }

    input[type='checkbox']:checked + label:before {
      background-color: $primary;
      border-color: $primary;
      color: $white;
      background-image: url('~assets/images/explore-event/checked.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
    .friend-avatar {
      display: flex;
      position: relative;
      margin: 0 16px;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      .default-avatar {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $primary;
        border-radius: 50%;
        font-weight: 300;
        font-size: 13px;
        text-transform: uppercase;
      }
    }
    .online::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      bottom: -3px;
      right: -2px;
      background-color: #2ddc1e;
      border-radius: 50%;
      border: 3px solid $secondary-dark;
    }

    span {
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: $white;
      opacity: 0.5;
      text-transform: none;
    }
  }
}
</style>
