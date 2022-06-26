<template>
  <modal
    name="invoice-details"
    class="p-0"
    :width="512"
    height="auto"
    :click-to-close="false"
    :adaptive="true"
  >
    <div v-if="!markAsPaid" class="grid py-5 m-5">
      <div v-if="invoice" class="py-0">
        <div class="flex items-center mb-6">
          <h3 class="text-2xl">
            Invoice
          </h3>
          <span class="ml-auto">
            <i class="fi-rr-cross cursor-pointer mt-1 text-primary-color" @click="close"></i>
          </span>
        </div>
        <div class="mb-5">
          <p>To</p>
          <h3 class="font-medium text-xl">
            {{ invoiceCustomer }}
          </h3>
        </div>
        <div class="mb-10">
          <div v-if="invoiceStatus !== 'paid'" class="bg-gray-100 ring-1 ring-gray-200 rounded-md px-3 py-2">
            <table class="table-auto mb-6 table w-full bottom-border">
              <thead>
                <tr class="uppercase tracking-wide text- text-gray-500">
                  <th class="font-medium text-xs w-2/4 text-left">
                    description
                  </th>
                  <th class="font-medium text-xs w-1/4">
                    quantity
                  </th>
                  <th class="font-medium text-xs text-right w-1/4">
                    amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in invoiceServices" :key="item._id">
                  <td class="py-2 text-left font-bold">
                    {{ item.description }}
                  </td>
                  <td class="py-2 text-center">
                    {{ item.qty }}
                  </td>
                  <td class="py-2 text-right">
                    {{ item.price | amount }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex h-20 mb-5 items-center text-2xl font-medium">
              <h3 class="">
                Total
              </h3>
              <h3 class="ml-auto font-bold">
                {{ invoiceTotal | amount }}
              </h3>
            </div>
            <div class="text-sm flex items-center">
              <div class="h-1 w-1 bg-red-500 rounded-full mr-2"></div>
              Due on {{ invoice.dueDate | date }}
            </div>
          </div>
          <div v-else>
            <div class="mb-5 items-center bg-gray-100 ring-1 ring-gray-200 rounded-md px-3 py-2">
              <h3 class="font-light">
                Amount
              </h3>
              <h3 class="ml-auto font-bold text-3xl">
                {{ invoiceTotal | amount }}
              </h3>
            </div>
          </div>
        </div>
        <div class="flex mb-8 bottom-border">
          <h3>Status</h3>
          <InvoiceStatusComponent class="ml-auto" :status="status" />
        </div>
        <div v-if="invoice.note" class="flex mb-8">
          <h3>Notes</h3>
          <p class="ml-auto">
            {{ invoice.note }}
          </p>
        </div>
        <template v-if="invoiceStatus === 'paid' && paymentPaymentMethod">
          <div class="flex mb-8 bottom-border">
            <h3>Payment Method</h3>
            <h3 class="ml-auto">
              {{ paymentPaymentMethod.toUpperCase() }}
            </h3>
          </div>
        </template>
        <div class="flex mb-8 bottom-border">
          <h3>Invoice No</h3>
          <h3 class="ml-auto">
            {{ invoiceNo }}
          </h3>
        </div>
        <div class="flex mb-8 bottom-border items-center">
          <h3>
            Payment Method(s)
          </h3>
          <div class="ml-auto flex">
            <span
              v-if="supportedPaymentMethodTypes.includes('stripe')"
              class="my-4 block"
            >
              <img
                src="~/assets/img/stripe.png"
                alt="Stripe"
                class="w-15 h-5"
              />
            </span>
            <span
              v-if="supportedPaymentMethodTypes.includes('paypal')"
              class="my-4 block"
            >
              <img
                src="~/assets/img/paypal.png"
                alt="Paypal"
                class="w-15 h-5"
              />
            </span>
            <span
              v-if="supportedPaymentMethodTypes.includes('bank')"
              class="my-4 block"
            >
              <i
                class="fi-rr-bank mr-2 text-gray-700 h-5 w-5"
              ></i>
            </span>
          </div>
        </div>
        <div class="flex justify-end">
          <template v-if="invoiceStatus !== 'paid' && invoiceStatus !== 'cancelled'">
            <button class="text-red-500 px-4 py-2 border mr-2" @click="cancelInvoice">
              <SingleLoader v-if="cancelling" />
              <span v-else>Cancel Invoice</span>
            </button>
            <button v-if="invoiceStatus !== 'paid_awaiting_confirmation'" ref="nudge" class="text-primary-color px-4 py-2 border mr-2 w-[7.9rem]" @click="sendNudge">
              <SingleLoader v-if="nudging" />
              <span v-else>Send Nudge</span>
            </button>
            <button v-if="invoice.paymentReceipts.length > 0" class="text-primary-color px-4 py-2 border" @click="markAsPaid = true">
              Mark as paid
            </button>
          </template>
          <template v-else-if="invoice.status !== 'cancelled'">
            <button class="text-primary-color px-4 py-2 border" @click="markUnPaid">
              Mark as unpaid
            </button>
          </template>
        </div>
      </div>
    </div>
    <div v-else class="grid m-5 py-5">
      <div class="flex items-center mb-7">
        <i class="fi-rr-angle-left mr-4 cursor-pointer" @click="markAsPaid = false"></i>
        <span>Back</span>
      </div>
      <div>
        <h3 class="text-sm mb-6">
          Ensure your entries matches the actual payment information
        </h3>
        <div class="mb-6">
          <label class="">Payment Date</label>
          <div class="border rounded-md relative pl-4 mt-3">
            <DatePicker
              v-model="paidObj.paymentDate"
              style="width: 100%"
              class="date-picker relative"
              format="ddd MMM D"
              placeholder="Date"
            ></DatePicker>
          </div>
        </div>
        <div class="mb-6">
          <label class="">Payment Method</label>
          <GwSelector v-model="paidObj.paymentType" label="label" placeholder="Select payment method" class="w-full repeat-selector" :options="paymentMethods">
            <template v-slot:selectedOption="{selected}">
              <div class="flex items-center">
                <span class="text-gray-700">{{ selected.label }}</span>
              </div>
            </template>
            <template v-slot:dropdownOption="{ optionObject }" class="p-4">
              <div class="flex items-center py-2">
                <span class="text-gray-700">{{ optionObject.label }}</span>
              </div>
            </template>
          </GwSelector>
        </div>
        <div class="flex">
          <button :disabled="!paidObj.paymentType || !paidObj.paymentDate" class="button-fill ml-auto" @click="updateInvoice">
            <SingleLoader v-if="loading" />
            <span v-else>Mark as paid</span>
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  components: {
    DatePicker
  },
  props: {
    invoice: {
      type: Object
    }
  },
  data () {
    return {
      loading: false,
      markAsPaid: false,
      paymentMethods: [
        {
          type: 'TRANSFER',
          label: 'Bank Transfer'
        },
        {
          type: 'CASH',
          label: 'Cash'
        }
      ],
      paidObj: {
        paymentType: null,
        paymentDate: null
      },
      nudging: false,
      cancelling: false
    }
  },
  computed: {
    invoiceServices () {
      return this.invoice.items
    },
    invoiceTotal () {
      return this.invoiceServices.reduce((acc, item) => {
        acc += item.qty * item.price
        return acc
      }, 0)
    },
    supportedPaymentMethodTypes () {
      return this.invoice.supportedPaymentMethods.map(m => m.type)
    },
    paymentPaymentMethod () {
      console.log(this.invoice.paymentReceipts)
      return this.invoice.paymentReceipts && this.invoice.paymentReceipts.find(x => x.status === 'accepted')?.paymentType
    },
    status () {
      return this.invoice.status
    },
    invoiceStatus () {
      return this.invoice && this.invoice.status
    },
    invoiceNo () {
      return `#${this.invoice.invoiceNo}`
    },
    invoiceCustomer () {
      return `${this.invoice.customerId.firstName} ${this.invoice.customerId.lastName || ''}`
    }
  },
  updated () {
    console.log(this.invoice.supportedPaymentMethods[0])
  },
  methods: {
    async markUnPaid () {
      const [acceptedInvoice] = this.invoice.paymentReceipts.filter(x => x.status === 'accepted')
      try {
        await this.$store.dispatch('payment-methods/markAsUnPaid', {
          id: acceptedInvoice._id
        })
        this.$lunaToast.success('Payment request updated')
        this.close()
      } catch (e) {}
    },
    async updateInvoice () {
      this.loading = true
      try {
        await this.$store.dispatch('payment-methods/markAsPaid', {
          paymentDate: this.$dateFns.format(this.paidObj.paymentDate, 'yyyy-MM-dd'),
          paymentType: this.paidObj.paymentType.type,
          invoiceId: this.invoice._id
        })

        this.$lunaToast.success('Payment request updated')
        this.close()
      } catch (e) {} finally {
        this.loading = false
      }
    },
    close () {
      this.$emit('close')
    },
    async cancelInvoice () {
      this.cancelling = true
      try {
        await this.$store.dispatch('invoice/cancelInvoice', this.invoice._id)
        this.$lunaToast.success('Payment request cancelled')
      } finally {
        this.cancelling = false
        this.close()
      }
    },
    async sendNudge () {
      this.nudging = true
      try {
        await this.$store.dispatch('invoice/notify', { id: this.invoice._id })
        this.$lunaToast.success('Reminder sent')
      } finally {
        this.nudging = false
        this.close()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.vm--container {
  ::v-deep .vm--modal {
    overflow: visible;
  }
}
.date-picker {
  ::v-deep .mx-input-wrapper {
    .mx-input {
      border: none;
      padding-left: 0px;
      font-size: 16px;
      font-weight: 400;
      width: 100%;
      color: #000;
      box-shadow: none;
    }
    .mx-icon-clear {
      display: none;
    }
    .mx-icon-calendar {
      display: none;
    }
  }
}
.table-auto {
  thead tr {
    border-bottom: 15px solid transparent;
  }
}
.bottom-border {
  position: relative;
  &:before {
    content: "";
    width: 100%;
    background-color: #E2E8F0;
    height: 1px;
    bottom: -15px;
    left: 0;
    position: absolute;
  }
}
</style>
