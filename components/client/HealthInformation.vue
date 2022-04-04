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
    <AsyncView loader-id="health-notes">
      <NoNotes v-if="!notes.length" />
      <Note v-for="note in notes" v-else :key="note" />
    </AsyncView>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NoNotes from '~/components/notes/NoNotes.vue'
import Note from '~/components/notes/Note.vue'

export default {
  name: 'HealthInformation',
  components: {
    NoNotes,
    Note
  },
  computed: {
    ...mapState('notes', ['notes'])
  },
  async mounted () {
    try {
      await this.fetchNotes({ clientId: this.$route.params.id, tag: 'health' })
    } catch (error) {
      this.$lunaToast.error('An error occured while fetching notes')
    }
  },
  methods: {
    ...mapActions({
      fetchNotes: 'notes/fetchNotes'
    })
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
