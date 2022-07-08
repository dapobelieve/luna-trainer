<template>
  <div class="calendar relative">
    <div id="overlay"></div>
    <v-date-picker
      v-model="date"
      title-position="left"
      is-expanded
      class="text-black"
      format="DD-MMM-YYYY"
      title="text-white"
    />
    <div class="hidden text-center mt-16 px-5">
      <div class="w-full my-5">
        <img class="text-center inline-block" src="~/assets/img/low-dog.png" alt="" srcset="" />
      </div>
      <h5 class="font-bold">
        No scheduled sessions
      </h5>
      <p class="px-5 text-sm mb-0">
        You can scheedule all of your client sessions by connecting your
        calendars.
      </p>
      <button
        style="background: rgba(86, 204, 242, 1);"
        class="capitalize py-2 px-4 font-semibold rounded-md shadow-md text-white hover:bg-green-700 mt-4"
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

  #overlay {
  position: absolute; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 80%; /* Full height (cover the whole page) */
  top: -100px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255 255 255 / 90%); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
}
}
</style>
