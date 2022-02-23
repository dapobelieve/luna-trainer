<template>
  <div class="flex flex-col h-full px-3 mt-2">
    <div class="flex items-center justify-between mb-3">
      <span v-if="hasSchedule" class="cursor-pointer" @click="$emit('back')">
        <i class="fi-rr-arrow-left text-xl font-bold text-primary-color"></i>
      </span>
      <h4 class="text-xl mb-2 font-bold">
        {{ !hasSchedule ? 'Schedule Session' : 'Reschedule Session' }}
      </h4>
      <span class="cursor-pointer" @click="$emit('close')">
        <i class="fi-rr-cross text-primary-color"></i>
      </span>
    </div>
    <div class="schedule-body flex-grow">
      <div class="mb-3">
        <textarea v-model="form.title" placeholder="Enter Title" class="w-full border-red-500 h-8 font-normal text-xl resize-none px-1 focus:outline-none"></textarea>
        <small v-if="$v.form.title.$error" class="text-red-600">Enter a title </small>
      </div>
      <div class="mb-8">
        <h6 class="text-xs uppercase font-bold tracking-normal mb-4">
          Date and time
        </h6>
        <div class="flex flex-col mb-3">
          <div class="flex items-center">
            <i class="fi-rr-calendar mt-1 text-md text-gray-500"></i>
            <div class="ml-3 text-gray-500 w-full">
              <date-picker v-model="form.date" class="date-picker" format="ddd MMM D" placeholder="Date" @change="updateDate"></date-picker>
            </div>
          </div>
          <small v-if="$v.form.date.$error" class="text-red-600">select a date</small>
        </div>
        <div class="flex flex-col mb-3">
          <div class="flex items-center">
            <div class="inline-flex items-center">
              <i class="fi-rr-clock mt-1 text-md text-gray-500"></i>
              <div class="ml-3 text-gray-500 w-24 flex">
                <GwCustomerSelector v-model="form.from" placeholder="Time" class="w-full repeat-selector" :clients="time">
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
                </GwCustomerSelector>
              </div>
            </div>
            <div v-if="form.from" class="inline-flex items-center">
              <i class="fi-rr-arrow-right ml-1 mt-1 mr-3 text-md text-gray-500"></i>
              <div class="ml-3 text-gray-500 w-24 flex">
                <GwCustomerSelector v-model="form.to" placeholder="Time" class="w-full repeat-selector" :clients="computeToTime">
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
                </GwCustomerSelector>
              </div>
            </div>
          </div>
          <small v-if="$v.form.from.$error" class="text-red-600">select a time for the meeting</small>
        </div>
        <!--          <div class="flex items-center mb-3">-->
        <!--            <span class="text-gray-500 mr-2">All Day?</span>-->
        <!--            <Toggle2 v-model="form.allDay" />-->
        <!--          </div>-->
        <div v-if="!hasSchedule" class="flex items-center mb-3">
          <i class="fi-rr-refresh mt-1 text-md text-gray-500"></i>
          <span class="ml-3 text-gray-500 w-full">
            <GwCustomerSelector v-model="form.repeat" placeholder="Repeat" class="w-full repeat-selector" :clients="repeat">
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
            </GwCustomerSelector>
          </span>
        </div>
        <div v-if="!hasSchedule" class="flex flex-col mb-3">
          <div class="flex items-center">
            <i class="fi-rr-globe mt-1 text-md text-gray-500"></i>
            <span class="ml-3 text-gray-500 w-full">
              <GwCustomerSelector v-model="form.timezone" placeholder="(GMT) Europe/london" class="w-full repeat-selector" :clients="timezoneArr">
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
              </GwCustomerSelector>
            </span>
          </div>
          <small v-if="$v.form.timezone.$error" class="text-red-600">select a timezone</small>
        </div>
      </div>
      <div>
        <h6 class="text-xs uppercase font-bold tracking-normal mb-4">
          Clients
        </h6>
        <div class="mb-6">
          <div class="flex flex-col">
            <div class="flex items-center">
              <i class="fi-rr-user mt-1 text-md text-gray-500"></i>
              <div class="ml-3 text-gray-500 w-full">
                <GwCustomerSelector
                  v-model="form.participants"
                  placeholder="Participants"
                  multiple
                  class="w-full clients-selector repeat-selector"
                  :clients="allClients"
                  @change="showPart($event)"
                >
                  <template>
                    <div class="flex items-center">
                      <span>Participants</span>
                    </div>
                  </template>
                  <template v-slot:dropdownOption="{ optionObject }">
                    <div class="flex justify-between min-w-full items-center">
                      <div class="flex items-center content-center py-1">
                        <ClientAvatar
                          :width="2.3"
                          :height="2.3"
                          :client-info="optionObject"
                        />
                        <p class="capitalize text-gray-700 ml-4">
                          {{ optionObject.firstName }} {{ $utils.optional(optionObject.lastName) }}
                        </p>
                      </div>
                      <div class="check">
                        <i class="ns-check text-blue-500 text-lg"></i>
                      </div>
                    </div>
                  </template>
                  <template v-slot:footer @click.stop="">
                    <button
                      type="button"
                      class="flex items-center w-full py-2 outline-none"
                      @click.prevent="$modal.show('inviteClientModal')"
                    >
                      <div class="flex px-2 ml-1 items-center justify-center">
                        <i
                          class="fi-rr-plus text-base text-blue-500 p-1 mt-1"
                        />
                        <span class="text-primary-color text-base pl-2">Create new Client</span>
                      </div>
                    </button>
                  </template>
                </GwCustomerSelector>
              </div>
            </div>
          </div>
          <div>
            <div v-if="form.participants">
              <div v-for="(client, cId) in form.participants" :key="cId">
                <div class="flex items-center content-center py-1">
                  <ClientAvatar
                    v-if="client.firstName"
                    :width="2.3"
                    :height="2.3"
                    :client-info="client"
                  />
                  <ClientAvatar
                    v-else
                    :width="2.3"
                    :height="2.3"
                    :client-info="{firstName: client.name}"
                  />
                  <div class="ml-2">
                    <p class="capitalize text-md text-gray-700">
                      <template v-if="client.firstName">
                        {{ client.firstName }} {{ $utils.optional(client.lastName) }}
                      </template>
                      <template v-else>
                        {{ client.name }}
                      </template>
                    </p>
                    <span class="text-sm text-gray-400">{{ client.email }}</span>
                  </div>
                  <span v-if="hasSchedule || form.participants.length" class="ml-auto cursor-pointer" @click="removeClient(client)">
                    <i class="fi-rr-cross text-primary-color"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Conference v-if="showConference" class="mb-4" @conference="attachConference" />
        <div class="flex flex-col mb-3">
          <GwCustomerSelector v-model="form.color" class="w-full color-selector" :clients="colors">
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
          </GwCustomerSelector>
          <small v-if="$v.form.color.$error" class="text-red-600">select a color</small>
        </div>
        <div class="flex flex-col mb-3">
          <textarea v-model="form.description" placeholder="Add description" rows="6" class="w-full resize-none px-1 focus:outline-none"></textarea>
          <small v-if="$v.form.description.$error" class="text-red-600">Enter meeting details</small>
        </div>
      </div>
    </div>
    <modal name="inviteClientModal" height="auto" :adaptive="true">
      <InviteNewClient class="m-6" @close="$modal.hide('inviteClientModal')" />
    </modal>
    <div class="schedule-footer mb-10">
      <button v-if="!event.id" :disabled="btn.loading" class="button-fill w-full" @click="createEvent">
        {{ btn.text }}
      </button>
      <button v-else :disabled="btn.loading" class="button-fill w-full" @click="updateEvent">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { format, fromUnixTime } from 'date-fns'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import 'vue2-datepicker/index.css'
import timezones from '~/timezones.json'
import time from '~/utils/time'
import Conference from '~/components/conference/index'
export default {
  components: { Conference, DatePicker },
  props: {
    event: {
      type: Object
    }
  },
  data () {
    return {
      btn: {
        text: 'Send',
        loading: false
      },
      timezones,
      colors: [
        {
          name: 'Default color',
          value: 'blue',
          class: 'bg-blue-500'
        },
        {
          name: 'Teal',
          value: 'teal',
          class: 'bg-teal-500'
        },
        {
          name: 'Amber',
          value: 'amber',
          class: 'bg-yellow-500'
        },
        {
          name: 'Rose',
          value: 'rose',
          class: 'bg-red-500'
        },
        {
          name: 'Sky',
          value: 'sky',
          class: 'bg-cyan-400'
        }
      ],
      form: {
        title: null,
        from: '',
        details: null,
        timezone: null,
        participants: [],
        to: null,
        when: {},
        description: null,
        color: {
          name: 'Default color',
          value: 'blue',
          class: 'bg-blue-500'
        },
        allDay: false
      }
    }
  },
  validations: {
    form: { 
      title: { required },
      from: { required },
      description: { required },
      timezone: { required },
      date: { required },
      color: { required }
    }
  },
  computed: {
    repeat () {
      if (this.form.date) {
        console.log(this.$dateFns.format(new Date(this.form.date), 'EEEEEE'))
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
            name: `Every week on ${this.$dateFns.format(new Date(this.form.date), 'ccc')}`,
            value: 'RRULE:FREQ=WEEKLY;INTERVAL=1'
          },
          {
            name: `Every month on the 1st ${this.$dateFns.format(new Date(this.form.date), 'ccc')}`,
            value: `RRULE:FREQ=MONTHLY;BYSETPOS=1;BYDAY=${this.$dateFns.format(new Date(this.form.date), 'EEEEEE').toUpperCase()};INTERVAL=1`
          }
        ]
      }
      return []
    },
    hasSchedule () {
      return !!this.event.id
    },
    time () {
      return time
    },
    computeToTime () {
      return this.form.from && [...this.time].slice(this.time.indexOf(this.form.from) + 1)
    },
    timezoneArr () {
      return Array.from(new Set(this.timezones.reduce((acc, curr) => {
        return [...acc, ...curr.utc]
      }, [])))
    },
    isLocalCalendar () {
      return this.activeCalendar.provider === 'nylas'
    },
    showConference () {
      if (this.hasSchedule || this.isLocalCalendar) {
        return false
      } else {
        return true
      }
    },
    ...mapGetters({
      activeCalendar: 'scheduler/getCalendar',
      allClients: 'client/getAllClients'
    })
  },
  deactivated () {
    this.form = {
      title: null,
      from: null,
      participants: [],
      to: null,
      when: {},
      color: {
        name: 'Default color',
        class: 'bg-blue-500'
      },
      allDay: false
    }
    this.btn = {
      text: 'Send',
      loading: false
    }
  },
  mounted () {
    console.log(this.activeCalendar)
  },
  beforeMount () {
    if (this.event.id) {
      this.form.title = this.event.title
      this.form.date = new Date(this.event.when.startTime * 1000)
      this.form.from = format(fromUnixTime(this.event.when.startTime), 'KK:mm aaa')

      this.form.to = format(fromUnixTime(this.event.when.endTime), 'KK:mm aaa')
      this.form.description = this.event.description
      this.form.participants = this.event.participants
      console.log(this.event.participants)

      this.form.color = this.colors.find(item => item.value === this.event.colorName)
    }
  },
  methods: {
    attachConference (event) {
      this.form.conferencing = { ...event }
    },
    updateDate (event) {
      this.form.date = event
      this.$forceUpdate()
    },
    async updateEvent () {
      this.btn.loading = true
      this.btn.text = 'Rescheduling...'

      const fromTime = this.form.from.split(' ')
      const fromHrs = fromTime[1] === 'pm' ? (parseInt(fromTime[0].split(':')[0]) + 12) : parseInt(fromTime[0].split(':')[0])
      const fromMinutes = parseInt(fromTime[0].split(':')[1])

      const toTime = this.form.to.split(' ')
      const toHrs = toTime[1] === 'pm' ? (parseInt(toTime[0].split(':')[0]) + 12) : parseInt(toTime[0].split(':')[0])
      const toMinutes = parseInt(toTime[0].split(':')[1])

      const start = new Date(this.form.date.setHours(fromHrs, fromMinutes))

      const end = new Date(this.form.date.setUTCHours(toHrs, toMinutes))

      this.form.when.startTime = start / 1000
      this.form.when.endTime = end / 1000

      const payloadData = {
        id: this.event.id,
        title: this.form.title,
        color: this.form.color?.value || 'blue',
        when: this.form.when,
        description: this.form.description,
        participants: this.form.participants
      }

      if (this.form.repeat?.value) {
        payloadData.recurrence = [this.form.repeat.value]
      }
      try {
        const res = await this.$store.dispatch('scheduler/updateAppointment', {
          calendar: this.activeCalendar.id,
          data: { ...payloadData }
        })

        if (res.recurrence?.length) {
          location.reload()
        }

        this.$emit('updated', { ...res, updated: true })
        this.$gwtoast.success('Session updated')
      } catch (e) {
        console.log({ e })
      } finally {
        this.btn = {
          text: 'Send',
          loading: false
        }
      }
    },
    showPart (evt) {

    },
    removeClient (client) {
      this.form.participants = this.form.participants.filter(item => item.userId !== client.userId)
      // this.$forceUpdate()
    },
    async createEvent () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.btn.loading = true
          this.btn.text = 'Creating Schedule...'
          const fromTime = this.form.from.split(' ')
          const fromHrs = fromTime[1] === 'pm' ? (parseInt(fromTime[0].split(':')[0]) + 12) : parseInt(fromTime[0].split(':')[0])
          const fromMinutes = parseInt(fromTime[0].split(':')[1])

          const toTime = this.form.to.split(' ')
          const toHrs = toTime[1] === 'pm' ? (parseInt(toTime[0].split(':')[0]) + 12) : parseInt(toTime[0].split(':')[0])
          const toMinutes = parseInt(toTime[0].split(':')[1])

          const start = new Date(this.form.date.setHours(fromHrs)).setMinutes(fromMinutes)
          const end = new Date(this.form.date.setHours(toHrs)).setMinutes(toMinutes)

          this.form.when.startTime = start / 1000
          this.form.when.endTime = end / 1000

          const participants = this.form.participants.reduce((acc, curr) => {
            acc.push({
              userId: curr._id,
              email: curr.email,
              profileId: curr._id,
              imgUrl: curr.imgURL,
              name: curr.firstName
            })
            return acc
          }, [])

          const payloadData = {
            title: this.form.title,
            color: this.form.color.value,
            when: this.form.when,
            timezone: this.form.timezone,
            description: this.form.description,
            participants
          }

          if (this.form.repeat?.value) {
            payloadData.recurrence = [this.form.repeat.value]
          }

          if (this.form.conferencing) {
            payloadData.conferencing = this.form.conferencing
          }

          const res = await this.$store.dispatch('scheduler/createAppointment', {
            calendar: this.activeCalendar.id,
            data: { ...payloadData }
          })

          if (payloadData.recurrence) {
            location.reload()
          } else {
            this.$emit('created', res)
          }

          this.$gwtoast.success('New  Appointment created')
        } catch (e) {
          console.log({ e })
        } finally {
          this.btn = {
            text: 'Send',
            loading: false
          }
        }
      }
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
