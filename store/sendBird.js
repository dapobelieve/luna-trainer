import SendBird from 'sendbird'
export const state = () => ({
  sbUser: null,
  mySendBirdUsers: [],
  connectedChannels: {},
  connectingStatus: false
})

export const mutations = {
  SET_SB_USER (state, user) {
    state.sbUser = user
  },
  SET_CHANNELS (state, channels) {
    state.connectedChannels = channels
  },
  SET_MY_SENDBIRD_USERS (state, users) {
    state.mySendBirdUsers = users
  },
  DISCONNECT_USER (state) {
    state.sbUser = null
  },
  CONNECTION_ERROR (state, status) {
    state.connectingStatus = status
  }
}

export const actions = {
  async connect_to_sb_server_with_userid ({ commit }, sendbirdId) {
    console.log('sendbord id receiver', sendbirdId)
    commit('CONNECTION_ERROR', false)
    try {
      return await this.$sb.connect(sendbirdId, (user, error) => {
        if (error) {
          // Handle error.
          commit('CONNECTION_ERROR', true)
          return false
        }
        // The user is connected to Sendbird server.
        commit('SET_SB_USER', user)
      })
    } catch (error) {
      commit('CONNECTION_ERROR', true)
      return 'error'
    }
  },
  listOfConnectedChannels ({ commit }) {
    const listQuery = this.$sb.GroupChannel.createMyGroupChannelListQuery()
    listQuery.includeEmpty = true
    listQuery.userIdsIncludeFilter = [this.$auth.user.sendbirdId]
    listQuery.memberStateFilter = 'joined_only'
    listQuery.order = 'latest_last_message' // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
    listQuery.limit = 15

    if (listQuery.hasNext) {
      listQuery.next((groupChannels, error) => {
        if (error) {
          // Handle error.
          console.log('error fetching channels')
        }
        if (groupChannels) {
          console.log('the group channels ', groupChannels)
        }
        // A list of group channels is successfully retrieved.
        // Through the "groupChannels" parameter of the callback function,
        // you can access the data of each group channel from the result list that Sendbird server has passed to the callback function.
        const channels = new Map()
        if (groupChannels.length) {
          groupChannels.forEach((channel) => {
            channels.set(channel.url, channel)
          })
          commit('SET_CHANNELS', channels)
        } else {
          commit('SET_CHANNELS', {})
        }
        console.log('prunned', channels)
      })
    }
  },
  listOfMySendBirdUsers ({ commit }, clients) {
    // let clientIds = []
    // if (clients.length) {
    //   clientIds = clients.map(client => client.sendBirdId)
    // }
    const sb = SendBird.getInstance()
    const listQuery = sb.createApplicationUserListQuery()
    listQuery.userIdsFilter = ['0001', '0002']
    // listQuery.userIdsFilter = clientIds
    listQuery.next((users, error) => {
      if (error) {
        // Handle error.
        console.log('error fetching users', error)
        return
      }
      console.log('users', users)
      commit('SET_MY_SENDBIRD_USERS', users)
    })
  },
  disconnectFromSendbirdServer ({ commit }) {
    this.$sb.disconnect(() => {
    // The current user is disconnected from Sendbird server.
      commit('DISCONNECT_USER')
    })
  }
}

export const getters = {
  connectingToSendbirdServerWithUserStatus: state => state.connectingStatus,
  getUser: id => state => state.mySendBirdUsers.find(u => u.userId === id)
}
