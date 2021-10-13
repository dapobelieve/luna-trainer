<template>
  <async-view>
    <div v-if="filteredInvoice.length" class="tail-mb-3">
      <div class="tail-p-6 tail-bg-white tail-rounded-lg tail-shadow-lg">
        <div class="tail-flex tail-flex-col">
          <div class="tail--my-2 tail-overflow-x-auto md:tail-overflow-hidden sm:tail-tail--mx-6 lg:tail--mx-8">
            <div class="tail-py-2 tail-align-middle tail-inline-block tail-w-screen md:tail-w-full tail-min-w-full sm:tail-px-3 lg:tail-px-4">
              <div class="tail-border-b tail-border-gray-200 sm:tail-rounded-lg">
                <table class="tail-min-w-full tail-divide-y tail-divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" class="tail-px-1 tail-py-3">
                        <span class="tail-sr-only"></span>
                      </th>

                      <th
                        scope="col"
                        class="tail-pr-12 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="tail-px-3 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider"
                      >
                        Invoice No.
                      </th>
                      <th
                        scope="col"
                        class="tail-px-3 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        class="tail-px-3 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="tail-px-3 tail-py-3 tail-text-left tail-text-xs tail-font-medium text-gray-500 tail-uppercase tail-tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="invoice in filteredInvoice"
                      :key="invoice.index"
                      class="tail-cursor-pointer tail-bg-white tail-rounded-lg tail-overflow-hidden tail-border-8 tail-border-transparent"
                      @click.prevent="openDetails(invoice)"
                    >
                      <td
                        v-if="invoice && invoice.status === 'draft'"
                        class="tail-px-1 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-font-medium tail-text-gray-900"
                      >
                        <input id="invoice._id" type="checkbox" @click="$event.stopPropagation()" @change="toggle(invoice._id)" />
                      </td>
                      <td v-else scope="col" class="tail-px-6 tail-py-3">
                        <span class="tail-sr-only">Action</span>
                      </td>

                      <td
                        class="tail-pr-12 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-font-medium tail-text-gray-900"
                      >
                        <div
                          class="tail-flex tail-flex-row tail-items-center tail-gap-3"
                        >
                          <ClientAvatar
                            :client-info="invoice && invoice.customerId ? invoice.customerId : {
                              firstName: 'Get',
                              lastName: 'Welp'
                            }"
                          />
                          <div>
                            {{ invoice && invoice.customerId ? invoice.customerId.firstName : 'Get' }}
                            {{ invoice && invoice.customerId ? invoice.customerId.lastName : 'Welp' }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="tail-px-3 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500"
                      >
                        {{ invoice.invoiceNo }}
                      </td>
                      <td
                        class="tail-px-3 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500"
                      >
                        {{ new Date(invoice.dueDate).toDateString() }}
                      </td>
                      <td
                        class="tail-px-3 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500"
                      >
                        {{ invoice.total | amount }}
                      </td>
                      <td
                        class="tail-px-3 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500"
                      >
                        <span
                          class="tail-px-2 tail-bg-gray-200 tail-inline-flex tail-text-xs tail-leading-5 tail-font-semibold tail-rounded-full tail-text-gray-800 tail-capitalize"
                        >
                          {{ invoice.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="tail-mt-16 tail-px-5 tail-grid tail-gap-5 tail-justify-center tail-text-center"
    >
      <div class="tail-w-full">
        <img
          class="tail-text-center tail-inline-block"
          src="~/assets/img/low-dog.png"
          alt=""
          srcset=""
        />
      </div>
      <h5 class="tail-font-bold">
        No {{ status === "All" ? "" : status.toLowerCase() }} invoices yet
      </h5>
      <p class="tail-px-5 tail-text-sm tail-mb-0 tail-max-w-xs">
        All your {{ status === "All" ? "" : status.toLowerCase() }} invoice will
        appear here.
      </p>
      <div v-if="status === 'All'" class="tail-w-max tail-mx-auto">
        <button class="base-button" type="button" @click="$router.push({ name: 'CreateInvoice'})">
          Create an invoice
        </button>
      </div>
    </div>
    <GwModal
      :input-width="30"
      :is-open="openModalDetails"
      @close="resetModal($event)"
      @closeBackDrop="resetModal($event)"
    >
      <template v-slot:status>
        <div class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl">
          {{ currentInvoice.status }}
        </div>
      </template>
      <InvoiceDetails :details="currentInvoice" @close="resetModal($event)" />
    </GwModal>
    <GwModal
      :input-width="30"
      :is-open="openInvoice"
      @close="openInvoice = $event"
      @closeBackDrop="openInvoice = $event"
    >
      <template v-slot:status>
        <div class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl">
          Create New Invoice
        </div>
      </template>
      <CreateNewInvoice @close="openInvoice = $event" />
    </GwModal>
    <GwModal
      :input-width="40"
      :is-open="inviteClient"
      @close="inviteClient = $event"
      @closeBackDrop="inviteClient = $event"
    >
      <InviteNewClient @close="inviteClient = $event" />
    </GwModal>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'GwInvoice',
  props: {
    status: {
      type: String,
      required: true
    },
    pageNumber: Number
  },
  data () {
    return {
      openModalDetails: false,
      currentInvoice: {},
      openInvoice: false,
      inviteClient: false
    }
  },
  computed: {
    ...mapGetters({
      allInvoices: 'invoice/getAllinvoices',
      acceptedClients: 'client/acceptedClients'
    }),
    filteredInvoice () {
      // eslint-disable-next-line curly
      if (this.status === 'All') return this.allInvoices
      return this.allInvoices.filter(
        i => i.status === this.status.toLowerCase()
      )
    }
  },
  watch: {
    pageNumber (newValue) {
      if (newValue) {
        this.getInvoices({ page: this.pageNumber })
      }
    },
    status (newValue) {
      if (newValue) {
        newValue === 'All'
          ? this.getInvoices()
          : this.getInvoices({ status: newValue.toLowerCase() })
      }
    }
  },
  created () {
    this.getInvoices({ page: this.pageNumber })
  },
  methods: {
    ...mapActions({
      getInvoices: 'invoice/getInvoices'
    }),
    toggle (id) {
      this.$emit('checked', id)
    },
    openDetails (invoice) {
      this.currentInvoice = invoice
      this.openModalDetails = true
    },
    resetModal (event) {
      this.openModalDetails = event
      this.currentInvoice = {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
