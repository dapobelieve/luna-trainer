<template>
  <ClickOutside :do="() => { showOptions = false}">
    <div class="flex items-center space-x-2">
      <div class="relative pt-2">
        <button type="button" @click="showOptions = !showOptions">
          <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
        </button>
        <!-- dropdown menu -->
        <div
          v-show="showOptions"
          class="origin-top-right top-[1] absolute right-0 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
        >
          <div class="flex flex-col" role="none">
            <slot />
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
  props: ['service'],
  data () {
    return {
      showOptions: false
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-button {
  @apply text-gray-700 font-normal block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left;
}
</style>
