import SendBird from 'sendbird'
export const state = () => ({
  sbUser: null,
  mySendBirdUsers: [],
  tempClient: null,
  connectedChannels: new Map(),
  connectingStatus: false,
  latestMessage: {},
  isUserOnline: false
})

export const mutations = {
  SET_CURRENT_VIEWING_CLIENT (state, clientSendbirdId) {
    state.tempClient = clientSendbirdId
  },
  SET_AVAILABILITY_STATUS (state, status) {
    state.isUserOnline = status
  },
  LATEST_MESSAGE (state, message) {
    state.latestMessage = message
  },
  ADD_CHANNEL (state, channel) {
    state.connectedChannels = Object.assign(
      new Map([[channel.channel.url, channel.channel]])
    )
  },
  UPDATE_CONNECTED_CHANNEL (state, channel) {
    state.connectedChannels = Object.assign(
      new Map([
        ...state.connectedChannels,
        [channel.channel.url, channel.channel]
      ])
    )
  },
  SET_SB_USER (state, user) {
    state.sbUser = user
  },
  SET_CHANNELS (state, channels) {
    state.connectedChannels = channels
  },
  DISCONNECT_USER (state) {
    state.sbUser = null
    state.connectedChannels = new Map()
    state.latestMessage = {}
    state.isUserOnline = false
  },
  CONNECTION_ERROR (state, status) {
    state.connectingStatus = status
  }
}

export const actions = {
  markMessageAsRead ({ commit, dispatch }, channel) {
    // Call the 'markAsRead()' when the current user views unread messages in a group channel.
    channel.markAsRead()

    // To listen to an update from all the other channel members' client apps, implement the onReadReceiptUpdated() with things to do when notified.
    const channelHandler = new this.$sb.ChannelHandler()
    dispatch('listOfConnectedChannels')

    channelHandler.onReadReceiptUpdated = (groupChannel) => {
      if (channel.url === groupChannel.url) {
        // For example, code for redrawing a channel view.
        console.log('read receipt checked ')
      }
    }

    this.$sb.addChannelHandler('markMessages', channelHandler)
  },
  isUserOnline ({ commit }, id) {
    const sb = SendBird.getInstance()
    const listQuery = sb.createApplicationUserListQuery()
    listQuery.userIdsFilter = [id]

    listQuery.next((users, error) => {
      if (error) {
        // Handle error.
        console.log('error checking online status', error)
        return
      }
      commit('SET_AVAILABILITY_STATUS', users[0].connectionStatus)
    })
  },
  addNewChannel ({ commit }, msg) {
    commit('ADD_CHANNEL', msg)
  },
  updateConnectedChannels ({ state, commit }, msg) {
    if (
      state.connectedChannels.size &&
      state.connectedChannels.has(msg.channel.url)
    ) {
      commit('UPDATE_CONNECTED_CHANNEL', msg)
    } else if (
      state.connectedChannels.size &&
      !state.connectedChannels.has(msg.channel.url)
    ) {
      commit('UPDATE_CONNECTED_CHANNEL', msg)
    }
  },
  async connect_to_sb_server_with_userid ({ commit, dispatch }, sendbirdId) {
    try {
      return await this.$sb.connect(sendbirdId, (user, error) => {
        if (error) {
          // Handle error.
          commit('CONNECTION_ERROR', true)
          return false
        }
        // The user is connected to Sendbird server.
        commit('SET_SB_USER', user)
        dispatch('listOfConnectedChannels')
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
          console.log('error fetching connected channels', error)
        }
        const channels = new Map()
        if (groupChannels.length) {
          groupChannels.forEach((channel) => {
            channels.set(channel.url, channel)
          })
          commit('SET_CHANNELS', channels)
        } else {
          commit('SET_CHANNELS', {})
        }
      })
    }
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
  getUser: id => state => state.mySendBirdUsers.find(u => u.userId === id),
  getUnreadMessages: (state) => {
    const unread = []
    if (state.connectedChannels.size) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of state.connectedChannels.entries()) {
        if (value.unreadMessageCount) {
          unread.push(value)
        }
      }
      return unread
    }
    return []
  },
  getUserUnreadMessageCount: (state, getters) => (id) => {
    if (getters.getUnreadMessages.length) {
      return getters.getUnreadMessages.find(m =>
        m.members.find(m => m.userId === id)
      )
    }
  },
  isUserOnline: state => state.isUserOnline,
  getCurrentClient: state => state.tempClient
}
