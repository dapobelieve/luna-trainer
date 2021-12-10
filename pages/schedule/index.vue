<template>
  <div class="min-h-screen">
    <div class="bg-white flex items-center justify-between px-4 py-1 sticky top-0 shadow-sm h-14 border-b z-10">
      <h3 class="text-lg sm:text-2xl">My Schedule</h3>
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
                <a @click="changeView('dayGridWeek')"
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"  showDrop="false"
                >Week
                </a>
                <a @click="changeView('timeGridDay')"
                  class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"  showDrop="false"
                >Day
                </a>
              </div>
            </div>
          </div>
        </ClickOutside>
        <NuxtLink
          :to="{ name: 'invoice'}"
          exact-active-class="active"
          class="inline-flex primary-color items-center justify-center h-9 w-9 text-sm font-medium rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none "
        >
          <i class="ns-plus text-white text-2xl"></i>
        </NuxtLink>
      </div>
    </div>
    <div class="grid md:grid-cols-4 schedule-section">
      <div class="col-span-3 bg-blue-50">
        <FullCalendar ref="fullCalendar" :options="calendarOptions" />
      </div>
      <div class=" px-4 pt-1 bg-white max-h-screen">
        <div class="grid gap-3">
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
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import GroupIdentifier from '~/components/GroupIdentifier'
import MiniCalendar from "~/components/schedule/MiniCalendar";
import EventItem from "~/components/schedule/EventItem";
export default {
  name: 'Schedules',
  components: {
    EventItem,
    MiniCalendar,
    GroupIdentifier,
    FullCalendar
  },
  layout: 'Scheduler',
  data () {
    return {
      months:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      calendarApi: {},
      currentDate: {
        month: null,
        year: null
      },
      showDrop: false,
      calendarOptions: {
        headerToolbar: false,
        // height: 'auto',
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: false,
        events: [
          { title: 'event 1', date: '2019-04-01' },
          { title: 'event 2', date: '2019-04-02' }
        ],
        initialEvents: [
          { title: 'nice event', start: new Date() }
        ]
      }
    }
  },
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
  computed: {
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi()
    this.updateDate()
  }
  
}
</script>

<style lang="scss" scoped>
.schedule-section {
  height: calc(100vh - 62px);
}
</style>
