<template>
  <div class="flex flex-col lg:flex-row lg:space-x-10">
    <!-- invoice builder -->
    <containers-container-with-title class="lg:min-w-[448px]">
      <template v-slot:headerbox>
        <span class="text-xl capitalize">
          client
        </span>
        <button :disabled="mode==='edit'" type="button" @click="$modal.show('inviteClientModal')">
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
          <gw-customer-selector v-model="invoiceDetails.customerId" :disabled="mode==='edit'" :clients="allClients">
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
              v-model="invoiceDetails.services"
              :disabled="!invoiceDetails.customerId"
              multiple
              :clients="$auth.user.services"
              @change="handleSelection"
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
                    <span class="text-primary-color text-base pl-2">Add New Item</span>
                  </div>
                </button>
              </template>
            </gw-customer-selector>
            <div
              v-if="invoiceDetails.services"
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
                <ServiceDisplay :service="service" @edit-service="editServiceItem($event)">
                </ServiceDisplay>
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
              :disabled="invoiceDetails.services && invoiceDetails.services.length === 0"
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
import isEmpty from 'lodash.isempty'
import debounce from 'lodash.debounce'
import ServiceDisplay from '~/components/invoices/ServiceDisplay'
export default {
  name: 'Invoice',
  components: { ServiceDisplay, DatePicker },
  layout: 'invoice',
  props: {
    invoiceData: {
      type: Object
    },
    mode: {
      type: String,
      default: 'create'
    }
  },
  data () {
    return {
      invoiceId: null,
      invoiceDetails: {
        services: []
      },
      isLoading: false,
      showDropDown: false,
      serviceObject: null,
      selectedServiceProps: null
    }
  },
  watch: {
    'invoiceDetails.services': {
      handler (val) {
        this.updateInvoice()
      }
    },
    invoiceDetails: {
      handler (newValue) {
        if (this.invoiceId === null && this.invoiceDetails.customerId) {
          this.$nuxt.$emit('autosaving-invoice')
          this.createInvoice()
        } else if (this.invoiceId) {
          this.updateInvoice()
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients'
    }),
    allowCreating () {
      return (
        !!this.invoiceDetails.customerId &&
        Boolean(this.invoiceDetails.services && this.invoiceDetails.services.length)
      )
    },
    invoiceToBeSent () {
      if (this.invoiceDetails.services) {
        return {
          items: this.invoiceDetails.services.map((service) => {
            return {
              serviceId: service._id,
              qty: 1,
              price: service.pricing.amount,
              description: service.description
            }
          }),
          customerId: this.invoiceDetails.customerId ? this.invoiceDetails.customerId._id : null,
          dueDate: this.invoiceDetails.dueDate || new Date(),
          dueDateEpoch: new Date(this.invoiceDetails.dueDate).getTime() / 1000 || new Date().getTime() / 1000,
          client: this.invoiceDetails.client
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    handleSelection (data) {
      this.$set(this.invoiceDetails, 'services', data)
    },
    ...mapActions('invoice', {
      createNewInvoice: 'createInvoice',
      sendInvoice: 'sendInvoice',
      fetchInvoices: 'getInvoices'
    }),
    async createInvoice () {
      const res = await this.createNewInvoice(this.invoiceToBeSent)
      this.invoiceId = res.data._id
      this.$router.replace({
        name: 'invoice-id',
        params: {
          id: res.data._id
        }
      })
    },
    async send () {
      try {
        this.isLoading = true
        const sending = await this.sendInvoice({ id: this.invoiceId })
        if (sending.status === 'success') {
          this.$toast.success('Invoice sending successful', {
            position: 'top-right'
          })
          this.$router.push({ name: 'invoices-sent' })
        }
      } catch (error) {
        this.isLoading = false
        const errorResponse = this.$errorHandler.setAndParse(error)
        this.$toast.error(
          `Something went wrong: ${errorResponse.message}`,
          { position: 'bottom-right' }
        )
        // if (error.response) {
        //   this.$toast.error(
        //     `Something went wrong: ${error.response.data.message}`,
        //     { position: 'bottom-right' }
        //   )
        // } else if (error.request) {
        //   this.$toast.error('Something went wrong. Try again', {
        //     position: 'bottom-right'
        //   })
        // } else {
        //   this.$toast.error(`Something went wrong: ${error.message}`, {
        //     position: 'bottom-right'
        //   })
        // }
      }
    },
    updateInvoice: debounce(async function () {
      try {
        this.$nuxt.$emit('autosaving-invoice')
        await this.$axios.$put(`${process.env.BASEURL_HOST}/invoice/${this.invoiceId}`, this.invoiceToBeSent)
      } catch (error) {
        console.error(error)
      }
    }, 1000),
    editServiceItem (id) {
      this.serviceObject = id
      this.$modal.show('add-service-modal')
    }
  },
  mounted () {
    if (this.invoiceDetails.items && this.invoiceDetails.items.length) {
      const items = this.invoiceDetails.items.map((item) => {
        return this.$auth.user.services.filter(service => service._id === item.serviceId)[0]
      })
      this.$set(this.invoiceDetails, 'services', items)
    }
  },
  beforeMount () {
    if (!isEmpty(this.invoiceData)) {
      this.invoiceDetails = { ...this.invoiceData }
      this.invoiceId = this.invoiceDetails._id
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
