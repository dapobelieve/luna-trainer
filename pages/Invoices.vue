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
    <template v-if="fetchAllInvoices.length">
      <!-- <nuxt-child :key="$route.fullPath" /> -->
      <div>
        <div
          class="tail-grid tail-grid-cols-7 gap-2 tail-mt-5 tail-w-100 tail-rounded-md tail-bg-white tail-p-4 tail-items-center"
        >
          <!-- <div
            class="tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
          >
            Select
          </div> -->
          <div
            class="tail-col-span-3 tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
          >
            Name
          </div>
          <div
            class="tail-mr-auto tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
          >
            Invoice #
          </div>
          <div
            class="tail-mr-auto tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
          >
            Created
          </div>
          <div
            class="tail-mr-auto tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
          >
            Amount
          </div>
          <div
            class="tail-mr-auto tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
          >
            Status
          </div>
        </div>

        <div
          v-for="invoice in getAllInvoices"
          :key="invoice.index"
          style="cursor: pointer"
          class="hover:tail-bg-blue-100 tail-grid tail-grid-cols-7 gap-2 tail-my-2 tail-w-100 tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-items-center"
          @click="viewModal = true"
        >
          <!-- <input type="checkbox" name="vehicle1" value="Bike"> -->
          <div class="tail-col-span-3 tail-whitespace-nowrap">
            <div class="tail-flex tail-items-center">
              <ClientAvatar :firstname="invoice.customerId.firstName" :lastname="invoice.customerId.lastName" />
              <div class="tail-ml-4">
                <div class="tail-font-medium">
                  {{ invoice.customerId.firstName }}
                  {{ invoice.customerId.lastName }}
                </div>
              </div>
            </div>
          </div>
          <div class="tail-mr-auto tail-whitespace-nowrap">
            <div class="tail-font-normal">
              {{ invoice.invoiceNo }}
            </div>
          </div>
          <div class="tail-mr-auto tail-whitespace-nowrap">
            <div class="tail-font-normal">Friday 30 April, 2021</div>
          </div>
          <div class="tail-mr-auto tail-whitespace-nowrap">
            <div class="tail-font-medium">£ {{ invoice.total }}</div>
          </div>
          <div class="tail-mr-auto tail-whitespace-nowrap">
            <span
              class="tail-px-4 tail-py-1 tail-rounded-full tail-bg-gray-100 tail-text-gray-500 tail-text-sm tail-font-light"
            >{{ invoice.status }}</span>
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
    <Modal :is-open="viewModal" @close="viewModal = $event">
      <InviteNewClient @close="viewModal = $event" />
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
      viewModal: false
    }
  },
  computed: {
    ...mapGetters({
      fetchAllInvoices: 'invoice/getAllInvoices',
      getAllInvoices: 'invoice/getAllInvoices'
    })
  },
  mounted () {
    this.fetchInvoices()
    this.getInvoices()
  },
  methods: {
    ...mapActions({
      fetchInvoices: 'invoice/getAllInvoices',
      getInvoices: 'invoice/getAllInvoices'
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
