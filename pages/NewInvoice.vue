<template>
  <div class="tail-flex tail-flex-col lg:tail-flex-row lg:tail-space-x-10">
    <!-- invoice builder -->
    <containers-container-with-title class="lg:tail-min-w-[448px]">
      <template v-slot:headerbox>
        <span class="tail-text-xl tail-capitalize">
          client
        </span>
        <button type="button" @click="$modal.show('inviteClientModal')">
          <img
            class="tail-h-4"
            src="~/assets/img/svgs/plus-icon.svg"
            alt=""
            srcset=""
          />
        </button>
      </template>
      <template v-slot:content>
        <div>
          <label
            class="input-text-label"
          >
            Choose
          </label>
          <gw-customer-selector :clients="allClients" v-model="invoiceDetails.client">
            <template v-slot:dropdownOption="{optionObject}">
              <div class="tail-flex tail-justify-between tail-min-w-full tail-items-center">
                <div class="tail-flex tail-content-center tail-py-1">
                  <ClientAvatar :width="2.3" :height="2.3" :client-info="optionObject" />
                  <div class="tail-flex tail-flex-col tail-ml-2 tail-text-gray-700">
                    <p class="tail-capitalize">
                      {{ optionObject.firstName }}
                    </p>
                    <small class="tail-text-gray-500"> {{ optionObject.email }}</small>
                  </div>
                </div>
                <div class="check">
                  <i class="ns-check tail-text-blue-500 tail-text-lg"></i>
                </div>
              </div>
            </template>
          </gw-customer-selector>
        </div>
        <div class="tail-flex tail-items-center tail-justify-between">
          <p class="tail-capitalize tail-text-xl tail-font-normal">
            invoice service &amp; items
          </p>
          <button type="button" @click="$modal.show('add-service-modal')">
            <img
              class="tail-h-4"
              src="~/assets/img/svgs/plus-icon.svg"
              alt=""
              srcset=""
            />
          </button>
        </div>
        <div class="tail-space-y-6">
          <div class="tail-flex tail-flex-col tail-space-y-2">
            <label
              class="input-text-label"
            >
              Choose
            </label>
            <gw-customer-selector multiple :clients="$auth.user.services" @change="invoiceDetails.services = $event">
              <template v-slot:dropdownOption="{optionObject}">
                <div class="tail-flex tail-justify-between tail-min-w-full tail-items-center">
                  <div class="tail-flex tail-content-center tail-py-1">
                    <div class="tail-flex tail-flex-col tail-ml-1 tail-text-gray-700">
                      <p class="tail-capitalize">
                        {{ optionObject.description }}
                      </p>
                      <small class="tail-text-gray-500"> {{ optionObject.pricing.amount | amount }}</small>
                    </div>
                  </div>
                  <div class="check">
                    <i class="ns-check tail-text-blue-500 tail-text-lg"></i>
                  </div>
                </div>
              </template>
            </gw-customer-selector>

            <div
              v-if="invoiceDetails.services.length"
              class="tail-rounded-xl tail-border tail-bg-gray-50 tail-py-4 tail-px-3 tail-space-y-3"
            >
              <div
                v-for="(service, index) in invoiceDetails.services"
                :key="service._id"
                class="tail-flex tail-justify-between tail-items-center"
              >
                <div
                  class="tail-max-w-[180px] md:tail-max-w-[500px] lg:tail-max-w-[300px]"
                >
                  <p class="tail-font-medium tail-capitalize">
                    {{ service.description }}
                  </p>
                  <p class="tail-text-xs tail-truncate">
                    {{ service.subtitle }}
                  </p>
                </div>
                <div class="tail-flex tail-items-center tail-space-x-2">
                  <span> {{ service.pricing.amount | amount }} </span>
                  <div class="tail-relative">
                    <button type="button" @click="showDropdown">
                      <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
                    </button>
                    <!-- dropdown menu -->
                    <div
                      v-show="showDropDown"
                      class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-44 tail-rounded-lg tail-shadow-lg tail-bg-white tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none tail-z-40"
                    >
                      <div class="tail-py-2" role="none">
                        <button
                          type="button"
                          class="dropdown-button"
                          @click="editServiceItem(index)"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="dropdown-button"
                        >
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
            <input type="checkbox" class="tail-p-2" />
            <span class="tail-font-light">Value Added Tax (VAT)</span>
          </div>
          <div>
            <label
              for="dueDate"
              class="input-text-label"
            >Due date</label>
            <date-picker
              v-model="invoiceDetails.dueDate"
              style="width: 100% !important"
              class="tail-w-full"
              :disabled-date="date => date < new Date()"
              value-type="format"
              placeholder="Select a due date for this invoice"
            ></date-picker>
          </div>
        </div>
        <div
          class="tail-flex tail-justify-end tail-space-x-6 lg:tail-space-x-0"
        >
          <button
            type="button"
            class="button-outline lg:tail-hidden"
            @click="$modal.show('preview-invoice')"
          >
            preview
          </button>
          <button-spinner
            :loading="isLoading"
            :disabled="!allowCreating"
            type="button"
            style="width:fit-content"
            @click="createInvoice"
          >
            send invoice
          </button-spinner>
        </div>
      </template>
    </containers-container-with-title>

    <!-- divider -->
    <span
      class="divider"
    ></span>

    <!-- invoice previews -->
    <invoices-invoice-preview
      :client="invoiceDetails.client"
      :services="invoiceDetails.services"
      :due-date="invoiceDetails.dueDate"
    />

    <!-- modals -->
    <!-- invite clietn modal -->
    <modal name="inviteClientModal" height="auto" :adaptive="true">
      <InviteNewClient
        class="tail-m-6"
        @close="$modal.hide('inviteClientModal')"
      />
    </modal>

    <!-- adding and editing services modal -->
    <modal name="add-service-modal" height="auto" :adaptive="true">
      <invoices-add-new-invoice-service
        class="tail-m-6"
        :selected-service-index="selectedServiceProps"
        @clearSelectedServiceIndex="selectedServiceProps = $event"
        @close-modal="$modal.hide('add-service-modal')"
      />
    </modal>

    <!-- previewing invoices -->
    <modal name="preview-invoice" height="100%" width="100%" :adaptive="true">
      <invoices-invoice-preview
        class="tail-m-6"
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
export default {
  name: 'NewInvoice',
  components: { DatePicker },
  layout: 'invoice',
  data () {
    return {
      invoiceDetails: {
        client: this.$route.params.pushedClient || null,
        services: [],
        dueDate: new Date()
      },
      isLoading: false,
      showDropDown: false,
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
    }
  },
  methods: {
    ...mapActions({
      createNewInvoice: 'invoice/createInvoice'
    }),
    showDropdown () {
      this.showDropDown = !this.showDropDown
    },
    editServiceItem (id) {
      this.selectedServiceProps = id
      this.$modal.show('add-service-modal')
    },
    createInvoice () {
      this.isLoading = true
      const invoiceToBeSent = {
        items: this.invoiceDetails.services.map((service) => {
          return {
            serviceId: service._id,
            qty: 1,
            price: service.pricing.amount
          }
        }),
        customerId: this.invoiceDetails.client._id,
        dueDate: this.invoiceDetails.dueDate,
        dueDateEpoch: new Date(this.invoiceDetails.dueDate).getTime() / 1000,
        client: this.invoiceDetails.client
      }
      this.createNewInvoice(invoiceToBeSent)
        .then((result) => {
          if (result.status === 'success') {
            this.$router.push({ name: 'Invoices-sent' })
            this.$toast.success('Invoice created successfully', {
              position: 'top-right'
            })
          }
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(
              `Something went wrong: ${err.response.data.message}`,
              { position: 'bottom-right' }
            )
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', {
              position: 'bottom-right'
            })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, {
              position: 'bottom-right'
            })
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  @apply tail-hidden lg:tail-block tail-bg-gray-200 tail-w-[1px];
}

.dropdown-button {
  @apply tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100 tail-w-full tail-text-left;
}
</style>
