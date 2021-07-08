<template>
  <div
    class="lg:tail-pl-14 lg:tail-mr-4 md:tail-px-4 lg:tail-pr-0 md:tail-mt-3 tail-border md:tail-border-none tail-w-full"
  >
    <div
      style="top: 72px"
      class="tail-sticky tail-flex tail-items-center md:tail-rounded-md tail-bg-white tail-px-4 tail-py-3"
    >
      <div
        class="tail-mr-auto tail-text-sm md:tail-text-2xl tail-flex tail-gap-3"
      >
        Invoices
      </div>
      <div class="tail-mr-2 md:tail-mr-5 tail-relative inline-block text-left">
        <div
          class="outline-button"
          role="button"
          @click.prevent="openDropDown = !openDropDown"
        >
          <span class="tail-hidden sm:tail-block">All Invoices</span>
          <i class="ns-caret-down sm:tail-text-xl" aria-hidden="true"></i>
        </div>
        <transition
          enter-active-class="tail-transition tail-ease-out tail-duration-100"
          enter-from-class="tail-transform tail-opacity-0 tail-scale-95"
          enter-to-class="tail-transform tail-opacity-100 tail-scale-100"
          leave-active-class="tail-transition tail-ease-in tail-duration-75"
          leave-from-class="tail-transform tail-opacity-100 tail-scale-100"
          leave-to-class="tail-transform tail-opacity-0 tail-scale-95"
        >
          <div
            v-if="openDropDown"
            class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-auto md:tail-w-full tail-rounded-md tail-shadow-lg tail-bg-white tail-tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none"
          >
            <div class="tail-py-1">
              <div class="tail-divide-y tail-divide-gray-100">
                <button
                  type="button"
                  :class="[
                    active
                      ? 'tail-bg-gray-100 tail-text-gray-900'
                      : 'tail-text-gray-700',
                    'tail-block tail-px-4 tail-py-2 tail-text-sm',
                    'tail-w-full'
                  ]"
                >
                  All invoices
                </button>
              </div>
              <div>
                <button
                  type="button"
                  :class="[
                    active
                      ? 'tail-bg-gray-100 tail-text-gray-900'
                      : 'tail-text-gray-700',
                    'tail-block tail-px-4 tail-py-2 tail-text-sm',
                    'tail-w-full'
                  ]"
                  @click="goToSaved"
                >
                  Saved
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="tail-mr-2 md:tail-mr-5">
        <button type="button" class="outline-button tail-gap-2">
          <i class="ns-download"></i>
          <span class="tail-hidden sm:tail-block">export</span>
        </button>
      </div>
    </div>

    <page-loader-view>
      <template v-if="fetchAllInvoices.length">
        <div class="tail-flex tail-flex-col">
          <div class="-tail-my-2 tail-overflow-x-auto sm:-tail-mx-0 lg:-tail-mx-0">
            <div class="tail-py-2 tail-align-middle tail-inline-block tail-min-w-full sm:tail-px-0 lg:tail-px-0">
              <div class="tail-tail-shadow tail-overflow-hidden tail-border-b tail-border-gray-200 sm:tail-rounded-lg">
                <table class="tail-min-w-full tail-divide-y tail-divide-gray-200">
                  <thead class="tail-bg-gray-50">
                    <tr>
                      <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider">
                        Name
                      </th>
                      <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider">
                        Invoice No.
                      </th>
                      <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider">
                        Created
                      </th>
                      <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium tail-text-gray-500 tail-uppercase tail-tracking-wider">
                        Amount
                      </th>
                      <th scope="col" class="tail-px-6 tail-py-3 tail-text-left tail-text-xs tail-font-medium text-gray-500 tail-uppercase tail-tracking-wider">
                        Status
                      </th>
                      <th scope="col" class="tail-relative tail-px-6 tail-py-3">
                        <span class="tail-sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="invoice in getAllInvoices"
                      :key="invoice.index"
                      class="bg-white"
                    >
                      <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-font-medium tail-text-gray-900">
                        <ClientAvatar :firstname="invoice.customerId.firstName" :lastname="invoice.customerId.lastName" />

                        {{ invoice.customerId.firstName }}
                        {{ invoice.customerId.lastName }}
                      </td>
                      <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500">
                        {{ invoice.invoiceNo }}
                      </td>
                      <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500">
                        {{ new Date(invoice.dueDate).toDateString() }}
                      </td>
                      <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500">
                        £ {{ invoice.total }}
                      </td>
                      <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-sm tail-text-gray-500">
                        <span class="tail-px-2 tail-inline-flex tail-text-xs tail-leading-5 tail-font-semibold tail-rounded-full tail-bg-green-100 tail-text-green-800">
                          {{ invoice.status }}
                        </span>
                      </td>
                      <td class="tail-px-6 tail-py-4 tail-whitespace-nowrap tail-text-right text-sm font-medium">
                        <button class="text-indigo-600 hover:text-indigo-900" @click.prevent="sendInvoice(invoice)">
                          send
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div
        v-else
        class="tail-mt-10 tail-flex tail-flex-col tail-items-center tail-justify-items-center"
      >
        <div style="max-width: 266px" class="tail-text-center">
          <h5 style="color: #12263f" class="">
            <strong> No Invoices </strong>
          </h5>
          <p style="color: #70839f">
            You have no invoices.
          </p>
        </div>
      </div>
    </page-loader-view>
    <Modal :is-open="viewModal" @close="viewModal = $event">
      <InviteNewClient @close="viewModal = $event" />
    </Modal>
    <!-- <Modal :is-open="openModal" @close="openModal = $event">
      <SendInvoice @close="openModal = $event" />
    </Modal> -->
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
      viewModal: false
      // openModal: false
    }
  },
  computed: {
    ...mapGetters({
      fetchAllInvoices: 'invoice/getAllInvoices',
      getAllInvoices: 'invoice/getAllInvoices'
    })
  },
  created () {
    this.fetchInvoices()
    this.getInvoices()
  },
  methods: {
    ...mapActions({
      fetchInvoices: 'invoice/getAllInvoices',
      getInvoices: 'invoice/getAllInvoices',
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
