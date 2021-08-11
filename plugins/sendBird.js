import SendBird from 'sendbird'

export default ({ app }, inject) => {
  const sb = new SendBird({})
  inject('sb', sb)
}
