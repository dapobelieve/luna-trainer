<template>
  <ClickOutside :do="() => { showDropdown = false}">
    <div class="flex items-center space-x-2">
      <div class="relative pt-2">
        <button type="button" @click="showDropdown = !showDropdown">
          <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
        </button>
        <div
          v-show="showDropdown"
          class="origin-top-right top-[1] absolute right-0 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
        >
          <div class="py-2 flex flex-col" role="none">
            <button type="button" class="dropdown-button">
              Make Default
            </button>
            <button type="button" class="dropdown-button">
              Disable
            </button>
            <button type="button" class="dropdown-button">
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClickOutside>
</template>

<script>
export default {
  props: {
    clientInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDropdown: false
    }
  }

}
</script>

<style lang="scss" scoped>
.dropdown-button {
  @apply text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left;
}
</style>
