<template>
  <div class="tail-bg-white sm:tail-flex sm:tail-items-center sm:tail-justify-between tail-px-5 tail-py-3 tail-sticky tail-top-0 tail-shadow-md">
    <h3 class="tail-text-lg leading-6 tail-font-medium tail-text-gray-900">
      <div class="tail-flex tail-items-center">
        <slot name="back-button" />
        <slot name="avatar" />
        <slot name="title">
          Replace Heading
        </slot>
      </div>
    </h3>
    <div class="tail-mt-3 tail-flex sm:tail-mt-0 sm:tail-ml-4 tail-space-x-2">
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
