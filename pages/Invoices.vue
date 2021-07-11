<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        Invoices
      </template>
      <template v-slot:buttons>
        <button type="button" class="tail-inline-flex tail-items-center tail-px-2.5 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-white tail-bg-white hover:tail-bg-indigo-700 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500" @click="openModal = true">
          <i class="ns-plus tail-text-black tail-text-xl"></i>
        </button>
        <button type="button" class="tail-inline-flex tail-items-center tail-px-4 tail-py-1 tail-border tail-border-gray-300 tail-rounded-md tail-shadow-sm tail-tail-text-sm tail-font-medium tail-text-white tail-bg-white hover:tail-bg-indigo-700 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-indigo-500">
          <i class="ns-download tail-mr-2 tail-text-black"></i>
          <span class="tail-text-black">Export</span>
        </button>
      </template>
    </PageHeader>
    <div class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full">
      <nuxt-child />
    </div>
    <Modal status="Create New Invoice" :input-width="30" :is-open="openModal" @close="openModal = $event">
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
    }
  },
  head () {
    return {
      title: 'All Invoices'
    }
  },
  computed: {
    ...mapGetters({
      fetchAllInvoices: 'invoice/getAllDraftInvoices',
      acceptedClients: 'client/getAllAcceptedClients'
    })
  },
  mounted () {
    this.fetchInvoices()
  },
  methods: {
    ...mapActions({
      fetchInvoices: 'invoice/getAllDraftInvoices'
    }),
    goToSaved () {
      this.$router.push({
        name: 'Invoices-Saved'
      })
      this.openDropDown = false
    }
  }
}
</script>
