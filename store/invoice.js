export const state = () => ({
  invoices: []
})

export const mutations = {
  // ALL_INVOICES (state, invoices) {
  //   state.invoices = invoices
  // },
  SET_ALL_INVOICES (state, invoices) {
    state.invoices = invoices
  }
}

export const actions = {
  createInvoice ({ commit }, payload) {
    console.log('payload sending invoice', payload)
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/invoice`, payload)
      .then((response) => {
        console.log('creating invoice', response)
        // the response here is data and status: theres status of 'fail' and size:0
        return response
      })
  },
  getAllInvoices ({ commit }) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/invoice?status=draft`)
      .then((response) => {
        console.log('all draft invoices', response)
        commit('SET_ALL_INVOICES', response.data)
        return response.data
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
