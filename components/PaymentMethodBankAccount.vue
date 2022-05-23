<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-9">
      <p class="text-2xl font-normal text-gray-700">
        Add your bank account details
      </p>
      <i
        role="button"
        class="fi-rr-cross text-blue-500 h-4 w-4"
        @click.prevent="$emit('close')"
      ></i>
    </div>
    <div class="space-y-5">
      <p class="text-sm font-normal text-gray-500">
        Enter your bank account information integration with your Luna account.
      </p>
      <div class="flex flex-col gap-1.5">
        <label class="required">Sort Code</label>
        <input
          v-model="bankAccount.sortCode"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="required">Account Number</label>
        <input
          v-model="bankAccount.accountNo"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="required">Account Name</label>
        <input
          v-model="bankAccount.accountHolderName"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="required">Bank Name</label>
        <input
          v-model="bankAccount.accountBankName"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div class="flex justify-end">
        <ButtonSpinner :loading="isLoading" :disabled="$v.bankAccount.$invalid" @click.prevent="upsertBankDetails">
          {{ bankAccount._id ? 'Update' : 'Save' }}
        </ButtonSpinner>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'PaymentMethodBankAccount',
  data () {
    return {
      isLoading: false,
      bankAccount: {}
    }
  },
  validations: {
    bankAccount: {
      accountHolderName: { required },
      accountNo: { required },
      sortCode: { required },
      accountBankName: { required }
    }
  },
  computed: {
    ...mapGetters({
      getBankAccount: 'payment-methods/getBankAccount'
    })
  },
  created () {
    this.bankAccount = this.getBankAccount
  },
  methods: {
    ...mapActions({
      createBankAccount: 'payment-methods/createBankAccount',
      updateBankAccount: 'payment-methods/updateBankAccount'
    }),
    async upsertBankDetails () {
      this.isLoading = true
      try {
        if (!this.bankAccount._id) {
          await this.createBankAccount(this.bankAccount)
          this.$nuxt.$emit('new-bank-account-added')
        } else {
          await this.updateBankAccount(this.bankAccount)
        }
        this.$emit('close')
        this.$lunaToast.success('Bank account setup successful')
      } catch (error) {
        console.log(error)
        this.$lunaToast.error(`${error.message}`)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

</style>
