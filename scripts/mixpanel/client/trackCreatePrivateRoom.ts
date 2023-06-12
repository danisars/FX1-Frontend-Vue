import { Context } from '@nuxt/types/app'

export default function(this: Context, { lockerRoom, game }: any) {
  try {
    const { platform, webDisplaySize, model, browser, browserVersion, os } = this.app.$mixpanelClient.getTrackDefaults();
    this.app?.$mixpanel.track('Create Private Room' ,{
      ...{
        sport: (lockerRoom?.Sports && lockerRoom?.Sports.length) ? lockerRoom?.Sports[0].name : game.sport,
        lockerRoomType: 'Event Room',
        league: game.leagueCode?.toUpperCase(),
        name: document.title,
        pageName: 'Event Room',

        homeTeam: game.team1Name ||
                  game.team1DisplayName ||
                  game.team1Nickname ||
                  game.team1Cit,
        awayTeam: game.team2Name ||
                  game.team2DisplayName ||
                  game.team2Nickname ||
                  game.team2Cit,
        platform,
        webDisplaySize,
        model,
        browser,
        browserVersion,
        os,
      }
    })
  } catch (e) {
    console.log(e);
  }
}
