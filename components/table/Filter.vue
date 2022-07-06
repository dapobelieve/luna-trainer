<template>
  <div>
    <div class="flex items-center">
      <ClickOutside :do="shouldCloseFilter">
        <button class="inline-flex relative ring-black ring-1 ring-opacity-10 rounded-lg px-2 py-1 text-primary-color mr-2" @click.exact="show = !show">
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
                    <GwSelector v-model="status" :options="statusOptions" />
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
                  <div v-if="checkedVars.includes('invited-date') && filter=== 'invited-date'" class="date-range mt-2 rounded flex w-full" @click.stop>
                    <div class="flex items-center justify-between w-full p-2 bg-slate-50">
                      <div class="text-gray-500 inline-flex flex-col items-start mr-4 relative">
                        <span class="text-sm">From</span>

                        <date-picker :value="filterObj[filter]['from']" class="date-picker" format="ddd MMM D" placeholder="Date" @input="filterObj[filter] = Object.assign({}, filterObj[filter], {from: $event})"></date-picker>
                      </div>
                      <div class="text-gray-500 inline-flex flex-col items-start">
                        <span class="text-sm">To</span>
                        <date-picker :value="filterObj[filter]['to']" class="date-picker" format="ddd MMM D" placeholder="Date" @input="filterObj[filter] = Object.assign({}, filterObj[filter], {to: $event})"></date-picker>
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
      <template v-if="Object.keys(filterHashCompute).length">
        <div v-for="(item, key, index) in filterHashCompute" :key="index" class="mr-1 flex-shrink flex">
          <template v-if="key === 'date-range' || key === 'invited-date'">
            <span :key="index" class="ring-black ring-1 ring-opacity-10 rounded-full py-1 px-3 text-gray-600">
              <span class="mr-3 select-none">{{ key === 'date-range' ? 'date range:' : 'invited date:' | capitalize }}  <strong>{{ item.from | shortDate }} - {{ item.to | shortDate }}</strong></span>
              <button class="w-2" @click=" removeFilterItem(key)">&times;</button>
            </span>
          </template>
          <span v-else-if="item !== ''" :key="index" class="ring-black ring-1 ring-opacity-10 rounded-full py-1 px-3 text-gray-600">
            <span class="mr-3 select-none">{{ key | capitalize }}: <strong>{{ item | capitalize }}</strong></span>
            <button class="w-2" @click=" removeFilterItem(key)">&times;</button>
          </span>
        </div>
      </template>
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
  inject: ['filterTypes'],
  model: {
    prop: 'filterHash',
    event: 'filter'
  },
  props: {
    filterHash: {
      type: Object,
      default: () => ({}),
      required: true
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
  computed: {
    status: {
      get () {
        return this.filterObj.status
      },
      set (val) {
        this.filterObj = Object.assign({}, this.filterObj, { status: val })
      }
    },
    computedCheckedVars: {
      get () {
        return Array.from(new Set(this.checkedVars))
      },
      set (val) {
        this.checkedVars = Array.from(val)
      }
    },
    filterHashCompute: {
      get () {
        return Object.keys(this.filterHash).reduce((acc, key) => {
          if (this.filterTypes.includes(key)) {
            acc[key] = this.filterHash[key]
          }
          return acc
        }, {})
      },
      set (val) {
        console.log('filterHasCompute', val)
      }
    }
  },
  watch: {
    show: {
      immediate: true,
      handler (val) {
        if (val) {
          this.filterTypes.forEach((item) => {
            this.filterObj = Object.assign({}, this.filterObj, { [item]: item === 'date-range' || item === 'invited-date' ? { from: null, to: null } : '' })
          })
        }
      }
    },
    dateRanges: {
      handler (val) {
        if (this.checkedVars.includes('date-range')) { this.filterObj['date-range'] = val }
      },
      deep: true
    },
    $route: {
      immediate: true,
      deep: true,
      handler (val) {
        const { query } = val
        for (const key in query) {
          if (!['sort', 'page'].includes(key)) {
            if (key === 'date-range' || key === 'invited-date') {
              const dateQuery = query[key].split('-')
              this.filterObj = {
                ...this.filterObj,
                [key]: {
                  from: new Date(parseInt(dateQuery[0]) * 1000),
                  to: new Date(parseInt(dateQuery[1]) * 1000)
                }
              }
            } else {
              this.filterObj = Object.assign({}, this.filterObj, { [key]: query[key] })
            }
          } else {
            this.$parent.sortingAndPaginationOptions = {
              ...this.$parent.sortingAndPaginationOptions,
              [key]: query[key]
            }
          }
        }
        this.$emit('filter', { ...this.filterObj })
      }
    }
  },
  methods: {
    close () { this.show = false },
    removeFilterItem (key) {
      this.$delete(this.filterObj, key)
      if (key === 'date-range') {
        this.dateRanges = {
          from: null,
          to: null
        }
      }
      this.checkedVars = this.checkedVars.filter(item => item !== key)
      this.$emit('filter', { ...this.filterObj })
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
      if (Object.keys(this.filterObj).length > 0) {
        this.$emit('filter', { ...this.filterObj })
        this.close()
      }
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
