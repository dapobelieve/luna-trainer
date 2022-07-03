<template>
  <div>
    <div class="items-center mb-3 py-2">
      <LunaFilter v-model="computedFilterList" :filter-types="filterTypes" />
    </div>
    <div class="luna-table overflow-scroll lg:overflow-hidden border bg-white rounded-2xl">
      <table class="table-auto table w-full text-xs" align="center">
        <thead style="vertical-align: middle" class="bg-slate-50">
          <tr class="uppercase tracking-wider text-gray-500">
            <th v-if="checkAble">
              <div class="pl-3 pt-1">
                <input v-model="selectAll" class="cursor-pointer h-4 w-4 border-grey-500" type="checkbox">
              </div>
            </th>
            <th v-for="(header, headerIndex) in headings" :key="headerIndex" :class="[headerIndex === 0 ? 'w' : '']" class="py-3">
              <div class="flex items-center justify-start ml-5 select-none text-slate-700">
                <div :class="[sort.text === header.text ? 'font-bold' : 'font-medium']">
                  <slot name="tableHeader" :tableHeaderData="header">
                    {{ header.text || '' }}
                  </slot>
                </div>
                <div v-show="header.sortable" class="flex flex-col mt-1 ml-1.5 text-xs">
                  <i class="fi-rr-caret-up cursor-pointer" @click.stop="$emit('sort-column', {...header, order: 'asc'})"></i>
                  <i class="fi-rr-caret-down cursor-pointer" style="margin-top: -0.69rem" @click.stop="$emit('sort-column', {...header, order: 'desc'})"></i>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="tableData.length">
          <tr v-for="(tableItem, itemIndex) in tableData" :key="itemIndex" class="text-center relative text-gray-500 hover-row hover:cursor-pointer" @click.exact="$emit('item-clicked', tableItem)">
            <td v-if="checkAble" class="w-12 py-4 font-medium pl-3">
              <AppCheckboxComponent v-model="checkedItems" :value="tableItem.id || tableItem._id" />
            </td>
            <slot :rowData="tableItem" name="tableRows"></slot>
          </tr>
          <tr>
            <td colspan="50" style="height: 25px" class="text-right text-gray-500">
              <LunaTablePagination
                class="mr-5 mb-2"
                :current-page="currentPage"
                :total-pages="Math.ceil(totalPages/10)"
                :per-page="10"
                @page-clicked="$emit('page-clicked', $event)"
              />
            </td>
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
      </table>
    </div>
  </div>
</template>

<script>
import AppCheckboxComponent from '~/components/AppCheckboxComponent'
import LunaTablePagination from '~/components/table/Pagination'
import LunaFilter from '~/components/table/Filter'
export default {
  name: 'LunaTable',
  components: { LunaTablePagination, AppCheckboxComponent, LunaFilter },
  model: {
    prop: 'filteredList',
    event: 'table-filter'
  },
  provide() {
    return {
      filterTypes: this.filterTypes
    }
  },
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    checkAble: {
      type: Boolean,
      default: false
    },
    filterTypes: {
      type: Array,
      required: true
    },
    sort: {
      type: Object,
      default: () => ({ key: 'type', order: 'asc' })
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
    },
  },
  data () {
    return {
      selectAll: false,
      checkedItems: [],
      tableState: {},
      filterList: {}
    }
  },
  watch: {
    checkedItems: {
      handler (val) {
        this.selectAll = val.length === this.tableData.length
        this.$emit('checked-items-changed', val)
      },
      deep: true
    },
    "$route": {
      // immediate: true,
      deep: true,
      handler: function (val) {
        const { query } = val
        for (const key in query) {
         if(key === 'date-range') {
           const dateQuery = query[key].split('-')
           this.filterList = {
             ...this.filterList,
             [key]: {
               from: new Date(parseInt(dateQuery[0]) * 1000),
               to: new Date(parseInt(dateQuery[1]) * 1000)
             }
           }
          } else {
            this.filterList[key] = query[key]
         }
        }
      }
    }
  },
  methods: {
    tableFiltered () {
      this.$emit('table-filter', this.filterList)
    }
  },
  computed: {
    computedFilterList: {
      get () {
        return this.filterList
      },
      set (val) {
        this.filterList = {}
        let query = {}
        for(let key in val) {
          if(key === 'date-range') {
            this.filterList[key] = val[key]
            query[key] = `${new Date(val[key].from)/1000}-${new Date(val[key].to)/1000}`
          } else {
            this.filterList[key] = val[key]
            query[key] = val[key].toLowerCase()
          }
        }
        
        this.$router.push({
          name: this.$route.name,
          query: {
            ...query
          }
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.luna-table {
  tbody {
    tr:nth-child(even) {
      //@apply bg-blue-50; //stripped styling
    }
  }

  table {
    font-size: 0.875rem;
  }
  tr {
    td {
      height: 3rem;
    }
  }

}
</style>
