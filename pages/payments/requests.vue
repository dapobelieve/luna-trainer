<template>
  <div class="h-full">
    <NuxtChild />
    <PaymentWelcomeModal
      :exit-tour="() => {
        closeModal()
        doNotShowHints = true
      }"
      :take-tour="() => {
        tourItems();
        closeModal()
      }"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PaymentWelcomeModal from '~/components/modals/PaymentWelcomeModal.vue'
import { paymentTourSteps } from '~/tour/PaymentTourSteps'

export default {
  name: 'PaymentRequests',
  components: { PaymentWelcomeModal },
  provide () {
    return {
      showExport: this.showExport
    }
  },
  data () {
    return {
      showExport: false,
      showDrop: false,
      active: true,
      checkedItems: [],
      exporting: false
    }
  },
  head () {
    return {
      title: 'Payment Requests'
    }
  },
  computed: {
    currentInvoice () {
      const t = this.$route.name.split('payments-requests')?.[1] ?? ''
      return `${String(t).split('').map((_, i) => (i === 0) ? _.toUpperCase() : _).join('')}`
    },
    ...mapGetters({
      acceptedClients: 'client/acceptedClients',
      size: 'invoice/invoiceCount'
    })
  },
  methods: {
    ...mapActions({
      getInvoices: 'invoice/getInvoices'
    }),
    inviteClient () {
      this.$modal.show('invite-client')
    },
    closeModal () {
      this.$modal.hide('welcome-modal')
      this.removeQueryParams()
    },
    removeQueryParams () {
      const query = Object.assign({}, this.$route.query)
      delete query.new
      this.$router.replace({ query })
      window.localStorage.removeItem('invoice-tour')
    },
    tourItems () {
      if (this.doNotShowHints) { return }
      paymentTourSteps(this.$intro())
        .oncomplete(() => {
          this.removeQueryParams()
        })
        .onexit(() => {
          this.removeQueryParams()
        })
        .start()

      this.$intro().showHints()
    },
    async exportInvoice () {
      try {
        if (this.checkedItems.length <= 0) {
          return
        }
        this.exporting = true
        const res = await this.$axios.$get(`${process.env.PAYMENT_HOST_URL}/invoice/export?ids=${this.checkedItems}`, {
          responseType: 'blob'
        })
        this.downloadDocument(res)
      } catch (e) {

      } finally {
        this.exporting = false
      }
    },
    downloadDocument (response) {
      const url = window.URL.createObjectURL(new Blob([response], { type: 'application/vnd.ms-excel' }))
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', 'Exported invoices.xls')
      document.body.appendChild(link)
      link.click()

      this.$lunaToast.success(
        'Exported Successfully'
      )
    }
  },
  mounted () {
    const payments = window.localStorage.getItem('invoice-tour')
    if (payments) {
      this.$modal.show('welcome-modal')
      this.$router?.push({ query: { new: true } })
    }
  },
  updated () {
    const newUser = (this.$route?.query?.new)
    if (newUser) {
      this.$modal.show('welcome-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
.minimum-height{
  min-height: calc(100vh - 56px);
}
</style>
