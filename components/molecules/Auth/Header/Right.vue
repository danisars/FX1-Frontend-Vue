<template lang="pug">
.xm-auth-header-right
  .row.items-center
    template(v-if="$route.name === 'signup'")
      template(v-if="$route.query.step !== '2'")
        ._label Already a member?
        .actions: b-button(
          type="is-white",
          tag="router-link",
          to="/signin",
          outlined
        ) Sign In
    template(v-else)
      ._label Not a member?
      .actions
        b-button(type="is-white", tag="router-link", to="/signup", outlined) Sign Up
</template>

<script>
export default {
  name: 'XMAuthHeaderRight',
}
</script>

<style lang="scss" scoped>
.xm-auth-header-right::v-deep {
  ._label {
    font-weight: 300;
    color: rgba($white, 0.7);
  }

  .button {
    width: 125px;
    height: 42px;
    text-transform: uppercase;
    margin-left: 25px;
  }
}
</style>
