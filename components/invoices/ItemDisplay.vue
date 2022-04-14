<template>
  <ClickOutside :do="() => { showDropdown = false}">
    <div class="flex items-center space-x-2">
      <span> {{ item.price | amount }} </span>
      <div class="relative pt-2">
        <button type="button" @click="showDropdown = !showDropdown">
          <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
        </button>
        <!-- dropdown menu -->
        <div
          v-show="showDropdown"
          class="origin-top-right top-[1] absolute right-0 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
        >
          <div class="py-2 flex flex-col" role="none">
            <button v-if="item.serviceId" type="button" class="dropdown-button" @click="$emit('edit-item',item)">
              Edit
            </button>
            <button
              type="button"
              class="dropdown-button"
              @click="$emit('delete-item',item)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClickOutside>
</template>

<script>
import ClickOutside from '~/components/util/ClickOutside'
export default {
  components: { ClickOutside },
  props: ['item'],
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
