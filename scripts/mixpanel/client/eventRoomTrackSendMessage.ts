import { Context } from '@nuxt/types/app'

export default function(this: Context, { lockerRoom,game, reply }: any) {
  try {
    const { platform, webDisplaySize, model, browser, browserVersion, os } = this.app.$mixpanelClient.getTrackDefaults();
    this.app?.$mixpanel.track('Send Message',{
      ...{
        type: reply ? 'Reply' : 'Original',
        sport: (lockerRoom?.Sports && lockerRoom?.Sports.length) ? lockerRoom?.Sports[0].name : game.sport,
        channel: lockerRoom?.ChannelGroups[0].name || null,
        pageName: document.title,
        lockerRoomType: 'Event Room',
        name: document.title,
        HomeTeam: game.team1Name,
        AwayTeam: game.team2Name,
        league: game.leagueCode?.toUpperCase(),
        Platform: platform,
        'Web Display Size': webDisplaySize,
        Model: model,
        Browser: browser,
        'Browser Version': browserVersion,
        OS: os,
      }
    })
  } catch (e) {
    console.log(e);
  }
}
