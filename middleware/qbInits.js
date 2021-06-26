/* eslint-disable import/order */
/* eslint-disable import/first */
const QuickBlox = require('quickblox/quickblox.min')
import { QBconfig } from '../QBConfig'
export default ({ store, $axios }) => {
  if (process.client) {
    // initialize quickblox
    QuickBlox.init(
      QBconfig.credentials.appId,
      QBconfig.credentials.authKey,
      QBconfig.credentials.authSecret,
      QBconfig.credentials.accountKey,
      QBconfig.appConfig
    )
    const loginCredentials = {
      login: store.state.qb.qbUser.login,
      password: store.state.qb.qbUser.password
    }
    // create a user session[authorize user]
    QuickBlox.createSession(loginCredentials, function (error, result) {
      if (error) {
        console.log('session error', error)
      }
      if (result) {
        console.log('session connected details', result)
        // connect to chat server
        const userCredentials = {
          userId: store.state.qb.qbUser.id,
          // password: store.state.qb.qbUser.password
          password: 'khkhfshkhshfoihwoifh'
        }
        QuickBlox.chat.connect(userCredentials, function (error) {
          if (error) {
            console.log('chat connect error', error)
            store.commit('qb/SET_QB_ERROR', error)
            QuickBlox.chat.disconnect()
            QuickBlox.destroySession((error) => {
              error ? console.log('Error Destroying Session:', error) : console.log('Session Destroyed successfully')
            })
            // eslint-disable-next-line no-useless-return
            return // exit quickbox init
          } else {
            try {
              // get list of dialogs
              const dialogs = $axios.$get(
                `${process.env.THERAPIST_UI_QB_URL}/dialogs`
              )
              dialogs.then(({ result }) => {
                const arr = []
                result.forEach((element) => {
                  if (element.occupants_ids[0] === store.state.qb.qbUser.id) {
                    arr.push({
                      ...element,
                      opponentFirstName:
                        element.occupants[1][element.occupants_ids[1]].firstName,
                      opponentLastName:
                        element.occupants[1][element.occupants_ids[1]].lastName,
                      opponentImg:
                        element.occupants[1][element.occupants_ids[1]].imageUrl
                    })
                  }
                })
                const arrayToObject = (array, keyField) =>
                  array.reduce((obj, item) => {
                    obj[item[keyField]] = item
                    return obj
                  }, {})

                const dialogs = arrayToObject(arr, '_id')
                store.commit('messages/SET_DIALOGS', dialogs)
                store.commit('auth/setQbStatus', true)
              })
            } catch (error) {
              console.log(error)
            }
            QuickBlox.chat.onMessageListener = function (userId, message) {
              console.log(
                'there is an incoming message. The userId: ',
                userId,
                ' and the message ',
                message
              )
              // new message, update dialog list
              const newMessage = {
                ...message,
                userId,
                last_message_date_sent: message.extension.date_sent
              }
              console.log('updating dialog', newMessage)
              // this.updateDialogs(newMessage)
              store.dispatch('messages/update_message_dialogs', newMessage)
            }
          }
        })
      }
    })

    QuickBlox.chat.onDisconnectedListener = function () {
      console.log('chat disconnected')
    }
    QuickBlox.chat.onReconnectListener = function () {
      console.log('chat reconnected')
    }
  }
}
