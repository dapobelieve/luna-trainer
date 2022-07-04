<template>
  <div class="h-full">
    <PageHeader>
      <template v-slot:title>
        <span class="font-normal">Payments</span>
      </template>
      <template v-slot:buttons>
        <div class="flex items-center">
          <button class="flex items-center mr-2">
            <i class="fi-rr-download text-[#3B82F6] mt-1"></i>
            <span class="mx-2 text-[#3B82F6]">Export</span>
          </button>
          <NuxtLink
            id="plus"
            :to="{ name: 'payments-request'}"
            exact-active-class="active"
            class="grid place-content-center primary-color h-8 w-8 text-sm font-medium rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none "
          >
            <i class="fi-rr-plus mt-1 text-base text-white"></i>
          </NuxtLink>
        </div>
      </template>
    </PageHeader>
    <div class="w-full p-4 pb-24 bg-gray-100 flex justify-center minimum-height ">
      <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
        <NuxtChild />
      </div>
    </div>
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
  data () {
    return {
      showDrop: false,
      active: true
    }
  },
  head () {
    return {
      title: 'Payment Requests'
    }
  },
  computed: {
    currentInvoice () {
      const t = this.$route.name.split('payments-requests-')?.[1] ?? ''
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
