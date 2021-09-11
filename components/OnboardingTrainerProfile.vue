<template>
  <div>
    <h2
      class="tail-text-lg tail-font-extrabold tail-tracking-tight tail-text-gray-700"
    >
      Tell us a bit about the type of Trainer you are
    </h2>
    <form
      class="tail-grid tail-grid-cols-1 tail-gap-y-6 sm:tail-grid-cols-2 sm:tail-gap-x-8 tail-mt-10 tail-text-gray-700"
    >
      <div class="sm:tail-col-span-2">
        <label
          for="accreditations"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Do you have any accreditations? e.g APDT
        </label>
        <div class="">
          <settings-tag-input v-model="accreditations" :block="false" />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          What training or behavioural areas do you specialise in? e.g Puppies, Separation Anxiety <span class="tail-text-red-700">*</span>
        </label>
        <div class="">
          <settings-tag-input v-model="specialization" :block="false" />
        </div>
      </div>
      <div class="sm:tail-col-span-2">
        <label
          for="reinforcement"
          class="tail-block tail-text-sm tail-font-extralight tail-mb-2"
        >
          Do you use positive reinforcement, force free, trust based methods?
        </label>
        <div class="tail-flex tail-space-x-2">
          <label class="tail-rounded-tl-md tail-rounded-md tail-relative tail-border tail-px-4 tail-py-2.5 tail-flex tail-cursor-pointer focus:tail-outline-none tail-w-full" :class="{ 'tail-bg-blue-200' : reinforcement === 'yes' }">
            <input
              v-model="reinforcement"
              type="radio"
              name="reinforcement"
              :checked="reinforcement"
              value="yes"
              class="tail-h-4 tail-w-4 tail-mt-0.5 tail-cursor-pointer tail-text-indigo-600 tail-border-gray-300 focus:tail-ring-indigo-500"
              aria-labelledby="reinforcement-0-label"
              aria-describedby="reinforcement-0-description"
            >
            <div class="tail-ml-3 tail-flex tail-flex-col">
              <span id="reinforcement-0-label" class="tail-block tail-text-sm tail-font-medium">
                Yes
              </span>
            </div>
          </label>
          <label class="tail-rounded-tl-md tail-rounded-md tail-relative tail-border tail-px-4 tail-py-2.5 tail-flex tail-cursor-pointer focus:tail-outline-none tail-w-full" :class="{ 'tail-bg-blue-200' : reinforcement === 'no' }">
            <input
              v-model="reinforcement"
              :checked="reinforcement"
              type="radio"
              name="reinforcement"
              value="no"
              class="tail-h-4 tail-w-4 tail-mt-0.5 tail-cursor-pointer tail-text-indigo-600 tail-border-gray-300 focus:tail-ring-indigo-500"
              aria-labelledby="reinforcement-0-label"
              aria-describedby="reinforcement-0-description"
            >
            <div class="tail-ml-3 tail-flex tail-flex-col">
              <span id="reinforcement-0-label" class="tail-block tail-text-sm tail-font-medium">
                No
              </span>
            </div>
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
      accreditations: [...this.$store.state.profile.trainnerRegData.trainnerProfile.accreditations],
      specialization: [...this.$store.state.profile.trainnerRegData.trainnerProfile.specialization]
    }
  },
  computed: {
    ...mapState({
      personalProfile: state => state.profile.trainnerRegData.trainnerProfile
    }),
    reinforcement: {
      get () { return this.personalProfile.reinforcement },
      set (val) {
        this.setProfileData({ parent: 'trainnerProfile', key: 'reinforcement', value: val })
      }
    }
  },
  watch: {
    specialization (newValue, oldValue) {
      if (newValue) {
        const specials = [...this.specialization]
        this.setProfileData({ parent: 'trainnerProfile', key: 'specialization', value: specials })
      }
    },
    accreditations (newValue, oldValue) {
      if (newValue) {
        const creds = [...this.accreditations]
        this.setProfileData({ parent: 'trainnerProfile', key: 'accreditations', value: creds })
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
      setProfileData: 'profile/UPDATE_TRAINNER_REG_DATA'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
