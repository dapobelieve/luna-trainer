<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-1.5">
      <label for="timezone" class="required">Time zone</label>
      <select
        id="timezone"
        v-model="profile.timezone"
        class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        :class="{'border-red-500' : $v.profile.timezone.$invalid}"
      >
        <option v-for="time in timezones" :key="time.index">
          {{ time.text }}
        </option>
      </select>
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
      timezones,
      profile: this.value
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
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
