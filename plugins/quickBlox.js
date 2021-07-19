import QuickBlox from 'quickblox/quickblox.min'
// import Vue from 'vue'
import { QBconfig } from '../qb.config'

export default async ({ app }, inject) => {
  await QuickBlox.init(
    QBconfig.credentials.appId,
    QBconfig.credentials.authKey,
    QBconfig.credentials.authSecret,
    QBconfig.credentials.accountKey,
    QBconfig.appConfig
  )

  inject('quickblox', QuickBlox)
}
// Vue.prototype.$quickblox = QuickBlox
