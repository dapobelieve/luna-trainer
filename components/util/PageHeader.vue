<template>
  <div class="bg-white sm:flex z-30 sm:items-center sm:justify-between px-5 py-3 sticky top-0 shadow-md page-header">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      <div class="flex items-center">
        <slot name="back-button" />
        <slot name="avatar" />
        <slot name="title" />
      </div>
    </h3>
    <div class="mt-3 flex sm:mt-0 sm:ml-4 space-x-2">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style lang="scss" scoped>
</style>
