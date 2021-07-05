export const state = () => ({
  accountDetails: {}
})

export const mutations = {
  SET_ACCOUNT_DETAILS (state, details) {
    state.accountDetails = details
  }
}

export const actions = {
  createBankAccount ({ commit }, accountDetails) {
    console.log('sent deatils', accountDetails)
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/payments/bank-account`, {
        accountHolderName: 'Maison Armani',
        accountHolderType: 'individual',
        accountNo: '00012345',
        accountRoutingNo: '108800',
        accountbankName: 'Last Bank'
      })
      .then((result) => {
        console.log('result from putting bank', result)
      })
      .catch((err) => {
        console.log('e no sett', err)
      })
  }
}
