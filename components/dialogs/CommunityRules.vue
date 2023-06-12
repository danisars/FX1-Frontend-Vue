<template lang="pug">
.xd-community-rules.card
  .card-content
    .close(@click.prevent="$parent.close()", v-if="!isSubmitting"): img(
      src="~assets/images/LockerRoom/close.svg"
    )
    .cover-photo(:style="{ backgroundImage: `url(${coverPhoto})` }")
      .contents
        XAAvatar(:image="avatar", :name="name", size="64px")
        h3.name {{ name }}
        .supporters {{ supporterCount }} supporters

    .details
      .details-header.row.items-center
        div
          h2 Community rules
          p Read and agree to join and start chatting

      .details-content
        .rules
          .rule.row(v-for="(rule, index) in rules", :key="index")
            ._icon.row.items-center.justify-center: img(
              src="~assets/images/Club/check-secondary.svg"
            )
            .col.d-flex
              .text.text-weight-bold {{ rule.title }}
              .text {{ rule.content }}

        .actions: b-button(
          type="is-primary",
          :loading="isSubmitting",
          @click.prevent="fnToggleSupportClub()"
        ) I Agree
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XDCommunityRules',
  components: {
    XAAvatar: () => import('~/components/atoms/Avatar'),
  },
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      rules: [
        {
          title: 'No promotions or spam',
          content:
            "Spam, advertising and irrelevant links aren't allowed. Self-promotion needs to be firstly approved by the community manager",
        },
        {
          title: 'Treat everyone with respect',
          content:
            'Authentic, expressive discussions make groups great, but may also be sensitive and private.\n' +
            "What's shared in the group should stay in the group.",
        },
        {
          title: 'No hate speech or bullying',
          content:
            "Make sure everyone feels safe. Bullying of any kind isn't allowed, and degrading comments\n" +
            'about things like race, religion, culture, polotics, sexual orientation, gender or identity will not\n' +
            'be tolerated.',
        },
        {
          title: 'Be kind and courteous',
          content:
            "We're all in this together to create a welcoming environment. Let's treat everyone with\n" +
            'respect. Healthy debates are natural, but kindness, language managament, and respect is\n' +
            'required',
        },
        {
          title: 'Only sports related content',
          content:
            'FX1 and its communities are all about sports. Content should be related to sports only. If you\n' +
            'see something against the rules or makes you feel uncomfortable, let a FX1 community\n' +
            'team member know. This is a welcoming space for everyone.',
        },
      ],
      isSubmitting: false,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    ...mapFields('signup', ['signupLockerRoomSupporting']),
    name() {
      return this.lockerRoomActive?.name || this.details?.name || ''
    },
    lockerRoomID() {
      return this.lockerRoomActive?.id || this.details?.id || null
    },
    supporterCount() {
      return (
        this.lockerRoomActive?.supporterCount ||
        this.details?.supporterCount ||
        0
      )
    },
    club() {
      return this.lockerRoomActive?.Club || this.details?.Club || null
    },
    league() {
      return this.lockerRoomActive?.League || this.details?.League || null
    },
    fanGroup() {
      return this.lockerRoomActive?.FanGroup || this.details?.FanGroup || null
    },
    sports() {
      return this.lockerRoomActive?.Sports || this.details?.Sports || []
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
        this.sports[0]?.CoverPhoto?.PhotoURL ||
        null
      )
    },
    pageName() {
      return this.lockerRoomActive
        ? 'Locker room'
        : this.details?.pageName || null
    },
  },
  mounted() {
    const params = { pageName: 'Community Rules', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
  methods: {
    ...mapActions({
      setLockerRoomSupporting: 'locker-room/setLockerRoomSupporting',
      setLockerRoomActive: 'locker-room/setLockerRoomActive',
    }),
    async fnToggleSupportClub() {
      if (!this.isLoggedIn) {
        this.signupLockerRoomSupporting = this.lockerRoomActive || this.details
        this.$parent.close()
        this.$router.push({
          path: '/signup?step=1',
        })
        return
      }

      this.isSubmitting = true
      try {
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
        } = this.lockerRoomActive || this.details

        const lockerRoomActive = {
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

        this.setLockerRoomActive(lockerRoomActive)

        const { lockerRoomID } = this
        await this.$api.supportClub({ lockerRoomID })
        await this.$mixpanelClient.trackSupport({
          lockerRoom: lockerRoomActive,
          pageName: this.pageName,
        })
        this.$toast.success(`Welcome to the ${this.name} community!`, {
          duration: 5000,
          position: 'bottom-left',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'check-circle-outline',
        })
        this.$parent.close()
        this.setLockerRoomSupporting(this.lockerRoomActive || this.details)

        if (this.$route.name === 'locker-room-explore') {
          this.$root.$emit('evtRtSupportViaExplore')
          this.$root.$emit('evtRtGetMyProfileDetails')
          this.lockerRoomActive = null
          return
        }

        const { getLockerRoom } = await this.$api.getLockerRoom({
          id: lockerRoomID,
        })
        this.lockerRoomActive = getLockerRoom
        this.$root.$emit('evtRtGetMyProfileDetails')
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
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-community-rules::v-deep {
  min-height: 100%;
  height: auto !important;

  .card-content {
    padding: 0 !important;

    .close {
      z-index: 2;
      opacity: 1 !important;

      img {
        width: 20px;
      }
    }

    .cover-photo {
      min-height: 295px;
      width: 100%;
      background-size: cover;
      background-position: center;
      color: $white;
      padding: 50px;
      position: relative;
      z-index: 0;

      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.3)
          ),
          linear-gradient(180deg, rgba(0, 0, 0, 0) 56.77%, #000000 100%);
      }

      .contents {
        position: relative;
        z-index: 1;

        .xa-avatar {
          margin-bottom: 10px;
        }

        .supporters {
          font-size: 1.0714rem;
          line-height: 1.4286rem;
          opacity: 0.7;
        }
      }
    }

    .details {
      position: relative;
      z-index: 1;
      padding: 0 50px 50px;

      @include max-width(767px) {
        padding: 0 30px 50px;
      }

      .details-header {
        color: $secondary;
        background-color: $white;
        width: 100%;
        min-height: 140px;
        margin: 0 auto;
        box-shadow: 0px 4px 30px rgba(18, 55, 63, 0.15);
        border-radius: 10px;
        padding: 0 50px;
        margin-top: -45px;
        margin-bottom: 50px;

        h2 {
          margin-bottom: 5px;
        }

        p {
          font-size: 1.1429rem;
          line-height: 1.5714rem;
          letter-spacing: -0.28px;
          font-weight: 300;
        }
      }

      .details-content {
        .rules {
          .rule {
            background-color: #f8f8f8;
            border-radius: 10px;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: -0.28px;
            color: $secondary;
            padding: 20px;
            margin-bottom: 10px;

            ._icon {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              border: 1px solid $secondary;
            }

            .text {
              margin-left: 10px;
            }
          }
        }

        .actions {
          margin-top: 50px;

          .button {
            width: 185px;
            height: 82px;
            text-transform: uppercase;
          }
        }
      }
    }
  }
}
</style>
