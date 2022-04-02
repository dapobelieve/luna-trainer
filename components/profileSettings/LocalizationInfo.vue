<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-1.5">
      <label for="timezone" class="required">Time zone</label>
      <GwSelector v-model="profile.timezone" placeholder="(GMT) Europe/london" class="w-full repeat-selector" :options="timezoneArr">
        <template v-slot:selectedOption="{selected}">
          <div class="flex items-center">
            <span class="text-gray-700">{{ selected.label }}</span>
          </div>
        </template>
        <template v-slot:dropdownOption="{ optionObject }" class="p-4">
          <div class="flex items-center py-2">
            <span class="text-gray-700">{{ optionObject.label }}</span>
          </div>
        </template>
      </GwSelector>
    </div>
    <div class="flex flex-col gap-1.5">
      <label for="dateformat">Date format</label>
      <select
        id="dateformat"
        v-model="profile.dateFormat"
        class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
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
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import timezones from '~/timezones.json'
export default {
  name: 'LocalizationInfo',
  props: ['value'],
  data () {
    return {
      form: {},
      timezones,
      profile: this.value
    }
  },
  computed: {
    timezoneArr () {
      return Array.from(new Set(this.timezones.reduce((acc, curr) => {
        return [...acc, ...curr.utc]
      }, [])))
    }
  },
  validations: {
    profile: {
      timezone: {
        required
      },
      dateFormat: {
        required
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

<style lang="scss" scoped>

</style>
