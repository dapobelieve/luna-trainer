export const state = () => ({
  accountDetails: {},
  isBankLinked: false
})

export const mutations = {
  SET_ACCOUNT_DETAILS (state, details) {
    state.accountDetails = details
  },
  SET_BANK_STATUS (state, status) {
    state.isBankLinked = status
  }
}

export const actions = {
  async getPaymentMethods () {
    const res = await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/payment-method`)
    return res.data.map(m => m._id)
  },
  createBankAccount ({ commit }, accountDetails) {
    console.log('sent deatils', accountDetails)
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/payments/bank-account`, accountDetails)
      .then((result) => {
        if (result.status === 'success') {
          commit('SET_BANK_STATUS', result.data)
        }
        return result
      })
  }
}
