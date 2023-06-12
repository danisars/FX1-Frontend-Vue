<template lang="pug">
.xa-forms-input(:class="error && 'has-error'")
  b-field(:label="label")
    b-input(
      autocomplete="off",
      expanded,
      :value="value",
      :type="type",
      :placeholder="placeholder",
      :password-reveal="isPassword",
      :icon-right="(error && 'message-alert') || (!error && iconOnRight)",
      :disabled="disabled",
      :loading="loading",
      @input="$emit('input', $event)",
      @blur="$emit('blur', $event)",
      @keyup.enter.native="$emit('enter', $event)"
      :id='id'
    )
  .input-error(v-if="error") {{ error }}
</template>

<script>
export default {
  name: 'XAFormsInput',
  props: {
    label: { type: String, default: '' },
    hasLabel: { type: Boolean, default: true },
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    error: { type: String, default: '' },
    id: { type: String, default: '' },
    iconOnRight: { type: String, default: null },
  },
  computed: {
    isPassword() {
      return this.type === 'password'
    },
  },
}
</script>

<style lang="scss" scoped>
.input-error,
.message-alert {
  color: $primary !important;
  font-size: 10px;
}
.xa-forms-input::v-deep {
  &.has-error {
    .field {
      .control {
        input[type='text'],
        input[type='password'],
        textarea {
          border-color: $primary !important;
        }

        .icon {
          &.is-right {
            color: $primary !important;
          }
        }
      }
    }
  }


  .field {
    margin-bottom: 3px;

    .label {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 3px;
      color: #050505;
    }

    .control {
      input[type='text'],
      input[type='password'],
      textarea {
        font-size: 1.1429rem;
        font-weight: 300;
        line-height: 1.7143rem;
        box-shadow: none;
        color: #050505;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        height: 56px;

        &::placeholder {
          color: #65676b;
        }

        &:-ms-input-placeholder {
          color: #65676b;
        }
      }

      textarea {
        resize: none;

        + .icon {
          top: 5px;
          bottom: unset;
        }
      }

      .icon {
        bottom: 0;
        margin: auto 0;
        right: 5px;
      }

      &.is-loading {
        &::after {
          top: 0;
          bottom: 0;
          margin: auto 0;
          right: 10px;
        }
      }
    }
  }
}
</style>
