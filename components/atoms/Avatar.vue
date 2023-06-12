<template lang="pug">
.xa-avatar.row.items-center.justify-center(:style="[avatarStyles]")
  img(:src="image", v-if="image", alt="name")
  .name(:style="[nameStyles]", v-else) {{ initials }}
</template>

<script>
import colors from '~/assets/json/colors'

export default {
  name: 'XAAvatar',
  props: {
    name: { type: String, default: '' },
    image: { type: String, default: null },
    size: { type: String, default: '32px' },
  },
  data() {
    return {
      colors,
    }
  },
  computed: {
    initials() {
      const name = this.name || ''

      if (name.split(' ').length > 1) {
        return name.split(' ')[0].charAt(0) + name.split(' ').pop().charAt(0)
      }

      return name.charAt(0)
    },
    avatarStyles() {
      // set up background color
      const name = this.name || 'FX1 User'
      let hash = 0

      for (let index = 0; index < name.length; index++) {
        hash = name.charCodeAt(index) + ((hash << 5) - hash)
      }

      const h = hash % 360

      // set up avatar styles
      const avatarStyles = {
        width: this.size,
        height: this.size,
        backgroundColor: this.image ? null : `hsl(${h}, 50%, 90%)`,
      }

      return avatarStyles
    },
    nameStyles() {
      const nameStyles = {
        fontSize: `calc(${this.size} * 0.40)`,
      }

      return nameStyles
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-avatar::v-deep {
  border-radius: 50%;
  cursor: pointer;
  user-select: none;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .name {
    font-weight: 300;
    margin-top: 3px;
    color: $secondary;
    text-transform: uppercase;
  }
}
</style>
