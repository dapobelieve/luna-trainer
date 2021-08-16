<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <div class="tail-flex tail-items-center">
          {{ displayMonth ? 'June' : 'April' }}
          <button
            type="button"
            class="tail-outline-none tail-border-none tail-m-1 tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
            @click.prevent="displayMonth ? prev() : prevEvent()"
          >
            <img class="tail-h-6" src="~/assets/img/chevron-left.svg" alt="">
          </button>
          <button
            type="button"
            class="tail-outline-none tail-border-none tail-m-1 tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
            @click.prevent="displayMonth ? next() : nextEvent()"
          >
            <img class="tail-h-6" src="~/assets/img/chevron-right.svg" alt="">
          </button>
        </div>
      </template>
      <template v-slot:buttons>
        <button
          type="button"
          class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
          @click="openCreateModal = true"
        >
          <i class="ns-plus tail-text-lg hover:tail-text-white"></i>
        </button>
        <gw-select
          :options="['Day', 'Month']"
          selected="Day"
          @selected="filterCard"
        />
        <button
          type="button"
          class=" tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-sm tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
          @click.prevent="showSubMenu"
        >
          <i class="ns-ellipsis  tail-text-lg"></i>
        </button>
        <div v-show="meetSubMenu" class="tail-mt-8">
          <GwOptions
            :options="['Set Availability']"
            selected="availability"
            @selected="setAvailabilty"
          />
        </div>
      </template>
    </PageHeader>
    <Modal
      :is-open="openAvailabilityModal"
      :input-width="30"
      @close="openAvailabilityModal = $event"
    >
      <template v-slot:status>
        <div class="tail-px-2 tail-capitalize tail-text-xl tail-leading-normal">
          Set availability
        </div>
      </template>
      <div @close="openAvailabilityModal = $event">
        <SetAvailabity />
      </div>
    </Modal>
    <Modal
      :is-open="openCreateModal"
      :input-width="40"
      @close="openCreateModal = $event"
    >
      <div @close="openCreateModal = $event">
        <CreateSchedule />
      </div>
    </Modal>

    <div
      v-if="1 > 0"
      class="tail-m-5 sm:tail-m-3 tail-pb-14 lg:tail-pb-10 tail-h-full tail-mt-2 md:tail-mt-5"
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
      class="tail-mt-16 tail-px-5 tail-grid tail-gap-5 tail-justify-center tail-text-center"
    >
      <div class="tail-w-full">
        <img
          class="tail-text-center tail-inline-block"
          src="~/assets/img/low-dog.png"
          alt=""
          srcset=""
        />
      </div>
      <h5 class="tail-font-bold tail-text-base">
        No scheduled sessions
      </h5>
      <p
        class="tail-px-5 tail-text-sm tail-mb-0 tail-max-w-lg tail-leading-6 tail-mt-0 tail-font-normal"
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
      console.log('prevEvent')
    },
    nextEvent () {
      console.log('prevEvent')
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
