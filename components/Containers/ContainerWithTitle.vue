<template>
  <!-- this container has only a title and no border -->
  <div class="parent">
    <div class="flex items-center justify-between">
      <slot name="headerbox" />
    </div>
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: 'ContainerWithTitleOnly'
}
</script>

<style lang="scss" scoped>
.parent {
  @apply rounded-xl bg-white py-[1.375rem] px-4 grid gap-y-9 min-h-0 h-full;
}
</style>
