import { Context } from '@nuxt/types/app'

export default function (
  this: Context,
  {
    username,
    emailAddress,
    avatar,
    registrationMethod,
    pageName,
    avatarObjectID,
    invited,
  }: {
    username: string
    emailAddress: string
    avatar: string
    registrationMethod: string
    pageName: string
    avatarObjectID: string
    invited: boolean
  }
) {
  try {
    this.app?.$api.trackRegisterAccount({
      ...this.app.$mixpanelClient.getTrackDefaults(),
      ...{
        username,
        emailAddress,
        avatar,
        registrationMethod,
        pageName,
        avatarObjectID,
        invited
      },
    })
  } catch (error) {}
}
