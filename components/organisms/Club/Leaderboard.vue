<template lang="pug">
.xo-club-leaderboard
  ._title.row.items-center: h3 Fan leaderboard
  XMLockerRoomMembers(
    v-for="(member, index) in members",
    :key="index",
    :member="member"
  )
</template>

<script>
export default {
  name: 'XOClubLeaderboard',
  components: {
    XMLockerRoomMembers: () =>
      import('~/components/molecules/LockerRoom/Members'),
  },
  data() {
    return {
      members: [
        {
          label: 'Fanatic',
          list: [
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: true,
            },
            {
              name: 'James Calzoni',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
          ],
        },
        {
          label: 'Devoted',
          list: [
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: true,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
            {
              name: 'Carter Workman',
              avatar: 'https://picsum.photos/200',
              isOnline: false,
            },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.xo-club-leaderboard::v-deep {
  background-color: #08252c;
  width: 300px;
  height: 100%;
  border-radius: 10px;

  ._title {
    padding: 0 30px;
    min-height: 80px;
    border-bottom: 1px solid rgba(#e7e8e8, 0.1);
  }
}
</style>
