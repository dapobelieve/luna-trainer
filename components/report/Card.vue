<template>
  <div class="bg-white rounded-xl p-3 border w-full">
    <slot></slot>
  </div>
</template>
<script>
import ReportCard from "~/components/report/Card"
export default {
  components: {
    ReportCard
  }
}
</script>

<style scoped>

</style>