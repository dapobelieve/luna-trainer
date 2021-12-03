<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <div class="flex items-center">
          {{ displayMonth ? 'June' : 'April' }}
          <button
            type="button"
            class="outline-none border-none m-1 inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
            @click.prevent="displayMonth ? prev() : prevEvent()"
          >
            <img class="h-6" src="~/assets/img/chevron-left.svg" alt="">
          </button>
          <button
            type="button"
            class="outline-none border-none m-1 inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
            @click.prevent="displayMonth ? next() : nextEvent()"
          >
            <img class="h-6" src="~/assets/img/chevron-right.svg" alt="">
          </button>
        </div>
      </template>
      <template v-slot:buttons>
        <button
          type="button"
          class="base-button inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          @click="openCreateModal = true"
        >
          <i class="ns-plus text-lg hover:text-white"></i>
        </button>
        <div>
          <gw-select
            :options="['Day', 'Month']"
            selected="Day"
            @selected="filterCard"
          />
        </div>
        <button
          type="button"
          class=" inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          @click.prevent="showSubMenu"
        >
          <i class="ns-ellipsis  text-lg"></i>
        </button>
        <div v-show="meetSubMenu" class="mt-8">
          <GwOptions
            :options="['Set Availability']"
            selected="availability"
            @selected="setAvailabilty"
          />
        </div>
      </template>
    </PageHeader>
    <GwModal
      :is-open="openAvailabilityModal"
      :input-width="30"
      @close="openAvailabilityModal = $event"
      @closeBackDrop="openAvailabilityModal = $event"
    >
      <template v-slot:status>
        <div class="px-2 capitalize text-xl leading-normal">
          Set availability
        </div>
      </template>
      <div @close="openAvailabilityModal = $event">
        <SetAvailabity />
      </div>
    </GwModal>
    <GwModal
      :is-open="openCreateModal"
      :input-width="40"
      @close="openCreateModal = $event"
      @closeBackDrop="addCreateModal = $event"
    >
      <div @close="openCreateModal = $event">
        <CreateSchedule />
      </div>
    </GwModal>

    <div
      v-if="1 > 0"
      class="m-5 sm:m-3 pb-14 lg:pb-10 h-full mt-2 md:mt-5"
    >
      <template v-if="displayDay">
        <div v-for="data in group" :key="data.id">
          <GroupIdentifier :identifier="data" />
        </div>
      </template>
      <client-only>
        <div v-if="displayMonth">
          <FullCalendar
            ref="fullCalendar"
            class="my-fc"
            :options="calendarOptions"
          ></FullCalendar>
        </div>
      </client-only>
    </div>
    <div
      v-else
      class="mt-16 px-5 grid gap-5 justify-center text-center"
    >
      <div class="w-full">
        <img
          class="text-center inline-block"
          src="~/assets/img/low-dog.png"
          alt=""
          srcset=""
        />
      </div>
      <h5 class="font-bold text-base">
        No scheduled sessions
      </h5>
      <p
        class="px-5 text-sm mb-0 max-w-lg leading-6 mt-0 font-normal"
      >
        All your current, confirmed, and cancelled sessions will appear here.
        Schedule a session with your clients to begin
      </p>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import GroupIdentifier from '~/components/GroupIdentifier'
export default {
  name: 'Schedules',
  components: {
    GroupIdentifier,
    FullCalendar
  },
  layout: 'Scheduler',
  data () {
    return {
      openModal: false,
      openAvailabilityModal: false,
      filter: 'day',
      displayMonth: false,
      displayDay: true,
      meetSubMenu: false,
      openCreateModal: false,
      group: [
        {
          _id: {
            date: '10',
            day: 'Wed'
          },
          schedules: [
            {
              meeting: 'APBC Committee Meeting ',
              trainer: 'Ali R',
              time: 'Happening Now',
              venue: 'Remote',
              join: 'Join',
              session: false,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'happening_now',
              schedule_info: 'Tuesday 27 April, 2021',
              trainer_firstname: 'Josh',
              trainer_lastname: 'Bryan',
              dog_name: 'Bingo'
            },
            {
              meeting: 'APBC Committee Meeting ',
              trainer: 'Ali R',
              time: '2pm-3pm',
              venue: 'SMV-I12',
              cancelled: true,
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'cancelled',
              schedule_info: 'Tuesday 27 April, 2021',
              trainer_firstname: 'Josh',
              trainer_lastname: 'Bryan',
              dog_name: 'Bingo'
            },
            {
              meeting: 'Dap Committee Meeting',
              trainer: 'Josh',
              time: '10am-12pm',
              venue: 'SL-ILA',
              actions: '...',
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'request',
              schedule_info: 'Friday 31 April, 2021',
              trainer_firstname: 'Daniel',
              trainer_lastname: 'John',
              dog_name: 'Polly'
            },
            {
              meeting: 'Cap Committee Meeting',
              trainer: 'Josh',
              time: '10am-12pm',
              venue: 'SL-ILA',
              actions: '...',
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'confirmed',
              schedule_info: 'Saturday 3 May, 2021',
              trainer_firstname: 'Killian',
              trainer_lastname: 'Abram',
              dog_name: 'Potty'
            }
          ]
        },
        {
          _id: {
            date: '05',
            day: 'Tue'
          },
          schedules: [
            {
              meeting: 'APBC Committee Meeting ',
              trainer: 'Ali R',
              time: 'Happening Now',
              venue: 'Remote',
              join: 'Join',
              session: false,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'happening_now',
              schedule_info: 'Tuesday 27 April, 2021',
              trainer_firstname: 'Josh',
              trainer_lastname: 'Bryan',
              dog_name: 'Bingo'
            },
            {
              meeting: 'APBC Committee Meeting ',
              trainer: 'Ali R',
              time: '2pm-3pm',
              venue: 'SMV-I12',
              actions: '...',
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'cancelled',
              schedule_info: 'Tuesday 27 April, 2021',
              trainer_firstname: 'Josh',
              trainer_lastname: 'Bryan',
              dog_name: 'Bingo'
            },
            {
              meeting: 'Dap Committee Meeting',
              trainer: 'Josh',
              time: '10am-12pm',
              venue: 'SL-ILA',
              actions: '...',
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'request',
              schedule_info: 'Friday 31 April, 2021',
              trainer_firstname: 'Daniel',
              trainer_lastname: 'John',
              dog_name: 'Polly'
            },
            {
              meeting: 'Cap Committee Meeting',
              trainer: 'Josh',
              time: '10am-12pm',
              venue: 'SL-ILA',
              actions: '...',
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'confirmed',
              schedule_info: 'Saturday 3 May, 2021',
              trainer_firstname: 'Killian',
              trainer_lastname: 'Abram',
              dog_name: 'Potty'
            }
          ]
        },
        {
          _id: {
            date: '15',
            day: 'Fri'
          },
          schedules: [
            {
              meeting: 'APBC Committee Meeting ',
              trainer: 'Ali R',
              time: 'Happening Now',
              venue: 'Remote',
              join: 'Join',
              session: false,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'happening_now',
              schedule_info: 'Tuesday 27 April, 2021',
              trainer_firstname: 'Josh',
              trainer_lastname: 'Bryan',
              dog_name: 'Bingo'
            },
            {
              meeting: 'APBC Committee Meeting ',
              trainer: 'Ali R',
              time: '2pm-3pm',
              venue: 'SMV-I12',
              actions: '...',
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'cancelled',
              schedule_info: 'Tuesday 27 April, 2021',
              trainer_firstname: 'Josh',
              trainer_lastname: 'Bryan',
              dog_name: 'Bingo'
            },
            {
              meeting: 'Dap Committee Meeting',
              trainer: 'Josh',
              time: '10am-12pm',
              venue: 'SL-ILA',
              actions: '...',
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'request',
              schedule_info: 'Friday 31 April, 2021',
              trainer_firstname: 'Daniel',
              trainer_lastname: 'John',
              dog_name: 'Polly'
            },
            {
              meeting: 'Cap Committee Meeting',
              trainer: 'Josh',
              time: '10am-12pm',
              venue: 'SL-ILA',
              actions: '...',
              session: true,
              address_description: 'Kindly note that the location of this meeting is behind the popular Whispering Park along Melrose',
              status: 'confirmed',
              schedule_info: 'Saturday 3 May, 2021',
              trainer_firstname: 'Killian',
              trainer_lastname: 'Abram',
              dog_name: 'Potty'
            }
          ]
        }
      ],
      calendarOptions: {
        headerToolbar: false,
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: 'dayGridMonth',
        themeSystem: 'default',
        editable: true,
        droppable: true,
        eventResizableFromStart: true,
        background: '#fffff',
        events: [
          {
            id: 1,
            title: 'All Day Event',
            start: new Date().setDate(new Date().getDate() + 1)
          },
          {
            id: 2,
            title: 'Long Event',
            start: new Date().setDate(new Date().getDate() - 5),
            end: new Date().setDate(new Date().getDate() - 3)
          },
          {
            id: 3,
            title: 'Repeating Event',
            start: new Date().setDate(new Date().getDate() - 3)
          },
          {
            id: 4,
            title: 'Meeting',
            start: new Date().setDate(new Date().getDate() + 4)
          }
        ],
        weekends: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true
      }
    }
  },
  head () {
    return {
      title: 'Schedules'
    }
  },
  methods: {
    filterCard () {
      this.filter = this.filter === 'day' ? 'month' : 'day'
      if (this.filter === 'month') {
        this.displayMonth = true
        this.displayDay = false
      } else {
        this.displayMonth = false
        this.displayDay = true
      }
    },
    showSubMenu () {
      this.meetSubMenu = !this.meetSubMenu
    },
    prev () {
      const calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.prev()
    },
    next () {
      const calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.next()
    },
    prevEvent () {
    },
    nextEvent () {
    },
    setAvailabilty () {
      this.openAvailabilityModal = true
      this.meetSubMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: rgba(143, 151, 166, 1);
}

.active {
  color: black;
}

.active:focus {
  outline: none !important;
}
.my-fc::v-deep {
  .fc-daygrid-day-top {
    display: flex;
    /* flex-direction: row-reverse; */
    align-items: center !important;
    justify-content: center !important;
    margin: auto !important;
    background-color: #e5f0fa !important;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
  }
}
.my-fc::v-deep {
  .fc-daygrid-event-harness {
    background-color: #fff !important;
    border-left-width: 3px;
    border-color: #ffab00;
    color: #172942 !important;
    border-radius: 2px;
    margin: 5px;
  }
}
.my-fc::v-deep {
  .fc-daygrid-body-balanced .fc-daygrid-day-events {
    margin-top: 5px;
  }
}
.my-fc::v-deep {
  .fc-daygrid-event-dot {
    display: none !important;
  }
  td th, .fc-theme-standard td,
  .fc-theme-standard th,
  .fc-daygrid-day-frame,
   .fc-daygrid-day-events,
    .fc-daygrid-event-harness  {
    background-color: #fff !important;
  }
}
</style>
