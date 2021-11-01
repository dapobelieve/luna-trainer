<template>
  <div v-if="invoiceDetails" class="flex flex-col lg:flex-row lg:space-x-10">
    <containers-container-with-title class="lg:min-w-[448px]">
      <template v-slot:headerbox>
        <span class="text-xl capitalize">
          client
        </span>
        <button disabled type="button" @click="$modal.show('inviteClientModal')">
          <img class="h-4" src="~/assets/img/svgs/plus-icon.svg" alt="" srcset="" />
        </button>
      </template>
      <template v-slot:content>
        <div>
          <label class="input-text-label">
            Choose
          </label>
          <gw-customer-selector v-model="invoiceDetails.customerId" disabled :clients="allClients">
            <template v-slot:dropdownOption="{optionObject}">
              <div class="flex justify-between min-w-full items-center">
                <div class="flex items-center content-center py-1">
                  <ClientAvatar :width="2.3" :height="2.3" :client-info="optionObject" />
                  <p class="capitalize text-gray-700 ml-2">
                    {{ optionObject.firstName }}
                  </p>
                </div>
                <div class="check">
                  <i class="ns-check text-blue-500 text-lg"></i>
                </div>
              </div>
            </template>
          </gw-customer-selector>
        </div>
        <div class="flex items-center justify-between">
          <p class="capitalize text-xl font-normal">
            invoice service &amp; items
          </p>
          <button type="button" @click="serviceObject=null; $modal.show('add-service-modal')">
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
            <label
              class="input-text-label"
            >
              Choose
            </label>
            <gw-customer-selector
              v-model="invoiceDetails.items"
              multiple
              :clients="invoiceDetails.ownerId.services"
              @change="invoiceDetails.items = [...$event]"
            >
              <template v-slot:dropdownOption="{optionObject}">
                <div class="flex justify-between min-w-full items-center">
                  <div class="flex content-center py-1">
                    <div class="flex flex-col ml-1 text-gray-700">
                      <p class="capitalize">
                        {{ optionObject.description }}
                      </p>
                      <small class="text-gray-500"> {{ optionObject.pricing.amount | amount }}</small>
                    </div>
                  </div>
                  <div class="check">
                    <i class="ns-check text-blue-500 text-lg"></i>
                  </div>
                </div>
              </template>
              <template v-slot:footer>
                <button type="button" class="py-2 outline-none" @click="$modal.show('add-service-modal')">
                  <div class="flex px-2 ml-1 items-center justify-center">
                    <i class="ns-plus text-base rounded-full text-blue-500 p-1" />
                    <span class="text-primary-color text-base pl-2">Add New Item</span>
                  </div>
                </button>
              </template>
            </gw-customer-selector>

            <div
              v-if="invoiceDetails && invoiceDetails.items "
              class="rounded-xl border bg-gray-50 py-4 px-3 space-y-3"
            >
              <div
                v-for="(service) in invoiceDetails.items"
                :key="service._id"
                class="flex justify-between items-center"
              >
                <div
                  class="max-w-[180px] md:max-w-[500px] lg:max-w-[300px]"
                >
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
            <label
              for="dueDate"
              class="input-text-label"
            >Due date</label>
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
        <div
          class="flex justify-end space-x-6 lg:space-x-0"
        >
          <button
            type="button"
            class="button-outline lg:hidden"
            @click="$modal.show('preview-invoice')"
          >
            preview
          </button>
          <button-spinner
            :loading="isLoading"
            type="button"
            style="width:fit-content"
            @click="updateInvoice"
          >
            Update Invoice
          </button-spinner>
        </div>
      </template>
    </containers-container-with-title>

    <!-- divider -->
    <span
      class="divider"
    ></span>

    <!-- invoice previews -->
    <div v-if="invoiceDetails" class="hidden lg:block lg:min-w-[448px] space-y-8">
      <p class="capitalize text-lg font-medium">
        preview
      </p>
      <section class="lg:w-[448px]">
        <ul
          class="tabs flex space-x-8 mb-6 pb-4 pl-4 border-b"
        >
          <button
            id="defaultOpen"
            class="tablinks"
            @click.prevent="switchTabs($event, 'Email')"
          >
            Email
          </button>
          <button class="tablinks" @click.prevent="switchTabs($event, 'PDF')">
            Invoice PDF
          </button>
        </ul>
        <!-- Tab contents -->
        <!-- email section -->
        <div id="Email" class="tabcontent">
          <containers-container-with-title class="">
            <template v-slot:headerbox>
              <span class="text-xl capitalize">
                getwelp limited
              </span>
            </template>
            <template v-slot:content>
              <div>
                <div class="grid grid-cols-2 pb-4">
                  <div class="">
                    <p class="text-gray-500 text-base">
                      From
                    </p>
                    <p class="text-gray-700 font-medium">
                      {{ $auth.user.businessName }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-500 text-base">
                      To
                    </p>
                    <p
                      class="text-gray-700 font-medium capitalize"
                    >
                      {{ client ? client.firstName : "Client's name" }}
                    </p>
                  </div>
                </div>
                <div
                  class="rounded-xl bg-gray-100 border p-3"
                >
                  <p class="pb-1 text-gray-500 text-base">
                    Amount
                  </p>
                  <p class="text-3xl text-gray-700 pb-2">
                    {{ totalServiceAmount | amount }}
                  </p>
                  <p class="text-sm text-gray-700">
                    Due on {{ invoiceDetails.dueDate | date }}
                  </p>
                </div>
              </div>
              <div>
                <div v-if="invoiceDetails.items.length" class="space-y-5">
                  <div
                    v-for="service in invoiceDetails.items"
                    :key="service._id"
                    class="flex justify-between items-center last:border-b last:pb-5"
                  >
                    <div>
                      <p class="text-gray-700 font-medium capitalize">
                        {{ service.description }}
                      </p>
                      <p class="text-gray-500 text-sm">
                        Qty 1
                      </p>
                    </div>
                    <span class="text-gray-700 font-medium">{{
                      service.pricing.amount | amount
                    }}</span>
                  </div>
                </div>
                <div v-else class="text-center">
                  <em>Please select a service</em>
                </div>
                <div class="flex justify-between py-3">
                  <p class="text-gray-700 text-xl">
                    Total
                  </p>
                  <p class="text-lg font-bold text-gray-700">
                    {{ totalServiceAmount | amount }}
                  </p>
                </div>
              </div>
            </template>
          </containers-container-with-title>
        </div>

        <!-- pdf section -->
        <div v-if="invoiceDetails" id="PDF" class="tabcontent">
          <containers-container-with-title class="">
            <template v-slot:headerbox>
              <div>
                <h2 class="text-xl capitalize">
                  getwelp limited
                </h2>
                <span class="text-sm">
                  Tel: +44 000 000 0000
                </span>
              </div>
            </template>
            <template v-slot:content>
              <div>
                <div class="pb-4 space-y-1">
                  <p class="text-gray-700 text-base capitalize">
                    Bill to
                  </p>
                  <p class="text-gray-700 text-base">
                    {{ invoiceDetails.customerId ? invoiceDetails.customerId.firstName : 'N/A' }}
                  </p>
                  <p class="text-gray-700 text-base">
                    {{ invoiceDetails.customerId ? invoiceDetails.customerId.email : '' }}
                  </p>
                </div>
                <div class="grid grid-cols-2 pb-4">
                  <div class="">
                    <p class="text-gray-500 text-sm">
                      Date of issue:
                    </p>
                    <p class="text-gray-500 text-sm">
                      {{ invoiceDetails.dueDate | date }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-500 text-sm">
                      Due Date
                    </p>
                    <p class="text-gray-500 text-sm">
                      {{ invoiceDetails.dueDate | date }}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div class="space-y-5">
                  <div class="grid grid-cols-4">
                    <p class="text-gray-500 uppercase text-xs">
                      description
                    </p>
                    <p
                      class="text-gray-500 uppercase text-xs justify-self-end"
                    >
                      qty
                    </p>
                    <p
                      class="text-gray-500 uppercase text-xs justify-self-end"
                    >
                      unit price
                    </p>
                    <p
                      class="text-gray-500 uppercase text-xs justify-self-end"
                    >
                      amount
                    </p>
                  </div>
                  <template v-if="invoiceDetails.items.length">
                    <div
                      v-for="service in invoiceDetails.items"
                      :key="service._id"
                      class="grid grid-cols-4 last:border-b last:pb-5"
                    >
                      <p class="text-gray-500 text-sm capitalize">
                        omolomo
                        {{ service.description }}
                      </p>
                      <p
                        class="text-gray-500 text-sm justify-self-end"
                      >
                        1
                      </p>
                      <p
                        class="text-gray-500 text-sm justify-self-end"
                      >
                        {{ service.pricing.amount | amount }}
                      </p>
                      <p
                        class="text-gray-500 text-sm justify-self-end"
                      >
                        {{ service.pricing.amount | amount }}
                      </p>
                    </div>
                  </template>
                  <div v-else class="text-center">
                    <em>
                      Please select a service
                    </em>
                  </div>
                </div>
                <div class="flex justify-between py-3">
                  <p class="text-gray-500 text-xl">
                    Total
                  </p>
                  <p class="text-lg font-bold text-gray-700">
                    {{ totalServiceAmount | amount }}
                  </p>
                </div>
              </div>
            </template>
          </containers-container-with-title>
        </div>
      </section>
    </div>
    
    <!-- adding and editing services modal -->
    <modal name="add-service-modal" height="auto" :adaptive="true">
      <invoices-add-new-invoice-service
        class="m-6"
        :service-object="serviceObject"
        :selected-service-index="selectedServiceProps"
        @edited="updateInvoice(false); fetchInvoice()"
        @clearSelectedServiceIndex="selectedServiceProps = $event"
        @close-modal="$modal.hide('add-service-modal')"
      />
    </modal>

    <!-- previewing invoices -->
    <modal name="preview-invoice" height="100%" width="100%" :adaptive="true">
      <invoices-invoice-preview
        v-if="invoiceDetails && invoiceDetails.customerId"
        class="m-6"
        :client="invoiceDetails.customerId"
        :services="invoiceDetails.services"
        :due-date="invoiceDetails.dueDate"
        @close="$modal.hide('preview-invoice')"
      />
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker'
import ServiceDisplay from '~/components/invoices/ServiceDisplay'
export default {
  name: 'EditInvoice',
  components: { ServiceDisplay, DatePicker },
  inject: ['sharedPage'],
  layout: 'invoice',
  data () {
    return {
      invoiceDetails: null,
      isLoading: false,
      showDropDown: false,
      selectedServiceProps: null,
      serviceObject: null
    }
  },
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients'
    }),
    selectedServices: {
      get () {
        return this.invoiceDetails.items
      },
      set (newVal) {
        this.invoiceDetails.items = [...newVal]
        console.log(newVal)
      }
    },
    client () {
      return this.invoiceDetails.customerId
    },
    allowCreating () {
      return (
        !!this.invoiceDetails.client &&
        Boolean(this.invoiceDetails.services.length)
      )
    },
    totalServiceAmount () {
      return JSON.parse(JSON.stringify(this.invoiceDetails.items)).reduce((acc, item) => {
        const total = item.pricing.amount += acc
        return total
      }, 0)
    }
  },
  async mounted () {
    this.sharedPage.page = 'Edit Invoice'
    await this.fetchInvoice()
  },
  methods: {
    async fetchInvoice () {
      console.log('Fetching...')
      try {
        const { data } = await this.$store.dispatch('invoice/getSingleInvoice', this.$route.params.id)
        this.invoiceDetails = { ...data }
        if (this.invoiceDetails) {
          this.invoiceDetails.items = this.invoiceDetails.items.map((item) => {
            return this.$auth.user.services.filter(service => service._id === item.serviceId)[0]
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    switchTabs (evt, cityName) {
      // Declare all variables
      let i, tabcontent, tablinks

      // Get all elements with class="tabcontent" and hide them
      // eslint-disable-next-line prefer-const
      tabcontent = document.getElementsByClassName('tabcontent')
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
      }

      // Get all elements with class="tablinks" and remove the class "active"
      // eslint-disable-next-line prefer-const
      tablinks = document.getElementsByClassName('tablinks')
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = 'block'
      evt.currentTarget.className += ' active'
    },
    editServiceItem (service) {
      this.serviceObject = { ...service }
      this.$modal.show('add-service-modal')
    },
    async updateInvoice (redirect = true) {
      try {
        await this.$store.dispatch('invoice/updateInvoice', { ...this.invoiceDetails })
        this.$toast.success('Invoice updated', { position: 'top-right' })
        if (redirect) {
          this.$router.push({ name: 'Invoices-drafts' })
        }
      } catch (e) {
        //
      }
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
.tablinks {
  @apply text-base font-normal text-gray-400;
}
.tabs {
  color: rgb(128, 123, 123);
}
.tabs button {
  transition: 0.3s;
}

button {
  position: relative;
  &.active {
    @apply text-gray-700 font-normal;
    &::after {
      content: "";
      @apply bg-blue-500 h-1 w-full rounded-sm shadow-md absolute -bottom-4;
    }
  }
}

.tabcontent {
  display: none;
}
</style>
