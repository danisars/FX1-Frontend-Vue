import { Context } from '@nuxt/types/app'
import UAParser from 'ua-parser-js'

export default function (this: Context) {
  const ua = new UAParser()
  const browser = ua.getBrowser()
  const device = ua.getDevice()
  const os = ua.getOS()

  const capitalize = (str: any) => {
    const lower = str?.toLowerCase()
    return str?.charAt(0)?.toUpperCase() + lower?.slice(1)
  }

  return {
    platform: 'Web',
    webDisplaySize: capitalize(device?.type) || 'Desktop',
    model: device?.model || 'Desktop',
    browser: browser?.name,
    browserVersion: browser?.version,
    os: os?.name,
  }
}
