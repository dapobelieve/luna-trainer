<template>
  <div class="min-h-screen">
    <div class="bg-white flex items-center justify-between md:px-4 px-1 py-1 sticky top-0 shadow-sm h-14 border-b z-10">
      <h3 class="text-lg hidden md:block sm:text-2xl">My Schedule</h3>
      <div v-if="calendarApi">
        <div class="flex items-center justify-between w-48">
          <span @click="mainPrev" class="mt-1 cursor-pointer"><i class="fi-rr-angle-left "></i></span>
          <h3 class="text-black">{{months[currentDate.month]}} {{ currentDate.year }}</h3>
          <span @click="mainNext" class="mt-1 cursor-pointer"><i class="fi-rr-angle-right"></i></span>
        </div>
      </div>
      <div class="flex items-center">
        <ClickOutside :do="() => showDrop = false">
          <div class="relative border mr-3 px-3 border-blue-500 rounded-lg py-1">
              <span class="font-medium flex items-center cursor-pointer text-primary-color " @click="showDrop = !showDrop">
                <span>{{ currentView }}</span>
                <i class="fi-rr-caret-down ml-2 text-lg"></i>
              </span>
            <div
              v-show="showDrop"
              class="origin-top-right cursor-pointer absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
            >
              <div class="py-1" role="none">
                <a @click="changeView('dayGridMonth', 'Month')" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" showDrop="false" >Month
                </a>
                <a @click="changeView('timeGridWeek', 'Week')"
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"  showDrop="false"
                >Week
                </a>
                <a @click="changeView('timeGridDay', 'Day')"
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"  showDrop="false"
                >Day
                </a>
                <a @click="changeView('listWeek', 'List')"
                   class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"  showDrop="false"
                >List
                </a>
              </div>
            </div>
          </div>
        </ClickOutside>
        <button
          @click="newSchedule = true"
          id="schduler-step-1"
          class="inline-flex primary-color items-center justify-center h-9 w-9 text-sm font-medium rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none "
        >
          <i class="fi-rr-plus text-white text-xl mt-1"></i>
        </button>
      </div>
    </div>
    <div class="grid md:grid-cols-4 schedule-section">
      <div class="col-span-3 bg-blue-50">
        <FullCalendar class="main-calendar" ref="fullCalendar" :options="calendarOptions" />
      </div>
      <div class="pt-1 bg-white max-h-screen top-0 relative">
        <div class="grid gap-3 h-full w-full max-h-screen">
          <NewSchedule @close="newSchedule = false" @created="processNewEvent($event)" v-if="newSchedule" />
          <SchedulerInfo :active-calendar="activeCalendar" :events="events" v-else />
      </div>
    </div>
    </div>
    <SchedulerWelcome @tour="tour()" />
  </div>
</template>

<script>
import { format, fromUnixTime } from "date-fns"
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import NewSchedule from "~/components/schedule/NewSchedule";
import SchedulerWelcome from "~/components/schedule/SchedulerWelcome";
import {mapGetters} from "vuex"
import SchedulerInfo from "~/components/schedule/SchedulerInfo";
export default {
  name: 'Schedules',
  data () {
    return {
      currentView: 'Month',
      events: [],
      newSchedule: false,
      months:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      calendarApi: {},
      currentDate: {
        month: null,
        year: null
      },
      showDrop: false,
      calendarOptions: {
        headerToolbar: false,
        // eventClick: this.handleCalendarEventClick(info),
        eventClick: function(info) {
          console.log(info)
        },
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: true,
      }
    }
  },
  components: {
    SchedulerInfo,
    SchedulerWelcome,
    NewSchedule,
    FullCalendar
  },
  layout: 'Scheduler',
  head () {
    return {
      title: 'Schedules'
    }
  },
  methods: {
    tour() {
      this.$modal.hide('scheduler-modal')
      this.$intro()
        .setOptions({
          hidePrev: true,
          steps: [
            {
              element: document.querySelector('#schduler-step-1'),
              intro: 'To create a  new session and add participants, click here'
            },
          ]
        })
        .start()
      this.$intro().showHints()
    },
    async handleCalendarEventClick(info) {
      console.log(info)
    },
    changeView(viewname, display) {
      this.currentView = display
      this.calendarApi.changeView(viewname)
      this.showDrop = false
    },
    processNewEvent(event) {
        this.calendarApi.addEvent({
        id: event.id,
        editable: false,
        title: event.title,
        start: format(fromUnixTime(event.when.startTime), "yyyy-MM-dd'T'HH:mm:ss"),
        end: format(fromUnixTime(event.when.endTime), "yyyy-MM-dd'T'HH:mm:ss"),
        allDay: false
      });
      if(this.newSchedule)
        this.newSchedule = false
    },
    updateDate() {
      this.currentDate.month = new Date(this.calendarApi.currentData.currentDate).getMonth()
      this.currentDate.year = new Date(this.calendarApi.currentData.currentDate).getFullYear()
    },
    mainPrev() {
      this.calendarApi.prev()
      this.updateDate()
    },
    mainNext() {
      this.calendarApi.next()
      this.updateDate()
    }
  },
  async asyncData(ctx) {
    let res = await ctx.store.dispatch('schedule/getCalendars')
    return {calendars: res}
  },
  computed: {
    ...mapGetters({
      activeCalendar: "schedule/getCalendar"
    })
  },
  async mounted() {
    // setup calendar
    this.calendarApi = this.$refs.fullCalendar.getApi()
    this.updateDate()
    // fetch local calendar
    if(!this.activeCalendar) {
      this.$modal.show('scheduler-modal')
      await this.$store.dispatch('schedule/connectToLocalCalendar')
      
    }else {
      let res = await this.$store.dispatch('schedule/getAllAppointments', {
        calendar: this.activeCalendar.id,
        startDatetime: parseInt(new Date(new Date().getFullYear(), 0, 1).setHours(0) / 1000),
        endDatetime: parseInt(new Date(new Date().setFullYear(new Date().getFullYear() + 2)).setHours(23) / 1000),
      })
      this.events = res
      
      res.map(event => {
        this.processNewEvent(event)
      })
    }
  }
  
}
</script>

<style lang="scss" scoped>
.schedule-section {
  height: calc(100vh - 61px);
}
::v-deep .main-calendar {
  .fc-dayGridMonth-view, .fc-timeGridWeek-view {
    .fc-col-header-cell {
      background-color: #fff;
      text-transform: uppercase;
      color: rgba(100, 116, 139, 1);
      font-weight: 500;
      font-size: 12px;
      .fc-scrollgrid-sync-inner {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .fc-daygrid-day-number {
      font-size: 14px;
    }
    .fc-day-today {
      background-color: transparent;
      .fc-daygrid-day-top {
        a {
          border-radius: 50%;
          height: 30px !important;
          width: 30px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(59, 130, 246, 1);
          color: white;
        }
      }
    }
    .fc-daygrid-event {
      background-color: #fff;
      border-radius: 8px;
      font-size: 12px;
    }
  }
  .fc-timeGridWeek-view {
    background-color: #F8FAFC;
    .fc-timegrid-event {
      background-color: #3B82F6;
      border: none;
      .fc-event-title {
        font-weight: 500;
        font-size: 12px;
      }
    }
    .fc-scrollgrid-shrink-frame {
      font-size: 12px;
      text-align: center;
    }
    .fc-timegrid-slots {
      tbody {
        tr {
          .fc-timegrid-slot-minor {
            //background-color: red;
            //display: none;
          }
        }
      }
    }
  }
}
</style>
