<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        Invoices
      </template>
      <template v-slot:buttons>
        <button type="button" class="tail-inline-flex tail-items-center tail-px-4 tail-py-2 tail-border tail-border-gray-300 tail-rounded-md tail-shadow-sm tail-text-sm tail-font-medium tail-text-gray-700 tail-bg-white hover:tail-bg-gray-50 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500">
          Share
        </button>
        <button type="button" class="tail-inline-flex tail-items-center tail-px-2.5 tail-py-1.5 tail-border tail-border-transparent tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-white tail-bg-indigo-600 hover:tail-bg-indigo-700 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500" @click="openModal = true">
          All
        </button>
        <button type="button" class="tail-inline-flex tail-items-center tail-px-4 tail-py-2 border tail-border-transparent tail-rounded-md tail-shadow-sm tail-tail-text-sm tail-font-medium tail-text-white tail-bg-indigo-600 hover:tail-bg-indigo-700 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500">
          Export
        </button>
      </template>
    </PageHeader>
    <div class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full">
      <nuxt-child />
    </div>
    <Modal :input-width="30" :is-open="openModal" @close="openModal = $event">
      <template v-slot:title>
        Create New Invoice
      </template>
      <CreateNewInvoice @close="openModal = $event" />
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Invoices',
  data () {
    return {
      openDropDown: false,
      active: true,
      openModal: false
      // openModal: false
    }
  },
  head () {
    return {
      title: 'All Invoices'
    }
  },
  computed: {
    ...mapGetters({
      fetchAllInvoices: 'invoice/getAllInvoices',
      acceptedClients: 'client/getAllAcceptedClients'
    })
  },
  mounted () {
    this.fetchInvoices()
  },
  methods: {
    ...mapActions({
      fetchInvoices: 'invoice/getAllInvoices',
      send: 'invoice/sendInvoice'
    }),
    goToSaved () {
      this.$router.push({
        name: 'Invoices-Saved'
      })
      this.openDropDown = false
    },
    sendInvoice (invoice) {
      console.log('the invoice', invoice)
      // this.openModal = true
      const details = {
        id: invoice._id,
        recipient: 'uchedotphp@gmail.com'
      }
      this.send(details).then((result) => {
        if (result.status === 'success') {
          this.$toast.success('Invoice sent', { position: 'top-right' })
        }
        // location.reload()
      }).catch((err) => {
        if (err.response) {
          this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
        } else if (err.request) {
          this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
        } else {
          this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
        }
      }).finally(() => {
        this.fetchInvoices()
      })
    }
  }
}
</script>
