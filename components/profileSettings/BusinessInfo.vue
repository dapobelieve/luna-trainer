<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-1.5">
      <label
        for="businessName"
        class="required"
      >Registered business name</label>
      <input
        id="businessName"
        v-model="profile.businessName"
        class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        :class="{ 'border-red-500': $v.profile.businessName.$invalid }"
      />
    </div>
    <div class="flex flex-col gap-1.5">
      <label for="websiteUrl" class="required">Business website</label>
      <input
        id="websiteUrl"
        v-model="profile.websiteUrl"
        class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        :class="{ 'border-red-500': $v.profile.websiteUrl.$invalid }"
      />
    </div>
    <div class="flex flex-col gap-1.5">
      <label
        for="currency"
        class="required"
      >Default trading currency</label>
      <select
        id="currency"
        v-model="profile.currency"
        autocomplete="currency"
        class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        :class="{'border-red-500' : $v.profile.currency.$invalid}"
      >
        <option value="AUD">
          AUD ($)
        </option>
         <option value="NGN">
            NGN (₦)
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
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'BusinessInfo',
  props: ['value'],
  data () {
    return {
      profile: this.value
    }
  },
  validations: {
    profile: {
      businessName: {
        required
      },
      currency: {
        required
      },
      websiteUrl: {
        isUrl: (value) => {
          // eslint-disable-next-line
          const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
          return urlRegex.test(value)
        }
      }
    }
  },
  watch: {
    profile: {
      handler (newValue) {
        this.$emit('change', newValue)
        this.$emit('validation', this.$v.$invalid)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
