<template>
  <div class="bg-white h-full md:w-96 w-full shadow px-3 pt-2 fixed right-0 top-0 z-[11] overflow-y-auto">
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xl mb-2 font-bold">Schedule Session</h4>
        <span @click="$emit('close')" class="cursor-pointer">
          <i class="fi-rr-cross text-primary-color"></i>
        </span>
      </div>
      <div class="schedule-body flex-grow">
        <div class="h-16 mb-3">
          <textarea placeholder="Enter Title" v-model="form.title" class="w-full font-normal text-xl resize-none px-1 focus:outline-none"></textarea>
        </div>      
        <div class="mb-8">
          <h6 class="text-xs uppercase font-bold tracking-normal mb-4">Date and time</h6>
          <div class="flex items-center mb-3">
            <i class="fi-rr-calendar mt-1 text-md text-gray-500"></i>
            <div class="ml-3 text-gray-500 w-full">
              <date-picker class="date-picker" format="ddd MMM D" v-model="form.date" placeholder="Date"></date-picker>
            </div>
          </div>
          <div class="flex items-center mb-3">
            <div class="inline-flex items-center">
              <i class="fi-rr-clock mt-1 text-md text-gray-500"></i>
              <div class="ml-3 text-gray-500 w-24 flex">
                <GwCustomerSelector placeholder="Time" class="w-full repeat-selector" :clients="time" v-model="form.from">
                  <template v-slot:selectedOption="{selected}">
                    <div class="flex items-center">
                      <span class="text-gray-700">{{selected.firstName}}</span>
                    </div>
                  </template>
                  <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                    <div class="flex items-center py-2">
                      <span class="text-gray-700">{{optionObject.firstName}}</span>
                    </div>
                  </template>
                </GwCustomerSelector>
              </div>
            </div>
            <div v-if="form.from" class="inline-flex items-center">
              <i class="fi-rr-arrow-right ml-1 mt-1 mr-3 text-md text-gray-500"></i>
              <div class="ml-3 text-gray-500 w-24 flex">
                <GwCustomerSelector placeholder="Time" class="w-full repeat-selector" :clients="time" v-model="form.to">
                  <template v-slot:selectedOption="{selected}">
                    <div class="flex items-center">
                      <span class="text-gray-700">{{selected.firstName}}</span>
                    </div>
                  </template>
                  <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                    <div class="flex items-center py-2">
                      <span class="text-gray-700">{{optionObject.firstName}}</span>
                    </div>
                  </template>
                </GwCustomerSelector>
              </div>
            </div>
          </div>
<!--          <div class="flex items-center mb-3">-->
<!--            <span class="text-gray-500 mr-2">All Day?</span>-->
<!--            <Toggle2 v-model="form.allDay" />-->
<!--          </div>-->
          <div class="flex items-center mb-3">
            <i class="fi-rr-refresh mt-1 text-md text-gray-500"></i>
            <span class="ml-3 text-gray-500 w-full">
              <GwCustomerSelector placeholder="Repeat" class="w-full repeat-selector" :clients="repeat" v-model="form.repeat">
                <template v-slot:selectedOption="{selected}">
                  <div class="flex items-center">
                    <span class="text-gray-700">{{selected.name}}</span>
                  </div>
                </template>
                <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                  <div class="flex items-center py-3">
                    <span class="text-gray-700">{{optionObject.name}}</span>
                  </div>
                </template>
              </GwCustomerSelector>
            </span>
          </div>
          <div class="flex items-center mb-3">
            <i class="fi-rr-globe mt-1 text-md text-gray-500"></i>
            <span class="ml-3 text-gray-500 w-full">
              <GwCustomerSelector placeholder="(GMT) Europe/london" class="w-full repeat-selector" :clients="timezoneArr" v-model="form.timezone">
                <template v-slot:selectedOption="{selected}">
                  <div class="flex items-center">
                    <span class="text-gray-700">{{selected.firstName}}</span>
                  </div>
                </template>
                <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                  <div class="flex items-center py-2">
                    <span class="text-gray-700">{{optionObject.firstName}}</span>
                  </div>
                </template>
              </GwCustomerSelector>
            </span>
          </div>
        </div>
        <div>
          <h6 class="text-xs uppercase font-bold tracking-normal mb-4">Client</h6>
          <div class="mb-6">
            <div class="flex items-center ">
              <i class="fi-rr-user mt-1 text-md text-gray-500"></i>
              <div class="ml-3 text-gray-500 w-full">
                <GwCustomerSelector placeholder="Participants" multiple class="w-full clients-selector repeat-selector" :clients="allClients" v-model="form.participants">
                  <template v-slot:selectedOption="{selected}">
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
                </GwCustomerSelector>
              </div>
            </div>
            <div>
              <div v-if="form.participants">
                <div v-for="client in form.participants">
                  <div class="flex items-center content-center py-1">
                    <ClientAvatar
                      :width="2.3"
                      :height="2.3"
                      :client-info="client"
                    />
                    <div class="ml-2">
                      <p class="capitalize text-md text-gray-700">
                        {{ client.firstName }} {{ $utils.optional(client.lastName) }}
                      </p>
                      <span class="text-sm text-gray-400">{{client.email}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center mb-3">
            <GwCustomerSelector class="w-full color-selector" :clients="colors" v-model="form.color">
              <template v-slot:selectedOption="{selected}">
                <div class="flex items-center">
                  <span :class="selected.class" class="color-circle rounded-full mr-4"></span>
                  <span class="text-gray-700">{{selected.name}}</span>
                </div>
              </template>
              <template v-slot:dropdownOption="{ optionObject }" class="p-4">
                <div class="flex items-center py-3">
                  <span :class="optionObject.class" class="color-circle rounded-full mr-4"></span>
                  <span class="text-gray-700">{{optionObject.name}}</span>
                </div>
              </template>
            </GwCustomerSelector>
          </div>
          <div class="flex items-center mb-3">
            <textarea v-model="form.description" placeholder="Add description" rows="6" class="w-full resize-none px-1 focus:outline-none"></textarea>
          </div>
        </div>
      </div>
      <div class="schedule-footer mb-4">
        <button @click="createEvent" class="button-fill w-full">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { mapGetters } from 'vuex'
import 'vue2-datepicker/index.css'
import timezones from '~/timezones.json'
export default {
  data () {
    return {
      timezones,
      time: [
        "07:00 am",
        "07:15 am",
        "07:30 am",
        "07:45 am",
        "08:00 am",
        "08:15 am",
        "08:30 am",
        "08:45 am",
        "09:00 am",
        "09:15 am",
        "09:30 am",
        "09:45 am",
        "10:00 am",
        "10:15 am",
        "10:30 am",
        "10:45 am",
        "11:00 am",
        "11:15 am",
        "11:30 am",
        "11:45 am",
        "12:00 pm",
        "12:15 pm",
        "12:30 pm",
        "12:45 pm",
        "01:00 pm",
        "01:15 pm",
        "01:30 pm",
        "01:45 pm",
        "02:00 pm",
        "02:15 pm",
        "02:30 pm",
        "02:45 pm",
        "03:00 pm",
        "03:15 pm",
        "03:30 pm",
        "03:45 pm",
        "04:00 pm",
        "04:15 pm",
        "04:30 pm",
        "04:45 pm",
        "05:00 pm",
        "05:15 pm",
        "05:30 pm",
        "05:45 pm",
        "06:00 pm",
        "06:15 pm",
        "06:30 pm",
        "06:45 pm",
        "07:00 pm",
        "07:15 pm",
        "07:30 pm",
        "07:45 pm",
        "08:00 pm",
        "08:15 pm",
        "08:30 pm",
        "08:45 pm",
        "09:00 pm"
      ],
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
      repeat: [
        {
          name: 'Does not repeat',
          value: ''
        },
        {
          name: 'Every day',
          value: ''
        },
        {
          name: 'Every weekday',
          value: ''
        },
        {
          name: 'Every week',
          value: ''
        },
        {
          name: 'Every month',
          value: ''
        }
      ],
      form: {
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
    }
  },
  components: { DatePicker },
  computed: {
    timezoneArr() {
      return Array.from(new Set(this.timezones.reduce((acc, curr) => {
        return [...acc, ...curr.utc]
      }, [])))
    },
    ...mapGetters({
      allClients: 'client/getAllClients'
    })
  },
  methods: {
    async createEvent() {
      let fromTime = this.form.from.split(' ')
      let fromHrs = fromTime[1] === 'pm' ? (parseInt(fromTime[0].split(':')[0]) + 12) : parseInt(fromTime[0].split(':')[0])
      let fromMinutes = parseInt(fromTime[0].split(':')[1])

      let toTime = this.form.to.split(' ')
      let toHrs = toTime[1] === 'pm' ? (parseInt(toTime[0].split(':')[0]) + 12) : parseInt(toTime[0].split(':')[0])
      let toMinutes = parseInt(toTime[0].split(':')[1])

      const start = new Date(this.form.date.setHours(fromHrs)).setMinutes(fromMinutes)
      const end = new Date(this.form.date.setHours(toHrs)).setMinutes(toMinutes)

      this.form.when.startTime = start/1000
      this.form.when.endTime = end/1000
            
      
      let participants = this.form.participants.reduce((acc, curr) => {
        acc.push({
          userId: curr._id,
          email: curr.email,
          profileId: curr._id,
          imgUrl: '',
          name: curr.firstName
        })
        return acc
      }, [])
      
      
      try {
        let res = await this.$store.dispatch('schedule/createAppointment',  {
          calendar: '6g63jns1l38cszdtvn749lqzm',
          data: {
            title: this.form.title,
            color: this.form.color.value,
            when: this.form.when,
            timezone: "America/New_York",
            description: this.form.description,
            participants: participants
          }
        })
        this.$emit('created', res)
        this.$gwtoast.success('New  Appointment created')
      }catch (e) {
        console.log({e})
      }
      
    }
  },
  mounted() {
    if(document.getElementsByClassName('intercom-launcher')[0])
      document.getElementsByClassName('intercom-launcher')[0].setAttribute('style', 'display:none')
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