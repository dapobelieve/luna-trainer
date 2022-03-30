import SendBird from 'sendbird'
export const state = () => ({
  sendbirdConnected: false,
  connectedChannels: new Map(),
  fetchingMessages: true,
  connectingStatus: false,
  openImage: false,
  imageDetails: null,
  msgHistory: []
})

export const mutations = {
  SET_STATES (state, data) {
    // eslint-disable-next-line array-callback-return
    Object.keys(data).map((key) => {
      state[key] = data[key]
    })
  },
  DELETE_CHANNEL_LOCALLY (state, channelUrl) {
    state.connectedChannels.delete(channelUrl)
  },
  VIEW_IMAGE (state, payload) {
    const { imageDetails } = payload
    const { status } = payload
    state.imageDetails = imageDetails
    state.openImage = status
  },

  // messages
  ADD_NEW_CHANNEL (state, channelDetails) {
    if (state.connectedChannels.size) {
      state.connectedChannels = Object.assign(
        new Map([
          ...state.connectedChannels,
          [channelDetails.channel.url, channelDetails.channel]
        ])
      )
      return
    }
    state.connectedChannels = Object.assign(
      new Map([
        [channelDetails.channel.url, channelDetails.channel]
      ])
    )
  },
  UPDATE_CONNECTED_CHANNEL (state, msgDetails) {
    state.connectedChannels = Object.assign(
      new Map([
        ...state.connectedChannels,
        [msgDetails.channel.url, msgDetails.channel]
      ])
    )
  },
  DISCONNECT_USER_FROM_SENDBIRD (state) {
    state.connectedChannels = new Map()
    state.sendbirdConnected = false
  },
  CONNECTION_ERROR (state, status) {
    state.connectingStatus = status
  },
  REMOVE_MARKED_MESSAGE (state, channelUrl) {
    const channel = state.connectedChannels.get(channelUrl)
    channel.unreadMessageCount = 0
    state.connectedChannels = Object.assign(
      new Map([
        ...state.connectedChannels,
        [channel.url, channel]
      ])
    )
  }
}

export const actions = {
  async connectToSBWithUserid ({ commit }, sendbirdId) {
    return await this.$sb.connect(sendbirdId, (user, error) => {
      if (error) {
        this.$lunaToast.error('Messaging not connected.')
        return false
      }
      commit('SET_STATES', { sendbirdConnected: true })
    })
  },

  disconnectFromSendbirdServer ({ commit }) {
    this.$sb.disconnect(() => commit('DISCONNECT_USER_FROM_SENDBIRD'))
  },

  async isUserOnline ({ commit }, ids) {
    const sb = SendBird.getInstance()
    const listQuery = sb.createApplicationUserListQuery()
    listQuery.userIdsFilter = ids

    const connectionStatus = await listQuery.next((users, error) => {
      if (error) {
        this.$lunaToast.error(`Error getting user status', ${error}`)
      }
    })
    return connectionStatus[0].connectionStatus
  },

  // creation of channels
  async createPrivateChannel ({ commit }, participant) {
    const params = new this.$sb.GroupChannelParams()
    params.isPublic = false
    params.isEphemeral = false
    params.isDistinct = true
    params.isSuper = false
    params.addUserIds([participant])
    params.operatorUserIds = [this.$auth.user.sendbirdId]

    const channel = await this.$sb.GroupChannel.createChannel(
      params,
      (groupChannel, error) => {
        if (error) {
          this.$lunaToast.error(error.message)
          return error
        }
        if (groupChannel) {
          commit('ADD_NEW_CHANNEL', { channel: groupChannel })
        }
      }
    )

    return channel
  },

  async listOfConnectedChannels ({ commit }) {
    const listQuery = this.$sb.GroupChannel.createMyGroupChannelListQuery()
    listQuery.includeEmpty = true
    listQuery.userIdsIncludeFilter = [this.$auth.user.sendbirdId]
    listQuery.memberStateFilter = 'joined_only'
    listQuery.order = 'latest_last_message' // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
    listQuery.limit = 100

    if (listQuery.hasNext) {
      await listQuery.next((groupChannels, error) => {
        if (error) {
          this.$lunaToast.error('Error fetching messages')
          return
        }
        const channels = new Map()
        if (groupChannels.length) {
          groupChannels.forEach((channel) => {
            channels.set(channel.url, channel)
          })
          commit('SET_STATES', { connectedChannels: channels })
        }
      })
    }
  },

  async deleteChannel ({ commit }, CHANNEL_URL) {
    await this.$sb.GroupChannel.getChannel(
      CHANNEL_URL,
      async (groupChannel, error) => {
        // get channel
        if (error) {
          this.$lunaToast.error('Error finding channel')
          return
        }
        await groupChannel.delete((response, error) => {
          if (error) {
            this.$lunaToast.error('Error deleting channel')
            return
          }
          commit('DELETE_CHANNEL_LOCALLY', CHANNEL_URL)
        })
      }
    )
  },

  // messages
  newMessageReceived ({ state, commit }, messageDetails) {
    const { url } = messageDetails.channel
    if (state.connectedChannels.size && state.connectedChannels.has(url)) {
      commit('UPDATE_CONNECTED_CHANNEL', messageDetails)
      return
    }
    commit('ADD_NEW_CHANNEL', messageDetails)
  },

  async checkIfConversationExits ({ state, dispatch, commit }, userId) {
    await dispatch('listOfConnectedChannels', '', { root: false })
    const channels = state.connectedChannels
    if (channels.size) {
      const channel = Array.from(state.connectedChannels.values()).find(c =>
        c.memberMap[userId]
      )
      return channel
    }
    return false
  },

  markMessageAsRead ({ commit, dispatch }, channel) {
    channel.markAsRead()
    commit('REMOVE_MARKED_MESSAGE', channel.url)
  }
}

export const getters = {
  connectingToSendbirdServerWithUserStatus: state => state.connectingStatus,

  getUnreadMessages: (state, getters, rootState) => {
    const unread = []
    if (state.connectedChannels.size) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of state.connectedChannels.entries()) {
        if (
          value.unreadMessageCount &&
          value.lastMessage._sender.userId !== rootState.auth.user.sendbirdId
        ) {
          unread.push(value)
        }
      }
      return unread
    }
    return []
  },

  getCurrentClient: state => state.tempClient,
  listOfChannels: (state) => {
    if (state.connectedChannels.size) {
      const a = Array.from(state.connectedChannels.values())
      return a.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }
    return []
  }
}
