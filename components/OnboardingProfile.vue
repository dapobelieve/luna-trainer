<template>
  <div>
    <h5 class="text-lg font-bold">
      Basic contact information.
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
        <PhoneComponent v-model="phone" />
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
        <label for="pronouns" class="required" :class="{'text-red-500' : $v.location.$error}">
          <span>
            <span class="text-sm md:gap-3">Preferred pronouns</span>
            <span class="text-sm md:gap-3">This helps us understand the best way to address you.</span>
          </span>
        </label>
        <select
          v-model="pronouns"
          autocomplete="country"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          :class="{'border-red-500' : $v.location.$error}"
        >
          <option value="She / Her">
            She / Her
          </option>
          <option value="They / Them">
            They / Them
          </option>
          <option value="He / Him">
            He / Him
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import countries from '~/countries.json'
import PhoneComponent from '~/components/util/PhoneComponent'
export default {
  name: 'OnboardingProfileSetup',
  components: { PhoneComponent },
  data () {
    return {
      countries
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
    location: {
      get () { return this.personalProfile.location },
      set (val) {
        this.setProfileData({ key: 'location', value: val })
      }
    },
    pronouns: {
      get () { return this.personalProfile.pronouns },
      set (val) {
        this.setProfileData({ parent: 'trainerProfile', key: 'pronouns', value: val })
      }
    },
    phone: {
      get () { return this.personalProfile.phoneNumber },
      set (val) {
        this.setProfileData({ key: 'phoneNumber', value: val })
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
    location: {
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
