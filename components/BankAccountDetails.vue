<template>
  <div class="tail-py-4 tail-px-6">
    <h2 class="tail-capitalize tail-font-medium tail-text-lg">
      edit bank details
    </h2>
    <div class="tail-mt-5">
      <p :class="[$route.name === 'Messages' ? 'tail-text-red-500' : 'tail-text-gray-400', 'tail-text-sm']">
        This information is needed for the client to deposit to your account.
      </p>
      <form @submit.prevent="submit">
        <div class="md:tail-grid tail-grid-cols-1 tail-gap-4 tail-mt-4">
          <div class="">
            <label for="account-number" class="">Account Number</label>
            <input v-model="details.accountNo" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="">
            <label for="routing-number" class="">Routing Number</label>
            <input v-model="details.accountRoutingNo" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="">
            <label for="holdername" class="">Account Holder Name</label>
            <input v-model="details.accountHolderName" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="">
            <label for="holdername" class="">Bank Name</label>
            <input v-model="details.accountbankName" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="">
            <label for="holder-type" class="">Holder Type</label>
            <select v-model="details.accountHolderType" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
              <option value=""></option>
              <option value="individual">
                Individual
              </option>
              <option value="business">
                Business
              </option>
            </select>
          </div>
        </div>
        <div class="tail-flex tail-justify-end tail-py-4">
          <button style="width: fit-content" :disabled="isLoading" class="base-button">
            <SingleLoader v-if="isLoading" class="tail-mr-2" />
            {{ isLoading ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'BankAccountDetails',
  data () {
    return {
      isLoading: false,
      details: {
        accountNo: '',
        accountRoutingNo: '',
        accountHolderName: '',
        accountHolderType: '',
        accountbankName: ''
      }
    }
  },
  methods: {
    ...mapActions({
      createAccount: 'payment/createBankAccount'
    }),
    submit () {
      return this.createAccount(this.details).then((response) => {
        console.log('response', response)
        if (response.status === 'success') {
          this.$toast.success('Account registration successful', { position: 'bottom-right' })
        }
      }).catch((err) => {
        if (err.response) {
          this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
        } else if (err.request) {
          this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
        } else {
          this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
        }
      })
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
