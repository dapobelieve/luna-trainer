<template>
  <async-view>
    <PageHeader>
      <template v-slot:back-button>
        <button type="button outline-none" @click="$router.push({ name: 'invoice' })">
          <i class="ns-plus text-blue-500 text-[1.125rem]"></i>
        </button>
      </template>
      <template v-slot:buttons>
        <div class="relative flex space-x-3">
          <button
            type="button"
            class="nav-button"
            @click="resend"
          >
            <i class="ns-paper-plane text-blue-500 text-xl pr-1.5"></i>
            Resend
          </button>
          <button
            type="button"
            class="nav-button"
            @click="printInvoice"
          >
            <i class="ns-print text-blue-500 text-xl pr-1.5"></i>
            Print
          </button>
        </div>
      </template>
    </PageHeader>
    <div class="parent-container" v-if="invoice">
      <div class="flex items-center header">
        <p class="font-normal text-2xl text-gray-700 mr-auto">
          {{ $auth.user.businessName }}
        </p>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full capitalize text-sm font-normal bg-blue-50 text-blue-500">
          {{ invoice && invoice.workflowStatus }}
        </span>
      </div>
      <div class="grid grid-cols-2 gap-x-4 invoice-label">
        <div>
          <p class="label">
            Tel:
          </p>
          <p class="info">
            {{ invoice && invoice.createdBy.phoneNumber ? invoice.createdBy.phoneNumber : 'N/A' }}
          </p>
        </div>
        <div>
          <p class="label">
            Invoice no.
          </p>
          <p class="info">
            {{ invoice && invoice.invoiceNo }}
          </p>
        </div>
      </div>
      <div class="contact-details">
        <p class="text-gray-500 text-base font-normal pb-1">
          Bill to
        </p>
        <div class="flex items-center">
          <template v-if="invoice && invoice.customerId">
            <ClientAvatar
              :invoice-info="invoice && invoice.customerId"
            />
          </template>
          <div class="ml-3 font-normal">
            <p class="capitalize text-gray-700 text-base">
              {{ invoice && invoice.customerId.firstName }} {{ invoice && invoice.customerId.lastName }}
            </p>
            <p class="text-sm text-gray-500">
              {{ invoice && invoice.customerId.email }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-x-4 dates">
        <div>
          <p class="text-gray-500 text-base font-normal">
            Date of Issue:
          </p>
          <p class="text-gray-700 text-base font-normal">
            {{ invoice && invoice.createdAt | date }}
          </p>
        </div>
        <div>
          <p class="text-gray-500 text-base font-normal">
            Date Due:
          </p>
          <p class="text-gray-700 text-base font-normal">
            {{ invoice && invoice.dueDate | date }}
          </p>
        </div>
      </div>

      <div class="items-box">
        <div class="grid grid-cols-6 gap-x-4">
          <div class="table-head col-span-3">
            DESCRIPTION
          </div>
          <div class="table-head">
            QTY
          </div>
          <div class="table-head">
            AMOUNT
          </div>
        </div>
        <div v-if="invoice && invoice.items.length" class="mt-2">
          <div v-for="item in invoice.items" :key="item" class="grid grid-cols-6 gap-x-4 gap-y-4">
            <div class="table-items col-span-3 truncate">
              {{ item.description }}
            </div>
            <div class="table-items">
              {{ item.qty }}
            </div>
            <div class="table-items">
              {{ item.price * item.qty | amount }}
            </div>
          </div>
        </div>
        <p v-else class="text-center mt-2">
          <em>
            No items selected
          </em>
        </p>
      </div>

      <div class="flex sub-total text-base font-medium">
        <p class="mr-auto text-gray-500">
          Sub total
        </p>
        <p class="text-gray-700">
          {{ totalServiceAmount | amount }}
        </p>
      </div>
      <div class="flex total text-xl">
        <p class="mr-auto font-normal text-gray-500">
          Total
        </p>
        <p class="font-bold text-gray-700">
          {{ totalServiceAmount | amount }}
        </p>
      </div>
    </div>
  </async-view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  asyncData ({ params }) {
    return { id: params.id }
  },
  data () {
    return {
      invoice: {
        createdBy:{},
        customerId:{},
        items:[]
      },
      isLoading: false
    }
  },
  computed: {
    totalServiceAmount () {
      if (this.invoice && this.invoice.items.length) {
        return this.invoice.items.reduce((acc, item) => item.price + acc, 0)
      }
      return 0
    }
  },
  async mounted () {
    const response = await this.getSingleInvoice(this.id) .catch((err) => {
      $lunaToast.error("Invoice could not be retrieved")
    })
    if(response) this.invoice = response.data
    console.log(this.invoice)
  },
  methods: {
    ...mapActions('invoice', {
      getSingleInvoice: 'getSingleInvoice',
      resendInvoice: 'resendInvoice'
    }),
    printInvoice () {
      window.print()
    },
    async resend () {
      if (this.id) {
        try {
          const invoiceStatus = await this.resendInvoice({ id: this.id })
          console.log('resent invoice ', invoiceStatus)
          this.$lunaToast.success('Invoice sent successfully')
        } catch (error) {
          this.$lunaToast.error(`Error sending invoice: ${error}`)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-button {
  @apply bg-white border inline-flex items-center text-blue-500 px-3 py-1 text-base  font-medium  rounded-lg  shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2;
  border-color: #E2E8F0;
}
.parent-container {
  @apply bg-white p-4 mx-auto my-9 rounded-xl;
  border: 1px solid #e2e8f0;
  max-width: 512px;
}

.header {
  @apply pb-6;
}

.invoice-label {
  @apply font-normal text-base pb-8;
  color: #64748b;
  .info {
    @apply text-gray-700;
  }
}

.contact-details {
  @apply pb-4;
}

.dates {
  @apply pb-11;
}

.items-box {
  @apply pb-3 mb-3;
  border-bottom: 1px solid #e2e8f0;
  .table-head {
    @apply font-medium text-xs text-gray-500 text-right;
    &:first-child {
    @apply text-left;
  }
  }
  .table-items {
    @apply text-gray-700 font-normal text-base text-right;
    &:first-child {
    @apply text-left;
  }
  }
}

.sub-total {
  @apply pb-6;
}

.total {
  @apply pb-3;
}
</style>
