<template>
  <div>

    <h5 class="tail-text-lg tail-font-bold">Tell us a bit about you</h5>
    <form class="tail-flex tail-flex-col tail-gap-6 tail-mt-6 lg:tail-mt-10">
      <div class="tail-flex tail-gap-4">
        <div class="tail-flex tail-flex-col tail-gap-1.5 tail-flex-grow">
          <label for="first-name" class="required">First name</label>
          <div class>
            <input
              id="first-name"
              v-model="firstName"
              type="text"
              name="first-name"
              class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            />
          </div>
        </div>
        <div class="tail-flex tail-flex-col tail-gap-1.5 tail-flex-grow">
          <label for="last-name" class="required">Last name</label>
          <div class>
            <input
              id="last-name"
              v-model="lastName"
              type="text"
              name="last-name"
              class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            />
          </div>
        </div>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="businessName" class="required">What’s your business’s name?</label>
        <input
          id="businessName"
          v-model="businessName"
          class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
        />
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="websiteURL" class="required">What’s your website url?</label>
        <input
          id="website"
          v-model="websiteURL"
          class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
        />
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="country" class="required">Where are you based?</label>
        <select
          v-model="location"
          autocomplete="country"
          class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
        >
          <option v-for="country in countries" :key="country.numericCode">{{ country.name }}</option>
        </select>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="currency" class="required">Select your local currency</label>
        <select
          id="currency"
          v-model="currency"
          autocomplete="currency"
          class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
        >
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="GBP">GBP (£)</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="phone" class="required">Phone number</label>
        <div class>

          <input
            id="phone"
            v-model="phone"
            type="number"
            name="phone"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
          />
        </div>
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="timezone" class="required">Time zone</label>
        <select
          id="timezone"
          v-model="timezone"
          class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
        >
          <option v-for="time in timezones" :key="time.index">{{ time.text }}</option>
        </select>

      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="dateformat" class="required">Date format</label>
        <select
          id="dateformat"
          v-model="dateFormat"
          class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
        >

          Date format
        </label>
        <div class="">
          <select
            id="dateformat"
            v-model="dateFormat"
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2 focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
          >
            <option value="DD/MM/YY">
              DD/MM/YY
            </option>
            <option value="YY/MM/DD">
              YY/MM/DD
            </option>
          </select>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, url } from 'vuelidate/lib/validators'
import timezones from '~/timezones.json'
import countries from '~/countries.json'
export default {
  name: 'OnboardingProfileSetup',
  data () {
    return {
      countries,
      timezones
    }
  },
  computed: {
    ...mapState({
      personalProfile: state => state.profile.trainnerRegData.personalProfile
    }),
    firstName: {
      get () { return this.personalProfile.firstName },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'firstName', value: val })
      }
    },
    lastName: {
      get () { return this.personalProfile.lastName },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'lastName', value: val })
      }
    },
    businessName: {
      get () { return this.personalProfile.businessName },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'businessName', value: val })
      }
    },
    websiteUrl: {
      get () { return this.personalProfile.websiteUrl },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'websiteUrl', value: val })
      }
    },
    location: {
      get () { return this.personalProfile.location },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'location', value: val })
      }
    },
    currency: {
      get () { return this.personalProfile.currency },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'currency', value: val })
      }
    },
    phone: {
      get () { return this.personalProfile.phone },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'phone', value: val })
      }
    },
    timezone: {
      get () { return this.personalProfile.timezone },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'timezone', value: val })
      }
    },
    dateFormat: {
      get () { return this.personalProfile.dateFormat },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'dateFormat', value: val })
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
      required,
      url
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
    phone: {
      required
    }
  },
  methods: {
    ...mapMutations({
      setProfileData: 'profile/UPDATE_TRAINNER_REG_DATA'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
