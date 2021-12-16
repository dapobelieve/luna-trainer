<template>
  <div>
    <h5 class="text-lg font-bold">
      Tell us a bit about the type of Trainer you are
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex flex-col gap-1.5">
        <label for="accreditations">Do you have any accreditations? e.g APDT</label>
        <settings-tag-input v-model="accreditations" :block="false" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label
          class="required"
        >What training or behavioural issues do you specialise in? e.g Puppies, Separation Anxiety</label>
        <settings-tag-input v-model="specialization" :block="false" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label
          for="usePositiveReinforce"
        >Do you use positive reinforcement, force free, trust based methods?</label>
        <div class="flex flex-row gap-2">
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{ 'bg-blue-50' : usePositiveReinforce }"
          >
            <input
              v-model="usePositiveReinforce"
              type="radio"
              name="usePositiveReinforce"
              :checked="usePositiveReinforce"
              :value="true"
              class="h-5 w-5 cursor-pointer text-blue-500 border-gray-200 focus:ring-blue-500"
              aria-labelledby="usePositiveReinforce-0-label"
              aria-describedby="usePositiveReinforce-0-description"
            />
            <span id="usePositiveReinforce-0-label" class="block font-medium ml-2">Yes</span>
          </label>
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{ 'bg-blue-50' : !usePositiveReinforce }"
          >
            <input
              v-model="usePositiveReinforce"
              :checked="usePositiveReinforce"
              type="radio"
              name="usePositiveReinforce"
              :value="false"
              class="h-5 w-5 cursor-pointer text-blue-500 border-gray-200 focus:ring-blue-500"
              aria-labelledby="usePositiveReinforce-0-label"
              aria-describedby="usePositiveReinforce-0-description"
            />
            <span id="usePositiveReinforce-0-label" class="block font-medium ml-2">No</span>
          </label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'OnboardingTrainerProfile',
  data () {
    return {
      accreditations: [...this.$store.state.profile.trainerRegData.trainerProfile.accreditations],
      specialization: [...this.$store.state.profile.trainerRegData.trainerProfile.specialization]
    }
  },
  computed: {
    ...mapState({
      personalProfile: state => state.profile.trainerRegData.trainerProfile
    }),
    usePositiveReinforce: {
      get () { return this.personalProfile.usePositiveReinforce },
      set (val) {
        this.setProfileData({ parent: 'trainerProfile', key: 'usePositiveReinforce', value: val })
      }
    }
  },
  watch: {
    specialization (newValue, oldValue) {
      if (newValue) {
        const specials = [...this.specialization]
        this.setProfileData({ parent: 'trainerProfile', key: 'specialization', value: specials })
      }
    },
    accreditations (newValue, oldValue) {
      if (newValue) {
        const creds = [...this.accreditations]
        this.setProfileData({ parent: 'trainerProfile', key: 'accreditations', value: creds })
      }
    },
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
    specialization: {
      required,
      minLength: minLength(1)
    }
  },
  methods: {
    ...mapMutations({
      setProfileData: 'profile/UPDATE_TRAINER_REG_DATA'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
