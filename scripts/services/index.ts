import { Context } from '@nuxt/types/app'
import fireMessBindToContext from './client'


const FireMessBindToNuxtApp = function (context: Context) {
  return {
    fireMess: fireMessBindToContext(context),
  }
}

export default FireMessBindToNuxtApp
