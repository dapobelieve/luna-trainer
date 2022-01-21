<template>
  <div class="mini-calendar-section pt-2">
    <div class="flex items-center justify-between mb-3">
      <h3 class="mr-3 font-bold">
        {{ months[currentDate.month] }} {{ currentDate.year }}
      </h3>
      <div class="flex items-center">
        <span class="mt-1 cursor-pointer mr-4" @click="mainPrev"><i class="fi-rr-angle-left "></i></span>
        <span class="mt-1 cursor-pointer" @click="mainNext"><i class="fi-rr-angle-right"></i></span>
      </div>
    </div>
    <div class="bg-white mini-calendar-table">
      <FullCalendar ref="miniCalendar" :options="miniCalendarOptions" @select="handleSelect" />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      currentDate: {
        month: null,
        year: null
      },
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      miniCalendarOptions: {
        headerToolbar: false,
        height: 250,
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        select: this.handleSelect,
        contentHeight: 300,
        fixedWeekCount: false,
        nowIndicator: true
      }
    }
  },
  mounted () {
    this.calendarApi = this.$refs.miniCalendar.getApi()
    this.updateDate()
  },
  methods: {
    handleSelect (info) {
      this.$emit('date-clicked', info)
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
    }
  }
}
</script>

<style lang="scss" scoped>
 .mini-calendar-table {
  ::v-deep .fc {
    .fc-dayGridMonth-view {
      cursor: pointer;
      .fc-daygrid-day-frame {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .fc-daygrid-day-top {
        align-items: center;
        justify-content: center; // centralize dates
        &:after {
          display: none;
        }
      }
      .fc-daygrid-day-events, .fc-daygrid-day-bg { //hide events display
        display: none;
      }
      border: none;
      table {
        font-size: 14px;
        .fc-col-header-cell {
          color: #000;
          border-style: hidden;
        }
        thead {
          border-style: hidden;
        }
        tr {
          color: rgba(100, 116, 139, 1);
          td {
            border-style: hidden;
          }
        }
        border: none;
        border-collapse: collapse !important;
        .fc-day-today {
          background: none;
          & > div {
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
        tbody {
          border: none !important;
        }
      }
    }
  }
}
</style>
