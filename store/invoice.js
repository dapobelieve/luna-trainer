export const state = () => ({
  invoices: []
})

export const mutations = {
  ALL_INVOICES (state, invoices) {
    state.invoices = invoices
  }
}

export const actions = {
  getAllInvoices ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/invoice?status=draft`)
      .then((response) => {
        console.log('all invoices', response)
        // the response here is data and status: theres status of 'fail' and size:0
        return response
      })
  },
  getSingleInvoice ({ commit }, invoiceId) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/invoice/${invoiceId}`)
      .then((response) => {
        console.log('all invoices', response)
        // the response here is data and status: theres status of 'fail' and size:0
        return response
      })
  }
}

export const getters = {
  getAllInvoices: state => state.invoices
}
