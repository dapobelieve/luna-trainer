import Vue from 'vue'

const queryString = require('querystring')

export const state = () => ({
  invoices: {},
  invoiceCount: 0,
  isLoading: false
})

export const mutations = {
  setStates (state, data) {
    Object.keys(data).forEach((key) => {
      Vue.set(state, key, data[key])
    })
  },
  SET_ALL_INVOICES (state, invoices) {
    state.invoices = invoices.data
    state.invoiceCount = invoices.size
  },
  DELETE_INVOICE (state, id) {
    state.invoices = state.invoices.filter(invoice => invoice._id !== id)
  },
  CANCEL_INVOICE (state, id) {
    state.invoices = state.invoices.map((invoice) => {
      if (invoice._id === id) {
        invoice.status = 'cancelled'
      }
      return invoice
    })
  },
  IS_LOADING (state, loadingStatus) {
    state.isLoading = loadingStatus
  }
}

export const actions = {
  async createInvoice ({ commit, dispatch }, payload) {
    const res = await this.$axios.$post(`${process.env.PAYMENT_HOST_URL}/invoice`, payload)
    return res
  },
  updateInvoice ({ commit }, payload) {
    return this.$axios.$put(`${process.env.PAYMENT_HOST_URL}/invoice/${payload._id}`, payload)
      .then((response) => {
        return response
      })
  },
  async sendInvoice ({ commit }, sendDetails) {
    return await this.$axios.$post(`${process.env.PAYMENT_HOST_URL}/invoice/send/${sendDetails.id}`, {
      recipients: [sendDetails.recipient]
    })
  },
  async cancelInvoice ({ commit }, id) {
    return await this.$axios.$patch(`${process.env.PAYMENT_HOST_URL}/invoice/cancel/${id}`).then((res) => {
      commit('CANCEL_INVOICE', id)
    })
  },
  async notify ({ commit }, payload) {
    return await this.$axios.$post(
      `${process.env.PAYMENT_HOST_URL}/invoice/reminder/${payload.id}/notify`,
      { note: 'note' }
    )
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
        commit('DELETE_INVOICE', id)
        return response
      })
  },
  async archive ({ commit }, payload) {
    return await this.$axios.$patch(`${process.env.PAYMENT_HOST_URL}/invoice/archive`, {
      invoices: [...payload]
    })
  },
  async export ({ commit }) {
    await this.$axios.get(
      `${process.env.PAYMENT_HOST_URL}/invoice/export`
    )
  },
  async downloadInvoicePdf ({ commit }, id) {
    return this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/invoice/pdf/${id}`)
  },
  async getInvoicePayment ({ commit }, id) {
    return await this.$axios
      .$get(`${process.env.PAYMENT_HOST_URL}/invoice/payment/${id}`)
  },
  async clientCreatePaymentReceipt (_, payload) {
    const res = await this.$axios.$post(`${process.env.PAYMENT_HOST_URL}/payment-receipt`, payload)
    return res
  },
  async getWidgetData ({ commit, dispatch }, status, limit = 3) {
    const response = await this.$axios.$get(
      `${process.env.PAYMENT_HOST_URL}/widget/payment?status=${status}&limit=${limit}`
    )
    return response.data || []
  },
  async getInvoices ({ commit, dispatch }, payload) {
    const q = {
      status: '',
      workflowStatus: '',
      limit: 10,
      page: 1
    }
    const newQueryObj = queryString.stringify({ ...q, ...payload })
    try {
      const response = await this.$axios.$get(
        `${process.env.PAYMENT_HOST_URL}/invoice?${newQueryObj}`
      )
      commit('setStates', { invoices: response })
      return response
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
  }
}
export const getters = {
  getAllInvoices: state => state.invoices,
  getAllDraftInvoices: state =>
    state.invoices.filter(i => i.status === 'draft'),
  getAllPaidInvoices: state => state.invoices.filter(i => i.status === 'paid'),
  getAllSentInvoices: state => state.invoices.filter(i => i.status === 'sent'),
  invoiceCount: state => state.invoiceCount
}
