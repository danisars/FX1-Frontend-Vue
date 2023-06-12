<template lang="pug">
.xd-create-channel-group.card
  .card-content
    .close(@click.prevent="fnCloseDialog()"): img(
      src="~assets/images/LockerRoom/close-secondary.svg"
    )
    form.flex-column.justify-between(
      action="#",
      autocomplete="off",
      @submit.prevent=""
    )
      .inputs.col
        h2 {{ isEditing ? 'Rename' : 'Create a' }} channel group
        XAFormsInput(
          v-model="groupName",
          placeholder="Group name",
          :error="validation.firstError('name') || channelGroupNameError",
          @input="fnChannelGroupNameValidation()",
          :loading="isChecking"
        )
      .actions
        b-button(
          type="is-primary",
          :loading="isSubmitting",
          :disabled="isDisabledCreateButton",
          @click.prevent="fnSave()"
        ) {{ isEditing ? 'Save' : 'Create Channel Group' }}
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import debounce from 'lodash/debounce'
import { Validator } from 'simple-vue-validator'

export default {
  validators: {
    groupName(value) {
      return Validator.value(value).required('Group name field is required.')
    },
  },
  name: 'XDCreateChannelGroup',
  components: {
    XAFormsInput: () => import('~/components/atoms/Forms/Input'),
  },
  props: {
    details: { type: Object, default: () => {} },
  },
  data() {
    return {
      isSubmitting: false,
      isChecking: false,
      channelGroupNameError: null,
    }
  },
  computed: {
    ...mapFields('locker-room', ['lockerRoomActive']),
    ...mapFields('channels', [
      'form.groupName',
      'form.description',
      'form.editGroupName',
    ]),
    lockerRoomID() {
      return this.lockerRoomActive?.id || null
    },
    slug() {
      return this.lockerRoomActive?.slug || null
    },
    isDisabledCreateButton() {
      return !this.groupName || this.channelGroupNameError
    },
    isEditing() {
      return this.details?.isEditing || false
    },
    channelGroupID() {
      return this.details?.channelGroupID || null
    },
  },
  mounted() {
    if (this.isEditing) {
      const { groupName } = this.details
      this.groupName = groupName
      this.editGroupName = groupName

      const params = {
        pageName: 'Rename channel group',
        isLoggedIn: this.isLoggedIn,
      }
      this.$mixpanelClient.trackViewPage(params)

      return
    }

    const params = {
      pageName: 'Create channel group',
      isLoggedIn: this.isLoggedIn,
    }
    this.$mixpanelClient.trackViewPage(params)
  },
  methods: {
    fnCreateChannelGroup() {
      this.isSubmitting = true

      this.$validate().then(async (success) => {
        if (success) {
          try {
            const { groupName, lockerRoomID } = this
            const input = { name: groupName, description: null, lockerRoomID }
            await this.$api.createChannelGroup({ input })
            this.$root.$emit('evtRtGetMyProfileDetails')
            await this.fnSetLockerRoomActive()
            this.$parent.close()
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
        }

        this.isSubmitting = false
      })
    },
    async fnSetLockerRoomActive() {
      const { slug } = this

      const { getLockerRoom } = await this.$api.getLockerRoom({ slug })
      this.lockerRoomActive = getLockerRoom
    },
    fnChannelGroupNameValidation: debounce(async function () {
      if (!this.groupName) return
      this.isChecking = true

      try {
        const { groupName, lockerRoomID } = this
        const { channelGroupExists } = await this.$api.channelGroupExists({
          name: groupName,
          lockerRoomID,
        })
        if (channelGroupExists) {
          this.channelGroupNameError = 'Channel group name already exists.'
          return
        }

        this.channelGroupNameError = null
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
        this.isChecking = false
      }
    }, 300),
    async fnEditChannelGroup() {
      this.isSubmitting = true
      try {
        const { channelGroupID, groupName, description } = this
        const input = { name: groupName, description }
        await this.$api.editChannelGroup({ id: channelGroupID, input })

        // retrieving locker room details
        this.$root.$emit('evtRtGetMyProfileDetails')
        await this.fnSetLockerRoomActive()

        this.$toast.success('Awesome, channel group successfully renamed', {
          duration: 5000,
          position: 'bottom-left',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'check-circle-outline',
          action: {
            text: 'Undo',
            onClick: (_, toastObject) => {
              this.fnUndoRenameChannelGroup()
              toastObject.goAway(0)
            },
          },
        })

        this.fnCloseDialog()
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
    fnSave() {
      if (this.isEditing) {
        this.fnEditChannelGroup()
        return
      }

      this.fnCreateChannelGroup()
    },
    fnCloseDialog() {
      this.description = null
      this.groupName = null
      this.$parent.close()
    },
    async fnUndoRenameChannelGroup() {
      try {
        const { channelGroupID, editGroupName, description } = this
        const input = { name: editGroupName, description }
        await this.$api.editChannelGroup({ id: channelGroupID, input })

        // retrieving locker room details
        this.$root.$emit('evtRtGetMyProfileDetails')
        await this.fnSetLockerRoomActive()
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
  },
}
</script>
