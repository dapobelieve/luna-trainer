<template>
  <div>
    <h5 class="text-lg font-bold">
      Tell us a bit about the type of Trainer you are
    </h5>
    <form class="flex flex-col gap-6 mt-6 lg:mt-10">
      <div class="flex flex-col gap-1.5">
        <label for="accreditations">
          <span>
            Do you have any accreditations, affiliations or qualifications?
          </span>
        </label>
        <TagInput
          v-model="trainer.accreditations"
          :block="false"
          :class="{'border-red-500' : $v.trainer.accreditations.$error}"/>
        <div class="text-gray-400">
          Just type to add one, then hit enter to add more.
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label
          class="required"
        >What are your training areas of specialism, or behavioural issue
          focuses? For example, Puppy Training, Separation Anxiety, Reactivity,
          Agility…
        </label>
        <TagInput
          v-model="trainer.specialization"
          :block="false"
          :class="{'border-red-500' : $v.trainer.accreditations.$error}" />
        <div class="text-gray-400">
          Just type to add one, then hit enter to add more.
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label
          for="usePositiveReinforce"
        >Can you confirm that you only use positive reinforcement, force free, trust based training methods? </label>
        <div class="flex flex-row gap-2">
          <label
            class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
            :class="{ 'bg-blue-50' : trainer.usePositiveReinforce, 'border-red-500' : !$v.trainer.usePositiveReinforce.$error }"
          >
            <input
              v-model="trainer.usePositiveReinforce"
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
            :class="{ 'bg-blue-50' : !trainer.usePositiveReinforce }"
          >
            <input
              v-model="trainer.usePositiveReinforce"
              :checked="trainer.usePositiveReinforce"
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
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'OnboardingTrainerProfile',
  data () {
    return {
      trainer: {}
    }
  },
  computed: {
    ...mapState({
      business: state => ({ ...state.onboarding.business })
    })
  },
  watch: {
    trainer (newValue, oldValue) {
      this.updateBusinessInfo(newValue)
      this.$emit('validity', this.$v.$invalid)
    }
  },
  mounted () {
    this.trainer = this.business
  },
  validations: {
    trainer: {
      specialization: {
        required
      },
      accreditations: {
        required
      }
    }
  },
  methods: {
    ...mapMutations({
      updateBusinessInfo: 'onboarding/updateBusinessInfo'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
