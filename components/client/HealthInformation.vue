<template>
  <div>
    <Note type="health"></Note>
  </div>
</template>

<script>
import Note from '../notes/Note.vue'
export default {
  name: 'HealthInformation',
  components: { Note }
}
</script>

<style lang="scss" scoped>
.health {
  .header {
    @apply flex pb-5 px-4;
    .title {
      @apply text-xs font-medium text-gray-700;
    }
  }
  .action-btn {
    @apply flex items-center space-x-2 text-blue-500;
    span {
      @apply text-sm font-medium;
    }
  }
}
</style>
