import { Context } from '@nuxt/types/app'

export default function(this: Context, { lockerRoom, pageName }: any) {
  this.app?.$api.trackUnsupportLockerRoom({
    ...this.app.$mixpanelClient.getTrackDefaults(),
    ...{
      sport: lockerRoom?.Sports.length ? lockerRoom?.Sports[0].name : null,
      name:
        lockerRoom?.Club?.name ||
        lockerRoom?.League?.name ||
        lockerRoom?.FanGroup?.name ||
        null,
      league: lockerRoom?.Club?.leagueName || lockerRoom?.League?.name || null,
      lockerRoomType: lockerRoom?.Club ? 'Club' : lockerRoom?.League?.name ? 'League' : 'FanGroup',
      pageName
    }
  })
}
