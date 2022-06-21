<template>
  <div class="grid m-5 py-1">
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
        <GwSelector
          v-model="paidObj.paymentType"
          :menu-props="{ top: true, offsetY: true }"
          label="label"
          placeholder="Select payment method"
          class="w-full repeat-selector"
          :options="paymentMethods"
        >
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
        <button :disabled="!paidObj.paymentType || !paidObj.paymentDate" class="button-fill ml-auto" @click="markAsPaid">
          <SingleLoader v-if="loading" />
          <span v-else>Confirm</span>
        </button>
      </div>
    </div>
  </div>
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
      }
    }
  },
  mounted () {
    const [acceptedPaymentReceipts] = this.invoice.paymentReceipts.filter(x => x.status === 'pending')
    if (!acceptedPaymentReceipts) {
      this.$$lunaToast.error('No payment reciepts found')
    } else {
      this.paidObj.paymentDate = new Date(acceptedPaymentReceipts.paymentDate)
      this.paidObj.paymentType = this.paymentMethods.find(method => method.type === acceptedPaymentReceipts.paymentType)
    }
  },
  methods: {
    async markUnPaid () {
      const [acceptedPaymentReceipts] = this.invoice.paymentReceipts.filter(x => x.status === 'accepted')

      try {
        await this.$store.dispatch('payment-methods/markAsUnPaid', {
          id: acceptedPaymentReceipts._id
        })
        this.$lunaToast.success('Payment has been reverted successfully')
        this.$emit('close')
        this.$nuxt.$emit('unpaid')
      } catch (e) {
        console.log(e)
      }
    },
    async markAsPaid () {
      this.loading = true
      try {
        await this.$store.dispatch('payment-methods/markAsPaid', {
          paymentDate: this.$dateFns.format(this.paidObj.paymentDate, 'yyyy-MM-dd'),
          paymentType: this.paidObj.paymentType.type,
          invoiceId: this.invoice._id
        })
        this.$lunaToast.success('Payment has been confirmed successfully')
        this.$emit('close')
        this.$nuxt.$emit('paid')
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
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
