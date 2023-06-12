<template lang="pug">
.xa-forms-select
  b-field(:label="label")
    b-select(
      autocomplete="off",
      expanded,
      :placeholder="placeholder",
      :value="value",
      @input="$emit('input', $event)"
    )
      option(
        v-for="(option, index) in options",
        :value="option.value",
        :key="option.index"
      ) {{ option.label }}
</template>

<script>
export default {
  name: 'XAFormsSelect',
  props: {
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    value: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.xa-forms-select::v-deep {
  .field {
    margin-bottom: 3px;

    .label {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 3px;
      color: #050505;
    }

    .control {
      .select {
        height: auto;

        &::after {
          top: 0;
          bottom: 6px;
          margin: auto 0;
          right: 15px;
          width: 12px;
          height: 12px;
        }

        select {
          font-size: 1.1429rem;
          font-weight: 300;
          line-height: 1.7143rem;
          box-shadow: none;
          color: #050505;
          border: 1px solid #dbdbdb;
          border-radius: 5px;
          height: 56px;
        }
      }
    }
  }
}
</style>
