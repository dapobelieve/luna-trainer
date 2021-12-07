<template>
  <div
    class=""
  >
    <div class="flex justify-between">
      <label for="dueDate" class="input-text-label">Age</label>
      <button class="text-xs text-blue-500 " type="button" @click="switchToAge">
        {{ dobFormat ? 'Switch to Age format' : 'Switch to date of birth format' }}
      </button>
    </div>
    <div v-if="dobFormat">
      <div>
        <date-picker
          v-model="birthDate"
          style="width: 100% !important"
          class="w-full relative"
          :disabled-date="date => date > new Date()"
          format="DD-MMM-YYYY"
          @change="convertToWMYFormat(birthDate)"
        ></date-picker>
      </div>
      <small v-show="birthDate" class="absolute"><span class="capitalize">{{ dogInfo.name ? dogInfo.name : 'Your dog' }}</span> was born on {{ new Date(birthDate).toDateString() }}</small>
    </div>

    <div v-else>
      <span>
        <div class="information_box relative flex items-center justify-between">
          <div class="flex flex-row-reverse">
            <label for="weeks" class="text-base text-gray-500">weeks</label>
            <input v-model="wmyFormattedWeeks" type="number" class="w-6 focus:border-0 focus:outline-none" @input="changeDate">
          </div>
          <div class="flex flex-row-reverse">
            <label for="months" class="text-base text-gray-500">months</label>
            <input v-model="wmyFormattedMonths" type="number" class="w-6 focus:border-0 focus:outline-none" @input="changeDate">
          </div>
          <div class="flex flex-row-reverse">
            <label for="year" class="text-base text-gray-500">years</label>
            <input v-model="wmyFormattedYears" type="number" class="w-6 focus:border-0 focus:outline-none" @input="changeDate">
          </div>
        </div>
        <small v-show="dogInfo" class="absolute"><span class="capitalize">{{ dogInfo.name ? dogInfo.name : 'Your dog' }}</span> is {{ wmyFormattedYears }} year(s), {{ wmyFormattedMonths }} month(s) and {{ wmyFormattedWeeks }} week(s) old</small>
      </span>
    </div>
  </div>
</template>

<script>

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  props: {
    dogInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      birthDate: 'approxDateOfBirth' in this.dogInfo.age ? new Date(this.dogInfo.age.approxDateOfBirth) : '',
      wmyFormattedWeeks: 'approxDateOfBirth' in this.dogInfo.age ? Math.floor(new Date(this.dogInfo.age.approxDateOfBirth).getDate() / 7) : '',
      wmyFormattedMonths: 'approxDateOfBirth' in this.dogInfo.age ? (new Date().getMonth() + 1) - (new Date(this.dogInfo.age.approxDateOfBirth).getMonth() + 1) : '',
      wmyFormattedYears: 'approxDateOfBirth' in this.dogInfo.age ? new Date().getFullYear() - new Date(this.dogInfo.age.approxDateOfBirth).getFullYear() : '',
      dobFormat: !!('format' in this.dogInfo.age && this.dogInfo.age.format === 'DATE')
    }
  },
  computed: {
    current () {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()

      return {
        day,
        month,
        year
      }
    }
  },
  methods: {
    switchToAge () {
      this.dobFormat = !this.dobFormat
    },
    changeDate () {
      const today = new Date()
      const currYear = this.wmyFormattedYears === '' ? today.getFullYear() : today.getFullYear() - this.wmyFormattedYears
      const currMonth = this.wmyFormattedMonths === '' ? today.getMonth() : today.getMonth() - this.wmyFormattedMonths
      const nextWeek = new Date(currYear, currMonth, today.getDate() - (this.wmyFormattedWeeks * 7))
      this.birthDate = nextWeek

      this.$emit('wmyFormat', {
        format: 'WMY',
        value: {
          weeks: this.wmyFormattedWeeks,
          months: this.wmyFormattedMonths,
          years: this.wmyFormattedYears
        }
      })
    },
    convertToWMYFormat (date) {
      const datePicked = this.birthDate
      if (datePicked) {
        let day, month, year
        let {
          day: currentDay,
          month: currentMonth,
          // eslint-disable-next-line prefer-const
          year: currentYear
        } = this.current

        const dateDay = new Date(date).getDate()
        const dateMonth = new Date(date).getMonth() + 1
        const dateYear = new Date(date).getFullYear()

        year = currentYear - dateYear
        if (dateMonth > currentMonth) {
          currentMonth += 12
          year -= 1
        }
        month = currentMonth - dateMonth

        if (dateDay > currentDay) {
          currentDay += 30
          month -= 1
        }
        // eslint-disable-next-line prefer-const
        day = currentDay - dateDay

        const weeks = Math.round(day / 7)
        this.wmyFormattedWeeks = weeks
        this.wmyFormattedMonths = month
        this.wmyFormattedYears = year
        this.$emit('datePickerFormat', { format: 'DATE', value: this.birthDate })
      }
    }
  }
}
</script>
