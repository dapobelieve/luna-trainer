<template>
  <div>
    <div class="flex items-center">
      <ClickOutside :do="shouldCloseFilter">
        <button class="inline-flex relative ring-black ring-1 ring-opacity-10 rounded-lg px-2 py-1 text-primary-color mr-1 md:mr-2" @click.exact="show = !show">
          <i class="fi-rr-filter mt-1 md:mr-2"></i>
          <span class="md:block hidden">
            <span class=" mr-2 ">Filter</span>
          </span>
          <div v-show="show" class="absolute rounded-lg md:w-64 z-40 shadow-xl text-gray-600 top-10 left-0" @click.stop="">
            <div class="bg-white rounded-lg pt-4 pb-2 px-3 ring-1 ring-black ring-opacity-5">
              <div v-for="(filter, filterIndex) in filterTypes" :key="filterIndex" class="flex flex-col justify-start items-start py-1.5 font-light">
                <label class="flex items-center cursor-pointer w-full">
                  <AppCheckboxComponent v-model="computedCheckedVars" :value="filter.value" class="mt-1.5 mr-4" />
                  {{ `${filter.label}` | capitalize }}
                </label>
                <template>
                  <div v-if="filter.type === 'select' && computedCheckedVars.includes(filter.value)" class="status mt-3 w-full">
                    <GwSelector
                      :value="filterObj[filter.value]"
                      label="value"
                      :options="filter.options"
                      @change="filterObj[filter.value] = $event.value"
                    >
                      <template v-slot:dropdownOption="{optionObject: ops}">
                        <div class="flex items-center py-1">
                          <span class="text-gray-700">{{ ops.text }}</span>
                        </div>
                      </template>
                    </GwSelector>
                  </div>
                  <div v-else-if="filter.type === 'date-range' && computedCheckedVars.includes(filter.value)" class="date-range mt-2 rounded flex w-full" @click.stop>
                    <div class="flex items-center justify-between w-full p-2 bg-slate-50">
                      <div class="text-gray-500 inline-flex flex-col items-start mr-4 relative">
                        <span class="text-sm">From</span>
                        <date-picker v-model="filterObj[filter.value].start" class="date-picker" format="ddd MMM D" placeholder="Date"></date-picker>
                      </div>
                      <div class="text-gray-500 inline-flex flex-col items-start">
                        <span class="text-sm">To</span>
                        <date-picker v-model="filterObj[filter.value].end" class="date-picker" format="ddd MMM D" placeholder="Date"></date-picker>
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
      <div v-if="Object.keys(filterHashCompute).length" class="overflow-x-auto h-scroll flex">
        <div v-for="(item, key, index) in filterHashCompute" :key="index" class="mr-1 flex-shrink-0 mx-0.5 my-0.5 flex">
          <template v-if="item.indexOf('-') > -1">
            <span :key="index" class="ring-black ring-1 ring-opacity-10 rounded-full py-1 px-3 text-gray-600">
              <span class="mr-3 select-none">
                {{ key | capitalize }}  :

                <strong>{{ (item.split('-')[0] * 1000) | shortDate }} - {{ (item.split('-')[1] * 1000) | shortDate }}</strong></span>
              <button class="w-2" @click=" removeFilterItem(key)">&times;</button>
            </span>
          </template>
          <span v-else :key="index" class="ring-black ring-1 ring-opacity-10 rounded-full py-1 px-3 text-gray-600">
            <span class="mr-3 select-none">{{ key | capitalize }}: <strong>{{ item | capitalize }}</strong></span>
            <button class="w-2" @click=" removeFilterItem(key)">&times;</button>
          </span>
        </div>
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
      checkedVars: [],
      filterObj: {},
      show: false
    }
  },
  computed: {
    filterMap () {
      return this.filterTypes.reduce((acc, item) => {
        acc[item.value] = item
        return acc
      }, {})
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
          if (this.filterMap[key] && this.filterHash[key] !== 'all') {
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
      // immediate: true,
      handler (val) {
        if (val) {
          this.setupFilter()
        }
      }
    },
    $route: {
      immediate: true,
      deep: true,
      handler (val, oldVal) {
        const { query } = val
        this.show = false
        this.filterObj = {}
        this.$parent.sortingAndPaginationOptions = {}
        for (const key in query) {
          if (this.filterMap[key]) {
            this.checkedVars = Array.from(new Set(this.checkedVars.concat(key)))
            if (this.filterMap[key].type === 'date-range') {
              this.filterObj = Object.assign({}, this.filterObj, {
                [key]: {
                  start: new Date(query[key].split('-')[0] * 1000),
                  end: new Date(query[key].split('-')[1] * 1000)
                }
              })
            } else {
              this.filterObj = Object.assign({}, this.filterObj, { [key]: query[key] })
            }
          } else {
            console.log('where is this key', key)
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
    setupFilter () {
      this.filterTypes.forEach((item) => {
        if (!this.filterObj[item.value] && !this.checkedVars.includes(item.value)) {
          this.filterObj = Object.assign({}, this.filterObj, {
            [item.value]: item.default
          })
        }
      })
    },
    close () { this.show = false },
    removeFilterItem (key) {
      this.checkedVars = this.checkedVars.filter(item => item !== key)
      this.filterObj[key] = this.filterMap[key].default
      const { [key]: value, ...rest } = this.filterObj
      this.$emit('filter', { ...rest })
    },
    clear () {
      this.checkedVars = []
      this.$emit('filter', {})
      this.setupFilter()
      this.close()
    },
    shouldCloseFilter (event) {
      // console.log(event.target)
      // if(Array.from(event.target.classList).length === 0)
      //   return
      // this.show = false
    },
    filter () {
      const query = {}
      for (const key in this.filterObj) {
        if (this.checkedVars.includes(key)) {
          query[key] = this.filterObj[key]
        }
      }
      this.$emit('filter', query)
      this.close()
    }
  }
}
</script>

<style scoped lang="scss">
.mx-datepicker {
  width: 100%;
}
.h-scroll {
  &::-webkit-scrollbar {
    height: 2px;
  }
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
