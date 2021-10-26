<template>
  <div>
    <div class="py-6">
      <h3 class="text-2xl font-medium sec-color">
        Bank Details
      </h3>
    </div>
    <div class="pb-4 py-5 px-5 rounded-md bg-white">
      <div class="py-3">
        <h3>Please enter your account details</h3>
        <form @click.prevent="onSubmit">
          <div class="md:grid grid-cols-2 gap-4">
            <div class="py-3">
              <label for="account-number" class="">Account number</label>
              <input v-model="details.accountNumber" type="number" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md">
            </div>
            <div class="py-3">
              <label for="routing-number" class="">Routing number</label>
              <input v-model="details.routingNumber" type="number" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md">
            </div>
            <div class="py-3">
              <label for="holdername" class="">Holdername</label>
              <input v-model="details.holderName" type="text" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md">
            </div>
            <div class="py-3">
              <label for="holder-type" class="">Holder type</label>
              <select v-model="details.holderType" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md">
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
          <div class="flex justify-end">
            <button
              style="width: fit-content"
              type="button"
              class="base-button"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BankDetails',
  data () {
    return {
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
