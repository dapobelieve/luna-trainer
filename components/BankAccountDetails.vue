<template>
  <div class="tail-py-4 tail-px-6">
    <h2 class="tail-capitalize tail-font-medium tail-text-lg">
      edit bank details
    </h2>
    <div class="tail-mt-5">
      <p class="tail-text-sm tail-text-gray-400">
        This information is needed for the client to deposit to your account.
      </p>
      <form @click.prevent="submit">
        <div class="md:tail-grid tail-grid-cols-1 tail-gap-4 tail-mt-4">
          <div class="">
            <label for="account-number" class="">Account Number</label>
            <input v-model="details.accountNumber" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="">
            <label for="routing-number" class="">Routing Number</label>
            <input v-model="details.routingNumber" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="">
            <label for="holdername" class="">Account Holder Name</label>
            <input v-model="details.holderName" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="">
            <label for="holder-type" class="">Holder Type</label>
            <select v-model="details.holderType" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
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
export default {
  name: 'BankAccountDetails',
  data () {
    return {
      isLoading: false,
      details: {
        accountNumber: '',
        routingNumber: '',
        holderName: '',
        holderType: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch('payment/createBankAccount', this.details)
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
