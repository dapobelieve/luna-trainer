<template>
  <ClickOutside :do="() => { show = false}">
    <div class="relative">
      <slot :toggleMenu="toggle" name="field"></slot>
      <div v-if="show" class="absolute right-0 bg-white my-1.5 w-44 border shadow z-40 rounded">
        <div class="p-1">
          <input ref="search" v-model="search" class="mb-4 px-1 py-0.5 text-sm focus:outline-none focus:border-blue-100 h-7 rounded-sm border shadow-sm w-full " />
        </div>
        <div>
          <ul v-if="filteredRecords" class="">
            <li v-for="(option, index) in filteredRecords" :key="index" class="" @click="select(option)">
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
  props: {
    options: {
      type: Array
    }
  },
  data () {
    return {
      value: null,
      search: '',
      show: false
    }
  },
  computed: {
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
  methods: {
    select (option) {
      this.value = option
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
