<template>
  <div>
    <div class="bg-white flex items-center justify-between md:px-4 px-1 py-1 sticky top-0 shadow-sm h-14 z-10">
      <h3 class="text-lg hidden md:block sm:text-2xl">
        My Schedule
      </h3>
      <div v-if="calendarApi">
        <div class="flex items-center justify-between w-48">
          <span class="mt-1 cursor-pointer" @click="mainPrev"><i class="fi-rr-angle-left "></i></span>
          <h3 class="text-black">
            {{ months[currentDate.month] }} {{ currentDate.year }}
          </h3>
          <span class="mt-1 cursor-pointer" @click="mainNext"><i class="fi-rr-angle-right"></i></span>
        </div>
      </div>
      <div class="flex items-center">
        <ClickOutside :do="() => showDrop = false">
          <div id="monthly" class="relative border mr-3 px-3 border-blue-500 rounded-lg py-1">
            <span class="font-medium flex items-center cursor-pointer text-primary-color " @click="showDrop = !showDrop">
              <span>{{ currentView }}</span>
              <i class="fi-rr-caret-down ml-2 text-lg"></i>
            </span>
            <div
              v-show="showDrop"
              class="origin-top-right cursor-pointer absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
            >
              <div class="py-1" role="none">
                <a class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" showDrop="false" @click="changeView('dayGridMonth', 'Month')">Month
                </a>
                <a
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  showDrop="false"
                  @click="changeView('timeGridWeek', 'Week')"
                >Week
                </a>
                <a
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  showDrop="false"
                  @click="changeView('timeGridDay', 'Day')"
                >Day
                </a>
                <a
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  showDrop="false"
                  @click="changeView('listWeek', 'List')"
                >List
                </a>
              </div>
            </div>
          </div>
        </ClickOutside>
        <button
          id="plus"
          class="inline-flex primary-color items-center justify-center h-9 w-9 text-sm font-medium rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none "
          @click="openDrawer({ open: true, activePage: 'new-session' })"
        >
          <i class="fi-rr-plus text-white text-xl mt-1"></i>
        </button>
      </div>
    </div>
    <div class="">
      <div class="grid md:grid-cols-4 2xl:grid-cols-5 schedule-section">
        <div class="col-span-3 2xl:col-span-4 bg-blue-50">
          <FullCalendar ref="fullCalendar" class="main-calendar" :options="calendarOptions" />
        </div>
        <div class="pt-1 bg-white max-h-screen top-0 relative">
          <div class="grid gap-3 h-full w-full max-h-screen">
            <keep-alive>
              <SchedulerInfo :active-calendar="activeCalendar" :events="allEvents" />
            </keep-alive>
          </div>
        </div>
      </div>
    </div>

    <ScheduleWelcomeModal
      :exit-tour="() => {
        closeModal()
        doNotShowHints = true
      }"
      :take-tour="() => {
        tourItems();
        closeModal()
      }"
    />
  </div>
</template>

<script>
import { format, fromUnixTime } from 'date-fns'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { mapGetters } from 'vuex'
import ScheduleWelcomeModal from '~/components/modals/ScheduleWelcomeModal.vue'
import { scheduleTourSteps } from '~/tour/ScheduleTourSteps'
import SchedulerInfo from '~/components/scheduler/SchedulerInfo'
export default {
  name: 'Scheduler',
  components: {
    SchedulerInfo,
    ScheduleWelcomeModal,
    FullCalendar
  },
  data () {
    return {
      activeEvent: {},
      currentView: 'Month',
      newSchedule: false,
      openModal: false,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      calendarApi: {},
      currentDate: {
        month: null,
        year: null
      },
      showDrop: false,
      calendarOptions: {
        headerToolbar: false,
        eventClick: this.handleCalendarEventClick,
        dayMaxEvents: true,
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: false,
        editable: true
      },
      colorMap: {
        teal: 'rgba(20, 184, 166)',
        blue: 'rgba(59, 130, 246)',
        amber: 'rgba(245, 158, 11)',
        rose: 'rgba(239, 68, 68)',
        sky: 'rgba(6, 182, 212)'
      }
    }
  },
  head () {
    return {
      title: 'Schedules'
    }
  },
  computed: {
    ...mapGetters({
      activeCalendar: 'scheduler/getCalendar',
      allEvents: 'scheduler/getAllEvents'
    })
  },
  async mounted () {
    const schedule = window.localStorage.getItem('session-tour')
    if (schedule) {
      this.$modal.show('welcome-modal')
      this.$router?.push({ query: { new: true } })
    }
    // initialize calendar
    this.calendarApi = this.$refs.fullCalendar.getApi()
    this.updateDate()
    try {
      await this.loadEvents()
    } catch (e) {
      console.error(e)
    }
  },
  updated () {
    const newUser = (this.$route?.query?.new)
    if (newUser) {
      this.$modal.show('welcome-modal')
    }
  },
  created () {
    this.$nuxt.$on('scheduler:event-created', (data) => {
      this.processNewEvent(data)
    })
  },
  methods: {
    openDrawer (data) {
      this.$store.commit('scheduler/setStates', { drawer: data })
    },
    loadEvents () {
      this.calendarApi.refetchEvents()
      this.allEvents.forEach((event) => {
        this.processNewEvent(event)
        this.calendarApi.addEvent(event)
      })
    },
    removeEvent (eventId) {
      const event = this.calendarApi.getEventById(eventId)
      event.remove()
    },
    handleCalendarEventClick (info) {
      const { id } = info.event
      this.openDrawer({ open: true, activePage: 'schedule-details' })
      this.$router.push({
        name: 'schedule-events-id',
        params: {
          id
        }
      })
    },
    changeView (viewName, display) {
      this.currentView = display
      this.calendarApi.changeView(viewName)
      this.showDrop = false
    },
    processNewEvent (event) {
      if (event?.updated) {
        this.removeEvent(event.id)
      }

      if (event && Object.keys(event.when).length > 0) {
        this.calendarApi.addEvent({
          id: event.id,
          color: this.colorMap[event.color],
          description: event.description,
          participants: [...event.participants],
          colorName: event.color,
          when: event.when,
          editable: false,
          title: event.title,
          start: format(fromUnixTime(event.when?.startTime), "yyyy-MM-dd'T'HH:mm:ss"),
          end: format(fromUnixTime(event.when?.endTime), "yyyy-MM-dd'T'HH:mm:ss"),
          allDay: false
        })
      }
    },
    updateDate () {
      this.currentDate.month = new Date(this.calendarApi.currentData.currentDate).getMonth()
      this.currentDate.year = new Date(this.calendarApi.currentData.currentDate).getFullYear()
    },
    mainPrev () {
      this.calendarApi.prev()
      this.updateDate()
    },
    mainNext () {
      this.calendarApi.next()
      this.updateDate()
    },
    closeModal () {
      this.$modal.hide('welcome-modal')
      this.removeQueryParams()
    },
    removeQueryParams () {
      const query = Object.assign({}, this.$route.query)
      delete query.new
      this.$router.replace({ query })
      window.localStorage.removeItem('session-tour')
    },
    tourItems () {
      if (this.doNotShowHints) { return }
      scheduleTourSteps(this.$intro())
        .oncomplete(() => {
          this.removeQueryParams()
        })
        .onexit(() => {
          this.removeQueryParams()
        })
        .start()

      this.$intro().showHints()
    }
  }
}
</script>
<style>
@import '../assets/css/introtheme.css';
/* .introjs-prevbutton {
 height: 0%;
 opacity: 0;
} */
</style>
<style lang="scss" scoped>
.schedule-section {
  height: calc(100vh - 61px);
}
::v-deep .main-calendar {
  .fc-dayGridMonth-view, .fc-timeGridWeek-view {
    background-color: #F8FAFC;
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
      cursor: pointer;
      background-color: #FFFFFF;
      box-shadow: rgba(0, 0, 0, 0.1) 1.95px 1.95px 6px;
      border-radius: 4px;
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
