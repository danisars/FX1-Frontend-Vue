import { Context } from '@nuxt/types/app'

export default function (this: Context, { pageName }: { pageName: string }) {
  try {
    this.app?.$mixpanel.track('View Page/Screen', {
      ...this.app.$mixpanelClient.getTrackDefaults(),
      ...{ pageName },
    })
  } catch (error) {}
}
