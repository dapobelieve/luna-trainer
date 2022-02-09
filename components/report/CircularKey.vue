<template>
  <div class="flex items-center">
    <div class="h-[48px] w-[48px] mr-3 border border-[3px] rounded-full" :style="borderColor"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['color'],
  computed: {
    borderColor() {
      return `border-color: ${this.color} !important`
    }
  }
}
</script>
