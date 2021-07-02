export const state = () => ({
  paymentDetails: {}
})

export const mutations = {

}

export const actions = {
  async createBankAccount (paymentDetails) {
    try {
      return await this.$axios.$post(
        `${process.env.BASEURL_HOST}/payments/bank-account`,
        paymentDetails
      )
    } catch (error) {}
  }
}
