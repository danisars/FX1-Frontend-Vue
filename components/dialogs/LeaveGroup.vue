<template lang="pug">
.xd-invitations.card(v-click-outside="() => $parent.close()")
  .card-content
    .close(@click.prevent="$parent.close()"): img(
      :src="require('~/assets/images/explore-event/close-modal.svg')"
    )
    h3 Are you sure you want to leave
    .actions
      b-button.is-uppercase.leave(@click="leave()", type="is-primary") {{ 'Leave' }}
      b-button.is-uppercase.cancel(@click="cancel()") {{ 'Cancel' }}
</template>

<script>
export default {
  name: 'XDLeaveGroup',
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },

  methods: {
    async leave() {
      await this.$api.leavePrivateChannel({
        privateChannelID: this.details?.privateChannelID,
      })
      this.$root.$emit('leavePrtChat', null)
      this.$parent.close()
    },
    cancel() {
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-invitations {
  min-height: 210px;
  background-color: $secondary;
  padding: 32px 24px;
  .card-content {
    padding: 0;

    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }

    h3 {
      margin-bottom: 30px;
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      letter-spacing: unset;
      color: $white;
      margin-bottom: 20px;
    }
    .actions {
      display: flex;
      flex-direction: column;
      .leave {
        margin-bottom: 25px;
      }
      .cancel {
        background: transparent;
        color: $white;
      }
    }
  }
}
</style>
