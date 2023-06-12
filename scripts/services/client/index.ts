import { Context } from '@nuxt/types/app'

import subscribeToTopic from './subscribeToTopic'
import unSubscribeToTopic from './unSubscribeToTopic'

export default function (context: Context) {
  return {
    subscribeToTopic: subscribeToTopic.bind(context),
    unSubscribeToTopic: unSubscribeToTopic.bind(context),
  }
}
