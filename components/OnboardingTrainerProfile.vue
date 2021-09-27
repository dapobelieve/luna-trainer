<template>
  <div>
    <h5 class="tail-text-lg tail-font-bold">Tell us a bit about the type of Trainer you are</h5>
    <form class="tail-flex tail-flex-col tail-gap-6 tail-mt-6 lg:tail-mt-10">
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label for="accreditations">Do you have any accreditations? e.g APDT</label>
        <settings-tag-input v-model="accreditations" :block="false" />
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label
          class="required"
        >What training or behavioural areas do you specialise in? e.g Puppies, Separation Anxiety</label>
        <settings-tag-input v-model="specialization" :block="false" />
      </div>
      <div class="tail-flex tail-flex-col tail-gap-1.5">
        <label
          for="reinforcement"
        >Do you use positive reinforcement, force free, trust based methods?</label>
        <div class="tail-flex tail-flex-row tail-gap-2">
          <label
            class="tail-rounded-md tail-relative tail-border tail-p-3 tail-cursor-pointer focus:tail-outline-none tail-w-full tail-bg-white hover:tail-bg-blue-50 tail-transition-all tail-flex tail-items-center tail-shadow-sm"
            :class="{ 'tail-bg-blue-50' : reinforcement === 'yes' }"
          >
            <input
              v-model="reinforcement"
              type="radio"
              name="reinforcement"
              :checked="reinforcement"
              value="yes"
              class="tail-h-5 tail-w-5 tail-cursor-pointer tail-text-blue-500 tail-border-gray-200 focus:tail-ring-blue-500"
              aria-labelledby="reinforcement-0-label"
              aria-describedby="reinforcement-0-description"
            />
            <span id="reinforcement-0-label" class="tail-block tail-font-medium tail-ml-2">Yes</span>
          </label>
          <label
            class="tail-rounded-md tail-relative tail-border tail-p-3 tail-cursor-pointer focus:tail-outline-none tail-w-full tail-bg-white hover:tail-bg-blue-50 tail-transition-all tail-flex tail-items-center tail-shadow-sm"
            :class="{ 'tail-bg-blue-50' : reinforcement === 'no' }"
          >
            <input
              v-model="reinforcement"
              :checked="reinforcement"
              type="radio"
              name="reinforcement"
              value="no"
              class="tail-h-5 tail-w-5 tail-cursor-pointer tail-text-blue-500 tail-border-gray-200 focus:tail-ring-blue-500"
              aria-labelledby="reinforcement-0-label"
              aria-describedby="reinforcement-0-description"
            />
            <span id="reinforcement-0-label" class="tail-block tail-font-medium tail-ml-2">No</span>
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
