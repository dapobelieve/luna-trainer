<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
      <div>
        <GwInputField
          v-model="clientInfo.pet[0].name"
          label="Dog name"
          placeholder="Type here"
          type="text"
          autocomplete="text"
          class-name="information_box"
          @input="focusField"
        />
      </div>
      <div>
        <GwInputField
          v-model="clientInfo.pet[0].breed"
          placeholder="Type here"
          label="Breed"
          type="text"
          autocomplete="text"
          class-name="information_box"
          @input="focusField"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
      <div>
        <label for="age" class="input-text-label text-gray-700 block">Age</label>
        <date-picker
          v-model="petAge"
          style="width: 100% !important"
          class="w-full relative"
          :disabled-date="date => date > new Date()"
          format="DD-MMM-YYYY"
          @change="focusField"
        ></date-picker>
        <small v-if="clientInfo.pet[0].age" class="text-xs"><span class="capitalize">{{ clientInfo.pet[0].name ? clientInfo.pet[0].name : 'Your dog' }}</span> is about {{ showDate }}</small>
      </div>
      <div>
        <dt class="input-text-label">
          Behavioural Problems
        </dt>
        <dd class="information_box text-gray-400">
          {{ clientInfo && clientInfo.behaviour }}
        </dd>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 xl:gap-6 w-full mt-6">
      <div>
        <dt class="input-text-label">
          Owner's Notes
        </dt>
        <dd class="information_text-area truncate">
          {{ clientInfo && clientInfo.notes }}
        </dd>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  name: 'HealthInformation',
  components: { DatePicker },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      clientInfo: this.value
    }
  },
  computed: {
    petAge: {
      set (value) {
        this.clientInfo.pet[0].age = value
      },
      get () {
        return new Date(this.clientInfo.pet[0].age)
      }
    },
    showDate () {
      const userDate = new Date(this.clientInfo.pet[0].age)
      const currentDate = new Date()
      const days = Math.floor(
        (Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ) -
          Date.UTC(
            userDate.getFullYear(),
            userDate.getMonth(),
            userDate.getDate()
          )) /
          (1000 * 60 * 60 * 24)
      )
      const weeks = Math.floor(days / 7)
      const months = Math.floor(weeks / 4)
      const calcWeeks = weeks % 4
      const calcYears = months > 12 ? Math.floor(months / 12) : 0
      const calcMonths = this.calcYears >= 1 ? months % 12 : months

      return `${calcWeeks} week(s), ${calcMonths} month(s) and ${calcYears} years(s)`
    }
  },
  methods: {
    focusField () {
      this.showButtons = true
    }
  }
}
</script>
