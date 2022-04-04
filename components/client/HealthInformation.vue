<template>
  <div class="health">
    <div class="header">
      <p class="mr-auto title">
        HEALTH NOTES
      </p>
      <button class="action-btn">
        <i class="fi-rr-plus h-5"></i>
        <span>Add note</span>
      </button>
    </div>
    <Note v-for="n in 10" :key="n" />
    <NoNotes />
  </div>
</template>

<script>
import NoNotes from '~/components/notes/NoNotes.vue'
import Note from '~/components/notes/Note.vue'
export default {
  name: 'HealthInformation',
  components: {
    NoNotes,
    Note
  },
  data () {
    return {
    }
  },
  methods: {
  }
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
