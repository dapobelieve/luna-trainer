import Vue from 'vue'
export const state = () => ({
  paymentMethods: []
})

export const mutations = {
  setPaymentMethods (state, data) {
    Vue.set(state, 'paymentMethods', data)
  }
}

export const actions = {
  async markAsPaid ({ dispatch }, receipt) {
    const res = await this.$axios.$post(`${process.env.PAYMENT_HOST_URL}/payment-receipt/confirm`, receipt)
    await dispatch('invoice/getInvoices', null, { root: true })
    return res
  },
  async markAsUnPaid ({ dispatch }, payload) {
    const res = await this.$axios.$put(`${process.env.PAYMENT_HOST_URL}/payment-receipt/${payload.id}/cancel`)
    await dispatch('invoice/getInvoices', null, { root: true })
    return res
  },
  async getPaymentMethods ({ commit, dispatch }) {
    const { data } = await this.$axios.get(`${process.env.PAYMENT_HOST_URL}/payment-method`)
    commit('setPaymentMethods', data.data || [])
  },
  async createBankAccount ({ commit, dispatch }, payload) {
    await this.$axios.post(`${process.env.PAYMENT_HOST_URL}/bank-account`, payload)
    dispatch('getPaymentMethods')
  },
  async updateBankAccount ({ commit, dispatch }, payload) {
    const id = payload._id
    delete payload._id
    delete payload.disabled
    await this.$axios.patch(`${process.env.PAYMENT_HOST_URL}/bank-account/${id}`, payload)
    dispatch('getPaymentMethods')
  },
  async connectToStripe ({ commit, dispatch }, redirectUrl) {
    const { data } = await this.$axios.get(`${process.env.PAYMENT_HOST_URL}/stripe/connect/url?returnurl=${redirectUrl}`)
    if (!data.url) { throw new Error(data) }
    return data.url
  },
  async disconnectFromStripe ({ commit, dispatch }) {
    const { data } = await this.$axios.delete(`${process.env.PAYMENT_HOST_URL}/stripe/disconnect`)
    dispatch('getPaymentMethods')
  },
  async disablePaymentMethod ({ commit, dispatch }, id) {
    const { data } = await this.$axios.patch(`${process.env.PAYMENT_HOST_URL}/payment-method/${id}/disable`)
    dispatch('getPaymentMethods')
  },
  async enablePaymentMethod ({ commit, dispatch }, id) {
    const { data } = await this.$axios.patch(`${process.env.PAYMENT_HOST_URL}/payment-method/${id}/enable`)
    dispatch('getPaymentMethods')
  },
  async setDefaultPaymentMethod ({ commit, dispatch }, id) {
    const { data } = await this.$axios.post(`${process.env.PAYMENT_HOST_URL}/payment-method/default/${id}`)
    dispatch('getPaymentMethods')
  }
}

export const getters = {
  getActivePaymentMethods: (state) => {
    return state.paymentMethods.filter((paymentMethod) => {
      return !paymentMethod.disabled
    })
  },
  hasActivePaymentMethods: (state) => {
    return state.paymentMethods.some((paymentMethod) => {
      return !paymentMethod.disabled && paymentMethod.isDefault
    })
  },
  getAllPaymentMethods: (state) => {
    return state.paymentMethods
  },

  getBankAccount: (state) => {
    const bankAccount = state.paymentMethods.find(paymentMethod => paymentMethod.type == 'bank') || {
      accountHolderName: '',
      accountNo: '',
      sortCode: '',
      accountBankName: ''
    }
    return bankAccount.bank ? bankAccount.bank : bankAccount
  },
  getBankAccountPaymentMethod: (state) => {
    return state.paymentMethods.find(paymentMethod => paymentMethod.type == 'bank') || {}
  },
  getStripePaymentMethod: (state) => {
    return state.paymentMethods.find(paymentMethod => paymentMethod.type == 'stripe') || {}
  },
  getDefaultPaymentMethod: (state) => {
    return state.paymentMethods.find(paymentMethod => paymentMethod.isDefault)
  }
}
