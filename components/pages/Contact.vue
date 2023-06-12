<template lang="pug">
.xp-contact
  .banner
    .text-center
      h1 We would love to hear from you
      p No matter if you`re a fan with a question, or a club or league looking to get involved, we would love to hear from you.
  .container.is-max-widescreen
    .contents
      .left-content
        h1 We would love to hear from you
        h3 No matter if you`re a fan with a question, or a club or league looking to get involved, we would love to hear from you.
      .right-content
        form(action="#", autocomplete="off")
          .columns
            .column.is-6
              FormInput(
                v-model="firstName",
                placeholder="First Name",
                :disabled="isSubmitting",
                :error="validation.firstError('firstName')",
                error-class="has-text-white"
              )
            .column.is-6
              FormInput(
                v-model="lastName",
                placeholder="Last Name",
                :disabled="isSubmitting",
                :error="validation.firstError('lastName')",
                error-class="has-text-white"
              )
          .mb-5: FormInput(
            v-model="sportingOrganization",
            :error="validation.firstError('sportingOrganization')",
            placeholder="Sporting Organization",
            :disabled="isSubmitting"
          )
          .mb-5: FormInput(
            v-model="email",
            placeholder="Email",
            :disabled="isSubmitting",
            :error="validation.firstError('email')",
            error-class="has-text-white"
          )
          .mb-5: FormInput(
            v-model="phoneNumber",
            type="text",
            placeholder="Phone Number",
            :disabled="isSubmitting"
          )
          .mb-6: FormInput(
            v-model="message",
            type="textarea",
            placeholder="I'm messaging because...",
            :min-height="160",
            :disabled="isSubmitting",
            :isAutoGrow="true",
            :error="validation.firstError('message')",
            error-class="has-text-white"
          )
          .actions: b-button.is-uppercase(
            type="is-primary",
            expanded,
            :loading="isSubmitting",
            @click.prevent="doSubmitEnquiry()"
          ) Send Enquiry
</template>

<script>
import { Validator } from 'simple-vue-validator'
import FormInput from '~/components/atoms/Forms/Input'

export default {
  name: 'XPContact',
  components: { FormInput },
  validators: {
    firstName(value) {
      return Validator.value(value).required('First Name field is required.')
    },
    lastName(value) {
      return Validator.value(value).required('Last Name field is required.')
    },
    email(value) {
      return Validator.value(value)
        .required('Email field is required.')
        .email("That doesn't look like a valid email.")
    },
    message(value) {
      return Validator.value(value).required('Message field is required.')
    },
    sportingOrganization(value) {
      return Validator.value(value).required('Sporting field is required.')
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
      sportingOrganization: '',
      isSubmitting: false,
    }
  },
  methods: {
    doSubmitEnquiry() {
      this.isSubmitting = true
      this.$validate().then(async (success) => {
        if (success) {
          try {
            const input = {
              sportingOrganization: this.sportingOrganization,
              message: this.message,
              email: this.email,
              firstName: this.firstName,
              lastName: this.lastName,
              phoneNumber: this.phoneNumber,
            }

            let e
            try {
              await this.$api.createFormEntry({ type: 'Inquiry', data: input })
            } catch (error) {
              e = error
              this.$toast.error('Something went wrong , Please try again!.', {
                duration: 5000,
                position: 'top-center',
              })
            } finally {
              if (!e)
                this.$toast.success(
                  'Thank you, we’ll review your message and get back to you shortly.',
                  {
                    duration: 5000,
                    position: 'top-center',
                  }
                )
            }

            e = null
            this.firstName = ''
            this.lastName = ''
            this.email = ''
            this.phoneNumber = ''
            this.message = ''
            this.sportingOrganization = ''
            this.validation.reset()
            // this.setMedalEnquiryMessage()
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
        } else {
          this.isSubmitting = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-contact::v-deep {
  min-height: calc(100vh - 111px);
  background-color: $secondary;
  border-bottom: 1px solid #1c3e45;
  // background-image: url('~assets/images/Home/SportsBanner/triathlon.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 45px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;

  // &::before {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba($secondary, 0.6);
  //   content: '';
  //   z-index: 0;

  //   @include max-width(767px) {
  //     display: none;
  //   }
  // }

  h1 {
    font-size: 4.2857rem;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0;
  }

  .banner {
    // background-image: url('~assets/images/Home/SportsBanner/triathlon.webp');
    min-height: 220px;
    background-size: cover;
    background-position: center;
    padding: 0 15px;
    display: none;
    flex-wrap: wrap;
    align-items: center;
    color: $white;
    position: relative;

    // &::before {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   background-color: rgba($secondary, 0.6);
    //   content: '';
    //   z-index: 0;
    // }

    .text-center {
      position: relative;
      z-index: 1;
    }
  }

  .contents {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .left-content {
      flex: 10000 1 0%;
      padding-right: 0.75rem;

      h1 {
        color: $white;
      }
    }

    .right-content {
      width: 100%;
      max-width: 475px;
      padding-left: 0.75rem;

      .actions {
        .button {
          height: 82px;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .contents {
      .left-content,
      .right-content {
        width: 100%;
        max-width: 50%;
      }
    }
  }

  @media screen and (max-width: 767px) {
    background-image: none;
    padding: 0 0 45px;

    h1 {
      font-size: 2.2857rem;
      text-align: center;
    }

    .banner {
      display: flex;
    }

    .contents {
      padding-top: 1.5rem;
      padding-bottom: 3rem;

      .left-content {
        display: none;
      }

      .right-content {
        max-width: 100%;

        .input-error {
          color: $danger !important;
        }
      }
    }
  }
}
</style>
