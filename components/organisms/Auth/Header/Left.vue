<template lang="pug">
.xo-auth-header-left
  nuxt-link.row(to="/"): img(
    src="~assets/images/logo-colored.svg",
    width="58",
    height="43"
  )
</template>

<script>
export default {
  name: 'XOAuthHeaderLeft',
}
</script>
