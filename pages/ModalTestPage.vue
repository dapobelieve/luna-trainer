<template>
  <div>
    <div class="tail-flex tail-justify-center tail-py-4">
      <div class="tail-grid tail-flex-col-12">
        <h1>Click Me to test your Modal</h1>
        <button type="button" class="tail-border-2 tail-p-1">
          Press Me
        </button>
        <ModalFormHelper :is-not-visible="isVisible" @closeModal="isVisible = false" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalTestPage',
  layout: 'authLayout',
  data () {
    return {
      isVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
