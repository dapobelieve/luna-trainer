<template>
  <div>
    <h5 class="text-lg font-bold">
      Tell us a bit about you
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex gap-4">
        <div class="flex flex-col gap-1.5 flex-grow">
          <label for="first-name" class="required" :class="{'text-red-500' : $v.firstName.$error}">First name</label>
          <div class>
            <input
              id="first-name"
              v-model.trim="firstName"
              type="text"
              name="first-name"
              class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
              :class="{'border-red-500' : $v.firstName.$error}"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1.5 flex-grow">
          <label for="last-name" class="required" :class="{'text-red-500' : $v.lastName.$error}">Last name</label>
          <div class>
            <input
              id="last-name"
              v-model="lastName"
              type="text"
              name="last-name"
              class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
              :class="{'border-red-500' : $v.lastName.$error}"
            />
          </div>
        </div>
      </div>
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
        <label for="country" class="required" :class="{'text-red-500' : $v.location.$error}">Where are you based?</label>
        <select
          v-model="location"
          autocomplete="country"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-500' : $v.location.$error}"
        >
          <option v-for="country in countries" :key="country.numericCode">
            {{ country.name }}
          </option>
        </select>
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
        <PhoneComponent v-model="phone" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="timezone" class="required" :class="{'text-red-400' : $v.timezone.$error}">Time zone</label>
        <select
          id="timezone"
          v-model="timezone"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-400' : $v.timezone.$error}"
        >
          <option v-for="time in timezones" :key="time.index">
            {{ time.text }}
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="dateformat" class="required" :class="{'text-red-400' : $v.dateFormat.$error}">Date format</label>
        <select
          id="dateformat"
          v-model="dateFormat"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-400' : $v.dateFormat.$error}"
        >
          <option value="DD/MM/YY">
            DD/MM/YY
          </option>
          <option value="YY/MM/DD">
            YY/MM/DD
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import timezones from '~/timezones.json'
import countries from '~/countries.json'
import PhoneComponent from '~/components/util/PhoneComponent'
export default {
  name: 'OnboardingProfileSetup',
  components: { PhoneComponent },
  data () {
    return {
      countries,
      timezones,
      isValid: false,
      // eslint-disable-next-line
      regex: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    }
  },
  computed: {
    ...mapState({
      personalProfile: state => state.profile.user
    }),
    firstName: {
      get () { return this.personalProfile.firstName },
      set (val) {
        this.setProfileData({ key: 'firstName', value: val })
      }
    },
    lastName: {
      get () { return this.personalProfile.lastName },
      set (val) {
        this.setProfileData({ key: 'lastName', value: val })
      }
    },
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
    location: {
      get () { return this.personalProfile.location },
      set (val) {
        this.setProfileData({ key: 'location', value: val })
      }
    },
    currency: {
      get () { return this.personalProfile.currency },
      set (val) {
        this.setProfileData({ key: 'currency', value: val })
      }
    },
    phone: {
      get () { return this.personalProfile.phoneNumber },
      set (val) {
        this.setProfileData({ key: 'phoneNumber', value: val })
      }
    },
    timezone: {
      get () { return this.personalProfile.timezone },
      set (val) {
        this.setProfileData({ key: 'timezone', value: val })
      }
    },
    dateFormat: {
      get () { return this.personalProfile.dateFormat },
      set (val) {
        this.setProfileData({ key: 'dateFormat', value: val })
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
    firstName: {
      required
    },
    lastName: {
      required
    },
    businessName: {
      required
    },
    websiteUrl: {
      required
    },
    location: {
      required
    },
    currency: {
      required
    },
    timezone: {
      required
    },
    dateFormat: {
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
