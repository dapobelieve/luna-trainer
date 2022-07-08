<template>
  <div>
    <div
      v-if="loading"
      class="
        fixed
        preloader
        top-0
        h-screen
        w-screen
        flex
        items-center
        justify-center
      "
    >
      <div class="inline-flex flex-col items-center w-full py-4">
        <SingleLoader height="20px" width="20px" />
      </div>
    </div>

    <div class="h-screen md:w-full xl:max-w-[1384px] lg:max-w-full w-full m-auto">
      <div class="lg:w-2/6 md:w-full m-auto shadow-md">
        <main else class="place-content-center">
          <div class="mt-10">
            <div class="justify-center">
              <div class="bg-white rounded-xl pb-4">
                <div class="bg-[#3b82f6] rounded-t-lg py-6 pl-4 flex">
                  <NuxtLink to="/">
                    <img class="h-10" src="~/assets/img/logo-v2-fff.svg" />
                  </NuxtLink>
                </div>
                <div class="px-4 my-2 bg-white">
                  <div class="flex items-center justify-between my-4">
                    <p class="text-2xl font-semibold text-gray-600 flex items-end">
                      <span>Invoice </span>
                    </p>
                    <InvoiceStatusComponent
                      v-if="!isPayable"
                      :status="status"
                    />
                  </div>
                  <div>
                    <div class="flex justify-between space-x-9 mt-4">
                      <div>
                        <p class="text-sm text-gray-500">
                          From
                        </p>
                        <p class="font-bold text-gray-900">
                          {{ from }}
                        </p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">
                          To
                        </p>
                        <p class="font-bold font-100 text-gray-900">
                          {{ to }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="bg-slate-50 py-4 my-4 px-5 shadow-sm rounded-lg border-slate"
                    style="background-color: rgba(248, 250, 252, 1); border-width: 1px;"
                  >
                    <p class="text-gray-500 text-sm">
                      Amount
                    </p>
                    <p class="text-gray-700 text-2xl font-medium">
                      {{ total }}
                    </p>
                    <p class="text-xs text-gray-700 my-2 mb-1">
                      <span class="h-2 w-2 mr-1 text-red-500 bg-red-500 rounded-full inline-block mb-0"></span>
                      Due on
                      {{ dueDate }}
                    </p>
                  </div>

                  <div>
                    <div v-for="item in items" :key="item._id" class="my-4 mt-8">
                      <div class="flex justify-between items-center">
                        <div class="text-left">
                          <p class="text-slate-700 font-medium text-md">
                            {{ item.description }}
                          </p>
                          <p class="text-sm text-gray-500">
                            Qty {{ item.qty }}
                          </p>
                        </div>
                        <p class="font-medium text-slate-700 text-md">
                          {{ formatNumber(item.price, currency) }}
                        </p>
                      </div>
                    </div>
                    <hr class="bg-lightgray" style="margin-bottom: 20px" />
                    <div class="flex justify-between">
                      <div class="text-slate-700">
                        Total
                      </div>
                      <div class="text-2xl text-slate-700 font-medium">
                        {{ total }}
                      </div>
                    </div>
                  </div>
                  <div v-show="payingWithStripe && !stripeLoading">
                    <h4 class="mt-9 text-slate-600 font-semibold flex justify-between">
                      <div class="flex items-center">
                        <span>Pay with</span>
                        <img
                          src="~/assets/img/stripe.png"
                          class="h-6"
                        />
                      </div>
                      <button class="rounded-full p-2 w-6 h-6 bg-gray-300 text-white" @click.prevent="closePaymentWithStripe">
                        <i class="fi-rr-cross text-xs flex justify-between items-center"></i>
                      </button>
                    </h4>
                    <div>
                      <form id="stripe-payment-form" @submit.prevent="payWithStripeCard">
                        <div id="stripe-card-element" class="p-2 py-4 border border-blue-500 shadow-sm rounded-md mt-4"></div>
                        <div id="stripe-card-error" class="mt-4 text-red-500">
                          {{ stripeMessage }}
                        </div>
                        <button
                          type="submit"
                          :disabled="stripeError || stripeCompleting"
                          class="rounded-md p-2 py-4 w-full mt-4 bg-blue-500 shadow-sm text-white"
                        >
                          <span> Pay for invoice </span>
                          <SingleLoader v-if="stripeCompleting" class="ml-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                  <div v-if="isPayable && !payingWithStripe">
                    <h4 class="mt-9 text-slate-600 font-medium">
                      Payment Options
                    </h4>
                    <div class="flex flex-col">
                      <button
                        v-if="supportedPaymentMethods.includes('stripe')"
                        class="button-outline my-2"
                        :disabled="stripeLoading"
                        @click="openModal('stripe')"
                      >
                        <span class="font-bold"> Pay with </span>
                        <img
                          src="~/assets/img/stripe.png"
                          alt=""
                          class="w-15 h-5"
                        />
                        <SingleLoader v-if="stripeLoading" class="ml-4" />
                      </button>
                      <button
                        v-if="supportedPaymentMethods.includes('paypal')"
                        class="button-outline my-2"
                        @click="openModal('paypal')"
                      >
                        <span class="font-bold mr-1"> Pay with </span>
                        <img
                          src="~/assets/img/paypal.png"
                          alt=""
                          class="w-15 h-5"
                        />
                      </button>
                      <button
                        v-if="supportedPaymentMethods.includes('bank')"
                        class="button-outline my-2"
                        @click="openModal('bank')"
                      >
                        <span class="font-bold mr-1">Pay with Bank</span>
                        <i
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
        </main>
        <Modal name="pay-with-bank" height="auto" :adaptive="true" width="500">
          <template v-slot>
            <div class="p-4 py-5">
              <h1 class="font-bold text-xl mb-2">
                Pay With Bank
              </h1>
              <p class="font-100 text-gray-500 text-sm">
                Make your payment directly to the bank account provided below
              </p>
              <div
                class="
                  bg-blue-100
                  my-4
                  py-4
                  px-5
                  rounded-lg
                  border border-grey-100
                "
              >
                <h1 class="font-bold">
                  {{ bankName }}
                </h1>
                <div
                  v-if="bankData"
                  class="flex flex-row flex-wrap justify-spacearound"
                >
                  <div
                    v-for="v in bankData"
                    :key="v.title"
                    class=" mt-3 grid grid-cols-2 grid-flow-col-dense"
                  >
                    <div>
                      <div class="pb-1 text-sm">
                        {{ v.title }}
                      </div>
                      <div class="font-bold">
                        <span>{{ v.value }}</span>
                        <button
                          @click.prevent="copyToClipboard(v.value)"
                        >
                          <i class="fi-rr-copy w-5 h-5 text-blue-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="my-4 text-gray-600 text-sm">
                  Note - When making your payment, add the reference code along
                  with your transfer for easy confirmation
                </div>
              </div>
              <div class="flex justify-end">
                <button class="button-outline mx-2" @click="closeModal">
                  Pay Later
                </button>
                <button-spinner class="button-fill ml-2" @click="goToNotifyTrainerPage">
                  Notify trainer of payment
                </button-spinner>
              </div>
            </div>
          </template>
        </Modal>
      </div>
      <a href="https://web.goluna.app/privacy" class="w-screen text-center my-10 block text-gray-400 xl:max-w-[1384px] lg:max-w-full ">
        <div>
          Privacy . Terms
        </div>
        <div>
          Luna © {{ date }}
        </div>
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>

<script>
import { mapActions } from 'vuex'
import { format } from 'date-fns'
import SingleLoader from '~/components/util/SingleLoader'
export default {
  name: 'InvoicePayment',
  components: {
    SingleLoader
  },
  layout: 'empty',
  middleware: 'validToken',
  auth: false,
  data () {
    return {
      loading: false,
      payingWithStripe: false,
      date: format(new Date(Date.now()), 'yyyy'),
      showCopyButtons: false,
      isOpen: false,
      bankData: [],
      bankName: '',
      items: [],
      amount: 0,
      currency: '',
      from: '',
      to: '',
      dueDate: '',
      supportedPaymentMethods: [],
      total: 0,
      status: '',
      isPayable: false,
      invoiceDetails: {},
      stripe: null,
      stripeLoading: false,
      stripeCompleting: false,
      stripeCard: null,
      stripeMessage: '',
      stripeError: false,
      stripeClientSecret: '',
      stripeConnectedAccount: ''
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  },
  mounted () {
    this.getDetailsOfInvoice(this.$route?.params?.id ?? '')
  },
  methods: {
    ...mapActions({
      getInvoicePayment: 'invoice/getInvoicePayment',
      notifyTrainer: 'invoice/clientCreatePaymentReceipt'
    }),
    openModal (type) {
      switch (type) {
        case 'bank':
          this.$modal.show('pay-with-bank')
          break
        case 'stripe':
          this.handleStripeClick()
          break
        case 'paypal':
          this.handlePaypalClick()
          break
      }
    },
    copyToClipboard (text) {
      // copy to clipboard, works on chrome, firefox, edge, not on IE and Safari
      const el = document.createElement('textarea')
      el.value = text
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$lunaToast.show('copied to clipboard')
    },
    async getDetailsOfInvoice (id) {
      this.loading = true
      const response = await this.getInvoicePayment(id)
      this.loading = false
      const { data } = response
      this.from = data?.createdBy?.name
      this.to = data?.customerId?.name
      this.currency = data?.currency
      this.invoiceDetails = data
      this.total = this.formatNumber(data?.total, data?.currency)
      this.status = data?.status
      this.dueDate = format(
        new Date(data?.dueDate ?? Date.now()),
        'MMM dd yyyy'
      )
      if (data) {
        this.isPayable = data.status === 'pending'
        this.supportedPaymentMethods = data.supportedPaymentMethods?.map(
          i => i.type
        )
        this.items = data.items
      }
      this.getBankDetails()
    },
    closeModal () {
      this.$modal.hide('pay-with-bank')
    },
    formatNumber (num, currency = 'GBP') {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency
      }).format(num)
    },
    async goToNotifyTrainerPage () {
      try {
        if (this.$route.params.id) {
          this.loading = true
          await this.notifyTrainer({
            invoiceId: this.$route.params.id,
            paymentDate: new Date(),
            paymentType: 'TRANSFER'
          })
          this.loading = false
          this.closeModal()
          this.$router.push({
            name: 'payments-id-notify',
            params: { id: this.$route.params.id }
          })
        } else {
          this.$lunaToast.error('Id cannot be found')
        }
      } catch {
        this.$lunaToast.error('an error occured')
      }
    },
    handleStripeClick () {
      this.mountStripePaymentElements()
    },
    handlePaypalClick () {
      window.location = `${process.env.PAYMENT_HOST_URL}/pay/${
        this.$route.params.id ?? ''
      }`
    },
    getBankDetails () {
      const data =
        this.invoiceDetails.supportedPaymentMethods?.find(
          i => i.type === 'bank'
        )?.bank ?? {}
      this.bankName = data.accountBankName ?? ''
      this.bankData = [
        { title: 'Account Number', value: data?.accountNo ?? '' },
        { title: 'Sort Code', value: data?.sortCode ?? '' },
        {
          title: 'Reference code',
          value: this?.invoiceDetails?.invoiceNo ?? ''
        }
      ]
      return data
    },
    async mountStripePaymentElements () {
      this.stripeLoading = true
      const response = await this.$axios.post(process.env.PAYMENT_HOST_URL + '/create-payment-intent', {
        id: this.invoiceDetails._id
      })
      this.stripeClientSecret = response.data.clientSecret
      this.stripeConnectedAccount = response.data.connectedStripeAccount
      if (response.status === 200 && this.stripeClientSecret) {
        this.stripe = window.Stripe(process.env.STRIPE_PK, {
          stripeAccount: this.stripeConnectedAccount
        })
        const elements = this.stripe.elements()
        const style = {
          base: {
            color: '#32325d',
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#32325d'
            }
          },
          invalid: {
            fontFamily: 'Arial, sans-serif',
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
        this.stripeCard = elements.create('card', { style })
        this.stripeCard.mount('#stripe-card-element')
        this.stripeCard.on('change', (event) => {
          this.stripeError = event.empty
          this.showStripeError(event.error ? event.error.message : '')
        })
        this.stripeCard.on('ready', () => {
          this.payingWithStripe = true
          this.stripeLoading = false
        })
      } else {
        this.stripeLoading = false
        this.$lunaToast.error('An error occured durinng setup')
      }
    },
    payWithStripeCard () {
      this.stripeCompleting = true
      this.stripe
        .confirmCardPayment(this.stripeClientSecret, {
          payment_method: {
            card: this.stripeCard
          }
        })
        .then((result) => {
          if (result.error) {
            this.stripeCompleting = false
            this.showStripeError(result.error.message)
          } else {
            this.stripeCompleting = false
            this.stripePaymentCompleted()
          }
        })
    },
    stripePaymentCompleted () {
      this.stripeMessage = 'Payment received! Thank you!'
      this.$router.push({
        name: 'payments-id-success',
        params: { id: this.$route.params.id }
      })
    },
    showStripeError (errorMsgText) {
      this.stripeMessage = errorMsgText
    },
    closePaymentWithStripe () {
      this.payingWithStripe = false
    }
  },
  head () {
    return {
      title: 'Invoice payment',
      script: [
        {
          src: 'https://js.stripe.com/v3/'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.button-outline,.button-fill {
  @apply py-6
}
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

/* Variables */
#card-stripe-error {
  color: rgb(105, 115, 134);
  text-align: left;
  font-size: 13px;
  line-height: 17px;
  margin-top: 12px;
}

#card-stripe-element {
  border-radius: 4px 4px 0 0 ;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  width: 100%;
  background: white;
  margin: 2em 0;
}
/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: "";
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
  }
}

</style>
