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
                <img src="~/assets/img/invoice/Logo2.svg" alt="" class="w-12" />
                <img
                  src="~/assets/img/invoice/Logo1.svg"
                  alt=""
                  class="w-18 ml-4"
                />
              </div>
              <div class="px-4 my-2 bg-white">
                <div>
                  <p class="text-2xl font-semibold text-gray-600">Invoice</p>
                  <div class="flex justify-between space-x-9">
                    <div class="mr-20 pr-20">
                      <p class="text-base py-4 text-slate-500">From</p>
                      <p class="text-base font-semibold text-gray-900">
                        Brand name
                      </p>
                    </div>
                    <div class="mr-20 pr-20">
                      <p class="text-lg py-4 text-slate-500">To</p>
                      <p class="text-base font-semibold text-gray-900">
                        Client's name
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-slate-50 py-5 my-4 px-5 shadow-sm rounded-lg"
                  style="background-color: #e2e8f0"
                >
                  <p class="text-slate-500 text-base">Amount</p>
                  <p class="text-slate-700 text-3xl">&#163;77.00</p>
                  <p class="text-sm text-slate-700">
                    <span
                      class="text-xl text-red-1000"
                      style="color: red; font-size: 50px"
                    >
                      . </span
                    >Due on May 23 2021
                  </p>
                </div>

                <div>
                  <div class="my-5">
                    <p class="text-base font-medium text-slate-700">
                      Service One
                    </p>
                    <div class="flex justify-between">
                      <p class="text-sm text-slate-500">Qty 1</p>
                      <p class="text-base text-slate-700">&#163;60</p>
                    </div>
                  </div>
                  <div class="my-5">
                    <p class="text-base font-medium text-slate-700">
                      Service two
                    </p>
                    <div class="flex justify-between">
                      <p class="text-sm text-slate-500">Qty 1</p>
                      <p class="text-base text-slate-700">&#163;60</p>
                    </div>
                  </div>
                  <hr class="bg-lightgray" style="margin-bottom: 20px" />

                  <div class="flex justify-between">
                    <div class="text-xl text-slate-700">Total</div>
                    <div class="text-xl text-slate-700 font-bold">&#163;77</div>
                  </div>
                </div>

                <h4 class="mt-9 text-slate-700 text-base">Payment Options</h4>
                <div class="flex flex-col mt-4">
                  <button
                    @click="openModal('stripe')"
                    class="py-2 mb-4 text-base border border-gray-300 font-medium text-slate-700 rounded-lg px-14 inline-flex justify-center"
                  >
                    <span class="mr-2"> Pay with </span>
                    <img
                      src="~/assets/img/stripe.png"
                      alt=""
                      class="w-15 h-5 mt-1"
                    />
                  </button>
                  <button
                    @click="openModal('paypal')"
                    class="py-2 mb-4 text-base border border-gray-300 font-medium text-slate-700 rounded-lg px-14 inline-flex justify-center"
                  >
                    <span class="mr-2"> Pay with </span>
                    <img
                      src="~/assets/img/paypal.png"
                      alt=""
                      class="w-15 h-5 mt-1"
                    />
                  </button>
                  <button
                    @click="openModal('bank')"
                    class="py-2 mb-4 text-base border border-gray-300 font-medium text-slate-700 rounded-lg px-14 inline-flex justify-center"
                  >
                    <span class="mr-2"> Pay with Bank</span>
                    <img
                      src="~/assets/img/invoice/bank.svg"
                      alt=""
                      class="w-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GwModal
        :is-open="isOpen"
        :input-width="35"
        @close="isOpen = $event"
        @closeBackDrop="isOpen = $event"
      >
        <template v-slot:status>
          <div class="px-2 text-2xl font-500">Pay With Bank</div>
        </template>
        <template v-slot:default>
          <p class="text-base text-slate-500 font-medium text-slate-700">
            Make your payment directly to the bank account provided below
          </p>
          <div
            class="bg-slate-50 py-2 my-4 px-5 shadow-sm rounded-lg"
            style="background-color: #eff6ff"
          >
            <h1 class="my-5 font-bold text-2xl">Standard Bank</h1>
            <div class="flex flex-row flex-wrap justify-spacearound">
              <div class="flex flex-row my-4" v-for="v in bankData" :key="v">
                <div style="">
                  <div>{{ v.title }}</div>
                  <div class="font-bold">{{ v.value }}</div>
                </div>
                <div
                  class="text-purple-500 justify-center align-center py-3 mx-8 flex flex-row"
                >
                  <img
                    class="lg:mr-auto lg:m-0 m-auto h-5 md:h-5 2xl:h-5"
                    src="~/assets/img/copy.png"
                    alt="copy"
                  />
                  <div class="text-center text-blue-400 mx-3">Copy</div>
                </div>
              </div>
            </div>
            <div class="my-4">
              *Note - When making your payment, add the reference code along
              with your transfer for easy confirmation
            </div>
          </div>
          <div class="flex justify-end">
            <button
              class="text-sm text-md rounded-lg text-blue-500 border-slate-50 border px-5 py-3 mx-3"
            >
              Pay Later
            </button>
            <button
              class="text-sm text-md rounded-lg text-white bg-blue-500 px-3 py-3"
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
export default {
  name: 'InvoicePayment',
  layout: 'empty',
  middleware: ['validToken'],
  auth: false,
  data() {
    return {
      letsGetStarted: true,
      isOpen: false,
      bankData: [
        { title: 'Account Number', value: '993150218' },
        { title: 'Sort Code', value: 'STB-00123' },
        { title: 'Reference code', value: '234567' },
      ],
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
  },
  methods: {
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
    handleStripeClick() {
      const { host, protocol } = window.location
      window.location = `${process.env.ACCOUNT_HOST_URL}/auth/google?redirectUrl=${protocol}//${host}/Auth/SignIn%3FredirectClient%3Dgoogle`
    },
    handlePaypalClick() {
      window.location = `${process.env.ACCOUNT_HOST_URL}/auth/google?redirectUrl=${window.location.href}%3FredirectClient%3Dgoogle`
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
