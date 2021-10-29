<template>
  <ClickOutside :do="() => {}">
    <div class="relative search-select w-[200px] bg-white shadow rounded px-1.5 py-1">
      <button @click="show = !show" class="search-select-input w-full text-gray-600">
      <span class="search-field  text-sm inline-flex items-center">
        <span class="font-light">Name</span>
        <i class="ns-caret-down"></i>
      </span>
        <span class="search-item border w-full border-blue-50 text-sm font-light ml-1 text-gray-200 pl-2 text-left">
        Search term
      </span>
      </button>
      <div v-if="show" class="absolute bg-white origin-bottom my-1.5 w-full border shadow z-40 rounded p-1">
        <input class="mb-4 px-1 py-0.5 text-sm focus:outline-none focus:border-blue-500 h-8 rounded-sm border shadow-sm w-full " />
        <ul class="">
          <li v-for="x in 6" class="h-8 py-1 px-1.5 border">
            <div>1</div>
          </li>
        </ul>
      </div>
    </div>
  </ClickOutside>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
}
</script>

<style lang="scss" scoped>
.search-select-input {
  @apply bg-white
}
</style>