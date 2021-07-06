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
  createBankAccount ({ commit }, accountDetails) {
    console.log('sent deatils', accountDetails)
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/payments/bank-account`, accountDetails)
      .then((result) => {
        console.log('result from putting bank', result)
        if (result.status === 'success') {
          commit('SET_BANK_STATUS', result.data)
        }
        return result
      })
  }
}
