export const state = () => ({
  qbUser: null,
  allChatUsers: [],
  messageDialogs: {},
  latestChatEntry: {},
  statusForMessaging: false
})

export const mutations = {
  SET_OPEN_CHAT_USERS (state, users) {
    state.allChatUsers = users
  },
  SET_MSG_STATUS (state, status) {
    state.statusForMessaging = status
  },
  SET_DIALOGS (state, payload) {
    state.messageDialogs = payload
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
  }
}

export const actions = {
  clearQbUserAndDialogs ({ commit }) {
    // for local storage force clearing
    commit('SET_QB_USER', null)
    commit('SET_DIALOGS', {})
    commit('UPDATE_MESSAGE_DIALOGS', {})
    commit('SET_OPEN_CHAT_USERS', [])
  },
  createQbSession ({ commit, dispatch, state }) {
    const params = { login: state.qbUser.login, password: state.qbUser.password }
    this.$quickblox.createSession(params, (error, result) => {
      if (error) {
        console.log('error creating qb session', error)
        return error
      }
      console.log('result creating session', result)
      if (result) {
        dispatch('connectQbChatServer')
        dispatch('fetchQbDialogs')
      }
      return result
    })
  },
  getQbSession ({ commit, dispatch }) {
    this.$quickblox.getSession((error, session) => {
      if (this.$auth.loggedIn && error) {
        console.log('sesh error', error)
        dispatch('createQbSession')
      } else if (this.$auth.loggedIn && session) {
        dispatch('connectQbChatServer')
      }
    })
  },
  connectQbChatServer ({ commit, dispatch, state }) {
    const userCredentials = {
      userId: state.qbUser.id,
      password: state.qbUser.password
    }

    this.$quickblox.chat.connect(userCredentials, (error) => {
      if (error && error.code === 422) {
        console.log('error connecting to chat server', error)
        setTimeout(() => {
          dispatch('connectQbChatServer')
        }, 3000)
      }
    })
  },
  fetchQbDialogs ({ commit, state }) {
    try {
      // get list of dialogs
      const dialogs = this.$axios.$get(`${process.env.BASEURL_HOST}/qb/dialogs`)
      dialogs.then(({ result }) => {
        const trainerQbId = state.qbUser.id
        const arr = []
        const occupantsId = []
        result.forEach((element) => {
          if (element.occupants_ids[0] === trainerQbId) {
            occupantsId.push(element.occupants_ids[1])
            arr.push({
              ...element,
              opponentFirstName:
                element.occupants[1][element.occupants_ids[1]].firstName,
              opponentLastName:
                element.occupants[1][element.occupants_ids[1]].lastName
            })
          }
        })
        const arrayToObject = (array, keyField) =>
          array.reduce((obj, item) => {
            obj[item[keyField]] = item
            return obj
          }, {})
        const dialogList = arrayToObject(arr, '_id')
        // set the results
        commit('SET_DIALOGS', dialogList)
        // set occupants id
        commit('SET_OPEN_CHAT_USERS', [
          ...new Set(occupantsId)
        ])
      })
    } catch (error) {
      console.log(error)
    }
  },
  fetchSingleUserDialog ({ commit }, userId) {
    return this.$axios
      .$get(
        `${process.env.BASEURL_HOST}/qb/dialogs?userId=${userId}`
      )
      .then(({ result }) => {
        return result
      })
  },
  getQbInfo ({ commit, dispatch }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/qb`)
      .then((response) => {
        if (response.success === true) {
          commit('SET_QB_USER', response.result)
          dispatch('getQbSession')
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
            const qbUsers = []
            result.forEach((element) => {
              if (element.occupants_ids[0] === rootState.qb.qbUser.id) {
                qbUsers.push(element.occupants_ids[1])
                arr.push({
                  ...element,
                  opponentFirstName:
                    element.occupants[1][element.occupants_ids[1]].firstName,
                  opponentLastName:
                    element.occupants[1][element.occupants_ids[1]].lastName
                })
              }
            })
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
            commit('SET_OPEN_CHAT_USERS', qbUsers)
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
