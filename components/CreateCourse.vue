<template>
  <div>
    <div>Create a course and add your client as they signup.</div>
    <div>
      <div class="tail-flex tail-mt-3.5">
        <div class=" tail-mr-3">
          <i class="ns-user tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <label for="name" class="tail-block tail-font-light">Name</label>
          <input
            v-model="name"
            type="text"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
          />
        </div>
      </div>
      <div class="tail-flex tail-mt-3.5">
        <div class=" tail-mr-3">
          <svg class="tail-w-5 tail-h-5 tail-text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
        </div>
        <div class="tail-w-full">
          <label for="name" class="tail-block tail-font-light">Description</label>
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
      <div class="tail-flex tail-mt-3.5">
        <div class=" tail-mr-3">
          <svg class="tail-w-5 tail-h-5 tail-text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
        </div>
        <div class="tail-w-full">
          <label for="name" class="tail-block tail-font-light">Requirements</label>
          <TagInput v-model="name" />
          <div class="tail-text-left tail-text-xs">
            Separate with a comma
          </div>
        </div>
      </div>
      <div class="tail-flex tail-mt-3.5">
        <div class=" tail-mr-3">
          <i class="ns-location-alt tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <div>
            <div class="tail-flex tail-items-center tail-w-full tail-bg-white tail-p-4 tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500">
              <input v-model="checked" type="checkbox" @change="changeLocation($event)">
              <div class="tail-ml-2 tail-w-full">
                <div class="inputwrapper tail-text-xs" data-required="Remote">
                  <input
                    type="text"
                    class="tail-w-full tail-placeholder-gray-800 tail-bg-white tail-p-2.5 tail-block tail-text-sm tail-mt-1 focus:tail-outline-none focus:tail-bg-white"
                    placeholder="Brief description about choosing remote"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="tail-w-full tail-mt-4">
            <label for="name" class="tail-block tail-font-light">{{ locationDetails }}</label>
            <input
              v-model="location"
              type="text"
              class="tail-w-full tail-bg-white tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            />
          </div>
        </div>
      </div>
      <div class="tail-flex tail-mt-3.5">
        <div class=" tail-mr-3">
          <i class="ns-users tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <label for="name" class="tail-block tail-font-light">Max Capacity</label>
          <div class="tail-flex tail-items-center">
            <input
              v-model="capacity"
              type="text"
              class="tail-w-3/6 tail-bg-white tail-p-2.5 tail-block tail-text-sm md:tail-text-base tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            />
            <div class="tail-flex tail-items-center">
              <input type="checkbox" class="tail-ml-2">
              <p class="tail-text-xs tail-ml-1">
                Unlimited
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="tail-flex tail-mt-3.5">
        <div class=" tail-mr-3">
          <i class="ns-label tail-text-gray-500 tail-text-2xl"></i>
        </div>
        <div class="tail-w-full">
          <label for="name" class="tail-block tail-font-light">Price</label>
          <div class="tail-flex tail-w-full">
            <span class="tail-w-11 tail-h-11 tail-border-r-0 tail-mt-1 tail-text-xl tail-bg-gray-300 tail-text-center tail-rounded-l tail-flex tail-justify-center tail-items-center">£</span>
            <input type="number" class="tail-w-3/6 tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-border-l-0 tail-rounded-r focus:tail-bg-white focus:tail-border-blue-500">
          </div>
        </div>
      </div>
      <div>
        <div>
        </div>
        <div class="tail-m-2 tail-w-full">
          <date-picker
            v-model="time2"
            :clearable="false"
            type="datetime"
            :append-to-body="false"
            :visible="false"
            format="DD MMMM, YYYY hh:mm A"
            style="width: 100% !important"
            range
          ></date-picker>
        </div>
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
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.inputDataText{
    padding:13px;
    border-width:1px;
    border-radius:9px;
    border-style:solid;
    border-color:#d9d9d9;
    width:100%;
    box-sizing: border-box;
  }
  .inputwrapper{
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
  .mx-input-wrapper{
    height: 45px !important;
  }
  .mx-input {
    height: 45px !important;
  }
}
</style>
