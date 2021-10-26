<template>
  <div>
    <div class="tail-py-6">
      <h3 class="tail-text-2xl tail-font-medium sec-color">
        Bank Details
      </h3>
    </div>
    <div class="tail-pb-4 tail-py-5 tail-px-5 tail-rounded-md tail-bg-white">
      <div class="tail-py-3">
        <h3>Please enter your account details</h3>
        <form @click.prevent="onSubmit">
          <div class="md:tail-grid tail-grid-cols-2 tail-gap-4">
            <div class="tail-py-3">
              <label for="account-number" class="">Account number</label>
              <input v-model="details.accountNumber" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
            </div>
            <div class="tail-py-3">
              <label for="routing-number" class="">Routing number</label>
              <input v-model="details.routingNumber" type="number" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
            </div>
            <div class="tail-py-3">
              <label for="holdername" class="">Holdername</label>
              <input v-model="details.holderName" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
            </div>
            <div class="tail-py-3">
              <label for="holder-type" class="">Holder type</label>
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
          <div class="tail-flex tail-justify-end">
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
