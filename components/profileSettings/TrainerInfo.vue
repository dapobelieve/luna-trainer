<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-1.5">
      <label for="accreditations">Do you have any accreditations, affiliations or qualifications?</label>
      <TagInput v-model="profile.accreditations" :tabindex="9" />
    </div>
    <label class="text-gray-400">
      {{ labelNote }}
    </label>
    <div class="flex flex-col gap-1.5">
      <label
        class="required"
      >What are your training areas of specialism, or behavioural issue focuses?</label>
      <TagInput v-model="profile.specialization" :class="{'border-red-500' : $v.profile.specialization.$invalid}" :tabindex="9" />
    </div>
    <label class="text-gray-400">
      {{ labelNote }}
    </label>
    <label class="text-gray-500">
      Use comma to separate more than one specialization.
    </label>
    <label
      for="usePositiveReinforce"
    >Can you confirm that you only use positive reinforcement, force free, trust based training methods? </label>
    <div class="flex flex-row gap-2">
      <label
        class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
      >
        <input
          v-model="profile.usePositiveReinforce"
          type="radio"
          name="profile.usePositiveReinforce"
          :checked="profile.usePositiveReinforce"
          :value="true"
          class="h-5 w-5 cursor-pointer text-blue-500 border-gray-200 focus:ring-blue-500"
          aria-labelledby="usePositiveReinforce-0-label"
          aria-describedby="usePositiveReinforce-0-description"
        />
        <span id="usePositiveReinforce-0-label" class="block font-medium ml-2">Yes</span>
      </label>
      <label
        class="rounded-md relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm"
        :class="{ 'bg-blue-50' : !profile.usePositiveReinforce }"
      >
        <input
          v-model="profile.usePositiveReinforce"
          :checked="profile.usePositiveReinforce"
          type="radio"
          name="profile.usePositiveReinforce"
          :value="false"
          class="h-5 w-5 cursor-pointer text-blue-500 border-gray-200 focus:ring-blue-500"
          aria-labelledby="usePositiveReinforce-0-label"
          aria-describedby="usePositiveReinforce-0-description"
        />
        <span id="usePositiveReinforce-0-label" class="block font-medium ml-2">No</span>
      </label>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'TrainerInfo',
  props: ['value'],
  data () {
    return {
      profile: this.value,
	  labelNote: 'Just type to add one, then hit enter to add more.'
    }
  },
  validations: {
    profile: {
      specialization: {
        required,
        minLength: minLength(1)
      }
    }
  },
  watch: {
    profile: {
      handler (newValue) {
        this.$emit('change', newValue)
        this.$emit('validation', this.$v.$invalid)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
