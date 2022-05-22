<template>
  <div>
    <h5 class="text-lg font-bold">
      Basic business information.
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex flex-col gap-1.5">
        <label
          for="businessName"
          class="required"
          :class="{ 'text-red-500': $v.trainer.businessName.$error }"
        >
          Registered business name
        </label>
        <input
          id="businessName"
          v-model="trainer.businessName"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{ 'border-red-500': $v.trainer.businessName.$error }"
        />
      </div>
      <div class="flex flex-col gap-1.5 relative mb-1">
        <label for="websiteURL" class="required" :class="{'text-red-500' : $v.trainer.websiteUrl.$error}">Business website</label>
        <input
          id="website"
          v-model="trainer.websiteUrl"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-500' : $v.trainer.websiteUrl.$error}"
          @input="change($event)"
          @change="change($event)"
        />
        <small v-if="isValid" class="text-red-500 text-sm mt-1">Url is invalid</small>
      </div>
      <div class="flex flex-col gap-1.5">
        <label
          for="currency"
          class="required"
          :class="{ 'text-red-400': $v.trainer.currency.$error }"
        >Default trading currency</label>
        <select
          id="currency"
          v-model="trainer.currency"
          autocomplete="currency"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-400' : $v.trainer.currency.$error}"
        >
          <option value="NGN">
            NGN (₦)
          </option>
          <option value="AUD">
            AUD ($)
          </option>
          <option value="CAD">
            CAD ($)
          </option>
          <option value="GBP">
            GBP (£)
          </option>
          <option value="USD">
            USD ($)
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'BusinessDetails',
  data () {
    return {
      isValid: false,
      // eslint-disable-next-line
      regex: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      trainer: { ...this.$store.state.onboarding.business }
    }
  },
  watch: {
    trainer: {
      handler (val) {
        this.$store.commit('onboarding/updateBusinessInfo', { ...val })
        this.$emit('validity', this.$v.$invalid || this.isValid)
      },
      immediate: true,
      deep: true
    }
  },
  validations: {
    trainer: {
      businessName: {
        required
      },
      websiteUrl: {
        required
      },
      currency: {
        required
      }
    }
  },
  methods: {
    change (e) {
      const url = e.target.value
      if (this.regex.test(url)) {
        this.isValid = false
      } else {
        this.isValid = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
