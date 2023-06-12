<template lang="pug">
nuxt-link.xa-explore-clubs-sport-slide.flex-column.justify-end(
  :to="lockerRoomURL",
  :style="{ backgroundImage: `url(${coverPhoto})` }",
  @click.native="fnSetLockerRoomActive()"
)
  .contents
    .details.row
      .left-details: XAAvatar(:image="avatar", :name="name", size="48px")
      .right-details.col
        h3.text-weight-light {{ name }}
        .supporters.text-weight-light {{ supporters }} supporters

    .actions
      .btn-support.row.items-center.justify-center(
        :class="isSupported && isSupporting.length && 'is-supported'",
        @click.prevent="fnShowCommunityRules()"
      )
        template(v-if="isSupported && isSupporting.length")
          span._icon.row: img(
            src="~assets/images/Club/supported.svg",
            alt="Supported"
          )
          span Supporting
        template(v-else)
          span Support
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XAExploreClubsSportSlide',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  mixins: [dialogs],
  props: {
    lockerRoom: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isSupported: this.lockerRoom?.isSupported || false,
      supporters: this.lockerRoom?.supporterCount || 0,
      lockerRoomURL: '',
    }
  },
  computed: {
    ...mapFields('signup', ['signupLockerRoomSupporting']),
    ...mapFields('locker-room', ['lockerRoomSupporting', 'lockerRoomActive']),
    ...mapGetters({
      getSportSupporting: 'sports/getSportSupporting',
    }),
    lockerRoomID() {
      return this.lockerRoom?.id || null
    },
    name() {
      return this.lockerRoom?.name || ''
    },
    slug() {
      return this.lockerRoom?.slug || '/'
    },
    channelSlug() {
      return this.lockerRoom?.defaultChannelSlug || '/'
    },
    isSupporting() {
      const supporting = this.lockerRoomSupporting.filter((x) => {
        return x?.id === this.lockerRoomID
      })

      return supporting
    },
    club() {
      return this.lockerRoom?.Club || null
    },
    league() {
      return this.lockerRoom?.League || null
    },
    fanGroup() {
      return this.lockerRoom?.FanGroup || null
    },
    sports() {
      return this.lockerRoom?.Sports || null
    },
    avatar() {
      return (
        this.club?.Avatar?.PhotoURL ||
        this.league?.Avatar?.PhotoURL ||
        this.fanGroup?.Avatar?.PhotoURL ||
        null
      )
    },
    coverPhoto() {
      return (
        this.club?.CoverPhoto?.PhotoURL ||
        this.league?.CoverPhoto?.PhotoURL ||
        this.fanGroup?.CoverPhoto?.PhotoURL ||
        this.sports[0]?.CoverPhoto?.PhotoURL
      )
    },
    lockerRoomRole() {
      return this.lockerRoom?.MyRole?.role || null
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.fnCheckWindowSize)
  },
  mounted() {
    this.fnCheckWindowSize()
    this.$root.$on('evtRtSupportViaExplore', () => {
      if (this.getSportSupporting === this.lockerRoomID) {
        this.isSupported = true
        this.supporters++
      }
    })
  },
  methods: {
    ...mapActions({
      setLockerRoomSupporting: 'locker-room/setLockerRoomSupporting',
      deleteLockerRoomSupporting: 'locker-room/deleteLockerRoomSupporting',
      setSportSupporting: 'sports/setSportSupporting',
    }),
    fnShowCommunityRules() {
      if (!this.isSupported) {
        const details = { ...this.lockerRoom, ...{ pageName: 'Explore' } }
        this.fnShowCommunityRulesDialog(details)
        this.setSportSupporting(this.lockerRoomID)
        return
      }

      if (this.lockerRoomRole) {
        this.$toast.success(
          'You are currently on managerial position. You cannot unsupport this club.',
          {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          }
        )
        return
      }

      this.$router.push({
        path: this.lockerRoomURL,
      })

      // this.supporters--
      // this.isSupported = false
      // this.fnToggleSupportClub()
    },
    async fnToggleSupportClub() {
      try {
        const { lockerRoomID } = this

        const {
          ChannelGroups,
          Club,
          League,
          FanGroup,
          Roles,
          channelCount,
          defaultChannelSlug,
          group,
          id,
          name,
          role,
          slug,
          Sports,
        } = this.lockerRoom

        const lockerRoom = {
          ChannelGroups,
          Club,
          League,
          FanGroup,
          Roles,
          channelCount,
          defaultChannelSlug,
          group,
          id,
          isSupported: true,
          name,
          role,
          slug,
          Sports,
        }

        if (this.isSupported) {
          this.setLockerRoomSupporting(lockerRoom)
          await this.$api.supportClub({ lockerRoomID })
          await this.$mixpanelClient.trackSupport({
            lockerRoom,
            pageName: 'Explore',
          })
        } else {
          this.$api.unsupportClub({ lockerRoomID })
          this.$mixpanelClient.trackUnSupport({
            lockerRoom,
            pageName: 'Explore',
          })
          this.deleteLockerRoomSupporting(lockerRoom)

          this.$toast.success(`You unsupported ${this.name} club`, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'check-circle-outline',
            action: {
              text: 'Undo',
              onClick: (_, toastObject) => {
                toastObject.goAway(0)
                this.setLockerRoomSupporting(lockerRoom)
                this.isSupported = true
                this.supporters++
                this.$api.supportClub({ lockerRoomID })
                this.$mixpanelClient.trackSupport({
                  lockerRoom,
                  pageName: 'Explore',
                })
              },
            },
            onComplete: () => {
              this.$root.$emit('evtRtGetMyProfileDetails')
            },
          })
        }
      } catch (error) {
        error?.response?.errors.forEach((error) => {
          this.$toast.success(error.message, {
            duration: 5000,
            position: 'bottom-left',
            className: 'fx1-success',
            iconPack: 'mdi',
            icon: 'alert-circle-outline',
          })
        })
      }
    },
    fnCheckWindowSize() {
      if (window.innerWidth < 768) {
        this.lockerRoomURL = '/locker-room'
        return
      }

      this.lockerRoomURL = `/locker-room/${this.slug}/${this.channelSlug}`
    },
    fnSetLockerRoomActive() {
      if (window.innerWidth >= 768) return
      this.lockerRoomActive = this.lockerRoom
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-explore-clubs-sport-slide::v-deep {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 395px;
  border-radius: 10px;
  position: relative;
  padding: 25px;
  color: $white !important;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      linear-gradient(180deg, rgba(0, 0, 0, 0) 56.77%, $black 100%);
    border-radius: 10px;
  }

  .contents {
    background-color: #886bf2;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    z-index: 1;

    .details {
      .right-details {
        padding-left: 15px;

        a {
          color: $white;
        }

        .supporters {
          color: rgba($white, 0.5);
        }
      }
    }

    .actions {
      margin-top: 25px;

      .btn-support {
        width: 100%;
        height: 42px;
        border-radius: 5px;
        border: 1px solid $white;
        text-transform: uppercase;
        cursor: pointer;

        &.is-supported {
          background-color: rgba($white, 0.15);
          border-color: transparent;

          ._icon {
            margin-top: -2px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
