import QuickBlox from 'quickblox/quickblox.min'
import { QBconfig } from '../qb.config'

QuickBlox.init(
  QBconfig.credentials.appId,
  QBconfig.credentials.authKey,
  QBconfig.credentials.authSecret,
  QBconfig.credentials.accountKey,
  QBconfig.appConfig
)

export default ({ app }, inject) => {
  inject('quickblox', QuickBlox)
}
