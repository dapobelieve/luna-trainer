<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        Invoices
      </template>
      <template v-slot:buttons>
        <button type="button" class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2" @click="openModal = true">
          <i class="ns-plus tail-text-white tail-text-lg"></i>
        </button>
        <gw-select :options="['All', 'Sent', 'Draft', 'Paid']" selected="Draft" @selected="filterInvoice" />
        <button type="button" class="tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-rounded-md tail-shadow-sm tail-tail-text-sm tail-font-medium tail-text-white tail-bg-white hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2">
          <i class="ns-download tail-mr-2 tail-text-black tail-text-sm"></i>
          <span class="tail-text-black tail-text-sm">Export</span>
        </button>
      </template>
    </PageHeader>
    <div class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full">
      <GwInvoice :status="filter" />
    </div>
    <Modal status="Create New Invoice" :input-width="30" :is-open="openModal" @close="openModal = $event">
      <CreateNewInvoice @close="openModal = $event" />
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'Invoices',
  data () {
    return {
      active: true,
      openModal: false,
      filter: 'all'
    }
  },
  head () {
    return {
      title: 'All Invoices'
    }
  },
  methods: {
    filterInvoice (link) {
      this.filter = link
    }
  }
}
</script>
