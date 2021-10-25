<template>
  <div class="tail-bg-blue-50 tail-w-full tail-min-h-screen">
    <div
      class="tail-flex tail-justify-between lg:tail-grid tail-grid-cols-3 tail-bg-white tail-px-4 tail-py-3 tail-items-center tail-border-b tail-border-gray-200"
    >
      <span class="tail-text-2xl tail-to-gray-700 tail-font-normal">
        Create Invoice
      </span>
      <span class="tail-text-xs tail-text-gray-500 lg:tail-justify-self-center">
        Saving as draft...
      </span>
      <i
        role="button"
        class="ns-cross tail-text-blue-500 tail-text-lg lg:tail-justify-self-end"
        @click="$router.go(-1)"
      ></i>
    </div>
    <Nuxt
      class="tail-m-4 lg:tail-m-0 lg:tail-pt-12 tail-flex tail-justify-center"
    />
  </div>
</template>
<script>
export default {
  name: 'Invoice'
}
</script>
<style lang="scss"></style>
