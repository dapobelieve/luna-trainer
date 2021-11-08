<template>
  <div
    class="bg-white flex items-center justify-between px-4 py-1 sticky top-0 shadow-sm h-14 border-b z-10"
  >
    <h3 class="text-lg sm:text-2xl">
      <div class="flex items-center">
        <slot name="back-button" />
        <slot name="avatar" />
        <slot name="title">
          Replace Heading
        </slot>
      </div>
    </h3>
    <div class="flex ml-4 space-x-2">
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
