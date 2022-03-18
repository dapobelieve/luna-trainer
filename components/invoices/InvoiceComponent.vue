<template>
  <div class="flex flex-col lg:flex-row lg:space-x-10">
    <!-- invoice builder -->
    <container-with-title class="lg:min-w-[500px] lg:max-w-[510px]">
      <template v-slot:headerbox>
        <p class="capitalize text-lg mt-2 font-medium">
          <i class="mr-4 mt-0.5 fi-rr-receipt"> </i
          >{{ invoice._id ? "Edit" : "Create" }} your invoice
        </p>
      </template>
      <template v-slot:content>
        <div id="customer">
          <h2 class="mb-2 required">Select a client </h2>
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
            <template v-slot:dropdownOption="{ optionObject }">
              <div
                v-if="optionObject.userId"
                class="flex justify-between min-w-full items-center"
              >
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
              </div>
              <div
                v-else
                class="flex justify-between min-w-full items-center py-2"
              >
                Invite {{ optionObject.firstName }}
              </div>
            </template>
          </LunaSelector>
        </div>
        <div id="invoice-service-item" class="flex flex-col justify-between">
          <h2 class="mb-2 required">Select Invoice service &amp; items</h2>
          <div class="flex flex-col space-y-2">
            <LunaSelector
              v-model="items"
              :disabled="!invoice.customer"
              :options="services"
              index="serviceId"
              label="description"
              @change="selectItem"
              @option:created="openEditItemModal($event)"
              multiple
            >
              <template v-slot:dropdownOption="{ option }">
                <div class="flex justify-between min-w-full items-center" v-if="option.serviceId">
                  <div class="flex content-center py-1">
                    <div class="flex flex-col ml-1 text-gray-700">
                      <p class="capitalize mb-2">
                        {{ option.description }}
                      </p>
                      <small class="text-gray-700 text-sm">
                        {{ option.price || 0  | amount }}</small
                      >
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
            </LunaSelector>
            <div
              v-if="invoice.items &&  invoice.items.length"
              class="rounded-xl border bg-gray-50 py-4 px-3 space-y-3"
            >
              <div
                v-for="item in invoice.items"
                :key="item._id"
                class="flex justify-between items-center"
              >
                <div class="max-w-[180px] md:max-w-[500px] lg:max-w-[300px]">
                  <p class="font-medium capitalize" :class="{'invoice-one-time-item':!item.serviceId}">
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
             <small class="mt-3 block"
            ><button
              @click="addOneTime"
              class="text-primary-color"
              >Add one-time invoice item</button></small>
          </div>
        </div>
        <div id="due-date">
          <h2 class="mb-2 required">Invoice due date</h2>
          <date-picker
            v-model="invoice.dueDate"
            style="width: 100% !important"
            class="w-full"
            :disabled="!invoice.customer"
            :disabled-date="(date) => date < new Date()"
            value-type="format"
            placeholder="Select a due date for this invoice"
          ></date-picker>
        </div>
        <div id="payment-method">
          <h2 class="mb-2">Allowed payment methods</h2>
          <div
            class="mt-2 flex items-center align-left justify-between"
            v-for="activePaymentMethod in activePaymentMethods"
            :key="activePaymentMethod._id"
          >
            <div class="flex item-stretch">
              <AppCheckboxComponent
                :id="activePaymentMethod._id"
                class="mr-2"
                v-model="invoice.supportedPaymentMethods"
                :value="activePaymentMethod._id"
                :checked="activePaymentMethod.isDefault"
              />
              <span class="font-light"
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
            <span class="font-light tag" v-if="activePaymentMethod.isDefault"
              >Default</span
            >
          </div>
          <small class="mt-3 block"
            ><router-link
              to="/settings/payment-methods"
              class="text-primary-color"
              >Add another payment method <i class="fi-rr-link" /></router-link
          ></small>
        </div>
        <div class="flex justify-end space-x-6 lg:space-x-0">
          <button
            type="button"
            class="button-outline lg:hidden"
            @click="$modal.show('preview-invoice')"
          >
            Preview
          </button>
          <button-spinner
            :loading="isLoading"
            :disabled="!valid"
            type="button"
            style="width: fit-content"
            @click="send"
          >
            Send invoice
          </button-spinner>
        </div>
      </template>
    </container-with-title>

    <!-- divider -->
    <span class="divider"></span>

    <!-- invoice previews -->
    <invoices-invoice-preview
      :client="invoice.customer"
      :items="invoice.items"
      :due-date="invoice.dueDate"
    />
    <div>
      <modal name="preview-invoice" height="100%" width="100%" :adaptive="true">
        <invoices-invoice-preview
          class="m-6"
          :client="invoice.client"
          :services="invoice.services"
          :due-date="invoice.dueDate"
          @close="$modal.hide('preview-invoice')"
        />
      </modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import isEmpty from "lodash.isempty";
import debounce from "lodash.debounce";
import ItemDisplay from "~/components/invoices/ItemDisplay";
import GwCustomerSelector from "~/components/GwCustomerSelector";
import ContainerWithTitle from "../Containers/ContainerWithTitle";
import InviteNewClient from "../InviteNewClient";
import EditInvoiceItem from './EditInvoiceItem';
export default {
  name: "Invoice",
  components: {
    GwCustomerSelector,
    ItemDisplay,
    DatePicker,
    ContainerWithTitle,
    InviteNewClient,
    EditInvoiceItem
  },
  layout: "invoice",
  props: {
    invoiceData: {
      type: Object,
    },
    mode: {
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      invoiceId: null,
      invoice: {
        items: [],
        supportedPaymentMethods: [],
      },
      isLoading: false,
      showDropDown: false
    };
  },
  computed: {
    ...mapGetters({
      allClients: "client/getAllClients",
      allServices: "services/allServices",
      activePaymentMethods: "payment-methods/getActivePaymentMethods",
    }),
    valid() {
      return (
        !!this.invoice.customer &&
        this.invoice.items &&
        this.invoice.items.length &&
        this.invoice.supportedPaymentMethods &&
        this.invoice.supportedPaymentMethods.length
      );
    },
    services() {
      return this.allServices.map((service) => ({
        serviceId: service._id,
        description: service.description,
        price: service.pricing.amount,
        qty: 1,
      }));
    },
    items() {
      return this.invoice.items.map((item) => ({
        serviceId: item.serviceId,
        description: item.description,
        price: item.price,
        qty: 1,
      }));
    },
  },
  watch: {
    invoice: {
      handler(newValue) {
        if (this.invoiceId === null && this.invoice.customer) {
          this.createInvoice();
        } else if (this.invoiceId) {
          this.updateInvoice();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions("invoice", {
      createNewInvoice: "createInvoice",
      fetchInvoices: "getInvoices"
    }),
    ...mapActions({getServices: "services/getServices"}),
    addOneTime(){
        this.$modal.show(
        EditInvoiceItem,
        {
          oneTime:true,
          item: { 
            description:"",
            price:0
          } 
        },
        { adaptive: true, height: 350 }
      );
    },
    appendOneTimeItem(item){
      this.invoice.items.push({
        description: item.description,
        price: item.pricing.amount,
        qty: 1,
      })
      this.$gwtoast.success("Invoice item added")
    },
    selectItem(data) {
      this.$set(this.invoice, "items", data);
    },
    openInviteClientModal($event) {
      this.$nextTick(() => {
        this.invoice.customer = null
      })
      this.$modal.show(
        InviteNewClient,
        { client: { firstName: $event.firstName } },
        { adaptive: true, height:390 }
      );
    },
    openEditItemModal($event) {
      this.$modal.show(
        EditInvoiceItem,
        { item: { 
            description: $event.description,
            appointmentTypes:["in-person","remote"],
            price:0
          } 
        },
        { adaptive: true, height: 450 }
      );
    },
    getCustomerSelectOption(customer) {
      return {
        userId: customer && customer.userId,
        email: customer && customer.email,
        firstName: customer && customer.firstName.trim(),
      };
    },
    getInvoicePayload() {
      return {
        _id:this.invoice._id,
        customerUserId: this.invoice.customer.userId,
        dueDate: this.invoice.dueDate || new Date(),
        items: this.invoice.items,
        dueDateEpoch:
          new Date(this.invoice.dueDate).getTime() / 1000 ||
          new Date().getTime() / 1000,
        supportedPaymentMethods: this.invoice.supportedPaymentMethods,
      };
    },
    async createInvoice() {
      if (this.valid) {
        this.$nuxt.$emit("autosaving-invoice");
        const res = await this.createNewInvoice(this.getInvoicePayload());
        this.invoiceId = res.data._id;
        this.$router.replace({
          name: "invoice-id",
          params: {
            id: res.data._id,
          },
        });
      }
    },
    async send() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("invoice/sendInvoice", {
          id: this.invoiceId,
          recipient: this.invoice.customer.email,
        });
        this.$gwtoast.success("Invoice sending successful");
        this.$router.push({ name: "invoices-sent" });
      } catch (e) {
        this.$gwtoast.error(`Error: ${e.message}`);
      } finally {
        this.isLoading = false;
      }
    },
    updateInvoice: debounce(async function () {
      try {
        if (this.valid) {
          this.$nuxt.$emit("autosaving-invoice");
          await this.$store.dispatch("invoice/updateInvoice", this.getInvoicePayload())
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000),
    editItem(item) {
      this.$modal.show(
        EditInvoiceItem,
        { item },
        { adaptive: true, height: 450 }
      );
    },
    deleteItem(e) {
      const itemIdx = this.invoice.items.findIndex((s) => s._id === e._id);
      this.invoice.items.splice(itemIdx, 1);
    },
  },
  async mounted() {
    await this.getServices();    // this will be revmove once we can enusre the global state of the application is consistent
    this.$set(
      this.invoice,
      "customer",
      this.getCustomerSelectOption(this.invoice.customerId)
    );
    this.$set(
      this.invoice,
      "supportedPaymentMethods",
      this.invoice.supportedPaymentMethods.map(
        (supportedPaymentMethod) => supportedPaymentMethod._id
      )
    );
    this.$nuxt.$on('new-client-invite', (client) => {
      this.invoice.customer = this.getCustomerSelectOption(client)
    })
    this.$nuxt.$on('new-invoice-item',this.appendOneTimeItem)

  },
  beforeMount() {
    if (!isEmpty(this.invoiceData)) {
      this.invoice = { ...this.invoiceData };
      this.invoiceId = this.invoice._id;
    }
  },
};
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

.invoice-one-time-item{
  position: relative;
  &::after{
    content: "1";
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
