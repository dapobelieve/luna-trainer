<template>
  <div class="w-full">
    <main class="grid place-content-center">
      <div class="flex justify-center px-4 pb-28 lg:pb-0">
        <div
          class="flex flex-col lg:flex-row justify-center items-center max-w-lg lg:max-w-screen-xl w-full mt-10 lg:mt-12 2xl:mt-20 gap-4 lg:gap-9 xl:gap-12 relative"
        >
          <div
            class="flex font-sans justify-center items-center"
            style="margin-bottom: 50px; background-color: #f1f5f9"
          >
            <div class="bg-white rounded-lg">
              <div class="bg-[#3b82f6] rounded-t-lg py-5 pl-4 flex">
                <NuxtLink to="/">
                  <img class="h-8" src="~/assets/img/logo-v2-fff.svg" />
                </NuxtLink>
              </div>
              <div class="px-4 my-2 bg-white">
                <div>
                  <p class="text-1xl font-semibold text-gray-600">Invoice</p>
                  <div class="flex justify-between space-x-9">
                    <div class="mr-20 pr-20">
                      <p class="text-xs py-4 text-slate-500">From</p>
                      <p class="text-sm font-bold text-gray-900">{{ from }}</p>
                    </div>
                    <div class="mr-20 pr-20">
                      <p class="text-xs py-4 text-slate-500">To</p>
                      <p class="text-sm font-bold font-100 text-gray-900">
                        {{ to }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-slate-50 py-5 my-4 px-5 shadow-sm rounded-lg"
                  style="background-color: #e2e8f0"
                >
                  <p class="text-slate-500 text-sm">Amount</p>
                  <p class="text-slate-700 text-2xl font-bold">{{ total }}</p>
                  <p class="text-xs text-slate-700">
                    <span
                      class="text-xl text-red-1000"
                      style="color: red; font-size: 50px"
                    >
                      . </span
                    >Due on {{ dueDate }}
                  </p>
                </div>

                <div>
                  <div v-for="item in items" :key="item._id" class="my-5">
                    <p class="text-xs font-medium text-slate-700">
                      {{ item.description }}
                    </p>
                    <div class="flex justify-between">
                      <p class="text-sm text-slate-500">Qty {{ item.qty }}</p>
                      <p class="text-xs text-slate-700">
                        {{ formatNumber(item.price, currency) }}
                      </p>
                    </div>
                  </div>
                  <hr class="bg-lightgray" style="margin-bottom: 20px" />

                  <div class="flex justify-between">
                    <div class="text-sm text-slate-700">Total</div>
                    <div class="text-sm text-slate-700 font-bold">
                      {{ total }}
                    </div>
                  </div>
                </div>

                <h4 class="mt-9 text-slate-700 text-xs">Payment Options</h4>
                <div v-if="isPayable" class="flex flex-col mt-4">
                  <button
                    @click="openModal('stripe')"
                    v-if="supportedPaymentMethods.includes('stripe')"
                    class="py-2 mb-4 text-base border border-gray-300 font-medium text-slate-700 rounded-lg px-14 inline-flex justify-center align-center"
                  >
                    <span class="text-xs font-bold"> Pay with </span>
                    <img
                      src="~/assets/img/stripe.png"
                      alt=""
                      class="w-15 h-5"
                    />
                  </button>
                  <button
                    @click="openModal('paypal')"
                    v-if="supportedPaymentMethods.includes('paypal')"
                    class="py-2 mb-4 text-base border border-gray-300 font-medium text-slate-700 rounded-lg px-14 inline-flex justify-center"
                  >
                    <span class="text-xs font-bold mr-1"> Pay with </span>
                    <img
                      src="~/assets/img/paypal.png"
                      alt=""
                      class="w-15 h-5"
                    />
                  </button>
                  <button
                    @click="openModal('bank')"
                    v-if="supportedPaymentMethods.includes('bank')"
                    class="py-2 mb-4 text-base border border-gray-300 font-medium text-slate-700 rounded-lg px-14 inline-flex justify-center"
                  >
                    <span class="text-xs font-bold mr-1"> Pay with Bank</span>
                    <i
                      data-v-3a2f61b0=""
                      role="button"
                      class="fi-rr-bank mr-2 text-gray-700 h-5 w-5"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GwModal
        :is-open="isOpen"
        :input-width="40"
        @close="isOpen = $event"
        @closeBackDrop="isOpen = $event"
      >
        <template v-slot:status>
          <div class="text-1xl font-bold">Pay With Bank</div>
        </template>
        <template v-slot:default>
          <p class="text-sm text-slate-500 font-100 text-slate-700">
            Make your payment directly to the bank account provided below
          </p>
          <div
            class="bg-slate-50 py-2 my-4 px-5 shadow-sm rounded-lg"
            style="background-color: #eff6ff"
          >
            <h1 class="my-5 font-bold text-1xl">Standard Bank</h1>
            <div class="flex flex-row flex-wrap justify-spacearound">
              <div
                class="flex flex-row my-4"
                v-for="v in bankData"
                :key="v.title"
              >
                <div style="">
                  <div class="text-xs">{{ v.title }}</div>
                  <div class="font-bold text-xs">{{ v.value }}</div>
                </div>
                <div
                  class="text-purple-500 justify-center align-center py-1 mx-8 flex flex-row cursor-pointer"
                  @click="copyToClipboard(v.value)"
                >
                  <img class="w-5 h-5" src="~/assets/img/copy.png" alt="copy" />
                  <div class="text-center text-blue-400 mx-3 text-xs">Copy</div>
                </div>
              </div>
            </div>
            <div class="my-4 text-xs">
              *Note - When making your payment, add the reference code along
              with your transfer for easy confirmation
            </div>
          </div>
          <div class="flex justify-end text-xs">
            <button
              @click="closeModal"
              class="text-xs text-md rounded-lg text-blue-500 border-slate-50 border px-5 py-3 mx-3"
            >
              Pay Later
            </button>
            <button
              class="text-xs text-md rounded-lg text-white bg-blue-500 px-3 py-3"
            >
              Confirm Payment
            </button>
          </div>
        </template>
      </GwModal>
    </main>
  </div>
</template>
<style lang="scss" scoped></style>

<script>
import { mapActions } from 'vuex'
import { format } from 'date-fns'

export default {
  name: 'InvoicePayment',
  layout: 'empty',
  middleware: ['validToken'],
  auth: false,
  data() {
    return {
      isOpen: false,
      bankData: [],
      items: [],
      amount: 0,
      currency: '',
      from: '',
      to: '',
      dueDate: '',
      supportedPaymentMethods: [],
      total: 0,
      isPayable: false,
      invoiceDetails: {},
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
  },
  mounted() {
    this.getDetailsOfInvoice(this.$route?.params?.id ?? '')
  },
  methods: {
    ...mapActions({
      getPaymentLink: 'invoice/getPaymentLink',
    }),
    openModal(type) {
      switch (type) {
        case 'bank':
          this.isOpen = !this.isOpen
          break
        case 'stripe':
          this.handleStripeClick()
          break
        case 'paypal':
          this.handlePaypalClick()
          break
      }
    },
    async copyToClipboard(text) {
      await navigator?.clipboard?.writeText(text)
      this.$gwtoast?.show(`${text} copied`)
    },
    async getDetailsOfInvoice(id) {
      const response = await this.getPaymentLink(id)
      const { data } = response
      this.from = data?.createdBy?.name
      this.to = data?.customerId?.name
      this.currency = data?.currency
      this.invoiceDetails = data
      this.total = this.formatNumber(data?.total, data?.currency)
      this.dueDate = format(
        new Date(data?.dueDate ?? Date.now()),
        'MMM dd yyyy'
      )
      this.isPayable = data?.status === 'pending'
      this.supportedPaymentMethods = data?.supportedPaymentMethods?.map(
        (i) => i.type
      )
      this.items = data?.items
      this.getBankDetails()
    },
    closeModal() {
      this.isOpen = false
    },
    formatNumber(num, currency = 'NGN') {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currency,
      }).format(num)
    },
    handleStripeClick() {
      window.location = `${process.env.PAYMENT_HOST_URL}/payment/?id=${
        this.$route?.params?.id ?? ''
      }`
    },
    handlePaypalClick() {
      window.location = `${process.env.PAYMENT_HOST_URL}/payment/?id=${
        this.$route?.params?.id ?? ''
      }`
    },
    getBankDetails() {
      const data =
        this.invoiceDetails?.supportedPaymentMethods?.find(
          (i) => i.type === 'bank'
        )?.bank ?? {}
      this.bankData = [
        { title: 'Account Number', value: data?.accountNo ?? '' },
        { title: 'Sort Code', value: data?.sortCode ?? '' },
        { title: 'Reference code', value: '234567' },
      ]
      return data
    },
  },
  head() {
    return {
      title: 'InvoicePayment',
    }
  },
}
</script>
<style lang="scss" scoped>
.base-button {
  &:hover {
    background: #46a6c8;
  }
  &:focus {
    outline: none;
  }
}
.error {
  @apply border-red-500;
}
.required:after {
  content: ' *';
  @apply text-red-500 text-sm;
}
</style>
