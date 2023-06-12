<template lang="pug">
.xm-default-header-navigation
  b-dropdown(aria-role="list")
    template(#trigger="{ active }")
      .row
        ._label Product
        ._icon: img(src="~assets/images/Default/chevron-down.svg")
    b-dropdown-item(aria-role="listitem", has-link)
      nuxt-link(to="/explore") Explore
    b-dropdown-item(aria-role="listitem", has-link)
      nuxt-link(to="/locker-room/explore") Leagues & Clubs
    b-dropdown-item(aria-role="list-item", has-link)
      nuxt-link(to="/locker-room/explore") Customer Support

  b-dropdown(aria-role="list")
    template(#trigger="{ active }")
      .row
        ._label Company
        ._icon: img(src="~assets/images/Default/chevron-down.svg")
    b-dropdown-item(aria-role="listitem", has-link)
      nuxt-link(to="/about") About
    b-dropdown-item(aria-role="listitem", has-link)
      nuxt-link(to="/contact") Contact

  nuxt-link(to="/business") For business
</template>

<script>
export default {
  name: 'XMDefaultHeaderNavigation',
}
</script>

<style lang="scss" scoped>
.xm-default-header-navigation::v-deep {
  @include max-width(1023px) {
    display: none;
  }

  a {
    color: $white;
    font-weight: 300;
    font-size: 1.1429rem;
  }

  .dropdown {
    margin-right: 25px;

    .dropdown-trigger {
      cursor: pointer;
      user-select: none;

      ._label {
        font-size: 1.1429rem;
        font-weight: 300;
      }

      ._icon {
        margin-left: 5px;
      }
    }

    .dropdown-menu {
      min-width: 200px;

      .dropdown-content {
        padding: 10px 0 20px;

        a {
          color: $secondary;
          font-size: 1.1429rem;
          font-weight: 400;
          display: block;
          padding: 10px 20px 0;
        }
      }
    }
  }
}
</style>
