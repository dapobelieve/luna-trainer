<template>
  <div class="luna-table overflow-scroll lg:overflow-hidden border bg-white rounded-2xl">
    <table class="table-auto table w-full text-xs" align="center">
      <thead style="vertical-align: middle" class="bg-gray-200" >
        <tr class="uppercase tracking-wider text-gray-500">
          <th v-if="checkAble">
            <div class="pl-3 pt-1">
              <input v-model="selectAll" class="cursor-pointer h-4 w-4 border-grey-500" type="checkbox">
            </div>
          </th>
          <th v-for="(header, headerIndex) in headings" :key="headerIndex" class="w-12 py-3 font-medium pl-1">
            <div class="flex items-center justify-center text-gray-700">
              <slot name="tableHeader" :tableHeaderData="header">{{header}}</slot>
              <div class="flex flex-col mt-1 ml-1.5 text-xs">
                <i @click.stop="$emit('sort-column')" class="fi-rr-caret-up cursor-pointer"></i>
                <i @click.stop="$emit('sort-column')" class="fi-rr-caret-down cursor-pointer" style="margin-top: -0.6rem"></i>
              </div>
            </div>
          </th>
        </tr>
      </thead> 
      <tbody>
        <tr @click.exact.stop="$emit('item-clicked', tableItem)" v-if="tableData" v-for="(tableItem, itemIndex) in tableData" :key="itemIndex" class="text-center relative text-gray-500 hover-row hover:cursor-pointer">
          <td v-if="checkAble" class="w-12 py-4 font-medium pl-3">
            <AppCheckboxComponent :id="itemIndex" v-model="checkedItems" :value="itemIndex" />
          </td>
          <slot :tableItemData="tableItem" name="tableRows"></slot>
        </tr>
        <tr>
          <td colspan="50" style="height: 25px" class="text-right text-gray-500">
            <LunaTablePagination
              :current-page="currentPage"
              :total-pages="10"
              :per-page="10"
              @page-clicked="currentPage = $event"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppCheckboxComponent from "~/components/AppCheckboxComponent";
import LunaTablePagination from "~/components/table/Pagination";
export default {
  name: 'LunaTable',
  components: {LunaTablePagination, AppCheckboxComponent},
  props: {
    checkAble: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      required: true,
      validator: value => {
        return value.every(item => 
          typeof item === 'object' && 
          (item.hasOwnProperty('_id') || item.hasOwnProperty('id')) &&
          Object.keys(item).length > 1)
      }
    },
    headings: {
      type: Array,
      default: () => [],
      required: true,
      validator: value => {
        return value.every(item => typeof item === 'string');
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      selectAll: false,
      checkedItems: []
    }
  },
  watch: {
    checkedItems: {
      handler(val) {
        this.selectAll = val.length === this.tableData.length;
        this.$emit("checked-items-changed", val);
      },
      deep: true
    },
    selectAll(val) {
      if (val) {
        this.checkedItems = this.tableData.map((item, index) => index);
        this.$emit("checked-items-changed", this.checkedItems);
      } else {
        this.checkedItems = [];
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
    //style row border
    td {
      height: 3rem;
    }
  }
  
}
</style>
