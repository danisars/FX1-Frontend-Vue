<template lang="pug">
.xo-default-footer-navigation
  .container.is-max-widescreen
    .row.desktop
      .logo.col: img(
        src="~assets/images/Default/footer-logo.svg",
        width="48",
        height="34",
        alt="FX1"
      )
      template(v-for="(navigation, index) in desktopNavigation")
        .navigation-container.col
          h4._title {{ navigation.title }}
          .links
            nuxt-link.link(
              :to="`/${link.url}`",
              v-for="(link, index) in navigation.links",
              :key="index"
            ) {{ link.label }}

    .mobile
      .accordion(
        v-for="(navigation, index) in mobileNavigation",
        :key="`${index}-mobile`"
      )
        .accordion-title.row.items-center.justify-between(
          @click.prevent="navigation.isOpen = !navigation.isOpen"
        )
          h4._title {{ navigation.title }}
          ._icon: b-icon(
            :icon="navigation.isOpen ? 'chevron-up' : 'chevron-down'"
          )

        transition(name="fade")
          .accordion-content(v-if="navigation.isOpen")
            nuxt-link.link(
              :to="`/${link.url}`",
              v-for="(link, index) in navigation.links",
              :key="`${index}-l`"
            ) {{ link.label }}
</template>

<script>
export default {
  name: 'XODefaultFooterNavigation',
  data() {
    return {
      desktopNavigation: [
        {
          title: 'Product',
          links: [
            { label: 'Leagues & Clubs', url: 'explore' },
            { label: 'Customer Support', url: 'locker-room/fx-1-support/' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', url: 'about' },
            { label: 'Contact', url: 'contact' },
          ],
        },
        {
          title: 'Legal stuff',
          links: [
            { label: 'Terms', url: 'terms-conditions' },
            { label: 'Privacy', url: 'privacy' },
          ],
        },
      ],
      mobileNavigation: [
        {
          title: 'Product',
          links: [
            { label: 'Leagues & Clubs', url: 'explore' },
            { label: 'Customer Support', url: 'locker-room/fx-1-support/' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', url: 'about' },
            { label: 'Contact', url: 'contact' },
          ],
        },
        {
          title: 'Legal stuff',
          links: [
            { label: 'Terms', url: 'terms-conditions' },
            { label: 'Privacy', url: 'privacy' },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.xo-default-footer-navigation::v-deep {
  padding: 40px 0 30px;

  .navigation-container {
    ._title {
      margin-bottom: 16px;
    }

    .links {
      .link {
        font-size: 1.1429rem;
        font-weight: 300;
        line-height: 1.7143rem;
        letter-spacing: -0.28px;
        color: #839295;
        display: block;
        margin-bottom: 16px;
      }
    }
  }

  .desktop {
    @include max-width(767px) {
      display: none;
    }
  }

  .mobile {
    display: none;

    @include max-width(767px) {
      display: block;
    }

    .accordion {
      margin-bottom: 10px;

      .accordion-title {
        margin-bottom: 10px;
      }

      .accordion-content {
        a,
        .link {
          font-size: 1.1429rem;
          font-weight: 300;
          line-height: 1.7143rem;
          letter-spacing: -0.28px;
          color: #839295;
          display: block;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
