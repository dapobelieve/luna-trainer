<template>
  <div>
    <div class="flex items-center">
      <ClickOutside :do="shouldCloseFilter">
        <button class="inline-flex relative ring-black ring-1 ring-opacity-5 rounded-lg px-2 py-1 text-primary-color mr-2" @click.exact="show = !show">
          <i class="fi-rr-filter mt-1 mr-2"></i>
          <span class="mr-2 ">Filter</span>
          <i class="fi-rr-caret-down mt-1"></i>
          <div v-show="show" class="absolute rounded-lg md:w-64 z-40 shadow-xl text-gray-600 top-10 left-0" @click.stop="">
            <div class="bg-white rounded-lg pt-4 pb-2 px-3 ring-1 ring-black ring-opacity-5">
              <div v-for="(filter, filterIndex) in filterTypes" :key="filterIndex" class="flex flex-col justify-start items-start py-1.5 font-light">
                <label class="flex items-center cursor-pointer w-full">
                  <AppCheckboxComponent v-model="computedCheckedVars" :value="filter" class="mt-1.5 mr-4" />
                  {{ filter | capitalize }}
                </label>
                <template>
                  <div v-if="computedCheckedVars.includes('status') && filter=== 'status'" class="status mt-3 w-full">
                    <GwSelector v-model="computedStatus" :options="statusOptions" />
                  </div>
                  <div v-if="checkedVars.includes('date-range') && filter=== 'date-range'" class="date-range mt-2 rounded flex w-full" @click.stop>
                    <div class="flex items-center justify-between w-full p-2 bg-slate-50">
                      <div class="text-gray-500 inline-flex flex-col items-start mr-4 relative">
                        <span class="text-sm">From</span>
                        <date-picker v-model="dateRanges.from" class="date-picker" format="ddd MMM D" placeholder="Date"></date-picker>
                      </div>
                      <div class="text-gray-500 inline-flex flex-col items-start">
                        <span class="text-sm">To</span>
                        <date-picker v-model="dateRanges.to" class="date-picker" format="ddd MMM D" placeholder="Date"></date-picker>
                      </div>
                    </div>
                  </div>
                  <div v-if="checkedVars.includes('date') && filter=== 'date'" class="date-range mt-2 rounded flex w-full">
                    <div class="flex items-center justify-between w-full p-2 bg-slate-50">
                      <div class="text-gray-500 inline-flex flex-col items-start">
                        <date-picker v-model="form.date" class="date-picker" format="ddd MMM D" placeholder="Date"></date-picker>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="flex justify-between mt-5">
                <button class="py-2 px-5" @click="clear">
                  Clear
                </button>
                <button class="py-2 px-20 button-fill w-28" @click="filter">
                  Filter
                </button>
              </div>
            </div>
          </div>
        </button>
      </ClickOutside>
      <div v-if="Object.keys(filterHashCompute).length" v-for="(item, key, index) in filterHashCompute" :key="index" class="mr-1 inline-flex">
        <template v-if="key !== 'delete'">
          <span v-if="key === 'date-range'" :key="index" class="border rounded-full py-1 px-3 text-gray-600">
            <span class="mr-3 select-none">{{ 'date range:' | capitalize }}  <strong>{{ item.from | shortDate }} - {{ item.to | shortDate }}</strong></span>
            <button class="w-2" @click=" removeFilterItem(key)">&times;</button>
          </span>
            <span v-else :key="index" class="border rounded-full py-1 px-3 text-gray-600">
            <span class="mr-3 select-none">{{ key | capitalize }}: <strong>{{ item | capitalize }}</strong></span>
            <button class="w-2" @click=" removeFilterItem(key)">&times;</button>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import AppCheckboxComponent from '~/components/AppCheckboxComponent'
import ClickOutside from '~/components/util/ClickOutside'
import GwSelector from '~/components/GwSelector'
export default {
  components: { GwSelector, ClickOutside, AppCheckboxComponent, DatePicker },
  model: {
    prop: 'filterHash',
    event: 'filter'
  },
  props: {
    filterHash: {
      type: Object,
      default: () => ({}),
      required: true
    },
    filterTypes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      form: {},
      statusOptions: [
        'All',
        'Sent',
        'Draft',
        'Paid',
        'Pending',
        'Overdue'
      ],
      dateRanges: {
        from: null,
        to: null
      },
      checkedVars: [],
      filterObj: {},
      show: false
    }
  },
  watch: {
    dateRanges: {
      handler (val) {
        if(this.checkedVars.includes('date-range'))
          this.filterObj['date-range'] = val
      },
      deep: true
    }
  }, 
  computed: {
    computedStatus: {
      get() {
        return this.filterObj['status']
      },
      set(val) {
        this.filterObj['status'] = val
      }
    },
    computedCheckedVars: {
      get() {
        return Array.from(new Set(this.checkedVars))
      },
      set(val) {
        this.checkedVars = Array.from(val)
      }
    },
    filterHashCompute: {
      get() {
        return this.filterHash
      },
      set(val) {
        // this.filterObj = Object.assign({}, this.filterObj, {...val})
        console.log('filterHasCompute', val)
      }
    }
  },
  methods: {
    close () { this.show = false },
    removeFilterItem (key) {
      this.$delete(this.filterObj, key)
      if(key === 'date-range') {
        this.dateRanges = {
          from: null,
          to: null
        }
      }
      this.checkedVars = this.checkedVars.filter(item => item !== key)
      this.$emit('filter', this.filterObj)
    },
    removeChecked (key) {
      this.checkedVars = this.checkedVars.filter(item => item !== key.toLowerCase())
    },
    clear () {
      this.checkedVars = []
      this.$set(this, 'filterObj', {})
      this.close()
    },
    setStatusValue (data) {
      this.filterObj.status = data.toLowerCase()
    },
    shouldCloseFilter (event) {
      // console.log(event.target)
      // if(Array.from(event.target.classList).length === 0)
      //   return
      // this.show = false
    },
    filter () {
      // if (Object.keys(this.filterObj).length > 0) {
        this.$emit('filter', { ...this.filterObj })
        this.close()
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.mx-datepicker {
  width: 100%;
}
.date-picker {
  ::v-deep .mx-input-wrapper {
    //width: 100px;
    .mx-input {
      //border: none;
      padding-left: 0px;
      font-size: 14px;
      font-weight: normal;
      color: #000;
      background-color: #fff;
      border-radius: 0px;
      border: 1px solid #ccc;
      width: 100%;
    }
      font-weight: 400;
      color: #000;
      box-shadow: none;
      .mx-icon-calendar {
        display: none;
      }
    }
  }
</style>
