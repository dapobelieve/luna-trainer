<template>
  <div>
    <div class="text-center pb-2">
      Are you sure you want to delete this invoice?
    </div>
    <div class="flex justify-between items-center">
      <button
        class="capitalize py-2 px-4 font-semibold rounded-md shadow-md text-white hover:bg-red-700 bg-red-600 mt-4"
        @click="$emit('deleteDetails')"
      >
        Yes
      </button>
      <button
        class="capitalize py-2 px-4 font-semibold rounded-md shadow-md text-white hover:bg-blue-500 bg-blue-400 mt-4"
        @click="$emit('close')"
      >
        No
      </button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
