<template>
  <div>
    <div
      style="top: 72px"
      class="tail-sticky tail-flex tail-items-center md:tail-rounded-md tail-bg-white tail-px-4 tail-py-3 md:tail-my-3"
    >
      <div
        class="tail-mr-auto tail-text-sm md:tail-text-2xl tail-flex tail-gap-3"
      >
        Payment Details
      </div>
    </div>
    <div class="tail-p-3">
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
        <div class="tail-flex tail-justify-center tail-items-center">
          <button
            type="submit"
            class="base-button tail-w-full md:tail-w-1/2 tail-py-3"
          >
            Make Payment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDetails',
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
