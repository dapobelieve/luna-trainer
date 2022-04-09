<template>
  <ClickOutside :do="() => { show = false}">
    <div class="relative border bg-white rounded-lg shadow-sm">
      <div class="pl-3 pr-1 py-0.5 h-8 justify-between flex items-center ">
        <ClickOutside :do="() => { showFieldDropdown = false }">
          <div class="relative cursor-pointer mr-4 items-center inline-flex text-sm">
            <div class="inline-flex items-center" @click="showFieldDropdown = !showFieldDropdown; show=false">
              <span class="text-gray-500">{{ field }}</span>
              <i class="fi-rr-caret-down h-5 w-3 text-base text-gray-700"></i>
            </div>
            <div v-show="showFieldDropdown" class="absolute top-[18px] absolute mt-2 right-[-10px] rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
              <div class="py-1" role="none">
                <a v-for="(fieldOption, indexF) in fields" :key="indexF" class="text-gray-700 cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100" @click="selectField(fieldOption)">
                  {{ fieldOption }}
                </a>
              </div>
            </div>
          </div>
        </ClickOutside>
        <div class="w-[160px] flex items-start justify-start">
          <div  v-if="selectedOption" class="inline-flex items-center  w-full">
            <div class="px-1 text-sm focus:outline-none focus:border focus:border-blue-50 rounded w-full"
                 @click.exact.stop="clearSelection">
              <slot :selected="selectedOption" name="selected-option"></slot>
            </div>
          </div>
          <input
            v-if="!selectedOption"
            ref="search"
            v-model="search"
            :disabled="!field"
            :placeholder="placeHolder"
            class="px-1 text-sm focus:outline-none focus:border focus:border-blue-50 rounded w-full "
            @focus="show = true"
          />
          <button v-if="selectedOption || field" @click="selectedOption= null,close(),$emit('reset')" class="border ml-auto rounded-full h-4 w-4"><i style="font-size: 0.4rem" class="fi-rr-cross inline-flex items-center text-xs"></i></button>
        </div>
      </div>
      <div v-if="show" class="absolute right-0 bg-white mdy-1.5 w-40 border border-t-0 shadow z-40 rounded">
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
    event: 'change'
  },
  props: {
    field: {},
    fields: {
      type: Array
    },
    options: {
      type: Array
    }
  },
  data () {
    return {
      showFieldDropdown: false,
      selectedField: null,
      selectedOption: null,
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
  watch: {
    fields: {
      immediate: true,
      handler (newVal) {
        this.field = this.fields[0]
        this.$emit('field-selected', this.field)
      }
    }
  },
  methods: {
    clearSelection () {
      this.selectedOption = null
      this.show = true
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    selectField (field) {
      this.$emit('change', field)
      this.selectedOption = null
      this.showFieldDropdown = false
    },
    selectOption (option) {
      this.selectedOption = option
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
