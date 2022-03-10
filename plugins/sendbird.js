import SendBird from 'sendbird'

export default ({ app }, inject) => {
  const sb = new SendBird({ appId: process.env.SENDBIRD_APP_ID })
  inject('sb', sb)
}
