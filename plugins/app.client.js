import Vue from 'vue'
import Vuebar from 'vuebar'
import VueCroppie from 'vue-croppie'
import InfiniteLoading from 'vue-infinite-loading'
import SmoothVuebar from 'smooth-vuebar'
import VIntersect from 'v-intersect'
import mixpanel from 'mixpanel-browser'
import linkify from 'vue-linkify'
import vClickOutside from 'v-click-outside'
import createMixpanelClient from '~/scripts/mixpanel/client'
import createFireMessClient from '~/scripts/services/client'

import 'croppie/croppie.css'

Vue.use(Vuebar)
Vue.use(VueCroppie)
Vue.use(InfiniteLoading)
Vue.use(SmoothVuebar, {
  options: {
    damping: 1,
    alwaysShowTracks: true,
  },
})
Vue.use(VIntersect)
Vue.directive('linkified', linkify)
Vue.use(vClickOutside)

const plugin = (context, inject) => {
  mixpanel.init(process.env.mixpanelToken, {
    debug: true,
  })

  const $mixpanelClient = createMixpanelClient(context)
  inject('mixpanelClient', $mixpanelClient)
  inject('mixpanel', mixpanel)

  const $fireMess = createFireMessClient(context)
  inject('fireMess', $fireMess)
}

export default plugin
