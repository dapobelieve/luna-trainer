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
        <i class="ns-user tail-text-gray-500 tail-text-3xl"></i>
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
      <div class="tail-text-3xl tail-mr-3">
        <i class="ns-calendar tail-text-gray-500"></i>
      </div>
      <div class="tail-w-full">
        <label for="date" class="tail-block tail-font-light">Date</label>
        <date-picker
          v-model="date"
          style="width: 100% !important"
          class="tail-w-full my-dp"
          :disabled-date="
            date => {
              if (date < new Date()) {
                return true;
              }
              return false;
            }
          "
          format="DD MMMM, YYYY"
          placeholder="Select an appointment date"
        ></date-picker>
      </div>
    </div>
    <div class="tail-flex tail-mt-3.5">
      <div class="tail-text-3xl tail-mr-3">
        <i class="ns-clock tail-text-gray-500"></i>
      </div>
      <div>
        <div class="tail-w-full tail-flex tail-items-center tail-justify-between">
          <div class="tail-mr-2">
            <label
              for="date"
              class="tail-block tail-font-light"
            >Start time</label>
            <date-picker
              v-model="time1"
              style="width: 100%x !important"
              format="hh:mm A"
              type="time"
              class="my-dx"
              placeholder="HH:MM"
            ></date-picker>
          </div>
          <div>
            <label for="date" class="tail-block tail-font-light">End time</label>
            <date-picker
              v-model="time2"
              style="width: 100% !important"
              class="my-dx"
              placeholder="HH:MM"
              format="hh:mm A"
              type="datetime"
            ></date-picker>
          </div>
        </div>
        <span class="tail-block tail-text-gray-500 tail-pt-1 tail-text-sm">Duration : 0</span>
      </div>
    </div>
    <div class="tail-flex tail-mt-3.5">
      <div class="tail-text-3xl tail-mr-3">
        <svg
          class="tail-w-6 tail-h-6 tail-text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path>
        </svg>
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
      <div class="tail-text-3xl tail-mr-3">
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
      <div class="tail-text-3xl tail-mr-3">
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
        <!-- <div class="tail-text-right tail-text-sm" v-text="(max - text.length)"></div> -->
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  name: 'CreateSchedule',
  components: { DatePicker },
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
      title: (this.data && this.data.meeting) || '',
      text: (this.data && this.data.address_description) || '',
      name: (this.data && `${this.data.client_firstname} ${this.data.client_lastname}`) || '',
      venue: (this.data && this.data.venue) || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.my-dp::v-deep {
  .mx-input-wrapper {
    height: 45px !important;
  }
  .mx-input {
    height: 100%;
  }
}

.my-dx::v-deep {
  .mx-input-wrapper{
    height: 45px !important;
  }
  .mx-input {
    height: 45px !important;
  }
}
</style>
