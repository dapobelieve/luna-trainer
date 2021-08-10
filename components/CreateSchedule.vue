<template>
  <div>
    <div>
      <input
        v-model="title"
        type="text"
        placeholder="Enter a title"
        class="tail-w-full tail-bg-gray-200 tail-text-gray-500 focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500 tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
      />
    </div>
    <div class="tail-flex tail-mt-3.5">
      <div class=" tail-mr-3">
        <i class="ns-user tail-text-gray-500 tail-text-2xl"></i>
      </div>
      <div class="tail-w-full">
        <label for="name" class="tail-block tail-font-light">Dog Owner</label>
        <input
          v-model="name"
          type="text"
          class="tail-w-full tail-bg-white tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
        />
      </div>
    </div>
    <div class="tail-flex tail-mt-3.5">
      <div class="tail-text-2xl tail-mr-3">
        <i class="ns-calendar tail-text-gray-500"></i>
      </div>
      <div class="tail-w-full">
        <label for="date" class="tail-block tail-font-light">Date</label>
        <Datepicker v-model="date" :type="date" />
      </div>
    </div>
    <div class="tail-flex tail-mt-3.5">
      <div class="tail-text-2xl tail-mr-3">
        <i class="ns-clock tail-text-gray-500"></i>
      </div>
      <div class="tail-w-full">
        <div class="tail-w-full tail-flex tail-items-center tail-justify-between">
          <div class="tail-mr-2 tail-w-full">
            <label
              for="date"
              class="tail-block tail-font-light"
            >Start time</label>
            <Timepicker v-model="time1" />
          </div>
          <div class="tail-w-full">
            <label for="date" class="tail-block tail-font-light">End time</label>
            <Timepicker v-model="time2" />
          </div>
        </div>
        <span class="tail-block tail-text-gray-500 tail-pt-1 tail-text-sm">Duration : 0</span>
      </div>
    </div>
    <div class="tail-flex tail-mt-3.5">
      <div class="tail-text-2xl tail-mr-3">
        <img src="~/assets/img/appointment.svg" class="tail-w-5 tail-h-5" alt="" srcset="">
      </div>
      <div class="tail-w-full">
        <label
          for="appointment"
          class="tail-block tail-font-light"
        >Type of Appointment</label>
        <input
          type="text"
          class="tail-w-full focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500 tail-text-sm md:tail-text-base tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
        />
      </div>
    </div>
    <div class="tail-flex tail-mt-3.5">
      <div class="tail-text-2xl tail-mr-3">
        <i class="ns-location-alt tail-text-gray-500"></i>
      </div>
      <div class="tail-w-full">
        <label
          for="location"
          class="tail-block tail-font-light"
        >Location</label>
        <input
          v-model="venue"
          type="text"
          class="tail-w-full tail-bg-white focus:tail-outline-none focus:tail-bg-white tail-text-sm md:tail-text-base focus:tail-border-blue-500 tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
        />
      </div>
    </div>
    <div class="tail-flex tail-mt-3.5">
      <div class="tail-text-2xl tail-mr-3">
        <i class="ns-notebook tail-text-gray-500"></i>
      </div>
      <div class="tail-w-full">
        <label for="notes" class="tail-block tail-font-light">Notes</label>
        <textarea
          v-model="text"
          name="notes"
          rows="4"
          cols="50"
          class="tail-w-full tail-bg-white tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500 tail-border tail-border-gray-300 tail-rounded-md"
          :maxlength="max"
        >
        </textarea>
        <div class="tail-text-right tail-text-sm" v-text="(max - text.length)"></div>
      </div>
    </div>
    <div class="tail-flex tail-justify-end tail-items-center tail-mt-3">
      <button class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400 tail-m-1.5">
        Cancel
      </button>
      <button class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-text-white tail-bg-blue-400 tail-border tail-border-gray-400 tail-m-1.5">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateSchedule',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      date: '',
      time1: '',
      time2: '',
      format: 'd MMMM YYYY',
      max: 100,
      title: (this.data?.meeting) || '',
      text: (this.data?.address_description) || '',
      name: (this.data?.trainer_firstname) || '',
      venue: (this.data?.venue) || '',
      time: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
