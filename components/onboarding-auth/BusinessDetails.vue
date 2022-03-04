<template>
  <div>
    <h5 class="text-lg font-bold">
      Tell us a bit about your business
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex flex-col gap-1.5">
        <label for="businessName" class="required" :class="{'text-red-500' : $v.businessName.$error}">What’s your business’s name?</label>
        <input
          id="businessName"
          v-model="businessName"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-500' : $v.businessName.$error}"
        />
      </div>
      <div class="flex flex-col gap-1.5 relative mb-1">
        <label for="websiteURL" class="required" :class="{'text-red-500' : $v.websiteUrl.$error}">What’s your website url?</label>
        <input
          id="website"
          v-model="websiteUrl"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-500' : $v.websiteUrl.$error}"
          @input="change($event)"
          @change="change($event)"
        />
        <small v-if="isValid" class="text-red-500 text-sm absolute -bottom-5">url is invalid</small>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="currency" class="required" :class="{'text-red-400' : $v.currency.$error}">Select your local currency</label>
        <select
          id="currency"
          v-model="currency"
          autocomplete="currency"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-400' : $v.currency.$error}"
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
      <div class="flex flex-col gap-1.5">
        <label for="vat" class="">VAT/Local Tax Number (where applicable)</label>
        <input
          id="vat"
          v-model="vat"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'BusinessDetails',
  data () {
    return {
      isValid: false,
      // eslint-disable-next-line
      regex: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      vat: ''
    }
  },
  computed: {
    ...mapState({
      personalProfile: state => state.profile.user
    }),
    businessName: {
      get () { return this.personalProfile.businessName },
      set (val) {
        this.setProfileData({ key: 'businessName', value: val })
      }
    },
    websiteUrl: {
      get () { return this.personalProfile.websiteUrl },
      set (val) {
        this.setProfileData({ key: 'websiteUrl', value: val })
      }
    },
    currency: {
      get () { return this.personalProfile.currency },
      set (val) {
        this.setProfileData({ key: 'currency', value: val })
      }
    }
  },
  watch: {
    '$v.$invalid' (newValue, oldValue) {
      this.$emit('validity', this.$v.$invalid)
    }
  },
  mounted () {
    if (!this.$v.$invalid) {
      this.$emit('validity', this.$v.$invalid)
    }
  },
  validations: {
    businessName: {
      required
    },
    websiteUrl: {
      required
    },
    currency: {
      required
    }
  },
  methods: {
    ...mapMutations({
      setProfileData: 'profile/UPDATE_TRAINER_REG_DATA'
    }),
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
