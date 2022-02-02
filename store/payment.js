export const state = () => ({
  accountDetails: {
    bank: {},
    stripe: {}
  }
})

export const mutations = {
  SET_ACCOUNT_DETAILS (state, details) {
    state.accountDetails[details.key] = details.value
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
    } catch (error) {
      throw error
    }
    dispatch('loader/endProcess', null, { root: true })
  },
  async createBankAccount ({ commit }, accountDetails) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await this.$axios
        .$post(`${process.env.PAYMENT_HOST_URL}/bank/account`, accountDetails)
      commit('SET_ACCOUNT_DETAILS', { key: 'bank', value: data })
      return true
    } catch (error) {
      throw error
    }
  },
  async updateBankAccount ({ state, commit }, details) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await this.$axios
        .$patch(`${process.env.PAYMENT_HOST_URL}/payments/bank-account/${state.accountDetails.bank._id}`, details)
      commit('SET_ACCOUNT_DETAILS', data)
    } catch (error) {
      throw error
    }
  }
}

export const getters = {
  isBankConnected: state => Boolean(Object.keys(state.accountDetails.bank).length),
  isStripeConnected: state => Boolean(Object.keys(state.accountDetails.stripe).length),
  bankDetails: state => state.accountDetails.bank.bank
}
