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
  async checkConnectedPaymentMethods ({ commit, dispatch }) {
    dispatch('loader/startProcess', null, { root: true })
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await this.$axios.get(
        `${process.env.PAYMENT_HOST_URL}/payment-method`
      )
      if (data.data.length) {
        data.data.forEach((element) => {
          if (element.type === 'bank') {
            commit('SET_ACCOUNT_DETAILS', { key: 'bank', value: element })
          } else if (element.type === 'stripe') {
            commit('SET_ACCOUNT_DETAILS', { key: 'stripe', value: element })
          }
        })
      }
      dispatch('loader/endProcess', null, { root: true })
      return data.data.length
    } catch (error) {
      dispatch('loader/endProcess', null, { root: true })
      return error
    }
  },
  async createBankAccount ({ commit, dispatch }, accountDetails) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.$axios.$post(
        `${process.env.PAYMENT_HOST_URL}/bank-account`,
        accountDetails
      )
      await dispatch('checkConnectedPaymentMethods')
      return true
    } catch (error) {
      return error
    }
  },
  async updateBankAccount ({ state, commit }, details) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await this.$axios.$patch(
        `${process.env.PAYMENT_HOST_URL}/bank-account/${state.accountDetails.bank._id}`,
        details
      )
      commit('SET_ACCOUNT_DETAILS', data)
    } catch (error) {
      return error
    }
  },
  async getPaymentMethods () {
    const res = await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/payment-method`)
    return res.data.map(m => m._id)
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
  },
  async createPaymentReceipt (_, receipt) {
    console.log(receipt)
    await this.$axios.$post(`${process.env.PAYMENT_HOST_URL}/payment-receipt`, receipt)
    return true
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
