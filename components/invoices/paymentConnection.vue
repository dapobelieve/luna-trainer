<template>
  <div class="p-6">
    <template v-if="currentDisplay === 1">
      <p class="text-4xl text-gray-700 font-normal pb-4">
        Connect your Stripe, Paypal, and bank details
      </p>
      <p class="text-base font-normal text-gray-700">
        We're making it easy to create, send and manage your finances. In order to create your first invoice, we just need to connect you up with the different providers!
      </p>
      <div class="mt-8 flex">
        <button class="button-fill" @click.prevent="nextStep">
          Proceed
        </button>
      </div>
    </template>
    <template v-if="currentDisplay === 2">
      <div class="flex justify-between items-center mb-10">
        <p class="text-2xl font-normal text-gray-700">
          Choose payment option
        </p>
        <i
          role="button"
          class="fi-rr-cross text-blue-500 h-4 w-4"
          @click.prevent="closeModal"
        ></i>
      </div>
      <div>
        <ul>
          <li class="flex justify-between items-center mb-8">
            <div>
              <p class="text-lg font-medium text-gray-700 mb-1">
                {{ isStripeConnected ? 'Disconnect ' : 'Connect to' }}<span>
                  <img
                    class="h-6 inline-block"
                    src="~/assets/img/stripe.png"
                    alt="stripe logo"
                  />
                </span>
              </p>
              <p class="text-sm font-normal text-gray-500">
                Brief description about this feature
              </p>
            </div>
            <div>
              <button class="button-outline" @click="stripeConnection">
                <SingleLoader v-if="isStripeLoading" class="mr-2" />
                {{ isStripeConnected ? 'Disconnect' : 'Connect' }}
              </button>
            </div>
          </li>
          <li class="flex justify-between items-center mb-8">
            <div>
              <p class="text-lg font-medium text-gray-700 mb-1">
                Connect to <span>
                  <img
                    class="h-5 inline-block"
                    src="~/assets/img/paypal.png"
                    alt="stripe logo"
                  />
                </span>
              </p>
              <p class="text-sm font-normal text-gray-500">
                Brief description about this feature
              </p>
            </div>
            <div>
              <button disabled class="button-outline">
                Connect
              </button>
            </div>
          </li>
          <li class="flex justify-between items-center mb-8">
            <div>
              <p class="text-lg font-medium text-gray-700 mb-1">
                {{ isBankConnected ? 'Update' : 'Setup' }} Bank Information
              </p>
              <p class="text-sm font-normal text-gray-500">
                Brief description about this feature
              </p>
            </div>
            <div>
              <button class="button-outline flex items-center" @click.prevent="nextStep">
                <i
                  role="button"
                  class="fi-rr-bank mr-2 text-blue-500 h-5 w-5"
                ></i>
                <span class="text-base font-medium">{{ isBankConnected ? 'Edit Details' : 'Setup' }}</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <template v-if="currentDisplay === 3">
      <div class="flex justify-between items-center mb-9">
        <p class="text-2xl font-normal text-gray-700">
          {{ isBankConnected ? 'Update' : 'Setup' }} Bank Information
        </p>
        <i
          role="button"
          class="fi-rr-cross text-blue-500 h-4 w-4"
          @click.prevent="closeModal"
        ></i>
      </div>
      <div class="space-y-5">
        <p class="text-sm font-normal text-gray-500">
          Enter your bank account information integration with your getwelp account
        </p>
        <div class="flex flex-col gap-1.5">
          <label for="businessName" class="required">Account Name</label>
          <input
            v-model="bankForm.accountHolderName"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="businessName" class="required">Sort Code Name</label>
          <input
            v-model="bankForm.accountRoutingNo"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="businessName" class="required">Account Number</label>
          <input
            v-model="bankForm.accountNo"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="businessName" class="required">Bank Name</label>
          <input
            v-model="bankForm.accountBankName"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
        <div class="flex justify-end">
          <button :disabled="isFormFilled" class="button-fill" @click.prevent="saveBankDetails">
            <SingleLoader v-if="isLoading" class="mr-2" />
            {{ isBankConnected ? 'Update' : 'Save' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PaymentConnection',
  props: {
    selectDisplay: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isLoading: false,
      isStripeLoading: false,
      currentDisplay: this.selectDisplay,
      bankForm: {
        accountHolderName: this.isBankConnected ? this.bankDetails : '',
        accountHolderType: this.isBankConnected ? this.bankDetails.accountHolderType : 'individual',
        accountNo: this.isBankConnected ? this.bankDetails.accountNo : '',
        accountRoutingNo: this.isBankConnected ? this.bankDetails.accountRoutingNo : '108800',
        accountBankName: this.isBankConnected ? this.bankDetails.accountBankName : ''
      }
    }
  },
  computed: {
    ...mapGetters('payment', {
      isBankConnected: 'isBankConnected',
      bankDetails: 'bankDetails',
      isStripeConnected: 'isStripeConnected'
    }),
    isFormFilled () {
      const values = Object.values(this.bankForm)
      const fieldsWithValues = values.filter(Boolean)
      if (fieldsWithValues.length !== values.length) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      createBankAccount: 'payment/createBankAccount',
      updateBankAccount: 'payment/updateBankAccount',
      disconnectStripe: 'invoice/disconnectStripe'
    }),
    nextStep () {
      this.currentDisplay += 1
    },
    async stripeConnection () {
      this.isStripeLoading = true
      try {
        if (this.isStripeConnected) {
          await this.disconnectStripe()
        } else {
          const connect = await this.stripeConnect()
          window.location.href = connect
        }
      } catch (error) {
        this.$gwtoast.error(`Stripe ${this.isStripeConnected ? 'Disconnect' : 'Connect'} Failed!`)
      }
      this.isStripeLoading = false
    },
    async saveBankDetails () {
      this.isLoading = true
      try {
        if (!this.isBankConnected) {
          await this.createBankAccount(this.bankForm)
        } else {
          await this.updateBankAccount(this.bankForm)
        }
        this.closeModal()
        this.$gwtoast.success('Bank details saved')
      } catch (error) {
        this.$gwtoast.error(`Something went wrong: ${error.response.data.message}`)
      }
      this.isLoading = false
    },
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
