<template>
  <div>
    <div>Create a course and add your client as they signup.</div>
    <div>
      <div class="tail-flex tail-mt-5">
        <div class=" tail-mr-3">
          <i class="ns-user tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <label for="name" class="tail-block tail-font-light">Name</label>
          <input
            v-model="name"
            type="text"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
          />
        </div>
      </div>
      <div class="tail-flex tail-mt-5">
        <div class=" tail-mr-3">
          <img class="tail-h-6" src="~/assets/img/svgs/description.svg" alt="">
        </div>
        <div class="tail-w-full">
          <label
            for="name"
            class="tail-block tail-font-light"
          >Description</label>
          <textarea
            v-model="text"
            name="notes"
            rows="4"
            cols="50"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-pb-0 tail-block tail-text-sm md:tail-text-base tail-mt-1 focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400 tail-border tail-border-gray-300 tail-rounded-md"
            :maxlength="max"
          >
          </textarea>
          <div
            class="tail-text-right tail-text-sm"
            v-text="max - text.length"
          ></div>
        </div>
      </div>
      <div class="tail-flex tail-mt-5">
        <div class=" tail-mr-3">
          <img class="tail-h-6" src="~/assets/img/svgs/requirement.svg" alt="">
        </div>
        <div class="tail-w-full">
          <label
            for="name"
            class="tail-block tail-font-light"
          >Requirements</label>
          <TagInput v-model="name" />
          <div class="tail-text-left tail-text-xs">
            Separate with a comma
          </div>
        </div>
      </div>
      <div class="tail-flex tail-mt-5">
        <div class=" tail-mr-3">
          <i class="ns-location-alt tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <div>
            <div
              class="tail-flex tail-items-center tail-w-full tail-bg-white tail-p-2.5 tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            >
              <input
                v-model="checked"
                type="checkbox"
                class="tail-h-5 tail-w-5"
                @change="changeLocation($event)"
              />
              <div class="tail-ml-1.5 tail-w-full">
                <div class="inputwrapper tail-text-xs tail-mt-1" data-required="Remote">
                  <input
                    type="text"
                    class="tail-w-full tail-placeholder-gray-400 tail-bg-white tail-mt-1.5 tail-p-2.5 tail-block tail-text-sm focus:tail-outline-none focus:tail-bg-white"
                    placeholder="Brief description about choosing remote"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="tail-w-full tail-mt-3.5">
            <label for="name" class="tail-block tail-font-light">{{
              locationDetails
            }}</label>
            <input
              v-model="location"
              type="text"
              class="tail-w-full tail-bg-white tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            />
          </div>
        </div>
      </div>
      <div class="tail-flex tail-mt-5">
        <div class=" tail-mr-3">
          <i class="ns-users tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <label
            for="name"
            class="tail-block tail-font-light"
          >Max Capacity</label>
          <div class="tail-flex tail-items-center">
            <input
              v-model="capacity"
              type="text"
              class="tail-w-3/6 tail-bg-white tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-400"
            />
            <div class="tail-flex tail-items-center">
              <input type="checkbox" class="tail-ml-2" />
              <p class="tail-text-xs tail-ml-1">
                Unlimited
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="tail-flex tail-mt-5">
        <div class=" tail-mr-3">
          <i class="ns-label tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <label for="name" class="tail-block tail-font-light">Price</label>
          <div class="tail-flex tail-w-full">
            <span
              class="tail-w-11 tail-h-11 tail-border-r-0 tail-mt-1 tail-text-xl tail-bg-gray-300 tail-text-center tail-rounded-l tail-flex tail-justify-center tail-items-center"
            >£</span>
            <input
              type="number"
              class="tail-w-3/6 tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-border-l-0 tail-rounded-r focus:tail-bg-white focus:tail-border-blue-400"
            />
          </div>
        </div>
      </div>
      <div class="tail-flex tail-mt-5">
        <div class=" tail-mr-3">
          <i class="ns-calendar tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <label
            for="name"
            class="tail-block tail-font-light"
          >Class Schedule</label>
          <div
            class="tail-flex tail-flex-col tail--ml-4 tail-w-full"
          >
            <div v-for="(schedule, index) in schedules" :key="index" class="tail-flex tail-ml-0 tail-m-2 tail-items-center tail-justify-around">
              <div class="tail-text-gray-400 tail-text-sm tail-mr-1">
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
                class="tail-text-blue-400 tail-text-2xl tail-cursor-pointer tail-m-1"
                @click="add(index)"
              >+</span>
              <span
                v-show="schedules.length > 1"
                class="tail-text-blue-400 tail-text-2xl tail-cursor-pointer tail-m-1"
                @click="remove(index)"
              >-</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tail-flex tail-justify-end tail-items-center tail-mt-4">
        <button class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400 tail-m-1">
          Cancel
        </button>
        <button class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400 tail-m-1">
          Save Draft
        </button>
        <button
          class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-m-1 tail-py-1 tail-rounded-md tail-bg-blue-500 tail-border tail-text-white tail-border-gray-400"
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
