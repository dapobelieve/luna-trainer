<template>
    <div class="flex items-center mb-3">
        <i class="fi-rr-refresh mt-1 text-md text-gray-500"></i>
        <span class="ml-3 text-gray-500 w-full">
        <GwSelector v-model="repeat" placeholder="Repeat" label="name" class="w-full repeat-selector" :options="repeats">
            <template v-slot:selectedOption="{selected}">
            <div class="flex items-center">
                <span class="text-gray-700">{{ selected.name }}</span>
            </div>
            </template>
            <template v-slot:dropdownOption="{ optionObject }" class="p-4">
            <div class="flex items-center py-3">
                <span class="text-gray-700">{{ optionObject.name }}</span>
                <span v-if="optionObject.name.includes('weekday')" class="ml-1"> Mon - Fri</span>
            </div>
            </template>
            <template v-slot:footer @click.stop="" v-if="showOptions">
                <button
                    type="button"
                    class="flex items-left py-2 outline-none"
                    @click.prevent="$modal.show('repeat-modal')"
                >
                    <span class="text-gray-500 pl-5 text-base pl-2">Custom...</span>
                </button>
                </template>
        </GwSelector>
        </span>

        <modal name="repeat-modal" height="auto" width="550" :adaptive="true">
          <div class="px-4 py-2" style="overflow: scroll">
            <div class="flex flex-row">
              <p class="text-lg text-gray-500 font-normal py-4 w-3/4">
                Custom recurrence
              </p>
              <p class="w-1/4 flex justify-end py-4">
                <i @click="closeModal" class="fi-rr-cross text-lg cursor-pointer text-primary-color"></i>
              </p>
            </div>
            <div class="flex flex-col pt-4">
                <div class="items-center text-gray-500">
                  Repeat every
                </div>
                <div class="flex flex-row mt-2">
                  <div class="w-[100px]">
                    <GwInputField
                      v-model="period"
                      label=""
                      placeholder="Type here"
                      type="number"
                      :min="1"
                      class="information_box"
                      autocomplete="text"
                    />
                    <div
                    class='text-xs text-red-500 mt-2'
                    v-if='submitting && $v.period.$invalid'
                    >
                    Please add a valid number
                    </div>
                </div>
                <div class="w-[190px] pl-2">
                    <GwSelector
                    v-model='reminderPeriod'
                    :options="reminderPeriods"
                    placeholder="Time Periods"
                    :reduce="reminderPeriod => reminderPeriod.value"
                    label="name"
                    >
                    <template v-slot:selectedOption="{selected}">
                        <div class="flex items-center" style="z-index: 3000">
                        <span class="text-gray-700">{{ selected.name }}</span>
                        </div>
                    </template>
                    <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                        <div class="flex items-center py-2" style="z-index: 3000">
                        <span class="text-gray-700">{{ optionObject.name }}</span>
                        </div>
                    </template>
                    </GwSelector>
                    <div
                    class='text-xs text-red-500 mt-2'
                    v-if='submitting && $v.reminderPeriod.$invalid'
                    >
                    Please select a type
                    </div>
                </div>
              </div>
            </div>
            <div class="py-4" v-if="isWeekSelected">
                <div class="pb-4 text-gray-500">Repeat on</div>
                <div class="flex flex-row">
                    <div
                        v-for="n in weekly"
                        @click="chooseDay(n)"
                        :key="n.value"
                        class="h-8 text-sm cursor-pointer w-8 hover:bg-blue-50 flex items-center justify-center rounded-full border-gray-300 border-2 text-center mr-4"
                        :class="{
                         'bg-blue-50': isDayActive(n),
                         'border-blue-500': isDayActive(n),
                         'text-primary-color': isDayActive(n),
                         'hover:bg-blue-200': isDayActive(n)
                        }"
                    >
                    {{ n.name }}
                    </div>
                </div>
            </div>
            <div class="py-4 flex w-[200px]" v-if="isMonthSelected">
                <date-picker
                    v-model="montSelect"
                    style="width: 100% !important; height: 100%"
                    class="w-full relative"
                    :disabled-date="date => date > new Date()"
                    format="DDDD MMM, YYYY"
                    placeholder="Monthly on day 14"
                    :clearable="false"
                ></date-picker>
            </div>
            <div class="pt-4">
                <div class="w-[140px] items-center text-gray-500">
                    <div>Ends</div>
                </div>
                <div class="w-[130px] py-2">
                    <label
                        class="rounded-2xl relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm check_box"
                        :class="{
                        'bg-blue-50': isNever,
                        }"
                    >
                      <input
                            id="spaying"
                            name="spaying"
                            value="spaying"
                            v-model="isNever"
                            type="checkbox"
                            class="h-7 w-5 rounded-full checkbox-round"
                        />
                        <span
                            id="reinforcement-0-label"
                            class="ml-2 font-medium"
                        >Never</span>
                    </label>
                </div>
                <div class="flex flex-row py-2 items-center">
                    <div class="w-[130px]">
                        <label
                            class="rounded-2xl relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm check_box"
                            :class="{
                            'bg-blue-50': isOn,
                            }"
                        >
                            <input
                                id="spaying"
                                name="spaying"
                                value="spaying"
                                v-model="isOn"
                                type="checkbox"
                                class="h-10 w-5 rounded-full checkbox-round"
                            />
                            <span
                                id="reinforcement-0-label"
                                class="ml-2 font-medium"
                            >On</span>
                        </label>
                    </div>
                    <div class="w-[190px] px-2 items-center">
                        <date-picker
                            v-model="endsOn"
                            style="width: 100% !important; height: 100%"
                            class="w-full relative"
                            :disabled-date="date => date > new Date()"
                            format="DD MMM, YYYY"
                            placeholder="Sep 13, 2022"
                            :clearable="false"
                        ></date-picker>
                    </div>
                </div>
                <div class="flex flex-row py-2 items-center">
                    <div class="w-[130px]">
                        <label
                            class="rounded-2xl relative border p-3 cursor-pointer focus:outline-none w-full bg-white hover:bg-blue-50 transition-all flex items-center shadow-sm check_box"
                            :class="{
                            'bg-blue-50': isAfter,
                            }"
                        >
                            <input
                                id="spaying"
                                name="spaying"
                                value="spaying"
                                v-model="isAfter"
                                type="checkbox"
                                class="h-5 w-5 rounded-full checkbox-round"
                            />
                            <span
                                id="reinforcement-0-label"
                                class="ml-2 font-medium"
                            >After</span>
                        </label>
                    </div>
                    <div class="w-[300px] px-2 flex flex-row items-center">
                        <div class="w-[90px]">
                            <GwInputField
                                v-model="after"
                                label=""
                                placeholder=""
                                type="number"
                                :min="1"
                                class="information_box"
                                autocomplete="text"
                            />
                        </div>
                        <div class="pl-2 text-gray-500">
                            Occurances
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-10 flex justify-end space-x-4 pb-3">
              <button class="button-fill" @click.prevent="done">
                Done
              </button>
              <slot name="confirm" />
            </div>
          </div>
        </modal>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { RRule } from 'rrule'
import { required, and, integer, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
  name: 'RepeatSelect',
  components: { DatePicker },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      repeat: null,
      isAfter: false,
      submitting: false,
      reminderPeriod: null,
      montSelect: undefined,
      endsOn: undefined,
      repeats: [],
      period: 1,
      after: null,
      isNever: false,
      isOn: false,
      dayValue: [],
      weekly: [
        { name: 'S', value: RRule.SU },
        { name: 'M', value: RRule.MO },
        { name: 'T', value: RRule.TU },
        { name: 'W', value: RRule.WE },
        { name: 'TH', value: RRule.TH },
        { name: 'F', value: RRule.FR },
        { name: 'S', value: RRule.SA }
      ],
      reminderPeriods: [
        { name: 'days', value: RRule.DAILY },
        { name: 'weeks', value: RRule.WEEKLY },
        { name: 'months', value: RRule.MONTHLY },
        { name: 'years', value: RRule.YEARLY }
      ],
      isWeekSelected: false,
      isMonthSelected: false,
      rRule: {}
    }
  },
  props: {
    showOptions: {
      type: [Object, Date],
      default: () => undefined
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    'repeat' (newValue) {
      this.$emit('change', newValue)
    },
    'reminderPeriod' (newValue) {
      if (newValue) {
        switch (newValue.value) {
          case RRule.WEEKLY:
            this.isWeekSelected = true
            this.isMonthSelected = false
            break
          case RRule.MONTHLY:
            this.isWeekSelected = false
            this.isMonthSelected = true
            break
          case RRule.DAILY:
            this.isWeekSelected = false
            this.isMonthSelected = false
            break
          case RRule.YEARLY:
            this.isWeekSelected = false
            this.isMonthSelected = false
            break
          default:
            this.isWeekSelected = false
            this.isMonthSelected = false
            break
        }

        this.rRule = {
          ...this.rRule,
          freq: newValue.value
        }
      }
    },
    'montSelect' (newValue) {
      if (newValue) {
        this.rRule = {
          ...this.rRule,
          bymonthday: [new Date(newValue).getDay()],
          bymonth: [new Date(newValue).getMonth()]
        }
      }
    },
    'period' (newValue) {
      if (newValue) {
        this.rRule = {
          ...this.rRule,
          interval: newValue
        }
      }
    },
    'dayValue' (newValue) {
      if (newValue && newValue.length > 0) {
        this.rRule = {
          ...this.rRule,
          byweekday: newValue
        }
      }
    },
    'rRule' (newValue) {
      console.log(newValue, '====')
    },
    'isNever' (newValue) {
      if (newValue) {
        this.isOn = false
        this.isAfter = false
        this.endsOn = undefined
        this.rRule = { ...this.rRule, count: undefined, until: undefined }
      }
    },
    'isOn' (newValue) {
      if (newValue) {
        this.isAfter = false
        this.isNever = false
        this.rRule = { ...this.rRule, count: undefined, until: new Date(this.endsOn ?? Date.now()) }
      }
    },
    'isAfter' (newValue) {
      if (newValue) {
        this.isOn = false
        this.isNever = false
        this.endsOn = undefined
        this.rRule = { ...this.rRule, until: undefined, count: this.after ?? 1 }
      }
    },
    'endsOn' (newValue) {
      if (newValue && this.isOn) {
        console.log(newValue)
        const dateData = new Date(newValue ?? Date.now())
        this.rRule = { ...this.rRule, until: dateData }
      }
    },
    'after' (newValue) {
      if (newValue && Number(newValue) > 0 && this.isAfter) {
        this.rRule = { ...this.rRule, count: newValue }
      }
    },
    'showOptions' (newValue) {
      const options = [
        {
          name: 'Does not repeat',
          value: ''
        },
        {
          name: 'Every day',
          value: 'RRULE:FREQ=DAILY'
        },
        {
          name: 'Every weekday',
          value: 'RRULE:FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR'
        },
        {
          name: `Every week on ${this.$dateFns.format(new Date(this.showOptions), 'ccc')}`,
          value: 'RRULE:FREQ=WEEKLY;INTERVAL=1'
        },
        {
          name: `Every month on the 1st ${this.$dateFns.format(new Date(this.showOptions), 'ccc')}`,
          value: `RRULE:FREQ=MONTHLY;BYSETPOS=1;BYDAY=${this.$dateFns.format(new Date(this.showOptions), 'EEEEEE').toUpperCase()};INTERVAL=1`
        }
      ]
      const holder = []
      this.repeats.forEach((i) => {
        const doesExist = options.findIndex(q => q.value === i.value)
        if (doesExist === -1) {
          holder.push(i)
        }
      })
      this.repeats = [...options, ...holder]
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('repeat-modal')
    },
    isDayActive (n) {
      return this.dayValue.findIndex(i => i === n.value) !== -1
    },
    chooseDay (n) {
      if (this.isDayActive(n)) {
        this.dayValue = this.dayValue.filter(i => i !== n.value)
      } else {
        this.dayValue = [...this.dayValue, n.value]
      }
    },
    done () {
      this.$v.$touch()
      this.submitting = true
      if (this.$v.period.$invalid || this.$v.reminderPeriod.$invalid) {
        return
      }
      try {
        const newRule = new RRule(this.rRule)
        const findIndex = this.repeats.findIndex(i => i.value === newRule.toString())
        const rRuleName = `${newRule.toText().substring(0, 1).toUpperCase()}${newRule.toText().substring(1, newRule.toText().length)}`
        if (findIndex === -1) {
          this.repeats.push({
            name: rRuleName,
            value: newRule.toString()
          })
        }
        this.repeat = {
          name: rRuleName,
          value: newRule.toString()
        }
        this.closeModal()
        this.submitting = false
      } catch (e) {
        this.$lunaToast.error(e)
      }
    }
  },
  validations () {
    return {
      period: { shouldBeChecked: and(required, minValue(1), maxValue(60), integer) },
      reminderPeriod: { required }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  @apply mx-auto;
  max-width: 512px;
}
.information_box{
  height: 2.5rem;
  border: 1px solid #E2E8F0;
  padding: 7px 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  text-transform: capitalize;
}

.check_box{
  height: 2.7rem;
  border: 1px solid #E2E8F0;
  padding: 7px 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  text-transform: capitalize;
}
.information_box_x {
    height: 2.7rem;
    border: 1px solid #E2E8F0;
    padding: 7px 12px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    text-transform: capitalize;
}
.mx-input-wrapper {
    height: 1.3em;
}
.checkbox-round {
    width: 1.3em;
    height: 1.3em;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #ddd;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}

.checkbox-round:checked {
    background-color: #fff;
    border-width: 5px;
    border-color: #3B82F6;
}
.clients-selector {
  ::v-deep {
    .vs__selected-options {
      div :not(input) {
        display: none;
      }
    }
  }
}
.date-picker {
  ::v-deep .mx-input-wrapper {
    .mx-input {
      border: none;
      padding-left: 0px;
      font-size: 16px;
      font-weight: 400;
      color: #000;
      box-shadow: none;
    }
    .mx-icon-calendar {
      display: none;
    }
  }
}
.repeat-selector {
  ::v-deep {
    .vs__selected-options {
      input {
        padding-left: 0;
      }
    }
    .vs__actions {
      display: none;
    }
  }
}
.color-selector, .repeat-selector {
  ::v-deep .v-select {
    border: none  !important;
    .vs__selected-options {
      cursor: pointer !important;
      padding-left: 0;
    }
    .vs__selected {
      padding-left: 0;
    }
  }
  ::v-deep .vs__dropdown-menu {
    padding: 4px;
    li {
      border-radius: 8px;
    }
  }
}
.color-circle {
  height: 18px;
  width: 18px;
}
</style>
