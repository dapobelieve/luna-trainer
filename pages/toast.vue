<template>
  <div class="p-80">
    <Toast />
  </div>
</template>

<script>
import Toast from "@/components/toasts/toast"
export default {
  components: {
    Toast
  },
  mounted() {
    this.$gwToast.show()
  }
}
</script>

<style scoped>

</style>