export default {
  data() {
    return {
      metaTitle: '',
      metaDescription: 'Show the world who you support',
    }
  },
  head() {
    return {
      title: this.metaTitle || 'FX1',
      link: [
        { rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription.replace(/<\/?[^>]+(>|$)/g, ''),
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.metaTitle,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.metaDescription.replace(/<\/?[^>]+(>|$)/g, ''),
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.fx1Logo,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.metaTitle,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.metaTitle,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaDescription.replace(/<\/?[^>]+(>|$)/g, ''),
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.fx1Logo,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.fx1Logo,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.metaTitle,
        },
      ],
    }
  },
}
