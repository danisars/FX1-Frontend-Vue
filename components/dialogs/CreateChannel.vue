<template lang="pug">
.xd-create-channel.card
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
        h2 {{ isEditing ? 'Rename channel' : 'Create a channel' }}
        .mb-5: XAFormsInput(
          v-model="name",
          placeholder="Channel name",
          :loading="isChecking",
          :error="validation.firstError('name') || channelNameError",
          @input="fnChannelNameValidation()"
        )
        XAFormsInput(
          v-model="description",
          placeholder="Short description",
          type="textarea",
          :error="validation.firstError('description')"
        )
      .actions
        b-button(
          type="is-primary",
          :loading="isSubmitting",
          :disabled="isDisabledCreateButton",
          @click.prevent="fnSave()"
        ) {{ isEditing ? 'Save' : 'Create Channel' }}
</template>

<script>
import debounce from 'lodash/debounce'
import { Validator } from 'simple-vue-validator'
import { mapFields } from 'vuex-map-fields'

export default {
  validators: {
    name(value) {
      return Validator.value(value).required('Channel name field is required.')
    },
    description(value) {
      return Validator.value(value).required('Description field is required.')
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
      channelNameError: null,
    }
  },
  computed: {
    ...mapFields('channels', [
      'form.name',
      'form.description',
      'form.groupName',
      'form.editName',
      'form.editDescription',
    ]),
    ...mapFields('locker-room', ['lockerRoomActive']),
    isDisabledCreateButton() {
      return !this.name || !this.description || this.channelNameError
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
      const { channelName, channelDescription } = this.details
      this.name = channelName
      this.description = channelDescription
      this.editName = channelName
      this.editDescription = channelDescription

      const params = { pageName: 'Rename channel', isLoggedIn: this.isLoggedIn }
      this.$mixpanelClient.trackViewPage(params)
      return
    }

    const params = { pageName: 'Create channel', isLoggedIn: this.isLoggedIn }
    this.$mixpanelClient.trackViewPage(params)
  },
  methods: {
    fnCreateChannel() {
      this.isSubmitting = true
      this.$validate().then(async (success) => {
        if (success) {
          try {
            const { name, description, channelGroupID } = this
            const input = { name, description, channelGroupID, type: 'Public' }

            await this.$api.createChannel({ input })
            await this.$root.$emit('evtRtGetMyProfileDetails')
            await this.fnSetLockerRoomActive()
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
          return
        }
        this.isSubmitting = false
      })
    },
    async fnSetLockerRoomActive() {
      const { slug } = this.lockerRoomActive

      const { getLockerRoom } = await this.$api.getLockerRoom({ slug })
      this.lockerRoomActive = getLockerRoom
    },
    fnChannelNameValidation: debounce(async function () {
      if (!this.name) return
      this.isChecking = true

      try {
        const { name, channelGroupID } = this
        const { channelExists } = await this.$api.channelExists({
          name,
          channelGroupID,
        })
        if (channelExists) {
          this.channelNameError = 'Channel name already exists.'
          return
        }

        this.channelNameError = null
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
    async fnEditChannel() {
      this.isSubmitting = true
      try {
        const { channelID, channelType } = this.details
        const { name, description } = this
        const input = { name, description, type: channelType }

        await this.$api.editChannel({ id: channelID, input })

        // retrieving locker room details
        this.$root.$emit('evtRtGetMyProfileDetails')
        this.$root.$emit('evtRtGetChannel')
        await this.fnSetLockerRoomActive()

        this.$toast.success('Great, channel successfully renamed', {
          duration: 5000,
          position: 'bottom-left',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'check-circle-outline',
          action: {
            text: 'Undo',
            onClick: (_, toastObject) => {
              this.fnUndoRenameChannel()
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
    async fnSave() {
      if (this.isEditing) {
        await this.fnEditChannel()
        return
      }

      await this.fnCreateChannel()
    },
    fnCloseDialog() {
      this.name = null
      this.description = null
      this.groupName = null
      this.$parent.close()
    },
    async fnUndoRenameChannel() {
      try {
        const { channelID, channelType } = this.details
        const { editName, editDescription } = this
        const input = {
          name: editName,
          description: editDescription,
          type: channelType,
        }

        await this.$api.editChannel({ id: channelID, input })

        // retrieving locker room details
        this.$root.$emit('evtRtGetMyProfileDetails')
        this.$root.$emit('evtRtGetChannel')
        await this.fnSetLockerRoomActive()
        this.editName = null
        this.editDescription = null
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
