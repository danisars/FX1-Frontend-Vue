// @ts-ignore
import { Mixpanel } from 'mixpanel-browser'
import MixPanelBindToNuxtApp from '~/scripts/mixpanel/client'
import FireMessBindToNuxtApp from '~/scripts/services/client'


declare module 'vue/types/vue' {
  interface Vue {
    $mixpanelClient: ReturnType<typeof MixPanelBindToNuxtApp>,
    $mixpanel: Mixpanel,
    $fireMess:  ReturnType<typeof FireMessBindToNuxtApp>,
  }
  interface VueConstructor {
    $mixpanel: any,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $mixpanelClient: any,
    $mixpanel: any,
    $fireMess: any
  }
}
