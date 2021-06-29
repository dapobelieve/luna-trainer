// import Vue from 'vue'
// import { QBconfig } from '../QBConfig'
// const QuickBlox = require('quickblox/quickblox.min').QuickBlox

// export default ({ $axios, store }) => {
//   const status = store.state.qb.initStatus
//   if (status && process.client) {
//   // initialize quickblox
//     QuickBlox.init(
//       QBconfig.credentials.appId,
//       QBconfig.credentials.authKey,
//       QBconfig.credentials.authSecret,
//       QBconfig.credentials.accountKey,
//       QBconfig.appConfig
//     )
//     const loginCredentials = {
//       login: store.state.qb.qbUser.login || 'user',
//       password: store.state.qb.qbUser.password || 'user'
//     }
//     // create a user session[authorize user]
//     QuickBlox.createSession(loginCredentials, function (error, result) {
//       if (error) {
//         console.log('session error', error)
//       }
//       if (result) {
//         console.log('session connected details', result)
//         // set QBlox object in store
//         // store.commit('qb/SET_QB_SESSION', result)
//         // store.commit('qb/SET_QB_OBJECT', result)
//         // connect to chat server
//         const userCredentials = {
//           userId: store.state.qb.qbUser.id,
//           password: store.state.qb.qbUser.password
//         }
//         QuickBlox.chat.connect(userCredentials, function (error) {
//           if (error) {
//             console.log('chat connect error', error)
//             // set error to be displayed by toast
//             store.commit('qb/SET_QB_ERROR', error)
//             // disconnect from chat server
//             QuickBlox.chat.disconnect()
//             // destroy opened session
//             QuickBlox.destroySession((error) => {
//               error
//                 ? console.log('Error Destroying Session:', error)
//                 : console.log('Session Destroyed successfully')
//             })
//             // eslint-disable-next-line no-useless-return
//             return // exit quickbox init
//           } else {
//             try {
//             // get list of dialogs
//               const dialogs = $axios.$get(
//               `${process.env.BASEURL_HOST}/qb/dialogs`
//               )
//               dialogs.then(({ result }) => {
//                 console.log('dialog results', result)
//                 const trainerQbId = store.state.qb.qbUser.id
//                 if (result.length) {
//                   const dialogList = new Map()
//                   const occupantsId = []
//                   result.forEach((message) => {
//                     if (message.occupants_ids[1] === trainerQbId) {
//                       occupantsId.push(message.occupants_ids[0])
//                       dialogList.set(message._id, {
//                         ...message,
//                         opponentFirstName: 'noodles',
//                         opponentLastName: 'cuddles'
//                       })
//                     }
//                   })
//                   // set the results in store
//                   store.commit('qb/SET_DIALOGS', dialogList)
//                   // set occupants id in store
//                   store.commit('qb/SET_CHAT_OCCUPANTS_ID', [
//                     ...new Set(occupantsId)
//                   ])
//                 }
//               // store.commit('auth/setQbStatus', true)
//               })
//             } catch (error) {
//               console.log('errors from dialog', error)
//             }
//             QuickBlox.chat.onMessageListener = function (userId, message) {
//               console.log(
//                 'there is an incoming message. The userId: ',
//                 userId,
//                 ' and the message ',
//                 message
//               )
//               // new message, update dialog list
//               const newMessage = {
//                 ...message,
//                 userId,
//                 last_message_date_sent: message.extension.date_sent
//               }
//               console.log('updating dialog', newMessage)
//               // this.updateDialogs(newMessage)
//               store.dispatch('qb/update_message_dialogs', newMessage)
//             }
//           }
//         })
//         console.log('QeeBeee', QuickBlox)
//       }
//     })

//     QuickBlox.chat.onDisconnectedListener = function () {
//       console.log('chat disconnected')
//     }
//     QuickBlox.chat.onReconnectListener = function () {
//       console.log('chat reconnected')
//     }
//   }
// }

// Vue.prototype.$quickblox = QuickBlox
