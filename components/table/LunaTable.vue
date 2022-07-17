<template>
  <div>
    <div class="flex justify-between items-center mb-3 py-2">
      <LunaFilter v-model="computedFilterList" class="mr-1" />
      <div class="relative">
        <ClickOutside :do="() => { showSort = false }">
          <button class="inline-flex relative ring-black ring-1 ring-opacity-5 rounded-lg px-2 py-1 text-primary-color  md:mr-2" @click.stop.exact="showSort = !showSort">
            <i class="fi-rr-apps-sort mt-1 md:mr-2"></i>
            <span class="md:block hidden mr-2 ">Sort</span>
            <div
              v-show="showSort"
              class="absolute right-0 top-[41px] w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[5]"
            >
              <div class="py-2 flex flex-col" role="none">
                <button type="button" class="dropdown-button" @click="$router.push({name: $route.name, query: { ...$route.query, sort: 'createdAt'}})">
                  Latest (asc)
                </button>
              </div>
            </div>
          </button>
        </ClickOutside>
      </div>
    </div>
    <div class="luna-table bg-white rounded-2xl ring-1 ring-black ring-opacity-5">
      <div class="overflow-x-scroll lg:overflow-x-visible rounded-2xl h-scroll">
        <table class="table-auto relative table w-full text-xs" align="center">
          <thead class="bg-slate-50">
            <tr class="uppercase tracking-wider text-gray-500">
              <th v-if="checkAble">
                <div class="pl-3 pt-1">
                  <input v-model="selectAll" class="cursor-pointer h-4 w-4 border-grey-500" type="checkbox">
                </div>
              </th>
              <th v-for="(header, headerIndex) in headings" :key="headerIndex" :class="[headerIndex === 0 ? 'w-3/12' : '']" class="py-3 ">
                <div class="flex items-center justify-start ml-5 select-none text-slate-700">
                  <div :class="[sort.indexOf(header.value) > -1 ? 'font-bold' : 'font-medium', header.sortable ? 'cursor-pointer' : '']" @click="sortColumn(header)">
                    <slot name="tableHeader" :tableHeaderData="header">
                      {{ header.text || '' }}
                    </slot>
                  </div>
                  <div v-show="header.sortable" class="flex flex-col mt-1 ml-1.5 text-xs">
                    <i
                      :class="[(sort.indexOf('-') !== -1 && sort.indexOf(header.value) > -1) ? 'text-gray-200' : '']"
                      class="fi-rr-caret-up cursor-pointer"
                    >
                    </i>
                    <i
                      :class="[(sort.indexOf('-') === -1 && sort.indexOf(header.value) > -1) ? 'text-gray-200' : '']"
                      class="fi-rr-caret-down cursor-pointer"
                      style="margin-top: -0.69rem"
                    ></i>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <template v-if="loading">
            <tbody>
              <tr>
                <td colspan="100" class="w-100">
                  <div class="h-72 flex items-center justify-center">
                    <SingleLoader />
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
          <template v-else>
            <tbody v-if="tableData.length">
              <tr v-for="(tableItem, itemIndex) in tableData" :key="itemIndex" class="text-center text-gray-500 hover:cursor-pointer" @click.exact="$emit('item-clicked', tableItem)">
                <td v-if="checkAble" class="w-12 py-4 font-medium pl-3">
                  <AppCheckboxComponent v-model="checkedItems" :value="tableItem.id || tableItem._id" />
                </td>
                <slot
                  :activeRow="activeItem"
                  :setActiveItem="setActiveItem"
                  :rowData="tableItem"
                  name="tableRows"
                >
                </slot>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="100" style="height: 8rem">
                  <div class="w-full h-72 select-none flex items-center justify-center flex-col">
                    <img style="width: 5rem" class="mb-3" src="~assets/img/list.svg">
                    <p>You have no items yet.</p>
                    <span class="mt-1">
                      <small>Nothing to show here</small>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
      <div class="flex justify-end w-100 bg-white rounded-2xl">
        <LunaTablePagination
          class="mr-5 mb-2"
          :current-page="currentPage"
          :total-pages="Math.ceil(totalPages/10)"
          :per-page="10"
          @page-clicked="pageClicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppCheckboxComponent from '~/components/AppCheckboxComponent'
import LunaTablePagination from '~/components/table/Pagination'
import LunaFilter from '~/components/table/Filter'
import SingleLoader from '~/components/util/SingleLoader'
export default {
  name: 'LunaTable',
  components: { SingleLoader, LunaTablePagination, AppCheckboxComponent, LunaFilter },
  provide () {
    return {
      filterTypes: this.filterTypes
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    checkAble: {
      type: Boolean,
      default: false
    },
    filterTypes: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(item =>
          typeof item === 'object' &&
          (Object.prototype.hasOwnProperty.call(item, '_id') || Object.prototype.hasOwnProperty.call(item, 'id')) &&
          Object.keys(item).length > 1)
      }
    },
    headings: {
      type: Array,
      default: () => [],
      required: true,
      validator: (value) => {
        return value.every(item => typeof item === 'object')
      }
    }
  },
  data () {
    return {
      showSort: false,
      activeItem: null,
      selectAll: false,
      checkedItems: [],
      filterList: {},
      sortingAndPaginationOptions: {}
    }
  },
  computed: {
    sort () {
      return this.$route.query.sort || ''
    },
    currentPage () {
      return parseInt(this.$route.query.page) || 1
    },
    computedFilterList: {
      get () {
        return this.filterList
      },
      set (val) {
        this.filterList = {}
        const query = {}
        for (const key in val) {
          if (this.filterTypes.filter(item => item.value === key)[0].type === 'date-range') {
            const dateString = `${parseInt(new Date(val[key].start) / 1000)}-${parseInt(new Date(val[key].end) / 1000)}`
            query[key] = dateString
            this.filterList[key] = dateString
          } else {
            query[key] = val[key]
            this.filterList[key] = val[key]
          }
        }
        this.route({ ...query, ...this.sortingAndPaginationOptions })
        this.$emit('table-changed', { ...query, ...this.sortingAndPaginationOptions })
      }
    }
  },
  watch: {
    checkedItems: {
      handler (val) {
        this.selectAll = val.length === this.tableData.length
        this.$emit('checked-items', val)
      },
      deep: true
    },
    selectAll (val) {
      if (val) {
        this.checkedItems = this.tableData.map((item, index) => item.id || item._id)
        this.$emit('checked-items', this.checkedItems)
      } else {
        this.checkedItems = []
      }
    }
  },
  methods: {
    setActiveItem (item) {
      this.activeItem = this.activeItem === item ? null : item
    },
    pageClicked (page) {
      this.sortingAndPaginationOptions = Object.assign({}, this.sortingAndPaginationOptions, { page })
      this.route({ ...this.filterList, ...this.sortingAndPaginationOptions })
      this.$emit('table-changed', { ...this.filterList, ...this.sortingAndPaginationOptions })
    },
    sortColumn (header) {
      let sort
      if (header.sortable) {
        if (this.sortingAndPaginationOptions.sort === header.value) {
          sort = `-${header.value}`
        } else {
          sort = header.value
        }
        this.sortingAndPaginationOptions = Object.assign({}, this.sortingAndPaginationOptions, {
          sort
        })
        this.route()
      }
    },
    route (query) {
      query = query || this.$route.query
      this.$router.push({
        name: this.$route.name,
        query: {
          ...query,
          ...this.sortingAndPaginationOptions
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.h-scroll {
  &::-webkit-scrollbar {
    height: 2px;
  }
}
.luna-table {
  tbody {
    tr {
      @apply hover:bg-gray-100;
    }
  }

  table {
    font-size: 0.875rem;
    thead th:first-child {
      border-top-left-radius: 19px;
    }
    thead th:last-child {
      border-top-right-radius: 19px;
    }
  }
  tr {
    td {
      height: 3rem;
    }
  }

}
</style>
