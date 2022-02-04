<template>
  <div class="flex items-center">
    <div class="h-[48px] w-[48px] m-3 border border-[3px] rounded-full" :class="`border-[${color}]`"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['color'],
  computed() {
    
  }
}
</script>
