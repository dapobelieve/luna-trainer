export const state = () => ({
  qbUser: null,
  qbBloxError: {},
  messageDialogs: {},
  latestChatEntry: {},
  occupantsWithChatIds: [],
  QBObject: {},
  QBSession: {},
  statusForMessaging: false
})

export const mutations = {
  SET_MSG_STATUS (state, status) {
    state.statusForMessaging = status
  },
  SET_QB_OBJECT (state, qbObj) {
    state.QBObject = qbObj
  },
  SET_QB_SESSION (state, session) {
    state.QBSession = session
  },
  SET_DIALOGS (state, payload) {
    state.messageDialogs = payload
  },
  SET_CHAT_OCCUPANTS_ID (state, ids) {
    state.occupantsWithChatIds = ids
  },
  ADD_NEW_DIALOG (state, dialog) {
    state.messageDialogs = Object.assign({}, state.messageDialogs, {
      [dialog._id]: dialog
    })
  },
  UPDATE_MESSAGE_DIALOGS (state, message) {
    state.messageDialogs[message.dialog_id] = message
    state.latestChatEntry = message
  },
  // eslint-disable-next-line camelcase
  CLEAR_MESSAGE_COUNT (state, dialog_id) {
    console.log('incoming dialog id', dialog_id)
    state.messageDialogs[dialog_id].unread_messages_count = 0
  },
  SET_QB_USER (state, details) {
    state.qbUser = details
  },
  SET_QB_ERROR (state, error) {
    state.qbBloxError = error
  }
}

export const actions = {
  clearQbUserAndDialogs ({ commit }) {
    // for local storage force clearing
    commit('SET_QB_USER', null)
    commit('SET_DIALOGS', {})
    commit('UPDATE_MESSAGE_DIALOGS', {})
  },
  getQbInfo ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/qb`)
      .then((response) => {
        console.log('qb', response)
        if (response.success === true) {
          commit('SET_QB_USER', response.result)
        }
        return response
      })
  },
  update_message_dialogs ({ state, commit, rootState }, message) {
    if (
      state.messageDialogs[message.dialog_id] &&
             message.dialog_id === state.messageDialogs[message.dialog_id]._id
    ) {
      let count =
               state.messageDialogs[message.dialog_id].unread_messages_count
      console.log('old dialog updating')
      const msg = {
        ...state.messageDialogs[message.dialog_id],
        ...message,
        ...{
          unread_messages_count: ++count
        }
      }
      commit('UPDATE_MESSAGE_DIALOGS', msg)
    } else {
      console.log('new dialog updating')
      try {
        const dialogs = this.$axios.$get(
                 `${process.env.BASEURL_HOST}/qb/dialogs`
        )
        dialogs
          .then(({ result }) => {
            console.log('newly updating', result)
            const arr = []
            result.forEach((element) => {
              console.log('element', element)
              console.log('element id', element.occupants_ids[0])
              console.log('root id', rootState.qb.qbUser.id)
              if (element.occupants_ids[0] === rootState.qb.qbUser.id) {
                arr.push({
                  ...element,
                  opponentFirstName: 'noodles',
                  opponentLastName: 'cuddles'
                })
              }
            })
            console.log('arrred', arr)
            const arrayToObject = (array, keyField) =>
              array.reduce((obj, item) => {
                obj[item[keyField]] = item
                return obj
              }, {})

            const dialogs = arrayToObject(arr, '_id')
            const particularDialog = dialogs[message.dialog_id]
            const msgDialog = message.dialog_id
            console.log(
              'particular dialog',
              particularDialog,
              ' and the dialog id ',
              msgDialog
            )
            commit('ADD_NEW_DIALOG', particularDialog)
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export const getters = {
  getQbError: state => state.qbBloxError,
  getOccupantsId: state => state.occupantsWithChatIds,
  getTotalUnreadMessages: (state) => {
    const unread = []
    for (const value of Object.values(state.messageDialogs)) {
      if (value.unread_messages_count) {
        unread.push(value)
      }
    }
    return unread.sort((a, b) => {
      return b.last_message_date_sent - a.last_message_date_sent
    }).slice(0, 5)
  },
  getMessageCount: state => dialogId =>
    state.messageDialogs[dialogId].unread_messages_count
}
