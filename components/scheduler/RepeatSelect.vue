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
              <p class="text-lg text-gray-700 font-normal py-4 w-3/4">
                Custom recurrence
              </p>
              <p class="w-1/4 flex justify-end py-4">
                <i @click="closeModal" class="fi-rr-cross text-lg cursor-pointer text-primary-color"></i>
              </p>
            </div>
            <div class="flex flex-row pt-4">
                <div class="w-[140px] items-center">
                    <div>Repeat every</div>
                </div>
                <div class="w-[190px] pl-2">
                    <GwInputField
                    v-model="period"
                    label=""
                    placeholder="Type here"
                    type="number"
                    :min="1"
                    :max="60"
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
            <div class="py-4">
                <div class="pb-4">Repeat on</div>
                <div class="flex flex-row">
                    <div
                        v-for="n in weekly"
                        @click="chooseDay(n)"
                        :key="n.value"
                        class="h-8 text-sm cursor-pointer w-8 hover:bg-blue-50 flex items-center justify-center rounded-full border-gray-300 border-2 text-center ml-4"
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
            <div class="py-4 flex w-[200px]">
                <date-picker
                    v-model="endsOn"
                    style="width: 100% !important; height: 100%"
                    class="w-full relative"
                    :disabled-date="date => date > new Date()"
                    format="DD MMM, YYYY"
                    placeholder="Monthly on day 14"
                    :clearable="false"
                ></date-picker>
            </div>
            <div class="pt-4">
                <div class="w-[140px] items-center">
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
                        <div class="w-[175px]">
                            <GwInputField
                                v-model="after"
                                label=""
                                placeholder=""
                                type="number"
                                :min="1"
                                :max="60"
                                class="information_box"
                                autocomplete="text"
                            />
                        </div>
                        <div class="pl-2">
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
      endsOn: undefined,
      period: null,
      after: null,
      isNever: false,
      isOn: false,
      dayValue: null,
      weekly: [
        { name: 'S', value: 'Sunday' },
        { name: 'M', value: 'Monday' },
        { name: 'T', value: 'Tuesday' },
        { name: 'W', value: 'Wednesday' },
        { name: 'TH', value: 'Thursday' },
        { name: 'F', value: 'Friday' },
        { name: 'S', value: 'Saturday' }
      ],
      reminderPeriods: [
        { name: 'minutes', value: 'mins' },
        { name: 'hours', value: 'hrs' },
        { name: 'days', value: 'day' },
        { name: 'weeks', value: 'week' }
      ]
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
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('repeat-modal')
    },
    isDayActive (n) {
      return this.dayValue === n.value
    },
    chooseDay (n) {
      this.dayValue = n.value
    }
  },
  computed: {
    repeats () {
      if (this.showOptions) {
        return [
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
      }
      return []
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
