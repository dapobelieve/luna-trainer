<template>
  <div class="calendar">
    <v-date-picker
      v-model="date"
      title-position="left"
      is-expanded
      class="text-dark"
      title="text-white"
    />
    <div class="tail-text-center tail-mt-16 tail-px-5">
      <h5 class="tail-font-bold">
        No scheduled sessions
      </h5>
      <p class="tail-px-5 tail-text-sm mb-0">
        You can scheedule all of your client sessions by connecting your
        calendars.
      </p>
      <button
      style="background: rgba(86, 204, 242, 1);"
        class="text-capitalize tail-py-2 tail-px-4 tail-font-semibold tail-rounded-md tail-shadow-md tail-text-white hover:tail-bg-green-700 mt-4"
      >
        connect calendar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarView',
  data () {
    return {
      date: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
  .calendar {
    display: none;
  }
}

@media only screen and (min-width: 769px) {
  .calendar {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    height: 100%;
    max-width: 300px;
  }
}
</style>
