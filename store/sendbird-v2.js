import Vue from 'vue'

export const state = () => ({
  connected: false,
  messages: {},
  latestMessages: {},
  unreadMessagesCount: {},
  connectionStatus: {}
})

export const mutations = {
  addMessage (state, { id, message }) {
    const messages = state.messages[id] || []
    messages.push(message)
    messages.sort((a, b) => a.createdAt - b.createdAt)
    Vue.set(state.messages, id, messages)
  },
  setMessages (state, { id, messages }) {
    Vue.set(state.messages, id, messages)
  },
  setConnected (state, connected) {
    Vue.set(state, 'connected', connected)
  },
  setLatestMessages (state, { message, id }) {
    Vue.set(state.latestMessages, id, message)
  },
  setUnreadMessagesCount (state, { count, id }) {
    Vue.set(state.unreadMessagesCount, id, count)
  },
  setConnectionStatus (state, { id, status }) {
    Vue.set(state.connectionStatus, id, status)
  },
  swapMessage (state, { id, newMessage }) {
    let messages = state.messages[id] || []
    const messageExist = messages && messages.find(message => (message.messageId == newMessage.messageId) || (message.data && message.data == newMessage.data))
    if (messageExist) {
      messages = messages.map(message => (message.messageId == newMessage.messageId) || (message.data && message.data == newMessage.data) ? newMessage : message)
    } else {
      messages.push(newMessage)
      messages.sort((a, b) => a.createdAt - b.createdAt)
    }
    Vue.set(state.messages, id, messages)
  }
}

export const actions = {
  async connect ({ commit, dispatch }, sendbirdId) {
    if (sendbirdId && !this.state.connected) {
      await this.$sb.connect(sendbirdId, async (user, error) => {
        if (error) {
          this.$lunaToast.error('Messaging not connected.')
          commit('setConnected', false)
          return
        }
        commit('setConnected', true)
        console.log('Sendbird is ready 🚀')
      })
    } else {
      console.error('Sendbird id is not defined')
    }
  },
  async createChannelIfNoneExists ({ commit, state, dispatch }, { sender, receipient }) {
    let channel = await dispatch('getChannel', { sender, receipient })
    console.log(channel, 'channel', sender, receipient)
    if (!channel) {
      const params = new this.$sb.GroupChannelParams()
      params.isPublic = false
      params.isEphemeral = false
      params.isDistinct = true
      params.isSuper = false
      params.addUserIds([receipient])
      params.operatorUserIds = [sender]

      channel = await this.$sb.GroupChannel.createChannel(
        params,
        (groupChannel, error) => {
          if (error) {
            this.$lunaToast.error(error.message)
            return error
          }
        }
      )
      console.log('Channel created', channel)
      return channel
    } else {
      return channel
    }
  },
  async getMessages ({ commit }, channel) {
    const messageFilter = new this.$sb.MessageFilter()
    if (channel) {
      if (channel) {
        const startingPoint = Date.now()
        const messageCollectionFetchLimit = 100
        let messageCollection = channel.createMessageCollection()
          .setFilter(messageFilter)
          .setStartingPoint(startingPoint)
          .setLimit(messageCollectionFetchLimit)
          .build()

        messageCollection = messageCollection.initialize(this.$sb.MessageCollection.MessageCollectionInitPolicy.CACHE_AND_REPLACE_BY_API)
        return messageCollection
      }
    }
  },
  async getPrevMessages ({ commit }, collection) {
    if (collection.hasPrevious) {
      // Load the previous messages when the scroll
      // reaches the first message in the chat view.
      const messages = await collection.loadPrevious()
      // console.log('Messages from API: ', messages)
      const id = Object.keys(collection.channel.memberMap).find(key => key !== this.$auth.user.userId)
      messages && messages.forEach((message) => {
        commit('swapMessage', { id, newMessage: message })
      })
    }
  },
  async sendMessage ({ dispatch }, { message, channel, meta }) {
    if (message) {
      if (typeof message === 'string') {
        await dispatch('sendTextMessageToChannel', { text: message, channel })
      } else {
        await dispatch('sendFileMessageToChannel', { file: message, fileBinary: meta, channel })
      }
    }
  },
  async sendTextMessageToChannel ({ commit }, { text, channel }) {
    const params = new this.$sb.UserMessageParams()
    params.data = Date.now() + Math.random().toString(36)
    params.message = text
    params.mentionType = 'users'
    params.pushNotificationDeliveryOption = 'default'

    const id = Object.keys(channel.memberMap).find(key => key !== this.$auth.user.userId)
    const pendingMessage = await channel.sendUserMessage(params, (userMessage, error) => {
      if (error) {
        console.error('Message not sent', error)
        this.$lunaToast.error('Message not sent', error)
      }
      if (userMessage) {
        commit('swapMessage', { id, newMessage: userMessage })
      }
    })
    console.log(pendingMessage, 'pendingMessage')
    commit('addMessage', { id, message: pendingMessage })
  },
  async sendFileMessageToChannel ({ commit }, { file, fileBinary, channel }) {
    const params = new this.$sb.FileMessageParams()
    params.data = Date.now() + Math.random().toString(36)
    params.file = file
    params.fileName = file.name
    params.fileSize = file.size
    params.mentionType = 'users'
    params.pushNotificationDeliveryOption = 'default'

    const id = Object.keys(channel.memberMap).find(key => key !== this.$auth.user.userId)

    const pendingMessage = await channel.sendFileMessage(params, null, (fileMessage, error) => {
      if (error) {
        console.error('Message not sent', error)
        this.$lunaToast.error('Message not sent', error)
      }
      if (fileMessage) {
        commit('swapMessage', { id, newMessage: fileMessage })
      }
    })
    pendingMessage.fileBinary = fileBinary
    commit('addMessage', { id, message: pendingMessage })
  },
  async getChannel ({ }, { sender, receipient }) {
    const listQuery = this.$sb.GroupChannel.createMyGroupChannelListQuery()
    listQuery.includeEmpty = true
    listQuery.userIdsIncludeFilter = [sender, receipient]
    listQuery.memberStateFilter = 'joined_only'
    listQuery.order = 'latest_last_message' // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
    listQuery.limit = 100
    if (listQuery.hasNext) {
      let channel = null
      channel = await listQuery.next((groupChannels, error) => {
        if (error) {
          console.error('Error fetching channels', error)
          return
        }
        return groupChannels[0]
      })

      return channel[0]
    }
  },
  async getChannelsMetadata ({ commit }) {
    const listQuery = this.$sb.GroupChannel.createMyGroupChannelListQuery()
    listQuery.includeEmpty = true
    listQuery.userIdsIncludeFilter = [this.$auth.user.userId]
    listQuery.memberStateFilter = 'joined_only'
    listQuery.order = 'latest_last_message' // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
    listQuery.limit = 10
    if (listQuery.hasNext) {
      await listQuery.next((groupChannels, error) => {
        if (error) {
          console.error('Error fetching channels', error)
          return
        }
        return groupChannels.forEach((channel) => {
          const id = Object.keys(channel.memberMap).find(key => key !== this.$auth.user.userId)
          commit('setLatestMessages', { message: channel.lastMessage, id })
          commit('setUnreadMessagesCount', { count: channel.unreadMessageCount, id })
          channel.members.forEach((member) => {
            if (member.userId !== this.$auth.user.userId) {
              commit('setConnectionStatus', { id: member.userId, status: member.connectionStatus })
            }
          })
        })
      })
    }
  }
}

export const getters = {
  isConnected: (state) => {
    return state.connected
  },
  getMessages: (state) => {
    return state.messages
  },
  getChannelsMetadata: (state) => {
    return state.latestMessages
  },
  getUnreadMessagesCount: (state) => {
    return state.unreadMessagesCount
  },
  getConnectionStatus: (state) => {
    return state.connectionStatus
  }
}
