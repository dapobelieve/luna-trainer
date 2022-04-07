<template>
  <div>
    <div>
      <input
        v-model="title"
        type="text"
        placeholder="Enter a title"
        class="w-full bg-gray-200 text-gray-500 focus:outline-none focus:bg-white focus:border-blue-400 p-2.5 block text-sm md:text-base mt-1 border border-gray-300 rounded-md"
      />
    </div>
    <div class="flex mt-3.5">
      <div class=" mr-3">
        <i class="fi-rr-user text-gray-500 text-2xl"></i>
      </div>
      <div class="w-full">
        <label for="name" class="block font-light">Dog Owner</label>
        <input
          v-model="name"
          type="text"
          class="w-full bg-white p-2.5 block text-sm md:text-base mt-1 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-400"
        />
      </div>
    </div>
    <div class="flex mt-3.5">
      <div class="text-2xl mr-3">
        <i class="fi-rr-calendar text-gray-500"></i>
      </div>
      <div class="w-full">
        <label for="date" class="block font-light">Date</label>
        <Datepicker v-model="date" :type="date" />
      </div>
    </div>
    <div class="flex mt-3.5">
      <div class="text-2xl mr-3">
        <i class="fi-rr-clock text-gray-500"></i>
      </div>
      <div class="w-full">
        <div class="w-full flex items-center justify-between">
          <div class="mr-2 w-full">
            <label
              for="date"
              class="block font-light"
            >Start time</label>
            <Timepicker v-model="time1" />
          </div>
          <div class="w-full">
            <label for="date" class="block font-light">End time</label>
            <Timepicker v-model="time2" />
          </div>
        </div>
        <span class="block text-gray-500 pt-1 text-sm">Duration : 0</span>
      </div>
    </div>
    <div class="flex mt-3.5">
      <div class="text-2xl mr-3">
        <img src="~/assets/img/appointment.svg" class="w-5 h-5" alt="" srcset="">
      </div>
      <div class="w-full">
        <label
          for="appointment"
          class="block font-light"
        >Type of Appointment</label>
        <input
          type="text"
          class="w-full focus:outline-none focus:bg-white focus:border-blue-400 text-sm md:text-base bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div class="flex mt-3.5">
      <div class="text-2xl mr-3">
        <i class="fi-rr-location-alt text-gray-500"></i>
      </div>
      <div class="w-full">
        <label
          for="location"
          class="block font-light"
        >Location</label>
        <input
          v-model="venue"
          type="text"
          class="w-full bg-white focus:outline-none focus:bg-white text-sm md:text-base focus:border-blue-400 p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div class="flex mt-3.5">
      <div class="text-2xl mr-3">
        <i class="fi-rr-notebook text-gray-500"></i>
      </div>
      <div class="w-full">
        <label for="notes" class="block font-light">Notes</label>
        <textarea
          v-model="text"
          name="notes"
          rows="4"
          cols="50"
          class="w-full bg-white p-2.5 block text-sm md:text-base mt-1 focus:outline-none focus:bg-white focus:border-blue-400 border border-gray-300 rounded-md"
          :maxlength="max"
        >
        </textarea>
        <div class="text-right text-sm" v-text="(max - text.length)"></div>
      </div>
    </div>
    <div class="flex justify-end items-center mt-3">
      <button class="hidden md:flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-400 m-1.5">
        Cancel
      </button>
      <button class="hidden md:flex items-center px-2.5 py-1 rounded-md text-white bg-blue-500 border border-gray-400 m-1.5">
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
