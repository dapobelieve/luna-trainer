<template>
  <click-outside :do="() => { showDropdown = false}">
    <div class="">
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
            <slot />
          </div>
        </div>
      </div>
    </div>
  </click-outside>
</template>

<script>
export default {
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
