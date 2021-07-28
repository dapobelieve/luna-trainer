<template>
  <div>
    <div class="tail-text-center tail-pb-2">
      Are you sure you want to delete this invoice?
    </div>
    <div class="tail-flex tail-justify-between tail-items-center">
      <button
        class="tail-capitalize tail-py-2 tail-px-4 tail-font-semibold tail-rounded-md tail-shadow-md tail-text-white hover:tail-bg-red-700 tail-bg-red-600 tail-mt-4"
        @click="$emit('deleteDetails')"
      >
        Yes
      </button>
      <button
        class="tail-capitalize tail-py-2 tail-px-4 tail-font-semibold tail-rounded-md tail-shadow-md tail-text-white hover:tail-bg-blue-500 tail-bg-blue-400 tail-mt-4"
        @click="$emit('close')"
      >
        No
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
