import Vue from 'vue'

export const state = () => ({
  connected: false
})

export const mutations = {
  setConnected (state, connected) {
    Vue.set(state, 'connected', connected)
  }
}

export const actions = {
  connect ({ state, commit, dispatch }) {
    if (!state.connected) {
      const url = new URL(process.env.BASEURL_HOST)
      const path = url.pathname === '/' ? `${url.pathname}socket.io` : `${url.pathname}/socket.io`
      const socket = io(`${url.origin}`, {
        path,
        query: {
          accessToken: localStorage
            .getItem('auth._token.local')
            .split('Bearer ')[1]
        }
      })
      socket.on('connect', () => {
        commit('setConnected', true)
        console.log('CONNECTED 🚀')
      })
      socket.on('disconnect', () => {
        commit('setConnected', false)
        console.log('DISCONNECTED 😥')
      })
      socket.on('new-notification', async (data) => {
        console.log('NEW SOCKET MESSAGE >>>>', data)
        const { type } = data
        switch (type) {
          case 'LOGIN_WITH_QR':
            this.$nuxt.$emit('device-paired')
            break
          case 'INVITE_REQUEST_ACCEPTED':
            commit('client/LOCAL_UPDATE_CLIENT', data.data, { root: true })
            this.$lunaToast.show(`${data.data.firstName} just accepted your invite`)
            break
          case 'PAYMENT_ACCEPTED':
            this.$lunaToast.show(`${data.message}`)
            break
          case 'NEW_PAYMENT_RECEIPT':
            this.$lunaToast.show(`${data.message}`)
            dispatch('invoice/getInvoices')
            break
          case 'STRIPE_CONNECTION_SUCCESSFUL':
            await dispatch('payment-methods/getPaymentMethods', {}, { root: true })
            this.$lunaToast.show('Stripe has just connected successful')
            break
          case 'CALENDAR_SYNC':
            this.$lunaToast.show('Calendar has just synced')
            break
          case 'SESSION_RESCHEDULED':
            this.$lunaToast.show('Session has been Rescheduled')
            break
          default:
            this.$lunaToast.show('You have a new notification')
            break
        }
        dispatch('notifications/fetchNotificationsSummary', {}, { root: true })
      })
    }
  },
  disconnect () {
    console.log('DISCONNECTED 🚀')
  }
}
export const getters = {
  isConnected: (state) => {
    return state.connected
  }
}
