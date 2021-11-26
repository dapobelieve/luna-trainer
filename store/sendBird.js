import SendBird from 'sendbird'
export const state = () => ({
  sendbirdConnected: false,
  connectedChannels: new Map(),
  sendbirdChannels: 'not fetching',
  mySendBirdUsers: [],
  tempClient: null,
  connectingToSendBird: true,
  connectingStatus: false,
  latestMessage: {},
  openImage: false,
  imageDetails: null
})

export const mutations = {
  CHANGE_SENDBIRD_CHANNEL_STATUS (state, status) {
    state.sendbirdChannels = status
  },
  CHANGE_SENDBIRD_CONNECTION_STATUS (state, status) {
    state.sendbirdConnected = status
  },
  SET_CURRENT_VIEWING_CLIENT (state, clientSendbirdId) {
    state.tempClient = clientSendbirdId
  },
  LATEST_MESSAGE (state, message) {
    state.latestMessage = message
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
    state.connectedChannels = Object.assign(
      new Map([[channelDetails.channel.url, channelDetails.channel]])
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
  SET_CHANNELS (state, channels) {
    state.connectedChannels = channels
  },
  DISCONNECT_USER_FROM_SENDBIRD (state) {
    state.connectedChannels = new Map()
    state.latestMessage = {}
    state.sendbirdConnected = false
  },
  CONNECTION_ERROR (state, status) {
    state.connectingStatus = status
  },
  CONNECTING_TO_SENDBIRD (state, status) {
    state.connectingToSendBird = status
  }
}

export const actions = {
  // connection
  async connect_to_sb_server_with_userid ({ commit }, sendbirdId) {
    return await this.$sb.connect(sendbirdId, (user, error) => {
      if (error) {
        this.$gwtoast.error('Messaging not connected.')
        return false
      }
      commit('CHANGE_SENDBIRD_CONNECTION_STATUS', true)
      commit('CHANGE_SENDBIRD_CHANNEL_STATUS', 'fetching')
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
        this.$gwtoast.error(`Error getting user status', ${error}`)
      }
    })
    console.log('calling')
    return connectionStatus[0].connectionStatus
  },
  setCurrentViewingClient ({ commit }) {
    commit('SET_CURRENT_VIEWING_CLIENT', {})
  },

  // creation of channels
  async createPrivateChannel ({ commit }, participant) {
    const params = new this.$sb.GroupChannelParams()
    params.isPublic = false
    params.isEphemeral = false
    params.isDistinct = true
    params.isSuper = false
    params.addUserIds([participant])
    params.operatorUserIds = [this.$auth.user.sendbirdId] // Or .operators(Array<User>)

    const channel = await this.$sb.GroupChannel.createChannel(
      params,
      (groupChannel, error) => {
        if (error) {
          this.$gwtoast.error(error.message)
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
          this.$gwtoast.error('Error fetching messages')
          return
        }
        const channels = new Map()
        if (groupChannels.length) {
          groupChannels.forEach((channel) => {
            channels.set(channel.url, channel)
          })
          commit('SET_CHANNELS', channels)
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
          this.$gwtoast.error('Error finding channel')
          return
        }
        await groupChannel.delete((response, error) => {
          if (error) {
            this.$gwtoast.error('Error deleting channel')
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
    if (state.connectedChannels.has(url)) {
      commit('UPDATE_CONNECTED_CHANNEL', messageDetails)
      return
    }
    commit('ADD_NEW_CHANNEL', messageDetails)
  },
  async checkIfConversationExits ({ state, commit }, userId) {
    const channels = await state.connectedChannels
    if (channels.size) {
      return Array.from(state.connectedChannels.values()).find(c =>
        c.members.find(m => m.userId === userId)
      )
    }
    return false
  }
  // markMessageAsRead ({ commit, dispatch }, channel) {
  //   channel.markAsRead()

  //   const channelHandler = new this.$sb.ChannelHandler()
  //   dispatch('listOfConnectedChannels')

  //   channelHandler.onReadReceiptUpdated = (groupChannel) => {
  //     if (channel.url === groupChannel.url) {
  //       console.log('read receipt checked ')
  //       console.log('channel read receipt ', groupChannel)
  //     }
  //   }

  //   this.$sb.addChannelHandler('markMessages', channelHandler)
  // }
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
  getCurrentClient: state => state.tempClient
}
