<template>
  <ClickOutside :do="() => { show = false}">
    <div class="relative border bg-white rounded-lg shadow-sm">
      <div class="pl-3 pr-1 py-0.5 h-8 justify-between flex items-center ">
        <ClickOutside :do="() => { showDropDown=false }">
          <div class="relative cursor-pointer mr-4 items-center inline-flex text-sm">
            <div class="inline-flex items-center" @click="showDropDown = !showDropDown">
              <span class="text-gray-500">{{ field }}</span>
              <i class="ns-caret-down h-3 w-3 text-base text-gray-700"></i>
            </div>
            <div v-show="showDropDown" class="absolute top-[18px] absolute mt-2 right-[-10px] rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
              <div class="py-1" role="none">
                <a v-for="(field, indexF) in fields" :key="indexF" class="text-gray-700 cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100" @click="selectField(field)">
                  {{ field }}
                </a>
              </div>
            </div>
          </div>
        </ClickOutside>
        <input
          ref="search"
          v-model="search"
          :disabled="!selectedField"
          :placeholder="placeHolder"
          class="px-1 text-sm focus:outline-none focus:border focus:border-blue-50 rounded w-full "
          @focus="show = true"
        />
      </div>
      <div v-if="show" class="absolute right-0 bg-white my-1.5 w-40 border shadow z-40 rounded">
        <div>
          <ul v-if="filteredRecords" class="">
            <li v-for="(option, index) in filteredRecords" :key="index" @click="selectOption(option)">
              <slot :option="option" name="option"></slot>
            </li>
          </ul>
        </div>
        <div v-if="filteredRecords.length === 0" class="text-sm text-center">
          No Results
        </div>
      </div>
    </div>
  </ClickOutside>
</template>
<script>
export default {
  model: {
    prop: 'field',
    event: 'select'
  },
  props: {
    field: {
      type: String
    },
    fields: {
      type: Array
    },
    options: {
      type: Array
    }
  },
  data () {
    return {
      showDropDown: false,
      selectedField: null,
      value: null,
      search: '',
      show: false
    }
  },
  computed: {
    placeHolder () {
      return `Search for ${this.field}`
    },
    filteredRecords () {
      let records = this.options

      records = records.filter((row) => {
        return Object.keys(row).some((key) => {
          return String(row[key]).toLowerCase().includes(this.search.toLowerCase())
        })
      })

      records = [...new Set(records.map(o => JSON.stringify(o)))].map(string => JSON.parse(string))
      return records
    }
  },
  mounted () {
    this.selectedField = this.fields[0]
  },
  methods: {
    selectField (field) {
      this.$emit('select', field)
    },
    selectOption (option) {
      // this.value = option
      this.$emit('selected', option)
      this.close()
    },
    toggle () {
      this.show = !this.show
      if (this.show) {
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      }
    },
    open () {
      this.show = true
    },

    close () {
      this.search = ''
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.search-select-input {
  @apply bg-white
}
</style>
