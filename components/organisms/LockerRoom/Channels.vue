<template lang="pug">
.xo-locker-room-channels(v-bar)
  .vuebar(@scroll="fnOnScroll")
    XMLockerRoomChannelsClubDetails(v-if="isSupported")
    XMLockerRoomChannelsClubDetails(
      v-if="!isSupported && isMobile && lockerRoomActive"
    )

    XMLockerRoomChannelsNavigation(
      v-if="isSupported && lockerRoomRole !== null"
    )
    XMLockerRoomChannelsNavigation(
      v-if="!isSupported && isMobile && lockerRoomRole !== null"
    )

    XMLockerRoomChannelsGroup(
      v-for="(channelGroup, index) in channelGroups",
      :channel-group="channelGroup",
      :slug="slug",
      :key="index"
    )
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import XMLockerRoomChannelsGroup from '~/components/molecules/LockerRoom/Channels/Group.vue'

export default {
  name: 'XOLockerRoomChannels',
  components: {
    XMLockerRoomChannelsClubDetails: () =>
      import('~/components/molecules/LockerRoom/Channels/ClubDetails'),
    XMLockerRoomChannelsNavigation: () =>
      import('~/components/molecules/LockerRoom/Channels/Navigation'),
    XMLockerRoomChannelsGroup,
  },
  data() {
    return {
      isMobile: false,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    ...mapFields('channels', ['channelScroll']),
    channelGroups() {
      return this.lockerRoomActive?.ChannelGroups || []
    },
    isSupported() {
      const slug = this.$route?.params?.slug
      const supporting = this.$store.state.lockerRoom.supporting || []

      const active = supporting.filter((x) => {
        return x?.slug === slug
      })

      const isSupporting = !!active.length

      return isSupporting || this.lockerRoomActive?.isSupported || false
    },
    slug() {
      return this.lockerRoomActive?.slug || null
    },
    lockerRoomRole() {
      return this.lockerRoomActive?.MyRole?.role || null
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.fnCheckWindowSize)
  },
  mounted() {
    this.fnScrollTo()
    this.fnCheckWindowSize()
  },
  methods: {
    fnOnScroll() {
      const element = document.querySelector('.xo-locker-room-channels .vuebar')
      this.channelScroll = element.scrollTop
    },
    fnScrollTo() {
      const element = document.querySelector('.xo-locker-room-channels .vuebar')
      element.scroll(0, this.channelScroll)
    },
    fnCheckWindowSize() {
      if (window.innerWidth < 768) {
        this.isMobile = true
        return
      }

      this.isMobile = false
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-locker-room-channels::v-deep {
  font-weight: 300;
  width: 100%;
  max-width: 270px;
  background-color: #08252c;
  border-left: 1px solid $secondary;
  height: calc(var(--vh, 1vh) * 100 - 80px);

  @include max-width(1024px) {
    max-width: 180px;
  }

  @include max-width(767px) {
    max-width: 100%;
    height: 100%;
    display: none;
  }

  .vuebar {
    padding: 30px 15px 30px 30px;
    width: calc(100% + 17px) !important;
    box-sizing: border-box !important;
  }

  &.vb {
    > .vb-dragger {
      z-index: 5;
      width: 8px;
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
        background-color: $secondary;
        margin: 5px 2px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
      }

      &:hover {
        > .vb-dragger-styler {
          background-color: $secondary;
          height: 100%;
        }
      }
    }

    &.vb-scrolling-phantom {
      > .vb-dragger {
        > .vb-dragger-styler {
          background-color: $secondary;
        }
      }
    }

    &.vb-dragging {
      > .vb-dragger {
        > .vb-dragger-styler {
          background-color: $secondary;
          height: 100%;
        }
      }
    }

    &.vb-dragging-phantom {
      > .vb-dragger {
        > .vb-dragger-styler {
          background-color: $secondary;
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
</style>
