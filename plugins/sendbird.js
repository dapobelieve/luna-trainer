import SendBird from 'sendbird'

export default ({ app }, inject) => {
  const sb = new SendBird({ appId: process.env.SENDBIRD_APP_ID, localCacheEnabled: true })
  inject('sb', sb)
}
