import QuickBlox from 'quickblox/quickblox.min'
import { QBconfig } from '../qb.config'
export default ({ $axios, store, route }) => {
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
    console.log('qb login Credentials', loginCredentials)

    QuickBlox.createSession(loginCredentials, function (error, result) {
      if (error) {
        console.log('session error', error)
      }
      if (result) {
        if (route.name === 'Dashboard') {
          store.commit('qb/SET_MSG_STATUS', false)
        }
        console.log('session connected details', result)
        // set QBlox object in store
        // store.commit('qb/SET_QB_SESSION', result)
        // store.commit('qb/SET_QB_OBJECT', result)
        // connect to chat server
        const userCredentials = {
          userId: store.state.qb.qbUser.id,
          password: store.state.qb.qbUser.password
        }
        console.log('qb user Credentials', userCredentials)
        QuickBlox.chat.connect(userCredentials, function (error) {
          if (error) {
            console.log('chat connect error', error)
            // set error to be displayed by toast
            store.commit('qb/SET_QB_ERROR', error)
            // disconnect from chat server
            QuickBlox.chat.disconnect()
            // destroy opened session
            QuickBlox.destroySession((error) => {
              error
                ? console.log('Error Destroying Session:', error)
                : console.log('Session Destroyed successfully')
            })
            // eslint-disable-next-line no-useless-return
            return // exit quickbox init
          } else {
            try {
              QuickBlox.chat.dialog.list(function (error, dialogs) {
                if (error) {
                  console.log('if error from QB', error)
                } else if (dialogs) {
                  console.log('dialogs from QB', dialogs)
                }
              })
              // get list of dialogs
              const dialogs = $axios.$get(
              `${process.env.BASEURL_HOST}/qb/dialogs`
              )
              dialogs.then(({ result }) => {
                console.log('dialog results', result)
                // const trainerQbId = store.state.qb.qbUser.id
                // if (result.length) {
                //   const dialogList = new Map()
                //   const occupantsId = []
                //   result.forEach((message) => {
                //     if (message.occupants_ids[1] === trainerQbId) {
                //       occupantsId.push(parseInt(message.occupants_ids[0]))
                //       dialogList.set(message._id, {
                //         ...message,
                //         opponentFirstName: 'noodles',
                //         opponentLastName: 'cuddles'
                //       })
                //     }
                //   })
                //   // set the results in store
                //   store.commit('qb/SET_DIALOGS', dialogList)
                //   // set occupants id in store
                //   store.commit('qb/SET_CHAT_OCCUPANTS_ID', [
                //     ...new Set(occupantsId)
                //   ])
                // }
                const trainerQbId = store.state.qb.qbUser.id
                const arr = []
                // const occupantsId = []
                result.forEach((element) => {
                  if (element.occupants_ids[0] === trainerQbId) {
                    arr.push({
                      ...element,
                      opponentFirstName: element.occupants[1][element.occupants_ids[1]].firstName,
                      opponentLastName: element.occupants[1][element.occupants_ids[1]].lastName
                    })
                  }
                })
                const arrayToObject = (array, keyField) =>
                  array.reduce((obj, item) => {
                    obj[item[keyField]] = item
                    return obj
                  }, {})
                const dialogList = arrayToObject(arr, '_id')
                // set the results in store
                store.commit('qb/SET_DIALOGS', dialogList)
                // set occupants id in store
                // store.commit('qb/SET_CHAT_OCCUPANTS_ID', [
                //   ...new Set(occupantsId)
                // ])
                if (route.name === 'Messages') {
                  store.commit('qb/SET_MSG_STATUS', true)
                }
              })
            } catch (error) {
              console.log('errors from dialog', error)
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
              store.dispatch('qb/update_message_dialogs', newMessage)
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
