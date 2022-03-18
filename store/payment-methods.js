import Vue  from "Vue"
export const state = () => ({
  paymentMethods:[]
})

export const mutations = {
  setPaymentMethods(state, data){
    Vue.set(state,'paymentMethods', data)
  }
}

export const actions = {
  async getPaymentMethods ({ commit, dispatch }) {
    const { data } = await this.$axios.get(`${process.env.PAYMENT_HOST_URL}/payment-method`)
    commit('setPaymentMethods', data.data || [])
  },
  async createBankAccount ({ commit,  dispatch }, payload) {
    await this.$axios.post(`${process.env.PAYMENT_HOST_URL}/bank-account`,payload)
    dispatch('getPaymentMethods')
  },
  async updateBankAccount ({ commit, dispatch }, payload) {
    const id = payload._id
    delete payload.__id
    delete payload._id
    delete payload.disabled
    await this.$axios.patch(`${process.env.PAYMENT_HOST_URL}/bank-account/${id}`,payload)
    dispatch('getPaymentMethods')
  },
  async connectToStripe ({ commit, dispatch }) {
    const { data } = await this.$axios.get(`${process.env.PAYMENT_HOST_URL}/stripe/connect/url?returnurl=${process.env.STRIPE_RETURN}`)
    return data.url
  },
  async disconnectFromStripe ({ commit, dispatch }) {
    const { data } = await this.$axios.delete( `${process.env.PAYMENT_HOST_URL}/stripe/disconnect`)
    dispatch('getPaymentMethods')
  },
  async disablePaymentMethod ({ commit, dispatch },id) {
    const { data } = await this.$axios.patch( `${process.env.PAYMENT_HOST_URL}/payment-method/${id}/disable`)
    dispatch('getPaymentMethods')
  },
  async enablePaymentMethod ({ commit, dispatch },id) {
    const { data } = await this.$axios.patch( `${process.env.PAYMENT_HOST_URL}/payment-method/${id}/enable`)
    dispatch('getPaymentMethods')
  },
  async setDefaultPaymentMethod ({ commit, dispatch },id) {
    const { data } = await this.$axios.post( `${process.env.PAYMENT_HOST_URL}/payment-method/default/${id}`)
    dispatch('getPaymentMethods')
  }
}

export const getters = {
  getActivePaymentMethods: state => {
    return state.paymentMethods.filter(paymentMethod => {
      return !paymentMethod.disabled
    })
  },
  hasActivePaymentMethods: state => {
    return state.paymentMethods.some(paymentMethod => {
      return !paymentMethod.disabled && paymentMethod.isDefault
    })
  },
  getAllPaymentMethods: state => {
    return state.paymentMethods
  },

  getBankAccount: state => {
    const bankAccount = state.paymentMethods.find(paymentMethod => paymentMethod.type == "bank") || {
      accountHolderName:'',
      accountHolderType:'individual',
      accountNo:0,
      accountRoutingNo:0,
      accountBankName:''
    }
    return bankAccount.bank ? { ...bankAccount.bank, __id: bankAccount._id } : bankAccount
  },
  getBankAccountPaymentMethod: state => {
    return state.paymentMethods.find(paymentMethod => paymentMethod.type == "bank") 
  },
  getStripePaymentMethod: state => {
    return state.paymentMethods.find(paymentMethod => paymentMethod.type == "stripe")
  } 
}
