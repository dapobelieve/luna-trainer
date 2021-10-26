<template>
  <div class="calendar tail-relative">
    <div id="overlay"></div>
    <v-date-picker
      v-model="date"
      title-position="left"
      is-expanded
      class="tail-text-black"
      title="tail-text-white"
    />
    <div class="tail-hidden tail-text-center tail-mt-16 tail-px-5">
      <div class="tail-w-full tail-my-5">
        <img class="tail-text-center tail-inline-block" src="~/assets/img/low-dog.png" alt="" srcset="" />
      </div>
      <h5 class="tail-font-bold">
        No scheduled sessions
      </h5>
      <p class="tail-px-5 tail-text-sm tail-mb-0">
        You can scheedule all of your client sessions by connecting your
        calendars.
      </p>
      <button
        style="background: rgba(86, 204, 242, 1);"
        class="tail-capitalize tail-py-2 tail-px-4 tail-font-semibold tail-rounded-md tail-shadow-md tail-text-white hover:tail-bg-green-700 tail-mt-4"
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
