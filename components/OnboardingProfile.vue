<template>
  <div>
    <h2
      class="tail-text-lg tail-font-extrabold tail-tracking-tight tail-text-gray-700"
    >
      Tell us a bit about you
    </h2>
    <form
      class="tail-grid tail-grid-cols-1 tail-gap-y-6 sm:tail-grid-cols-2 sm:tail-gap-x-8 tail-mt-10 tail-text-gray-700"
    >
      <div>
        <label
          for="first-name"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >First name <span class="tail-text-red-700">*</span></label>
        <div class="">
          <input
            id="first-name"
            v-model="firstName"
            type="text"
            name="first-name"
            class="tail-bg-white tail-py-1 tail-block tail-w-full tail-shadow-sm tail-border-gray-300 tail-rounded-md tail-border tail-px-2"
          />
        </div>
      </div>
      <div>
        <label
          for="last-name"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >Last name <span class="tail-text-red-700">*</span></label>
        <div class="">
          <input
            id="last-name"
            v-model="lastName"
            type="text"
            name="last-name"
            class="tail-bg-white tail-py-1 tail-block tail-w-full tail-shadow-sm tail-border-gray-300 tail-rounded-md tail-border tail-px-2"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="businessName"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          What’s your business’s name? <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="businessName"
            v-model="businessName"
            class="tail-block tail-w-full tail-shadow-sm sm:tail-text-sm focus:tail-ring-grape-500 focus:tail-border-grape-500 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="website"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          What’s your website URL? <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="website"
            v-model="websiteURL"
            class="tail-block tail-w-full tail-shadow-sm sm:tail-text-sm focus:tail-ring-grape-500 focus:tail-border-grape-500 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="country"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Where are you based? <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <select
            v-model="location"
            autocomplete="country"
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full sm:tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2"
          >
            <option v-for="country in countries" :key="country.numericCode">
              {{ country.name }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <label
          for="currency"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >Select your local currency <span class="tail-text-red-700">*</span></label>
        <div class="">
          <select
            id="currency"
            v-model="currency"
            autocomplete="currency"
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full sm:tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2"
          >
            <option value="AUD">
              AUD
            </option>
            <option value="CAD">
              CAD
            </option>
            <option value="GBP">
              GBP (£)
            </option>
            <option value="USD">
              USD
            </option>
          </select>
        </div>
      </div>
      <div>
        <label
          for="phone"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >Phone number <span class="tail-text-red-700">*</span></label>
        <div class="">
          <input
            id="phone"
            v-model="phone"
            type="text"
            name="phone"
            class="tail-bg-white tail-py-1 tail-block tail-w-full tail-shadow-sm tail-border-gray-300 tail-rounded-md tail-border tail-px-2"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="timezone"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Time zone <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <select
            id="timezone"
            v-model="timezone"
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full sm:tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2"
          >
            <option v-for="time in timezones" :key="time.index">
              {{ time.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="dateformat"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Date format
        </label>
        <div class="">
          <select
            id="dateformat"
            v-model="dateFormat"
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full sm:tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2"
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
import { required } from 'vuelidate/lib/validators'
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
    websiteURL: {
      get () { return this.personalProfile.websiteURL },
      set (val) {
        this.setProfileData({ parent: 'personalProfile', key: 'websiteURL', value: val })
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
    website: {
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
    }
  },
  methods: {
    ...mapMutations({
      setProfileData: 'profile/UPDATE_TRAINNER_REG_DATA'
    })
  }
}
</script>

<style lang="scss" scoped></style>
