import SendBird from 'sendbird'

export default ({ app }, inject) => {
  const sb = new SendBird({ appId: process.env.sendBirdAppId })
  inject('sb', sb)
}
