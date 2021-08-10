<template>
  <div>
    <div class="tail-mb-2 tail-text-base">
      <slot name="text">
      </slot>
    </div>
    <div class="tail-flex tail-justify-end tail-items-center">
      <button class="tail-hidden md:tail-flex tail-items-center tail-px-3.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400 tail-m-1.5">
        Yes
      </button>
      <button class="tail-hidden md:tail-flex tail-items-center tail-px-3.5 tail-py-1 tail-rounded-md tail-bg-blue-400 tail-text-white tail-border tail-border-gray-400 tail-m-1.5" @click="$emit('close', false)">
        No
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // text: {
    //   type: String,
    //   requires: true
    // }
  }
}
</script>

<style>

</style>
