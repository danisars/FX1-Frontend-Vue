import { Context } from '@nuxt/types/app'

export default function(this: Context, { channel, lockerRoom, reply }: any) {
  try {
    const { platform, webDisplaySize, model, browser, browserVersion, os } =
    this.app.$mixpanelClient.getTrackDefaults()
    this.app?.$mixpanel.track('Send Message',{
      ...{
        type: reply ? 'Reply' : 'Original',
        sport: lockerRoom?.Sports?.length ? lockerRoom?.Sports[0].name : null,
        channel: channel?.name || null,
        pageName: 'Channel chat',
        lockerRoomType: lockerRoom?.Club ? 'Club' : lockerRoom?.League?.name ? 'League' : 'FanGroup',
        name: lockerRoom?.Club?.name || lockerRoom?.League?.name || lockerRoom?.FanGroup?.name || null,
        league: lockerRoom?.Club?.leagueName || lockerRoom?.League?.name || null,
        Platform: platform,
        'Web Display Size': webDisplaySize,
        Model: model,
        Browser: browser,
        'Browser Version': browserVersion,
        OS: os,
      }
    })
  } catch (e) {
  }
}