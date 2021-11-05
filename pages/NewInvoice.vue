<template>
  <div class="flex flex-col lg:flex-row lg:space-x-10">
    <!-- invoice builder -->
    <containers-container-with-title class="lg:min-w-[448px]">
      <template v-slot:headerbox>
        <span class="text-xl capitalize">
          client
        </span>
        <button type="button" @click="$modal.show('inviteClientModal')">
          <img
            class="h-4"
            src="~/assets/img/svgs/plus-icon.svg"
            alt=""
            srcset=""
          />
        </button>
      </template>
      <template v-slot:content>
        <div>
          <label class="input-text-label">
            Choose
          </label>
          <gw-customer-selector
            v-model="invoiceDetails.client"
            :clients="allClients"
          >
            <template v-slot:dropdownOption="{ optionObject }">
              <div class="flex justify-between min-w-full items-center">
                <div class="flex items-center content-center py-1">
                  <ClientAvatar
                    :width="2.3"
                    :height="2.3"
                    :client-info="optionObject"
                  />
                  <p class="capitalize text-gray-700 ml-4">
                    {{ optionObject.firstName }}
                  </p>
                </div>
                <div class="check">
                  <i class="ns-check text-blue-500 text-lg"></i>
                </div>
              </div>
            </template>
            <template v-slot:footer>
              <button
                type="button"
                class="py-2 outline-none"
                @click="$modal.show('inviteClientModal')"
              >
                <div class="flex px-2 ml-1 items-center justify-center">
                  <i class="ns-plus text-base rounded-full text-blue-500 p-1" />
                  <span
                    class="text-primary-color text-base pl-2"
                  >Add New Client</span>
                </div>
              </button>
            </template>
          </gw-customer-selector>
        </div>
        <div class="flex items-center justify-between">
          <p class="capitalize text-xl font-normal">
            invoice service &amp; items
          </p>
          <button type="button" @click="$modal.show('add-service-modal')">
            <img
              class="h-4"
              src="~/assets/img/svgs/plus-icon.svg"
              alt=""
              srcset=""
            />
          </button>
        </div>
        <div class="space-y-6">
          <div class="flex flex-col space-y-2">
            <label class="input-text-label">
              Choose
            </label>
            <gw-customer-selector
              multiple
              :clients="$auth.user.services"
              @change="invoiceDetails.services = $event"
            >
              <template v-slot:dropdownOption="{ optionObject }">
                <div class="flex justify-between min-w-full items-center">
                  <div class="flex content-center py-1">
                    <div class="flex flex-col ml-1 text-gray-700">
                      <p class="capitalize mb-2">
                        {{ optionObject.description }}
                      </p>
                      <small class="text-gray-700 text-sm">
                        {{ optionObject.pricing.amount | amount }}</small>
                    </div>
                  </div>
                  <div class="check">
                    <i class="ns-check text-blue-500 text-lg"></i>
                  </div>
                </div>
              </template>
              <template v-slot:footer>
                <button
                  type="button"
                  class="py-2 outline-none"
                  @click="$modal.show('add-service-modal')"
                >
                  <div class="flex px-2 ml-1 items-center justify-center">
                    <i
                      class="ns-plus text-base rounded-full text-blue-500 p-1"
                    />
                    <span
                      class="text-primary-color text-base pl-2"
                    >Add New Item</span>
                  </div>
                </button>
              </template>
            </gw-customer-selector>
            <div
              v-if="invoiceDetails.services.length"
              class="rounded-xl border bg-gray-50 py-4 px-3 space-y-3"
            >
              <div
                v-for="service in invoiceDetails.services"
                :key="service._id"
                class="flex justify-between items-center"
              >
                <div class="max-w-[180px] md:max-w-[500px] lg:max-w-[300px]">
                  <p class="font-medium capitalize">
                    {{ service.description }}
                  </p>
                  <p class="text-xs truncate">
                    {{ service.subtitle }}
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <span> {{ service.pricing.amount | amount }} </span>
                  <div class="relative">
                    <button type="button" @click="toggleShowDropdown">
                      <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
                    </button>
                    <!-- dropdown menu -->
                    <div
                      v-show="showDropDown"
                      class="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
                    >
                      <div class="py-2" role="none">
                        <button
                          type="button"
                          class="dropdown-button"
                          @click="editServiceItem(service)"
                        >
                          Edit
                        </button>
                        <button type="button" class="dropdown-button">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input type="checkbox" class="p-2" />
            <span class="font-light">Value Added Tax (VAT)</span>
          </div>
          <div>
            <label for="dueDate" class="input-text-label">Due date</label>
            <date-picker
              v-model="invoiceDetails.dueDate"
              style="width: 100% !important"
              class="w-full"
              :disabled-date="date => date < new Date()"
              value-type="format"
              placeholder="Select a due date for this invoice"
            ></date-picker>
          </div>
        </div>
        <div class="flex justify-end space-x-6 lg:space-x-0">
          <button
            type="button"
            class="button-outline lg:hidden"
            @click="$modal.show('preview-invoice')"
          >
            preview
          </button>
          <button-spinner
            :loading="isLoading"
            :disabled="!allowCreating"
            type="button"
            style="width:fit-content"
            @click="send"
          >
            send invoice
          </button-spinner>
        </div>
      </template>
    </containers-container-with-title>

    <!-- divider -->
    <span class="divider"></span>

    <!-- invoice previews -->
    <invoices-invoice-preview
      :client="invoiceDetails.client"
      :services="invoiceDetails.services"
      :due-date="invoiceDetails.dueDate"
    />

    <!-- modals -->
    <!-- invite clietn modal -->
    <modal name="inviteClientModal" height="auto" :adaptive="true">
      <InviteNewClient class="m-6" @close="$modal.hide('inviteClientModal')" />
    </modal>

    <!-- adding and editing services modal -->
    <modal name="add-service-modal" height="auto" :adaptive="true">
      <invoices-add-new-invoice-service
        class="m-6"
        :service-object="serviceObject"
        :selected-service-index="selectedServiceProps"
        @clearSelectedServiceIndex="selectedServiceProps = $event"
        @close-modal="$modal.hide('add-service-modal')"
      />
    </modal>

    <!-- previewing invoices -->
    <modal name="preview-invoice" height="100%" width="100%" :adaptive="true">
      <invoices-invoice-preview
        class="m-6"
        :client="invoiceDetails.client"
        :services="invoiceDetails.services"
        :due-date="invoiceDetails.dueDate"
        @close="$modal.hide('preview-invoice')"
      />
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker'
import _ from 'lodash'
export default {
  name: 'NewInvoice',
  components: { DatePicker },
  layout: 'invoice',
  data () {
    return {
      invoiceId: null,
      invoiceDetails: {
        client: this.$route.params.pushedClient || null,
        services: [],
        dueDate: new Date()
      },
      isLoading: false,
      showDropDown: false,
      serviceObject: null,
      selectedServiceProps: null
    }
  },
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients'
    }),
    allowCreating () {
      return (
        !!this.invoiceDetails.client &&
        Boolean(this.invoiceDetails.services.length)
      )
    },
    invoiceToBeSent () {
      return {
        items: this.invoiceDetails.services.map((service) => {
          return {
            serviceId: service._id,
            qty: 1,
            price: service.pricing.amount,
            description: service.description
          }
        }),
        customerId: this.invoiceDetails.client._id,
        dueDate: this.invoiceDetails.dueDate,
        dueDateEpoch: new Date(this.invoiceDetails.dueDate).getTime() / 1000,
        client: this.invoiceDetails.client
      }
    }
  },
  watch: {
    invoiceDetails: {
      handler (newValue) {
        if (newValue.client !== null && this.invoiceId === null) {
          this.$nuxt.$emit('autosaving-invoice')
          return this.createNewInvoice(this.invoiceToBeSent).then((result) => {
            if (result.status === 'success') {
              const invoiceId = result.data._id
              this.invoiceId = invoiceId
            }
          })
        } else if (this.invoiceId) {
          this.debounceUpdateInvoice()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.debounceUpdateInvoice = _.debounce(this.updateInvoice, 3000)
  },
  methods: {
    ...mapActions('invoice', {
      createNewInvoice: 'createInvoice',
      sendInvoice: 'sendInvoice',
      fetchInvoices: 'getInvoices'
    }),
    async send () {
      try {
        this.isLoading = true
        const sending = await this.sendInvoice({ id: this.invoiceId })
        if (sending.status === 'success') {
          this.$toast.success('Invoice sending successful', {
            position: 'top-right'
          })
          this.$router.push({ name: 'Invoices-sent' })
        }
      } catch (error) {
        this.isLoading = false
        if (error.response) {
          this.$toast.error(
            `Something went wrong: ${error.response.data.message}`,
            { position: 'bottom-right' }
          )
        } else if (error.request) {
          this.$toast.error('Something went wrong. Try again', {
            position: 'bottom-right'
          })
        } else {
          this.$toast.error(`Something went wrong: ${error.message}`, {
            position: 'bottom-right'
          })
        }
      }
    },
    updateInvoice () {
      // autosave
      try {
        this.$nuxt.$emit('autosaving-invoice')
        this.$axios.$put(
          `${process.env.BASEURL_HOST}/invoice/${this.invoiceId}`,
          this.invoiceToBeSent
        )
      } catch (error) {
        console.error(error)
      }
    },
    toggleShowDropdown () {
      this.showDropDown = !this.showDropDown
    },
    editServiceItem (id) {
      this.serviceObject = id
      this.$modal.show('add-service-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  @apply hidden lg:block bg-gray-200 w-[1px];
}

.dropdown-button {
  @apply text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left;
}
</style>
