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
                <span>Month</span>
                <i class="fi-rr-caret-down ml-2 text-lg"></i>
              </span>
            <div
              v-show="showDrop"
              class="origin-top-right cursor-pointer absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
            >
              <div class="py-1" role="none">
                <a @click="changeView('dayGridMonth')" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" showDrop="false" >Month
                </a>
                <a @click="changeView('timeGridWeek')"
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"  showDrop="false"
                >Week
                </a>
                <a @click="changeView('timeGridDay')"
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"  showDrop="false"
                >Day
                </a>
                <a @click="changeView('listWeek')"
                   class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"  showDrop="false"
                >List
                </a>
              </div>
            </div>
          </div>
        </ClickOutside>
        <button
          @click="newSchedule = true"
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
          <NewSchedule @close="newSchedule = false" v-if="newSchedule" />
          <div v-else class="px-3">
            <MiniCalendar />
            <div>
              <h3 class="mr-3 font-bold mb-4">Upcoming sessions</h3>
              <div class="mb-8">
                <div class="flex justify-between mb-4">
                  <div class="font-bold">Today</div>
                  <div class="date text-gray-400">4/03/2022</div>
                </div>
                <EventItem class="mb-8" />
                <EventItem />
              </div>
              <div>
                <div class="flex justify-between mb-4">
                  <div class="font-bold">Tomorrow</div>
                  <div class="date text-gray-400">4/03/2022</div>
                </div>
                <EventItem day="tomorrow" />
              </div>
            </div>
          </div>
      </div>
    </div>
    </div>
    <SchedulerWelcome />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import MiniCalendar from "~/components/schedule/MiniCalendar";
import EventItem from "~/components/schedule/EventItem";
import NewSchedule from "~/components/schedule/NewSchedule";
import SchedulerWelcome from "~/components/schedule/SchedulerWelcome";
export default {
  name: 'Schedules',
  data () {
    return {
      newSchedule: true,
      months:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      calendarApi: {},
      calendars: [],
      currentDate: {
        month: null,
        year: null
      },
      showDrop: false,
      calendarOptions: {
        headerToolbar: false,
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: false,
        initialEvents: [
          { title: 'nice event', start: new Date("2021-12-16") },
          { title: 'nice event', start: new Date("2021-12-1") },
          { title: 'nice event', start: new Date("2021-12-1") },
          { title: 'nice event', start: new Date("2021-12-12") },
        ]
      }
    }
  },
  components: {
    SchedulerWelcome,
    NewSchedule,
    EventItem,
    MiniCalendar,
    FullCalendar
  },
  layout: 'Scheduler',
  head () {
    return {
      title: 'Schedules'
    }
  },
  methods: {
    changeView(viewname) {
      this.calendarApi.changeView(viewname)
      this.showDrop = false
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
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi()
    this.updateDate()
    if(this.calendars.length === 0) {
      this.$modal.show('scheduler-modal')
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
