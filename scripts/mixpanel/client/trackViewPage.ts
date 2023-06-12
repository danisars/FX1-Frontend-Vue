import { Context } from '@nuxt/types/app'

export default function (
  this: Context,
  {
    lockerRoom,
    channel,
    pageName,
    isLoggedIn,
  }: { lockerRoom: any; channel: any; pageName: string; isLoggedIn: boolean }
) {
  const { platform, webDisplaySize, model, browser, browserVersion, os } =
    this.app.$mixpanelClient.getTrackDefaults()

  try {
    if (isLoggedIn) {
      if (lockerRoom && channel) {
        this.app?.$api.trackViewPage({
          ...this.app.$mixpanelClient.getTrackDefaults(),
          ...{
            pageName,
            channel: channel?.name || null,
            sport: lockerRoom?.Sports.length
              ? lockerRoom?.Sports[0].name
              : null,
            lockerRoomType: lockerRoom?.Club
              ? 'Club'
              : lockerRoom?.League?.name
              ? 'League'
              : 'FanGroup',
            name:
              lockerRoom?.Club?.name ||
              lockerRoom?.League?.name ||
              lockerRoom?.FanGroup?.name ||
              null,
            league:
              lockerRoom?.Club?.leagueName || lockerRoom?.League?.name || null,
          },
        })
      } else {
        this.app?.$api.trackViewPage({
          ...this.app.$mixpanelClient.getTrackDefaults(),
          ...{ pageName },
        })
      }
    } else if (lockerRoom && channel) {
      this.app?.$mixpanel.track('View Page/Screen', {
        ...{
          Platform: platform,
          'Web Display Size': webDisplaySize,
          Model: model,
          Browser: browser,
          'Browser Version': browserVersion,
          OS: os,
        },
        ...{
          'Page Name': pageName,
          Channel: channel?.name || null,
          Sport: lockerRoom?.Sports.length ? lockerRoom?.Sports[0].name : null,
          'Locker Room Type': lockerRoom?.Club
            ? 'Club'
            : lockerRoom?.League?.name
            ? 'League'
            : 'FanGroup',
          Name:
            lockerRoom?.Club?.name ||
            lockerRoom?.League?.name ||
            lockerRoom?.FanGroup?.name ||
            null,
          League:
            lockerRoom?.Club?.leagueName || lockerRoom?.League?.name || null,
        },
      })
    } else {
      this.app?.$mixpanel.track('View Page/Screen', {
        ...{
          'Page Name': pageName,
          Platform: platform,
          'Web Display Size': webDisplaySize,
          Model: model,
          Browser: browser,
          'Browser Version': browserVersion,
          OS: os,
        },
      })
    }
  } catch (error) {}
}
