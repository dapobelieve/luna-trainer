<template>
  <div>
    <h5 class="text-lg font-bold">
      Basic contact information.
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex gap-4">
        <div class="flex flex-col gap-1.5 flex-grow">
          <label for="first-name" class="required" :class="{'text-red-500' : $v.profile.firstName.$error}">First name</label>
          <div class>
            <input
              id="first-name"
              v-model.trim="profile.firstName"
              type="text"
              name="first-name"
              class="input-field"
              :class="{'border-red-500' : $v.profile.firstName.$error}"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1.5 flex-grow">
          <label for="last-name" class="required" :class="{'text-red-500' : $v.profile.lastName.$error}">Last name</label>
          <div class>
            <input
              id="last-name"
              v-model="profile.lastName"
              type="text"
              name="last-name"
              class="input-field"
              :class="{'border-red-500' : $v.profile.lastName.$error}"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <PhoneComponent v-model="profile.phoneNumber" :country="profile.businessCountry" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="country" class="required" :class="{'text-red-500' : $v.profile.businessCountry.$error}">Where are you based?</label>
        <select
          v-model="profile.businessCountry"
          autocomplete="country"
          class="input-field"
          :class="{'border-red-500' : $v.profile.businessCountry.$error}"
        >
          <option v-for="country in countries" :key="country.code" :value="country.code" >
            {{ country.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="pronouns" class="">
          <span>
            <span class="text-sm md:gap-3">Preferred pronouns</span>
            <span class="text-sm md:gap-3">This helps us understand the best way to address you.</span>
          </span>
        </label>
        <select
          v-model="profile.pronouns"
          autocomplete="country"
          class="input-field"
        >
          <option value="she/her">
            She / Her
          </option>
          <option value="they/them">
            They / Them
          </option>
          <option value="he/him">
            He / Him
          </option>
          <option value="prefer not to say">
            Prefer not to say
          </option>
        </select>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import countries from '~/countries.json'
import PhoneComponent from '~/components/util/PhoneComponent'
export default {
  name: 'OnboardingProfileSetup',
  components: { PhoneComponent },
  data () {
    return {
      countries,
      profile: { ...this.$store.state.onboarding.personal }
    }
  },
  watch: {
    profile: {
      handler (value) {
        this.$store.commit('onboarding/updatePersonalInfo', { ...value })
        this.$emit('validity', this.$v.$invalid)
      },
      deep: true,
      immediate: true
    }
  },
  validations: {
    profile: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      businessCountry: {
        required
      },
      phoneNumber: {
        required
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.input-field{
  @apply bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500;
}
</style>
