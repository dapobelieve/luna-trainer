<template>
  <div
    class=""
  >
    <!-- <small class="text-xs text-blue-500 cursor-pointer" @click="switchFormat">{{ dobFormat ? 'Switch to Age format' : 'Switch to date of birth format' }}</small> -->
    <!-- <div v-show="dobFormat">
      <DateOfBirth v-model="dogInfo.approxDateOfBirth" @displayUpdate="displayUpdateButtons" @dob="dogInfo.approxDateOfBirth = $event" />
    </div>
    <div v-show="wmyFormat">
      <WMYFormat v-model="dogInfo.approxDateOfBirth" />
    </div> -->
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
          class="w-full"
          :disabled-date="date => date > new Date()"
          format="DD-MMM-YYYY"
          @change="convertToWMYFormat(birthDate)"
        ></date-picker>
      </div>
    </div>

    <div v-else>
      <span>
        <div class="information_box flex items-center justify-between">
          <div class="flex flex-row-reverse">
            <label for="weeks" class="text-base text-gray-500">weeks</label>
            <input v-model="chiWeeks" type="number" class="w-6 focus:border-0 focus:outline-none" @input="changeDate">
          </div>
          <div class="flex flex-row-reverse">
            <label for="months" class="text-base text-gray-500">months</label>
            <input v-model="chiMonths" type="number" class="w-6 focus:border-0 focus:outline-none" @input="changeDate">
          </div>
          <div class="flex flex-row-reverse">
            <label for="year" class="text-base text-gray-500">years</label>
            <input v-model="chiYears" type="number" class="w-6 focus:border-0 focus:outline-none" @input="changeDate">
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  props: ['dogInfo'],
  data () {
    return {
      birthDate: '',
      WMYDate: {
        weeks: '',
        months: '',
        years: ''
      },
      chiWeeks: '',
      chiMonths: '',
      chiYears: '',
      dobFormat: true
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
      const currYear = this.chiYears === '' ? new Date().getFullYear() : new Date().getFullYear() - this.chiYears
      const currMonth = this.chiMonths === '' ? new Date().getMonth() : new Date().getMonth() - this.chiMonths
      const nextWeek = new Date(currYear, currMonth, today.getDate() - (this.chiWeeks * 7))
      this.birthDate = nextWeek
    },
    convertToWMYFormat () {
      const datePicked = this.birthDate
      if (datePicked) {
        this.chiWeeks = Math.floor(new Date(datePicked).getDate() / 7)
        console.log(this.chiWeeks)
      }
      // let day, month, year
      // let {
      //   day: currentDay,
      //   month: currentMonth,
      //   // eslint-disable-next-line prefer-const
      //   year: currentYear
      // } = this.current

      // const dateDay = new Date(date).getDate()
      // const dateMonth = new Date(date).getMonth() + 1
      // const dateYear = new Date(date).getFullYear()

      // year = currentYear - dateYear
      // if (dateMonth > currentMonth) {
      //   currentMonth += 12
      //   year -= 1
      // }
      // month = currentMonth - dateMonth

      // if (dateDay > currentDay) {
      //   currentDay += 30
      //   month -= 1
      // }
      // // eslint-disable-next-line prefer-const
      // day = currentDay - dateDay

      // const weeks = Math.round(day / 7)
      // this.chiWeeks = weeks
      // this.chiMonths = month
      // this.chiYears = year
    }
  }
}
</script>
