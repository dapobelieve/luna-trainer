export const state = () => ({
  accountDetails: {
    bank: {},
    stripe: {}
  },
  selectedDefaultPayment: ''
})

export const mutations = {
  TOGGLE_ACCOUNT_STATE (state, payload) {
    const key = payload.key
    const subKey = payload.subKey
    const value = payload.value
    state.accountDetails[key][subKey] = value
  },
  SET_ACCOUNT_DETAILS (state, details) {
    state.accountDetails[details.key] = details.value
  },
  DISCONNECT_STRIPE (state) {
    state.accountDetails.stripe = {}
  }
}

export const actions = {
  async getPaymentMethods() {
    let res =  await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/payment-method`);
    return res.data.map(m => m._id)
    console.log(res)
  },
  async enablePayment ({ state, commit }, paymentName) {
    try {
      await this.$axios.$patch(
        `${process.env.PAYMENT_HOST_URL}/payment-method/${state.accountDetails[paymentName]._id}/enable`
      )
      commit('TOGGLE_ACCOUNT_STATE', {
        key: [paymentName],
        subKey: 'disabled',
        value: false
      })
    } catch (error) {
      return error
    }
  },
  async disablePayment ({ state, commit }, paymentName) {
    try {
      await this.$axios.$patch(
        `${process.env.PAYMENT_HOST_URL}/payment-method/${state.accountDetails[paymentName]._id}/disable`
      )
      commit('TOGGLE_ACCOUNT_STATE', {
        key: [paymentName],
        subKey: 'disabled',
        value: true
      })
    } catch (error) {
      return error
    }
  }
}

export const getters = {
  isBankConnected: state =>
    Boolean(Object.keys(state.accountDetails.bank).length),
  isStripeConnected: state =>
    Boolean(Object.keys(state.accountDetails.stripe).length),
  bankDetails: state => state.accountDetails.bank.bank,
  stripeDetails: state => state.accountDetails.stripe,
  bankConnectionDetails: state => state.accountDetails.bank
}
