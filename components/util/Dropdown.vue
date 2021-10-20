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
      <DropDownList :options="filteredResult" :selected-item-id="selectedClient._id" @has-selected-service="selectClient" />
    </div>
    <div v-if="showDropdown" class="dropdown-list">
      <DropDownList :options="options" :selected-item-id="selectedClient._id" @has-selected-service="selectClient" />
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
      selectedClient: {},
      inputValue: '',
      ClientList: [],
      showDropdown: false,
      showfilteredDropdown: false
    }
  },
  computed: {
    filteredResult () {
      return this.options.filter((option) => {
        return option.firstName.toLowerCase().includes(this.inputValue.toLowerCase())
      })
    }
  },
  methods: {
    selectClient (client) {
      this.selectedClient = client
      this.inputValue = client.firstName
      this.$nextTick(() => {
        this.showDropdown = false
        this.showfilteredDropdown = false
      })
      this.$emit('on-client-selected', client)
    }
  }
}
</script>

<style>
</style>
