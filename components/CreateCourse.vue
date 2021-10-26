<template>
  <div>
    <div>Create a course and add your client as they signup.</div>
    <div>
      <div class="flex mt-5">
        <div class=" mr-3">
          <i class="ns-user text-gray-500 text-2xl"></i>
        </div>
        <div class="w-full">
          <label for="name" class="block font-light">Name</label>
          <input
            v-model="name"
            type="text"
            class="w-full bg-white p-2.5 block text-sm md:text-base mt-1 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-400"
          />
        </div>
      </div>
      <div class="flex mt-5">
        <div class=" mr-3">
          <img class="h-6" src="~/assets/img/svgs/description.svg" alt="">
        </div>
        <div class="w-full">
          <label
            for="name"
            class="block font-light"
          >Description</label>
          <textarea
            v-model="text"
            name="notes"
            rows="4"
            cols="50"
            class="w-full bg-white p-2.5 pb-0 block text-sm md:text-base mt-1 focus:outline-none focus:bg-white focus:border-blue-400 border border-gray-300 rounded-md"
            :maxlength="max"
          >
          </textarea>
          <div
            class="text-right text-sm"
            v-text="max - text.length"
          ></div>
        </div>
      </div>
      <div class="flex mt-5">
        <div class=" mr-3">
          <img class="h-6" src="~/assets/img/svgs/requirement.svg" alt="">
        </div>
        <div class="w-full">
          <label
            for="name"
            class="block font-light"
          >Requirements</label>
          <TagInput v-model="name" />
          <div class="text-left text-xs">
            Separate with a comma
          </div>
        </div>
      </div>
      <div class="flex mt-5">
        <div class=" mr-3">
          <i class="ns-location-alt text-gray-500 text-2xl"></i>
        </div>
        <div class="w-full">
          <div>
            <div
              class="flex items-center w-full bg-white p-2.5 text-sm md:text-base mt-1 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-400"
            >
              <input
                v-model="checked"
                type="checkbox"
                class="h-5 w-5"
                @change="changeLocation($event)"
              />
              <div class="ml-1.5 w-full">
                <div class="inputwrapper text-xs mt-1" data-required="Remote">
                  <input
                    type="text"
                    class="w-full placeholder-gray-400 bg-white mt-1.5 p-2.5 block text-sm focus:outline-none focus:bg-white"
                    placeholder="Brief description about choosing remote"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full mt-3.5">
            <label for="name" class="block font-light">{{
              locationDetails
            }}</label>
            <input
              v-model="location"
              type="text"
              class="w-full bg-white p-2.5 block text-sm md:text-base mt-1 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-400"
            />
          </div>
        </div>
      </div>
      <div class="flex mt-5">
        <div class=" mr-3">
          <i class="ns-users text-gray-500 text-2xl"></i>
        </div>
        <div class="w-full">
          <label
            for="name"
            class="block font-light"
          >Max Capacity</label>
          <div class="flex items-center">
            <input
              v-model="capacity"
              type="text"
              class="w-3/6 bg-white p-2.5 block text-sm md:text-base mt-1 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-400"
            />
            <div class="flex items-center">
              <input type="checkbox" class="ml-2" />
              <p class="text-xs ml-1">
                Unlimited
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-5">
        <div class=" mr-3">
          <i class="ns-label text-gray-500 text-2xl"></i>
        </div>
        <div class="w-full">
          <label for="name" class="block font-light">Price</label>
          <div class="flex w-full">
            <span
              class="w-11 h-11 border-r-0 mt-1 text-xl bg-gray-300 text-center rounded-l flex justify-center items-center"
            >£</span>
            <input
              type="number"
              class="w-3/6 bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 border-l-0 rounded-r focus:bg-white focus:border-blue-400"
            />
          </div>
        </div>
      </div>
      <div class="flex mt-5">
        <div class=" mr-3">
          <i class="ns-calendar text-gray-500 text-2xl"></i>
        </div>
        <div class="w-full">
          <label
            for="name"
            class="block font-light"
          >Class Schedule</label>
          <div
            class="flex flex-col -ml-4 w-full"
          >
            <div v-for="(schedule, index) in schedules" :key="index" class="flex ml-0 m-2 items-center justify-around">
              <div class="text-gray-400 text-sm mr-1">
                Class {{ index + 1 }} of {{ schedules.length }}
              </div>
              <date-picker
                v-model="schedule.class"
                :clearable="false"
                type="datetime"
                :append-to-body="false"
                :visible="false"
                format="DD MMMM, YYYY hh:mm A"
                range
              ></date-picker>

              <span
                class="text-blue-400 text-2xl cursor-pointer m-1"
                @click="add(index)"
              >+</span>
              <span
                v-show="schedules.length > 1"
                class="text-blue-400 text-2xl cursor-pointer m-1"
                @click="remove(index)"
              >-</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center mt-4">
        <button class="hidden md:flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-400 m-1">
          Cancel
        </button>
        <button class="hidden md:flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-400 m-1">
          Save Draft
        </button>
        <button
          class="hidden md:flex items-center px-2.5 m-1 py-1 rounded-md bg-blue-500 border text-white border-gray-400"
        >
          Save &#38; Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  data () {
    return {
      time2: '',
      max: 120,
      text: '',
      checked: false,
      locationDetails: 'Location',
      capacity: '',
      name: '',
      location: '',
      range: {
        start: new Date(),
        end: null
      },
      schedules: [{ class: '' }]
    }
  },
  methods: {
    changeLocation (e) {
      if (this.checked === false) {
        this.locationDetails = 'Location'
      } else {
        this.locationDetails = 'URL link'
      }
      console.log(e)
      console.log(this.locationDetails)
    },
    add (index) {
      this.schedules.push({ name: '' })
    },
    remove (index) {
      this.schedules.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.inputDataText {
  padding: 13px;
  border-width: 1px;
  border-radius: 9px;
  border-style: solid;
  border-color: #d9d9d9;
  width: 100%;
  box-sizing: border-box;
}
.inputwrapper {
  position: relative;
}
.inputwrapper::after {
  content: attr(data-required);
  position: absolute;
  left: 10px;
  top: 4px;
  font-size: 15px;
  transform: translateY(-50%);
  color: rgb(46, 44, 44);
}
.my-dx::v-deep {
  .mx-input-wrapper {
    height: 45px !important;
  }
  .mx-input {
    height: 45px !important;
  }
}
</style>
