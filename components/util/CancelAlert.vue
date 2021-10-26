<template>
  <div>
    <div class="mb-2 text-base">
      <slot name="text">
      </slot>
    </div>
    <div class="flex justify-end items-center">
      <button class="hidden md:flex items-center px-3.5 py-1 rounded-md bg-white border border-gray-400 m-1.5" @click="$emit('cancel', false)">
        Yes
      </button>
      <button class="hidden md:flex items-center px-3.5 py-1 rounded-md bg-blue-500 text-white border border-gray-400 m-1.5" @click="$emit('close', false)">
        No
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CancelAlert',
  props: {
    cancel: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
