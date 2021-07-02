<template>
  <div class="tail-grid tail-gap-8 tail-grid-cols-1 tail-pb-5">
    <div class="left-card">
      <form @submit.prevent="createInvoice" autocomplete="off" class="tail-grid tail-gap-6">
        <div class="tail-border tail-rounded tail-grid tail-gap-4 tail-p-4">
          <div>
            <div class="">
              <h1 class="tail-font-medium">
                Customer
              </h1>
            </div>
            <div class="">
              <span class="tail-text-gray-400 tail-text-sm">A short description about this section</span>
            </div>
          </div>
          <div class="">
            <label for="email" class="tail-font-light">Name</label>
            <input
              style="cursor: not-allowed"
              disabled
              :value="`${$route.params.client.firstName} ${$route.params.client.lastName}`"
              type="email"
              class="tail-w-full tail-bg-gray-200 tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
            >
          </div>
          <div class="">
            <label for="email" class="tail-font-light">Email Address</label>
            <input style="cursor: not-allowed" disabled :value="client.email" type="email" class="tail-w-full tail-bg-gray-200 tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
        </div>
        <div class="tail-border tail-rounded tail-gap-4 tail-p-4">
          <div>
            <div class="">
              <h1 class="tail-font-medium">
                Services
              </h1>
            </div>
            <div class="">
              <span class="tail-text-gray-400">A short description about this section</span>
            </div>
          </div>
          <div class="">
            <div class="tail-relative">
              <div
                class="tail-inline-flex tail-w-full tail-rounded-md tail-border tail-border-gray-300 tail-shadow-sm tail-px-3 md:tail-pl-4 md:tail-pr-2 tail-py-1 md:tail-py-2 tail-bg-white tail-text-sm tail-font-medium hover:tail-bg-gray-50 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2 focus:tail-ring-offset-gray-100 focus:tail-ring-indigo-500"
                role="button"
                @click.prevent="openDropDown = !openDropDown"
              >
                <span class="tail-hidden md:tail-block">Select a service</span>
                <i class="ns-caret-down tail-text-xl" aria-hidden="true"></i>
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
                    <div
                      v-for="service in services"
                      :key="service.id"
                      class="tail-divide-y tail-divide-gray-100"
                    >
                      <button
                        type="button"
                        :class="[
                          active
                            ? 'tail-bg-gray-100 tail-text-gray-900'
                            : 'tail-text-gray-700',
                          'tail-block tail-px-4 tail-py-2 tail-text-sm', 'tail-w-full'
                        ]"
                        @click.prevent="popSelection(service)"
                      >
                        {{ service.appointmentType }}
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div
            v-if="selectedService.length"
            class="tail-border tail-rounded tail-mt-4"
          >
            <div class="tail-p-2">
              <div
                v-for="service in selectedService"
                :key="service.index"
                class="tail-flex tail-justify-between tail-items-center"
              >
                <div>
                  <p class="tail-font-medium tail-capitalize">
                    {{ service.appointmentType }}
                  </p>
                </div>
                <div>
                  <span>£ {{ service.pricing.amount }}</span>
                  <button @click.prevent="editItem = true">
                    <div class="tail-p-3">
                      <span class="tail-border-2 tail-rounded tail-text-center tail-p-1"><i class="ns-menu-dots" /></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="tail-pt-5">
            <hr />
          </div>
          <div class="tail-py-4">
            <input type="checkbox" class="tail-p-2">
            <span class="tail-font-light">Value Added Tax (VAT)</span>
          </div>
          <div class="">
            <label for="dueDate" class="tail-block tail-font-light">Due date</label>
            <date-picker
              v-model="date"
              style="width: 100% !important"
              class="tail-w-full"
              :disabled-date="
                (date) => {
                  if (date < new Date()) {
                    return true
                  }
                  return false
                }
              "
              value-type="format"
              placeholder="Select an appointment date"
            ></date-picker>
          </div>
        </div>
        <ButtonSpinner :is-loading="isLoading">
          Save Invoice
        </ButtonSpinner>
      </form>
    </div>
    <Modal :is-open="addItem" @close="addItem = $event">
      <AddItem @close="addItem = $event" />
    </Modal>
    <Modal :is-open="editItem" @close="editItem = $event">
      <EditItem @close="editItem = $event" />
    </Modal>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { mapActions } from 'vuex'
export default {
  name: 'LeftInvoiceForm',
  components: { DatePicker },
  data () {
    return {
      isLoading: false,
      openDropDown: false,
      active: true,
      client: this.$route.params.client,
      services: this.$auth.user.services,
      selectedService: [],
      addItem: false,
      editItem: false,
      date: new Date().toISOString().substring(0, 10),
      invoiceDetails: {
        selectedClient: '',
        selectedService: ''
      }
    }
  },
  methods: {
    ...mapActions({
      createInvoices: 'invoice/createInvoice'
    }),
    createInvoice () {
      console.log('client', this.$route.params.client)
      this.createInvoices({
        customerId: this.$route.params.client._id,
        dueDateEpoch: new Date(this.date).getTime() / 1000,
        dueDate: new Date(this.date).getTime() / 1000,
        items: [{
          service: this.selectedService[0]._id,
          qty: this.selectedService.length,
          price: this.selectedService[0].pricing.amount
        }]
      })
    },
    popSelection (service) {
      this.selectedService.push(service)
      this.openDropDown = false
    }
  }
}
</script>
<style scoped>
.left-card {
  width: 26.25rem;
}
</style>
