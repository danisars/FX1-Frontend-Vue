import Vue from 'vue'
import SimpleVueValidation from 'simple-vue-validator'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import { parse } from 'cookie'

Vue.use(SimpleVueValidation)

Vue.mixin({
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn || false
    },
    baseURL() {
      return process.env.baseURL
    },
    fx1Logo() {
      return 'https://firebasestorage.googleapis.com/v0/b/fx1-production.appspot.com/o/system-images%2Ffavicon.svg?alt=media'
    },
  },
  methods: {
    fnSuccessToast(
      message = null,
      duration = 3000,
      icon = 'check-circle-outline'
    ) {
      this.$toast.success(message, {
        duration,
        position: 'bottom-left',
        className: 'fx1-success',
        iconPack: 'mdi',
        icon,
      })
    },
  },
})

const PRESS_TIMEOUT = 500

Vue.directive('longpress', {
  bind(el, { value }, _vNode) {
    if (typeof value !== 'function') {
      console.warn(`Expect a function, got ${value}`)
      return
    }

    let pressTimer = null

    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => value(e), PRESS_TIMEOUT)
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    ;['mousedown', 'touchstart'].forEach((e) => el.addEventListener(e, start))
    ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach((e) =>
      el.addEventListener(e, cancel)
    )
  },
})

export default async ({ store, req }) => {
  await store.dispatch('auth/refreshToken')

  createPersistedState({
    key: 'fx1',
    paths: [
      'app.showOnlineUsers',
      // 'auth.isLoggedIn',
      // 'auth.token',
      'user.userID',
      // 'user.userName',
      // 'user.userAvatar',
      'lockerRoom.supporting',
    ],
    storage: {
      getItem: (key) => {
        if (process.server) {
          const parsedCookies = parse(req.headers.cookie || '')
          return parsedCookies[key]
        } else {
          return Cookies.get(key)
        }
      },
      setItem: (key, value) =>
        Cookies.set(key, value, {
          expires: 365,
          secure: false,
          sameSite: 'Strict',
        }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
