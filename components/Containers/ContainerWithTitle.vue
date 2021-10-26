<template>
  <!-- this container has only a title and no border -->
  <div class="parent">
    <div class="tail-flex tail-items-center tail-justify-between">
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
  @apply tail-rounded-xl tail-bg-white tail-py-[1.375rem] tail-px-4 tail-grid tail-gap-y-9 tail-min-h-0 tail-h-full;
}
</style>
