import { Context } from '@nuxt/types/app'

import getTrackDefaults from './getTrackDefaults'
import trackViewPage from './trackViewPage'
import trackRegisterAccount from './trackRegisterAccount'
import trackSendMessage from './trackSendMessage'
import eventRoomtrackSendMessage from './eventRoomTrackSendMessage'
import trackLogin from './trackLogin'
import trackSupport from './trackSupport'
import trackUnSupport from './trackUnSupport'
import trackViewPageonLogout from './trackViewPageonLogout'
import trackCreatePrivateRoom from './trackCreatePrivateRoom'

export default function (context: Context) {
  return {
    getTrackDefaults: getTrackDefaults.bind(context),
    trackViewPage: trackViewPage.bind(context),
    trackRegisterAccount: trackRegisterAccount.bind(context),
    trackSendMessage: trackSendMessage.bind(context),
    eventRoomtrackSendMessage: eventRoomtrackSendMessage.bind(context),
    trackLogin: trackLogin.bind(context),
    trackSupport: trackSupport.bind(context),
    trackUnSupport: trackUnSupport.bind(context),
    trackViewPageonLogout: trackViewPageonLogout.bind(context),
    trackCreatePrivateRoom: trackCreatePrivateRoom.bind(context),
  }
}
