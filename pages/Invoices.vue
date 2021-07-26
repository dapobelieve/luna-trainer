<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        Invoices
      </template>
      <template v-slot:buttons>
        <button type="button" class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2" @click="createInvoice">
          <i class="ns-plus tail-text-white tail-text-lg"></i>
        </button>
        <gw-select :options="['All', 'Sent', 'Draft', 'Paid']" selected="All" @selected="filterInvoice" />
        <button type="button" class="tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-rounded-md tail-shadow-sm tail-tail-text-sm tail-font-medium tail-text-white tail-bg-white hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2">
          <i class="ns-download tail-mr-2 tail-text-black tail-text-sm"></i>
          <span class="tail-text-black tail-text-sm">Export</span>
        </button>
      </template>
    </PageHeader>
    <gw-pagination class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full" :visible="Boolean(size)" :total-items="size">
      <template v-slot:content="{ pageNumber }">
        <GwInvoice :status="filter" :page-number="pageNumber" />
      </template>
    </gw-pagination>
    <Modal status="Create New Invoice" :input-width="30" :is-open="openModal" @close="openModal = $event">
      <CreateNewInvoice @close="openModal = $event" />
    </Modal>
    <NotificationsModal :visible="showNotification" @close="showNotification = $event">
      <template v-slot:title>
        {{ !acceptedClients.length ? 'No Invited Clients' : 'Services Unavailable' }}
      </template>
      <template v-slot:subtitle>
        {{
          !acceptedClients.length ? 'You need to invite a client before you can create an invoice.' : 'You need to add at least one service before you can create an invoice.' }}
      </template>
      <template v-slot:actionButtons>
        <button v-if="!acceptedClients.length" class="base-button tail-normal-case" style="width: fit-content" @click="inviteClient = true">
          Invite a client
        </button>
        <NuxtLink v-else to="/Settings#services" class="base-button tail-normal-case" style="width: fit-content">
          Add a service
        </NuxtLink>
      </template>
    </NotificationsModal>
    <Modal :input-width="40" :is-open="inviteClient" @close="inviteClient = $event">
      <InviteNewClient @close="inviteClient = $event" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Invoices',
  data () {
    return {
      active: true,
      openModal: false,
      showNotification: false,
      inviteClient: false,
      filter: 'All'
    }
  },
  head () {
    return {
      title: 'Invoices'
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/acceptedClients',
      size: 'invoice/invoiceCount'
    })
  },
  methods: {
    filterInvoice (link) {
      this.filter = link
    },
    createInvoice () {
      if (!this.acceptedClients.length || !this.$auth.user.services.length) {
        this.showNotification = true
      } else {
        this.openModal = true
      }
    }
  }
}
</script>
