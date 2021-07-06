export const state = () => ({
  invoices: [],
  allInvoicesLoadingLoading: true,
  tempInvoice: {
    date: new Date().toISOString().substring(0, 10),
    services: [],
    totalAmount: null
  }
})

export const mutations = {
  SET_ALL_INVOICES (state, invoices) {
    state.invoices = invoices
  },
  SET_INVOICE_DUE_DATE (state, date) {
    state.tempInvoice.date = date
  },
  SET_INVOICE_SERVICES (state, service) {
    state.tempInvoice.services.push(service)
  }
  // UPDATE_INVOICE (state, newService) {
  //   const pos = newService.position
  //   const service = newService
  //   state.tempInvoice.services[pos] = service
  // }
}

export const actions = {
  createInvoice ({ commit }, payload) {
    console.log('payload sending invoice', payload)
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/invoice`, payload)
      .then((response) => {
        console.log('creating invoice', response)
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
  },
  stripeConnect ({ commit }) {
    return this.$axios
      .$get('https://api.getwelp.co.uk/payments/v0/connect/url?returnurl=http://localhost:3000/Dashboard?stripe=connected')
      .then(({ url }) => {
        return url
      })
  }
}

export const getters = {
  getAllInvoices: state => state.invoices
}
