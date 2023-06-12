<template lang="pug">
.xd-club-registration.card
  .card-content
    .close(@click.prevent="$parent.close()"): b-icon(icon="close")
    h3.text-center Create a club
    form(action="#", autocomplete="off")
      .mb-5: XAFormsAvatar
      .mb-6: XAFormsInput(v-model="clubName", label="Club Name")

      .actions.row.justify-center
        b-button(type="is-primary") Create
        b-button(type="is-light", @click.prevent="$parent.close()") Cancel
</template>

<script>
export default {
  name: 'XDClubRegistration',
  components: {
    XAFormsAvatar: () => import('~/components/atoms/Forms/Avatar'),
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
  },
  data() {
    return {
      clubName: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.xd-club-registration::v-deep {
  .card-content {
    padding: 40px 30px;

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }

    h3 {
      margin-bottom: 30px;
    }

    .actions {
      .button {
        width: 120px;
        height: 42px;
        text-transform: uppercase;
        margin: 0 10px;
      }
    }
  }
}
</style>
