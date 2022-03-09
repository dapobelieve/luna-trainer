<template>
  <div class="flex flex-col h-full">
    <div class="mb-auto">
      <div class="px-3">
        <MiniCalendar @date-clicked="fetchDateEvents" />
      </div>
      <div v-if="loading" class="px-3 flex justify-center items-center">
        <SingleLoader height="40px" width="40px" />
      </div>
      <div v-else class="px-3 mt-2">
        <h3 class="mr-3 font-bold mb-4">
          Upcoming sessions
        </h3>
        <div v-if="todayAndTomorrowsEvents && todayAndTomorrowsEvents.length" class="mb-8">
          <div class="flex justify-between mb-4">
            <div class="font-bold">
              Today
            </div>
            <div class="date text-gray-400">
              {{$dateFns.format(new Date(), 'd/M/y')}}
            </div>
          </div>
          <EventItem v-for="event in todayAndTomorrowsEvents.slice(0, 3)" :key="event.id" :event="event" class="mb-8" />
        </div>
        <div v-else class="text-gray-500">
          Your schedule is free
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="w-full px-1">
      <ClickOutside v-if="show" :do="() => openCalendarSelector = false">
        <div class="relative">
          <transition
            enter-active-class="transition-all ease-in-out duration-[500ms]"
            leave-active-class="transition-all ease-in-out duration-[500ms]"
            enter-class="opacity-0 transform translate-y-10"
            enter-to-class="opacity-100 transform translate-y-0"
            leave-class="opacity-100 transform translate-y-0"
            leave-to-class="opacity-0 transform translate-y-20"
          >
            <div v-if="openCalendarSelector" class="dropup w-full z-10 absolute bg-white bottom-[60px] border py-2 rounded-[8px]">
              <div class="bg-white w-full">
                <SchedulerSelectCalendarItem v-model="active" value="local">
                  <span class="calendar flex items-center cursor-pointer">
                    <img src="~/assets/img/getwelp.svg" class="mr-3">
                    <span class="select-none"> GetWelp calendar</span>
                  </span>
                </SchedulerSelectCalendarItem>
                <SchedulerSelectCalendarItem v-model="active" value="gmailx">
                  <span class="calendar text-gray-700 flex items-center cursor-pointer">
                    <img src="~/assets/img/google-cal.svg" class="mr-3">
                    <span class="select-none">Google Calendar</span>
                  </span>
                </SchedulerSelectCalendarItem>
              </div>
            </div>
          </transition>
          <div class="flex relative z-20 bg-white items-center px-3 py-3 cursor-pointer select-none border rounded-[12px]" @click="openCalendarSelector = !openCalendarSelector">
            <h5 class="font-medium text-blue-500 select-none">
              My Calendars
            </h5>
            <span class="ml-auto text-primary-color mt-1">
              <i :class="[openCalendarSelector ? 'fi-rr-caret-up' : 'fi-rr-caret-down']"></i>
            </span>
          </div>
        </div>
      </ClickOutside>
      <div v-else class="bg-blue-50 px-3 py-3 rounded-[12px] cursor-pointer items-center flex" @click="$modal.show('scheduler-connect-calendar')">
        <div class="h-16 w-16 rounded-full bg-white flex flex-shrink items-center justify-center mr-5">
          <i class="fi-rr-calendar text-2xl text-primary-color mt-2"></i>
        </div>
        <h5 class="font-medium text-blue-500">
          Sync with Calendar
        </h5>
        <div class="ml-auto ">
          <i class="fi-rr-angle-right text-sm text-primary-color mt-3" style="font-size: 8px"></i>
        </div>
      </div>
    </div>
    <ConnectCalendarModal id="" @close="$modal.hide('scheduler-connect-calendar')" />
  </div>
</template>

<script>
import MiniCalendar from '~/components/scheduler/MiniCalendar'
import EventItem from '~/components/scheduler/EventItem'
import SingleLoader from '~/components/util/SingleLoader'
import ConnectCalendarModal from '~/components/scheduler/ConnectCalendarModal'
import ClickOutside from '~/components/util/ClickOutside'
import SchedulerSelectCalendarItem from '~/components/scheduler/SchedulerSelectCalendarItem'
export default {
  components: {
    SchedulerSelectCalendarItem,
    ClickOutside,
    ConnectCalendarModal,
    SingleLoader,
    EventItem,
    MiniCalendar
  },
  props: ['events', 'activeCalendar'],
  data () {
    return {
      active: 'gmailx',
      show: false,
      openCalendarSelector: false,
      loading: false,
      todayAndTomorrowsEvents: []
    }
  },
  watch: {
    active: {
      handler (newVal) {
        this.openCalendarSelector = false
      }
    }
  },
  async mounted () {
    try {
      this.loading = true
      this.todayAndTomorrowsEvents = await this.$store.dispatch('scheduler/getAllAppointments', {
        startDateTime: parseInt(new Date().setUTCHours(0, 0, 0) / 1000),
        endDateTime: parseInt(new Date(new Date().setDate(new Date().getDate() + 1)).setUTCHours(23, 59, 59, 999) / 1000)
      })
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async fetchDateEvents (dateObj) {
      const { start, end } = dateObj
      try {
        this.loading = true
        this.todayAndTomorrowsEvents = await this.$store.dispatch('scheduler/getAllAppointments', {
          startDateTime: parseInt(Date.parse(start) / 1000),
          endDateTime: parseInt(Date.parse(end) / 1000)
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
