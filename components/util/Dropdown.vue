<template>
  <div class="dropdown">
    <!-- <div
      v-if="Object.keys(selectedClient).length"
      class="
            tail-flex
            tail-justify-between
            tail-items-center
            tail-relative"
    >
      <div class="dropdown-selected tail-flex ">
        <ClientAvatar :client-info="selectedClient" />
        <div class="tail-flex tail-flex-col tail-ml-2">
          <p> {{ selectedClient.firstName }}</p>
          <p> {{ selectedClient.email }}</p>
        </div>
      </div>
      <i
        class="ns-caret-down tail-font-bold tail-text-xl tail-cursor-pointer tail-absolute tail-right-0 tail-p-3"
        @click="test"
      ></i>
    </div> -->
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
      <DropDownList :options="filteredResult" @displayModal="$emit('showModal')" @has-selected-client="selectClient" />
    </div>
    <div v-if="showDropdown" class="dropdown-list">
      <DropDownList :options="options" :selected-item-id="selectedClient._id" @displayModal="$emit('showModal')" @has-selected-client="selectClient" />
    </div>
  </div>
</template>

<script>
export default {
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
    firstNames () {
      if (this.options.length) {
        return this.options.map((option) => {
          return option.firstName.toLowerCase()
        })
      } else {
        return []
      }
    },
    filteredResult () {
      return this.options.filter((option) => {
        return option.firstName.includes(this.inputValue.toLowerCase())
      })
    }
  },
  watch: {
    inputValue (newValue) {
      if (newValue) {
        this.showfilteredDropdown = true
        this.showDropdown = false
      }
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
.dropdown {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
.dropdown-input,
.dropdown-selected {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #edf2f7;
  background: #fff;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
}
.dropdown-input:focus,
.dropdown-selected:hover {
  background: #fff;
  border-color: #e2e8f0;
}
.dropdown-input::placeholder {
  opacity: 0.7;
}
.dropdown-selected {
  font-weight: bold;
  cursor: pointer;
}
.dropdown-list {
  position: absolute;
  width: 100%;
  max-height: 500px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  z-index: 30;
}
.dropdown-Client {
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
  height: 56px;
}
.dropdown-Client:hover {
  background: #F8FAFC;
}
.dropdown-Client-flag {
  max-width: 24px;
  max-height: 18px;
  margin: auto 12px auto 0px;
}
</style>
