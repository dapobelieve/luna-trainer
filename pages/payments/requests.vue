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
                id="sent"
                v-show="showDrop"
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
            :to="{ name: 'payments-request'}"
            exact-active-class="active"
            id="plus"
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
  
  :exitTour="() => {
          closeModal()
          this.doNotShowHints = true
        }"
        :takeTour="() => {
          this.tourItems();
          closeModal()
        }"  />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PaymentWelcomeModal from '~/components/modals/PaymentWelcomeModal.vue'
import {paymentTourSteps} from '~/tour/PaymentTourSteps'

export default {
  name: 'PaymentRequests',
  components: {PaymentWelcomeModal},
  data () {
    return {
      showDrop: false,
      img: 'https://res.cloudinary.com/rohing/image/upload/v1585572497/harley-davidson-1HZcJjdtc9g-unsplash_vwslej.jpg',
      active: true,
      openModal: false,
      showNotification: false,
      filter: 'All',
      trash: false,
      deleteClient: false,
      tempTrashId: null
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
      deleteInvoices: 'invoice/deleteInvoice',
      getInvoices: 'invoice/getInvoices'
    }),
    deleteIcon (e) {
      this.trash = !this.trash
      this.tempTrashId = e
    },
    deleteInvoice () {
      this.deleteClient = true
    },
    inviteClient () {
      this.$modal.show('inviteClientModal')
    },
    deleteClientData () {
      return this.deleteInvoices(this.tempTrashId)
        .then((response) => {
          if (response.status === 'success') {
            this.$lunaToast.success('Invoice deleted successfully')
            this.getInvoices()
            this.deleteClient = false
            this.trash = false
          }
        })
        .catch((err) => {
          if (err.response) {
            this.$lunaToast.error(
              `${err.response.data.message}`)
          } else if (err.request) {
            this.$lunaToast.error('Something went wrong. Try again', {
              position: 'bottom-right'
            })
          } else {
            this.$lunaToast.error(`${err.message}`)
          }
        })
    },
    filterInvoice (link) {
      this.filter = link
    },
    createInvoice () {
      if (!this.acceptedClients.length || !this.$auth.user.services.length) {
        this.showNotification = true
      } else {
        this.openModal = true
      }
    },
    closeModal () {
      this.$modal.hide('welcome-modal')
    },
    removeQueryParams() {
      let query = Object.assign({}, this.$route.query);
      delete query.new;
      this.$router.replace({ query });
      window.localStorage.removeItem("invoice-tour")

    },
    tourItems () {
      if (this.doNotShowHints) return
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
  },
  mounted() {
     const payments = window.localStorage.getItem("invoice-tour")
    if (payments) {
      this.$router?.push({query: {new: true}})
    }
  },
  updated() {
    const newUser = (this.$route?.query?.new)
    if (newUser) {
      this.$modal.show('welcome-modal')
    }
  },
}
</script>

<style lang="scss" scoped>
.minimum-height{
  min-height: calc(100vh - 56px);
}
</style>