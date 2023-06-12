import { Context } from '@nuxt/types/app'
import mixpanelBindToContext from './client'


const bindToNuxtApp = function (context: Context) {
  return {
    mixpanel: mixpanelBindToContext(context),
  }
}

export default bindToNuxtApp
