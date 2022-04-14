<template>
  <async-view>
    <div v-if="filteredInvoice.length" class="mb-3">
      <div class="p-6 bg-white rounded-lg shadow-lg">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto md:overflow-hidden sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block w-screen md:w-full min-w-full sm:px-3 lg:px-4">
              <div class="border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" class="px-1 py-3">
                        <span class="sr-only"></span>
                      </th>

                      <th
                        scope="col"
                        class="pr-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Invoice No.
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="invoice in filteredInvoice"
                      :key="invoice.index"
                      class="cursor-pointer bg-white rounded-lg overflow-hidden border-8 border-transparent"
                      @click.prevent="openDetails(invoice)"
                    >
                      <td
                        v-if="invoice && invoice.status === 'draft'"
                        class="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        <input id="invoice._id" type="checkbox" @click="$event.stopPropagation()" @change="toggle(invoice._id)" />
                      </td>
                      <td v-else scope="col" class="px-6 py-3">
                        <span class="sr-only">Action</span>
                      </td>

                      <td
                        class="pr-12 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        <div
                          class="flex flex-row items-center gap-3"
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
                        class="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ invoice.invoiceNo }}
                      </td>
                      <td
                        class="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ new Date(invoice.dueDate).toDateString() }}
                      </td>
                      <td
                        class="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ invoice.total | amount }}
                      </td>
                      <td
                        class="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        <span
                          class="px-2 bg-gray-200 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800 capitalize"
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
      class="mt-16 px-5 grid gap-5 justify-center text-center"
    >
      <div class="w-full">
        <img
          class="text-center inline-block"
          src="~/assets/img/low-dog.png"
          alt=""
          srcset=""
        />
      </div>
      <h5 class="font-bold">
        No {{ status === "All" ? "" : status.toLowerCase() }} invoices yet
      </h5>
      <p class="px-5 text-sm mb-0 max-w-xs">
        All your {{ status === "All" ? "" : status.toLowerCase() }} invoice will
        appear here.
      </p>
      <div v-if="status === 'All'" class="w-max mx-auto">
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
        <div class="bg-gray-100 text-gray-500 px-2 rounded-3xl">
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
        <div class="bg-gray-100 text-gray-500 px-2 rounded-3xl">
          Create New Invoice
        </div>
      </template>
      <CreateNewInvoice @close="openInvoice = $event" />
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
      openInvoice: false
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
    },
    inviteClient () {
      this.$modal.show('invite-client')
    }
  }
}
</script>

<style lang="scss" scoped></style>
