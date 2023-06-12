import { Context } from '@nuxt/types/app'

export default function (
  this: Context,
  {
    loginMethod,
    pageName,
  }: {
    loginMethod: string
    pageName: string
  }
) {
  try {
    this.app?.$api.trackLogin({
      ...this.app.$mixpanelClient.getTrackDefaults(),
      ...{
        loginMethod,
        pageName,
      },
    })
  } catch (error) {}
}
