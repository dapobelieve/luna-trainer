<template>
  <async-view>
    <div class="bg-white border rounded-xl w-full py-3.5 min-h-screen">
      <div class="flex justify-between items-center px-4">
        <p class="text-gray-700 font-normal text-xl">
          Notes
        </p>
        <button
          class="text-blue-500"
          type="button"
          @click.prevent="addNote"
        >
          <i class="fi-rr-plus h-4 w-4"></i>
        </button>
      </div>
      <div class="mt-8 px-1">
        <div
          v-if="!notes.length"
          class="mb-4 px-5 grid gap-5 justify-center text-center"
        >
          <h5 class="font-bold text-gray-700 text-lg">
            You have no notes
          </h5>
          <p class="text-sm max-w-xs font-normal text-gray-500">
            Short message about adding services
          </p>
          <div class="w-max mx-auto">
            <button
              v-if="inviteStatus"
              class="base-button flex items-center"
              type="button"
              @click.prevent="addNote"
            >
              <i class="fi-rr-plus h-4 w-4 mr-2"></i>
              Create Note
            </button>
            <p v-else>
              This client has not accepted your invite.
            </p>
          </div>
        </div>
        <Note v-for="note in notes" v-else :key="note._id" :note="note" />
      </div>
    </div>
  </async-view>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Note from '~/components/notes/Note.vue'
export default {
  name: 'Notes',
  components: {
    Note
  },
  data () {
    return {
      clientId: null,
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapState({
      notes: state => state.notes.notes.filter(note => note.tags[0] !== 'health')
    }),
    ...mapGetters({
      allClients: 'client/getAllClients'
    }),
    inviteStatus () {
      const client = this.allClients.find(c => c._id === this.id)
      return client.status === 'accepted'
    }
  },
  mounted () {
    this.fetchnotes({ clientId: this.id })
  },
  methods: {
    ...mapActions({
      fetchnotes: 'notes/fetchNotes'
    }),
    addNote () {
      if (!this.inviteStatus) {
        this.$lunaToast.error('Client invite still pending')
        return
      }
      this.$nuxt.$emit('openNoteModalSm', { addingMode: true, note: {} })
    },
    viewNote (note) {
      this.$nuxt.$emit('openNoteModalSm', { addingMode: false, note })
    }
  }
}
</script>

<style lang="scss" scoped></style>
