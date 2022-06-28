<template>
    <div>
         <h6 class="text-xs uppercase font-bold tracking-normal mb-4">
          Reminder
        </h6>
        <div class="mb-6">
          <div class="flex flex-col">
            <div class="flex items-center">
              <i class="fi-rr-bell mt-1 text-md text-gray-500"></i>
              <div class="ml-3 text-gray-500 w-full">
                <GwSelector
                  v-model="reminder"
                  placeholder="Add Notification"
                  class="w-full repeat-selector"
                  :options="defaultReminders"
                  :menu-props="{ top: true, offsetY: true }"
                  :label="name"
                  :reduce="reminder => reminder.value"
                >
                  <template>
                    <div class="flex items-center">
                      <span>Add notification</span>
                    </div>
                  </template>
                  <template v-slot:selectedOption="{selected}">
                    <div class="flex items-center">
                      <span :class="selected.class" class="color-circle rounded-full mr-4"></span>
                      <span class="text-gray-700">{{ selected.name }}</span>
                    </div>
                  </template>
                  <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                    <div class="flex items-center py-3">
                      <span :class="optionObject.class" class="color-circle rounded-full mr-4"></span>
                      <span class="text-gray-700">{{ optionObject.name }}</span>
                    </div>
                  </template>
                  <template v-slot:footer @click.stop="">
                    <button
                      type="button"
                      class="flex items-center w-full py-2 outline-none"
                      @click.prevent="$modal.show('reminder-modal')"
                    >
                      <div class="flex px-2 ml-1 items-center justify-center">
                        <i
                          class="fi-rr-plus text-base text-blue-500 p-1 mt-1"
                        />
                        <span class="text-primary-color text-base pl-2">Custom reminder</span>
                      </div>
                    </button>
                  </template>
                </GwSelector>
              </div>
            </div>
          </div>
        </div>
        <modal name="reminder-modal" height="auto" :adaptive="true">
          <div class="px-4 py-2" style="overflow: scroll">
            <div class="flex flex-row">
              <p class="text-lg text-gray-700 font-normal py-4 w-3/4">
                Custom notification
              </p>
              <p class="w-1/4 flex justify-end py-4">
                <i @click="closeModal" class="fi-rr-cross text-lg cursor-pointer text-primary"></i>
              </p>
            </div>
            <div class="flex flex-row pt-4">
             <div class="w-[190px]">
                 <GwSelector
                  v-model='reminderType'
                  :options="reminderTypes"
                  placeholder="Reminder Type"
                  :reduce="reminderType => reminderType.value"
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
             </div>
             <div class="w-[190px] pl-2">
                <GwInputField
                  v-model="period"
                  label=""
                  placeholder="Type here"
                  type="number"
                  :min="1"
                  :max="60"
                  autocomplete="text"
                  class-name="information_box"
                />
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
             </div>
            </div>
            <div class="mt-10 flex justify-end space-x-4">
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
import { required, and, minLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
  name: 'ReminderSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    event: {
      type: Object
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      reminder: null,
      reminderType: null,
      period: null,
      submitting: false,
      reminderPeriod: null,
      defaultReminders: [
        { name: '5 minutes before', value: '5,mins' },
        { name: '10 minutes before', value: '10,mins' },
        { name: '15 minutes before', value: '15,mins' },
        { name: '30 minutes before', value: '30,mins' },
        { name: '1 hour before', value: '1,hr' },
        { name: '1 day before', value: '1,day' }
      ],
      reminderTypes: [
        'Notification', 'Email'
      ],
      reminderPeriods: [
        { name: 'minutes', value: 'mins' },
        { name: 'hours', value: 'hrs' },
        { name: 'days', value: 'day' },
        { name: 'weeks', value: 'week' }
      ]
    }
  },
  validations () {
    return {
      period: { shouldBeChecked: and(required, minValue(1), maxValue(60), integer) },
      reminderPeriod: { shouldBeChecked: and(required, minLength(2)) },
      reminderType: { shouldBeChecked: and(required, minLength(2)) }
    }
  },
  watch: {
    'reminder' (newValue) {
      const result = newValue?.value.split(',')
      this.getPeriod(result[0], result[1])
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('reminder-modal')
    },
    getPeriod (period, time) {
      this.$emit('change', { timeBeforeEvent: period, timeBeforeEventUnit: time })
    },
    done () {
      this.$v.$touch()
      this.submitting = true
      if (this.$v.period.$invalid || this.$v.reminderPeriod.$invalid || this.$v.reminderType.$invalid) {
        return
      }
      const checkIfItExists = this.defaultReminders.findIndex((i) => {
        return i.value === `${this.period},${this.reminderPeriod.value}`
      })
      if (checkIfItExists !== -1) {
        return
      }
      const value = { name: `${this.period} ${this.reminderPeriod.name} before`, value: `${this.period},${this.reminderPeriod.value}` }
      this.defaultReminders.push(value)
      this.reminder = value
      this.closeModal()
    }
  }
}
</script>
<style lang="scss" scoped>
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
