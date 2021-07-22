export const state = () => ({
  invoices: [],
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
}

export const actions = {
  createInvoice ({ commit, dispatch }, payload) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/invoice`, payload)
      .then((response) => {
        dispatch('authorize/getUserProfile', null, { root: true })
        return response
      })
  },
  sendInvoice ({ commit }, sendDetails) {
    return this.$axios
      .$post(`${process.env.BASEURL_HOST}/invoice/send/${sendDetails.id}`, { recipients: [sendDetails.recipient] })
      .then((response) => {
        return response
      })
  },
  getInvoices ({ commit, dispatch }) {
    dispatch('loader/startProcess', null, { root: true })
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/invoice`)
      .then((response) => {
        commit('SET_ALL_INVOICES', response.data)
        dispatch('loader/endProcess', '', { root: true })
        return response.data
      }).catch(() => {
        dispatch('loader/endProcess', '', { root: true })
      })
  },
  getSingleInvoice ({ commit }, invoiceId) {
    return this.$axios
      .$get(`${process.env.BASEURL_HOST}/invoice/${invoiceId}`)
      .then((response) => {
        return response
      })
  },
  stripeConnect ({ commit }) {
    return this.$axios
      .$get(`https://api.getwelp.co.uk/payments/v0/connect/url?returnurl=${process.env.stripeReturn}`)
      .then(({ url }) => {
        return url
      })
  }
}

export const getters = {
  getAllinvoices: state => state.invoices,
  getAllDraftInvoices: state =>
    state.invoices.filter(i => i.status === 'draft'),
  getAllPaidInvoices: state =>
    state.invoices.filter(i => i.status === 'paid'),
  getAllSentInvoices: state =>
    state.invoices.filter(i => i.status === 'sent')
}
