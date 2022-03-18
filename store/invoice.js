const queryString = require('querystring')

export const state = () => ({
  invoices: [],
  invoiceCount: 0,
  isLoading: false
})

export const mutations = {
  SET_ALL_INVOICES (state, invoices) {
    state.invoices = invoices.data
    state.invoiceCount = invoices.size
  },
  IS_LOADING (state, loadingStatus) {
    state.isLoading = loadingStatus
  }
}

export const actions = {
  async getFetchCustomerInvoice ({ commit }, payload) {
    const q = {
      status: '',
      workflowStatus: 'sent',
      limit: 10,
      page: 1
    }
    const newQueryObj = queryString.stringify({ ...q, ...payload })
    return await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/invoice?${newQueryObj}`)
  },
  fetchInvoiceWithStatusAndLimit ({ commit }, payload) {
    const stat =
      payload !== undefined && 'status' in payload ? payload.status : ''
    const currPage =
      payload !== undefined && 'page' in payload ? payload.page : 1
    const limit =
      payload !== undefined && 'limit' in payload ? payload.limit : 10
    commit('IS_LOADING', true)
    return this.$axios
      .$get(
        `${process.env.PAYMENT_HOST_URL}/invoice${
          stat ? `?status=${stat}&` : '?'
        }limit=${limit}&page=${currPage}`
      )
      .then((response) => {
        commit('IS_LOADING', false)
        return response.data
      })
  },
  async createInvoice ({ commit, dispatch }, payload) {
    const res = await this.$axios.$post(`${process.env.PAYMENT_HOST_URL}/invoice`, payload)
    dispatch('profile/getUserProfile', null, { root: true })
    return res
  },
  updateInvoice ({ commit }, payload) {
    return this.$axios.$put(`${process.env.PAYMENT_HOST_URL}/invoice/${payload._id}`,payload)
      .then((response) => {
        return response
      })
  },
  async sendInvoice ({ commit }, sendDetails) {
    return await this.$axios.$post(`${process.env.PAYMENT_HOST_URL}/invoice/send/${sendDetails.id}`, {
      recipients: [sendDetails.recipient]
    })
  },
  async resendInvoice ({ commit }, invoiceDetails) {
    return await this.$axios
      .$post(`${process.env.PAYMENT_HOST_URL}/invoice/resend/${invoiceDetails.id}`, {
        recipients: [invoiceDetails.recipient]
      })
  },
  deleteInvoice ({ commit }, id) {
    return this.$axios
      .$delete(`${process.env.PAYMENT_HOST_URL}/invoice/${id}`)
      .then((response) => {
        //  commit("DELETE_INVOICE", response.data);
        return response
      })
  },
  async archive ({ commit }, payload) {
    return await this.$axios.$patch(`${process.env.PAYMENT_HOST_URL}/invoice/archive`, {
      invoices: [...payload]
    })
  },
  async export ({ commit }) {
    const res = await this.$axios.get(
      `${process.env.PAYMENT_HOST_URL}/invoice/export`
    )
    console.log(res)
  },
  async getInvoices ({ commit, dispatch }, payload) {
    const q = {
      status: '',
      workflowStatus: '',
      limit: 10,
      page: 1
    }
    const newQueryObj = queryString.stringify({ ...q, ...payload })

    dispatch('loader/startProcess', null, { root: true })
    try {
      const response = await this.$axios.$get(
        `${process.env.PAYMENT_HOST_URL}/invoice?${newQueryObj}`
      )
      // commit('SET_ALL_INVOICES', response)
      return response.data
    } catch (e) {
      return e
    } finally {
      dispatch('loader/endProcess', '', { root: true })
    }
  },
  async getSingleInvoice ({ commit, dispatch }, invoiceId) {
    try {
      dispatch('loader/startProcess', null, { root: true })
      return await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/invoice/${invoiceId}`)
    } catch (error) {
      return error
    } finally {
      dispatch('loader/endProcess', '', { root: true })
    }
  },
  stripeConnect ({ commit }) {
    return this.$axios
      .$get(
        `${process.env.PAYMENT_HOST_URL}/connect/url?returnurl=${process.env.STRIPE_RETURN}&refreshurl=${process.env.STRIPE_RETURN}`
      )
      .then(({ url }) => {
        return url
      })
  },
  disconnectStripe ({ commit }) {
    return this.$axios
      .$delete(`${process.env.PAYMENT_HOST_URL}/stripe/disconnect`)
      .then(response => response)
  }
}

export const getters = {
  getAllinvoices: state => state.invoices,
  getAllDraftInvoices: state =>
    state.invoices.filter(i => i.status === 'draft'),
  getAllPaidInvoices: state => state.invoices.filter(i => i.status === 'paid'),
  getAllSentInvoices: state => state.invoices.filter(i => i.status === 'sent'),
  invoiceCount: state => state.invoiceCount
}
