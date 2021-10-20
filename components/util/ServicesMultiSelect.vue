<template>
  <div class="dropdown">
    <div
      class="
            tail-flex
            tail-justify-between
            tail-items-center
            tail-relative"
    >
      <input
        ref="dropdowninput"
        v-model.trim="inputValue"
        class="dropdown-input"
        type="text"
      />
      <i
        class="ns-caret-down tail-font-bold tail-text-xl tail-cursor-pointer tail-absolute tail-right-0 tail-p-3"
        @click="showDropdown = !showDropdown"
      ></i>
    </div>
    <div
      v-show="showfilteredDropdown"
      class="dropdown-list"
    >
      <DropDownList :options="filteredResult" :selected-item-id="selectedService._id" :is-client="false" @has-selected-service="selectService" />
    </div>
    <div v-if="showDropdown" class="dropdown-list">
      <DropDownList :options="options" :selected-item-id="selectedService._id" :is-client="false" @has-selected-service="selectService" />
    </div>
  </div>
</template>

<script>
import DropDown from '../../mixins/dropdowns'
export default {
  mixins: [DropDown],
  props: {
    options: {
      type: Array,
      required: true
    },
    showAvatar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputValue: '',
      showDropdown: false,
      showfilteredDropdown: false,
      selectedService: {}
    }
  },
  computed: {
    filteredResult () {
      return this.options.filter((option) => {
        return option.description.toLowerCase().includes(this.inputValue.toLowerCase())
      })
    }
  },
  methods: {
    selectService (service) {
      service = { ...service, qty: 1 }
      this.selectedService = service
      this.inputValue = ''
      this.$nextTick(() => {
        this.showDropdown = false
        this.showfilteredDropdown = false
      })
      this.$emit('on-service-selected', service)
    }
  }
}
</script>

<style scoped>
</style>
