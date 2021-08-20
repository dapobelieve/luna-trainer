<template>
  <async-view>
    <div v-if="filteredInvoice.length" class="tail-grid">
      <div class="tail-flex tail-flex-col">
        <div
          class="-tail-my-2 tail-overflow-x-auto sm:-tail-mx-0 lg:-tail-mx-0"
        >
          <div
            class="tail-py-2 tail-align-middle tail-inline-block tail-min-w-full sm:tail-px-0 lg:tail-px-0"
          >
            <div class="tail-tail-shadow tail-overflow-hidden">
              <table class="tail-min-w-full">
                <thead
                  class="tail-bg-white tail-rounded-lg tail-overflow-hidden"
                >
                  <tr class="">
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
                          :firstname="invoice && invoice.customerId ? invoice.customerId.firstName : 'G'"
                          :lastname="invoice && invoice.customerId ? invoice.customerId.lastName : 'W'"
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
        <button class="base-button" type="button" @click="createInvoice">
          Create an invoice
        </button>
      </div>
    </div>
    <Modal
      :input-width="30"
      :is-open="openModalDetails"
      @close="resetModal($event)"
    >
      <template v-slot:status>
        <div class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl">
          {{ currentInvoice.status }}
        </div>
      </template>
      <InvoiceDetails :details="currentInvoice" @close="resetModal($event)" />
    </Modal>
    <Modal
      :input-width="30"
      :is-open="openInvoice"
      @close="openInvoice = $event"
    >
      <template v-slot:status>
        <div class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl">
          Create New Invoice
        </div>
      </template>
      <CreateNewInvoice @close="openInvoice = $event" />
    </Modal>
    <NotificationsModal
      :visible="showNotification"
      @close="showNotification = $event"
    >
      <template v-slot:title>
        {{
          !acceptedClients.length
            ? "No Invited Clients"
            : "Services Unavailable"
        }}
      </template>
      <template v-slot:subtitle>
        {{
          !acceptedClients.length
            ? "You need to invite a client before you can create an invoice."
            : "You need to add at least one service before you can create an invoice."
        }}
      </template>
      <template v-slot:actionButtons>
        <button
          v-if="!acceptedClients.length"
          class="base-button tail-normal-case"
          style="width: fit-content"
          @click="inviteClient = true"
        >
          Invite a client
        </button>
        <NuxtLink
          v-else
          to="/Settings#services"
          class="base-button tail-normal-case"
          style="width: fit-content"
        >
          Add a service
        </NuxtLink>
      </template>
    </NotificationsModal>
    <Modal
      :input-width="40"
      :is-open="inviteClient"
      @close="inviteClient = $event"
    >
      <InviteNewClient @close="inviteClient = $event" />
    </Modal>
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
      inviteClient: false,
      showNotification: false
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

<style lang="scss" scoped></style>
