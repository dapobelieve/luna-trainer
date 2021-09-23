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
          :class="{'tail-text-red-700' : $v.firstName.$error}"
        >First name <span class="tail-text-red-700">*</span></label>
        <div class="">
          <input
            id="first-name"
            v-model="firstName"
            type="text"
            name="first-name"
            class="tail-bg-white tail-py-1 tail-block tail-text-sm tail-w-full tail-shadow-sm tail-border-gray-300 tail-rounded-md tail-border tail-px-2 focus:tail-shadow-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            :class="{'tail-shadow-md tail-border-red-700' : $v.firstName.$error}"
            @blur="$v.firstName.$touch()"
          />
        </div>
      </div>
      <div>
        <label
          for="last-name"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
          :class="{'tail-text-red-700' : $v.lastName.$error}"
        >Last name <span class="tail-text-red-700">*</span></label>
        <div class="">
          <input
            id="last-name"
            v-model="lastName"
            type="text"
            name="last-name"
            class="tail-bg-white tail-py-1 tail-block tail-text-sm tail-w-full tail-shadow-sm tail-border-gray-300 tail-rounded-md tail-border tail-px-2 focus:tail-shadow-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            :class="{'tail-shadow-md tail-border-red-700' : $v.lastName.$error}"
            @blur="$v.lastName.$touch()"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="businessName"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
          :class="{'tail-text-red-700' : $v.businessName.$error}"
        >
          What’s your business’s name? <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="businessName"
            v-model="businessName"
            class="tail-block tail-w-full tail-shadow-sm tail-text-sm focus:tail-ring-grape-500 focus:tail-border-grape-500 tail-border-gray-300 tail-rounded-md tail-py-2  focus:tail-shadow-md tail-border tail-px-2 focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            :class="{'tail-shadow-md tail-border-red-700' : $v.businessName.$error}"
            @blur="$v.businessName.$touch()"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="websiteUrl"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
          :class="{'tail-text-red-700' : $v.websiteUrl.$error}"
        >
          What’s your website url? <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <input
            id="website"
            v-model="websiteUrl"
            type="url"
            class="tail-block tail-w-full tail-shadow-sm tail-text-sm focus:tail-ring-grape-500 focus:tail-shadow-md focus:tail-border-grape-500 tail-border-gray-300 tail-rounded-md tail-py-2 tail-border tail-px-2 focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            :class="{'tail-shadow-md tail-border-red-700' : $v.websiteUrl.$error}"
            @blur="$v.websiteUrl.$touch()"
          />
          <div v-if="$v.websiteUrl.$error" class="tail-mt-0.5">
            <span v-if="!$v.websiteUrl.url" class="tail-text-xs tail-text-red-700">url is invalid e.g https://example.com</span>
          </div>
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="country"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
          :class="{'tail-text-red-700' : $v.location.$error}"
        >
          Where are you based? <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <select
            v-model="location"
            autocomplete="country"
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2 focus:tail-shadow-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            :class="{'tail-shadow-md tail-border-red-700' : $v.location.$error}"
            @blur="$v.location.$touch()"
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
          :class="{'tail-text-red-700' : $v.currency.$error}"
        >Select your local currency <span class="tail-text-red-700">*</span></label>
        <div class="">
          <select
            id="currency"
            v-model="currency"
            autocomplete="currency"
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 focus:tail-shadow-md tail-px-2 focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            :class="{'tail-shadow-md tail-border-red-700' : $v.currency.$error}"
            @blur="$v.currency.$touch()"
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
          :class="{'tail-text-red-700' : $v.phone.$error}"
        >Phone number <span class="tail-text-red-700">*</span></label>
        <div class="">
          <input
            id="phone"
            v-model="phone"
            type="number"
            name="phone"
            class="tail-bg-white tail-py-1 tail-block tail-w-full tail-text-sm tail-shadow-sm tail-border-gray-300 tail-rounded-md tail-border tail-px-2  focus:tail-shadow-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            :class="{'tail-shadow-md tail-border-red-700' : $v.phone.$error}"
            @blur="$v.phone.$touch()"
          />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="timezone"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
          :class="{'tail-text-red-700' : $v.timezone.$error}"
        >
          Time zone <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <select
            id="timezone"
            v-model="timezone"
            class="tail-bg-white tail-shadow-sm tail-block tail-w-full focus:tail-shadow-md tail-text-sm tail-border-gray-300 tail-rounded-md tail-border tail-py-2 tail-px-2 focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            :class="{'tail-shadow-md tail-border-red-700' : $v.timezone.$error}"
            @blur="$v.timezone.$touch()"
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
