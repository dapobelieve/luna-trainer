<template>
  <div
    class="
      sm:flex-col sm:flex-grow sm:flex-shrink
      lg:flex-grow-0 lg:flex-shrink-0
      flex
      lg:flex-row lg:space-x-10
    "
  >
    <!--  invoice builder -->
    <form method="post" action="/invoice" @change="saveForm">
      <container-with-title class="lg:min-w-[500px] lg:max-w-[510px]">
        <template v-slot:headerbox>
          <p class="capitalize text-lg mt-2 font-medium">
            <i class="mr-4 mt-0.5 fi-rr-receipt"> </i>{{ invoice._id ? 'Edit' : 'Create' }} your payment request
          </p>
        </template>
        <template v-slot:content>
          <div id="customer">
            <h2 class="mb-2 required">
              Select a client
            </h2>
            <LunaSelector
              v-model="invoice.customer"
              :options="allClients"
              index="userId"
              label="firstName"
              taggable
              @option:created="openInviteClientModal($event)"
            >
              <template v-slot:selectedOption="{ selected }">
                <div>
                  {{ selected.firstName }}
                </div>
              </template>
              <template v-slot:footer="{ search }">
                <button
                  type="button hover:bg-black"
                  class="py-2 w-full"
                  @click.prevent="openInviteClientModal(search)"
                >
                  <div class="px-2 ml-1 text-primary-color">
                    <small>
                      <i class="fi-rr-plus rounded-full pt-4 pr-2" />
                      Add new client
                    </small>
                  </div>
                </button>
              </template>
              <template v-slot:dropdownOption="{ option }">
                <div
                  v-if="option.userId"
                  class="flex justify-between min-w-full items-center"
                >
                  <div class="flex items-center content-center py-1">
                    <ClientAvatar
                      :width="2.3"
                      :height="2.3"
                      :client-info="option"
                    />
                    <p class="capitalize text-gray-700 ml-4">
                      {{ option.firstName }}
                    </p>
                  </div>
                </div>
                <div
                  v-else
                  class="flex justify-between min-w-full items-center py-2"
                >
                  Invite {{ option.firstName }}
                </div>
              </template>
            </LunaSelector>
          </div>
          <div id="invoice-service-item" class="flex flex-col justify-between">
            <h2 class="mb-2 required">
              Select Invoice service &amp; items
            </h2>
            <div class="flex flex-col space-y-2">
              <LunaSelector
                v-model="items"
                :disabled="!invoice.customer"
                :options="services"
                index="serviceId"
                label="description"
                multiple
                @change="selectItem"
                @option:created="openEditItemModal($event)"
              >
                <template v-slot:dropdownOption="{ option }">
                  <div
                    v-if="option.serviceId"
                    class="flex justify-between min-w-full items-center"
                  >
                    <div class="flex content-center py-1">
                      <div class="flex flex-col ml-1 text-gray-700">
                        <p class="capitalize mb-2">
                          {{ option.description }}
                        </p>
                        <small class="text-gray-700 text-sm">
                          {{ option.price || 0 | amount }}</small>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="flex justify-between min-w-full items-center py-2"
                  >
                    <i
                      class="
                        ff-rr-plus
                        text-base
                        rounded-full
                        text-blue-500
                        p-1
                      "
                    />
                    Add {{ option.description }} as new service
                  </div>
                </template>
                <template v-slot:footer>
                  <button
                    type="button hover:bg-black"
                    class="py-2 w-full"
                    @click.prevent="openEditItemModal({ description: '' })"
                  >
                    <div class="px-2 ml-1 text-primary-color">
                      <small>
                        <i class="fi-rr-plus rounded-full pt-4 pr-2" />
                        Add new service
                      </small>
                    </div>
                  </button>
                </template>
              </LunaSelector>

              <div
                v-if="invoice.items && invoice.items.length"
                class="rounded-xl border bg-gray-50 py-4 px-3 space-y-3"
              >
                <div
                  v-for="item in invoice.items"
                  :key="item._id"
                  class="flex justify-between items-center"
                >
                  <div class="max-w-[180px] md:max-w-[500px] lg:max-w-[300px]">
                    <p
                      class="font-medium capitalize"
                      :class="{ 'invoice-one-time-item': !item.serviceId }"
                    >
                      {{ item.description }}
                    </p>
                  </div>
                  <ItemDisplay
                    :item="item"
                    @delete-item="deleteItem($event)"
                    @edit-item="editItem($event)"
                  >
                  </ItemDisplay>
                </div>
              </div>
              <small
                class="mt-3 block"
              ><button class="text-primary-color" @click.prevent="addOneTime">
                Add one-time invoice item
              </button></small>
            </div>
          </div>
          <div id="due-date">
            <h2 class="mb-2 required">
              Invoice due date
            </h2>
            <date-picker
              v-model="invoice.dueDate"
              style="width: 100% !important"
              class="w-full"
              :disabled="!invoice.customer"
              :disabled-date="(d) => { let date = new Date(); date.setDate(date.getDate() - 1); return d < date; }"
              value-type="format"
              placeholder="Select a due date for this invoice"
            ></date-picker>
          </div>
          <div id="memo" class="flex flex-col justify-between">
            <h2 class="mb-2">
              Memo
            </h2>
            <div class="flex flex-col space-y-2">
              <textarea
                v-model="invoice.note"
                class="
                  lg:min-h-[3rem]
                  rounded
                  lg:rounded-l
                  border border-gray-30
                  0
                  focus:border-blue-500 focus:outline-none
                  p-2
                "
              >
              </textarea>
            </div>
          </div>
          <div id="payment-method">
            <h2 class="mb-2 required">
              Allowed payment methods
            </h2>
            <div
              v-for="activePaymentMethod in activePaymentMethods"
              :key="activePaymentMethod._id"
              class="mt-2 flex items-center align-left justify-between"
            >
              <div class="flex item-stretch">
                <AppCheckboxComponent
                  :id="activePaymentMethod._id"
                  v-model="invoice.supportedPaymentMethods"
                  class="mr-2"
                  :value="activePaymentMethod._id"
                  :disabled="activePaymentMethod.isDefault"
                />
                <span
                  class="font-light"
                >Payment with
                  <i
                    v-if="activePaymentMethod.type == 'bank'"
                    class="fi-rr-bank"
                  ></i>
                  <img
                    v-else-if="activePaymentMethod.type == 'stripe'"
                    class="h-6 inline-block"
                    src="~/assets/img/stripe.png"
                    alt="stripe logo"
                  />
                </span>
              </div>
              <span
                v-if="activePaymentMethod.isDefault"
                class="font-light tag"
              >Default</span>
            </div>
            <small
              class="mt-3 block"
            ><a
              class="text-primary-color"
              href="/settings/billing/setup"
              @click.prevent="promptAddPaymentMethod"
            >Add another payment method
              <i class="fi-rr-link" /></a></small>
          </div>
          <div class="flex justify-end space-x-6 lg:space-x-0">
            <button
              Add
              one-time
              invoice
              item
              type="button"
              class="button-outline lg:hidden"
              @click.prevent="$modal.show('preview-invoice')"
            >
              Preview
            </button>
            <button-spinner
              class="button-outline"
              :loading="autoSaving"
              :disabled="!invoice.customer"
              type="button"
              style="width: fit-content; margin-right: 1em"
              @click.prevent="saveForm"
            >
              {{ autoSaving ? 'Saving' : 'Save' }}
            </button-spinner>
            <button-spinner
              :loading="isLoading"
              :disabled="!valid"
              type="button"
              style="width: fit-content"
              @click.prevent="send"
            >
              Send payment request
            </button-spinner>
          </div>
        </template>
      </container-with-title>
    </form>
    <!-- divider -->
    <span class="divider"></span>
    <!-- invoice previews -->
    <invoices-invoice-preview
      class="hidden max-w-[400px]"
      :invoice="invoice"
    />
    <div>
      <modal name="preview-invoice" height="100%" width="100%" :adaptive="true">
        <invoices-invoice-preview
          class="m-6"
          :invoice="invoice"
          @close="$modal.hide('preview-invoice')"
        />
      </modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker'
import isEmpty from 'lodash.isempty'
import ContainerWithTitle from '../Containers/ContainerWithTitle'
import InviteNewClient from '../InviteNewClient'
import EditInvoiceItem from './EditInvoiceItem'
import OnetimeInvoiceItem from './OnetimeInvoiceItem'
import ItemDisplay from '~/components/invoices/ItemDisplay'

export default {
  name: 'Invoice',
  components: {
    ItemDisplay,
    DatePicker,
    ContainerWithTitle
  },
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
      invoice: {
        customer: '',
        dueDate: '',
        items: [],
        supportedPaymentMethods: []
      },
      autoSaving: false,
      isLoading: false,
      showDropDown: false
    }
  },
  created () {
    this.invoice.customer = this.$route.params?.clientData
    this.invoice.dueDate = new Date().toISOString()
  },
  computed: {
    ...mapGetters({
      allClients: 'client/getAllClients',
      allServices: 'services/allServices',
      activePaymentMethods: 'payment-methods/getActivePaymentMethods',
      defaultPaymentMethod: 'payment-methods/getDefaultPaymentMethod'
    }),
    valid () {
      return (
        !!this.invoice.customer &&
        this.invoiceId &&
        this.invoice.items &&
        this.invoice.items.length &&
        this.invoice.supportedPaymentMethods &&
        this.invoice.supportedPaymentMethods.length
      )
    },
    services () {
      return this.allServices.map(service => ({
        serviceId: service._id,
        description: service.description,
        price: service.pricing.amount,
        idx: null,
        qty: 1
      }))
    },
    items () {
      return this.invoice.items.map(item => ({
        serviceId: item.serviceId,
        description: item.description,
        price: item.price,
        idx: item.serviceId ? null : this.getUniqueId(),
        qty: 1
      }))
    }
  },
  methods: {
    ...mapActions('invoice', {
      createNewInvoice: 'createInvoice',
      fetchInvoices: 'getInvoices'
    }),
    ...mapActions({ getServices: 'services/getServices' }),
    async saveForm () {
      this.autoSaving = true
      this.$nuxt.$emit('autosaving-invoice')
      if (this.invoiceId === null && this.invoice.customer) {
        await this.createInvoice()
      } else if (this.invoiceId) {
        await this.updateInvoice()
      }
      this.$nuxt.$emit('autosaving-invoice-completed')
      this.autoSaving = false
    },
    addOneTime () {
      this.$modal.show(
        OnetimeInvoiceItem,
        {
          item: {
            description: '',
            price: 0
          }
        },
        { adaptive: true, height: 350 }
      )
    },
    appendOneTimeItem (item) {
      this.invoice.items.push({
        description: item.description,
        price: item.pricing.amount,
        idx: this.getUniqueId(),
        qty: 1
      })
      this.$lunaToast.success('Invoice item added')
    },
    selectItem (data) {
      this.$set(this.invoice, 'items', data)
    },
    promptAddPaymentMethod () {
      this.$modal.show('dialog', {
        title: 'Confirm exit page',
        text: 'Leaving this page will discard your changes. This cannot be on done',
        buttons: [
          {
            title: 'No',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Yes, sure',
            handler: () => {
              this.$router.push({ name: 'settings-billing-setup' })
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    openInviteClientModal ($event) {
      this.$nextTick(() => {
        this.invoice.customer = null
      })
      this.$modal.show(
        InviteNewClient,
        { client: { firstName: $event } },
        { adaptive: true, height: 'auto' }
      )
    },
    openEditItemModal ($event) {
      this.$modal.show(
        EditInvoiceItem,
        {
          oneTime: false,
          item: {
            description: $event.description,
            appointmentTypes: ['in-person', 'remote'],
            price: 0
          }
        },
        { adaptive: true, height: 'auto' }
      )
    },
    getCustomerSelectOption (customer) {
      return {
        userId: customer && customer.userId,
        email: customer && customer.email,
        firstName: customer && customer.firstName.trim()
      }
    },
    getUniqueId () {
      return Math.floor(Math.random() * 100)
    },
    getInvoicePayload () {
      return {
        _id: this.invoice._id,
        customerUserId: this.invoice.customer.userId,
        dueDate: this.invoice.dueDate || new Date(),
        items: this.invoice.items,
        note: this.invoice.note,
        dueDateEpoch:
          new Date(this.invoice.dueDate).getTime() / 1000 ||
          new Date().getTime() / 1000,
        supportedPaymentMethods: this.invoice.supportedPaymentMethods
      }
    },
    async createInvoice () {
      const res = await this.createNewInvoice(this.getInvoicePayload())
      this.invoiceId = res.data._id
      try {
        this.$router.replace({
          name: 'payments-request-id',
          params: {
            id: res.data._id
          }
        })
      } catch {}
    },
    async send () {
      try {
        this.isLoading = true
        await this.saveForm()
        await this.$store.dispatch('invoice/sendInvoice', {
          id: this.invoiceId,
          recipient: this.invoice.customer.email
        })
        this.$lunaToast.success('Invoice sending successful')
        this.$router.push({ name: 'payments-requests-sent' })
      } catch (e) {
        this.$lunaToast.error(`Error: ${e.message}`)
      } finally {
        this.isLoading = false
      }
    },
    async updateInvoice () {
      try {
        await this.$store.dispatch(
          'invoice/updateInvoice',
          this.getInvoicePayload()
        )
      } catch (error) {
        console.error(error)
      }
    },
    editItem (item) {
      this.$modal.show(
        EditInvoiceItem,
        { item },
        { adaptive: true, height: 450 }
      )
    },
    deleteItem (e) {
      const itemIdx = this.invoice.items.findIndex(i =>
        i.serviceId ? i.serviceId === e.serviceId : i.idx === e.idx
      )
      this.invoice.items.splice(itemIdx, 1)
    }
  },
  async mounted () {
    await this.getServices() // this will be revmove once we can enusre the global state of the application is consistent
    if (this.invoice._id) {
      this.$set(
        this.invoice,
        'customer',
        this.getCustomerSelectOption(this.invoice.customerId)
      )
      this.$set(
        this.invoice,
        'supportedPaymentMethods',
        this.invoice.supportedPaymentMethods.map(
          supportedPaymentMethod => supportedPaymentMethod._id
        )
      )
    } else {
      this.defaultPaymentMethod &&
        this.invoice.supportedPaymentMethods.push(this.defaultPaymentMethod._id)
    }

    this.$nuxt.$on('new-client-invite', (client) => {
      this.invoice.customer = this.getCustomerSelectOption(client)
    })
    this.$nuxt.$on('new-invoice-item', this.appendOneTimeItem)
  },
  beforeMount () {
    if (!isEmpty(this.invoiceData)) {
      this.invoice = { ...this.invoiceData }
      this.invoiceId = this.invoice._id
    }
  }
}
</script>

<style lang="scss">
.divider {
  @apply hidden lg:block bg-gray-200 w-[1px];
}
.dropdown-button {
  @apply text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left;
}
.mx-input {
  height: 2.5rem;
}

.invoice-one-time-item {
  position: relative;
  &::after {
    content: '1';
    position: absolute;
    width: 20px;
    height: 20px;
    left: -23px;
    top: 2px;
    text-align: center;
    border-radius: 100%;
    background-color: #3b82f6;
    color: white;
    font-size: small;
  }
}
</style>
