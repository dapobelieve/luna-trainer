<template>
  <div class="h-full">
    <PageHeader>
      <template v-slot:title>
        <span class="font-normal">Payments</span>
      </template>
      <template v-slot:buttons>
        <div class="flex items-center">
          <ClickOutside :do="() => showDrop = false">
            <div class="relative">
              <span class="font-medium flex items-center cursor-pointer text-primary-color mr-5" @click="showDrop = !showDrop">
                <span>{{ currentInvoice }}</span>
                <i class="fi-rr-caret-down ml-2 text-lg"></i>
              </span>
              <div
                v-show="showDrop"
                id="sent"
                class="origin-top-right cursor-pointer absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
              >
                <div class="py-1" role="none">
                  <a
                    class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    @click.prevent="$router.push({name: 'payments-requests-sent'}); showDrop=false"
                  >Sent
                  </a>
                  <a
                    class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    @click.prevent="$router.push({name: 'payments-requests-drafts'}); showDrop=false"
                  >Drafts
                  </a>
                </div>
              </div>
            </div>
          </ClickOutside>
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
