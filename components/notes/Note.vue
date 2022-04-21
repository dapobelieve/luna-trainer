<template>
  <async-view>
    <div>
      <div class="flex justify-between items-center px-4 sticky top-0">
        <p class="text-gray-700 font-normal text-sm py-4 mr-auto title uppercase">
          {{ type }} Notes
        </p>
        <button class="text-blue-500" type="button" @click.prevent="addNote">
          <i class="fi-rr-plus h-4 w-4"></i>
        </button>
      </div>
      <div class="mt-2 px-1 oveflow-auto">
        <NoNotes v-if="!notes.length" :type="type" @add="addNote" />
        <NoteItem
          v-for="note in notes"
          v-else
          :key="note._id"
          :note="note"
          @click="viewNote(note)"
        />
        <a
          v-if="notes && notes.length >= limit * page"
          href="#"
          class="w-full py-4 text-primary text-center block hover:text-primary"
          :disabled="loading"
          @click.prevent="loadMore"
        >
          <span v-if="!loading">Loading more</span>
          <SingleLoader v-else></SingleLoader>
        </a>
      </div>
    </div>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NoNotes from './NoNotes.vue'
import NoteItem from './NoteItem.vue'
export default {
  name: 'Notes',
  components: {
    NoteItem,
    NoNotes
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      note: {
        title: new Date().toDateString(),
        description: '',
        clientId: this.$route.params.id,
        tags: [this.type]
      },
      page: 1,
      limit: 20,
      loading: false,
      clientId: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({
      clients: 'client/getAllClients',
      allNotes: 'notes-v2/notes'
    }),
    notes () {
      if (this.type) {
        return [...this.allNotes].filter(note =>
          note.tags.find(note => note === this.type)
        )
      } else { return [...this.allNotes] }
    },
    inviteStatus () {
      const client = this.clients.find(c => c._id === this.clientId)
      return client.status === 'accepted'
    }
  },
  mounted () {
    const payload = { clientId: this.clientId }
    if (this.type) { payload.tags = [this.type] }
    this.fetchNotes({
      ...payload,
      page: this.page,
      limit: this.limit
    })
    this.$nuxt.$on('close-add-note-sidebar', this.resetNote)
  },
  methods: {
    ...mapActions({
      fetchNotes: 'notes-v2/fetchNotes',
      deleteNote: 'notes-v2/deleteNote'
    }),
    addNote () {
      if (!this.inviteStatus) {
        this.$lunaToast.error('Client invite still pending')
      } else {
        this.viewNote(this.note)
      }
    },
    viewNote (note) {
      this.note = { ...note }
      this.$nuxt.$emit('open-add-note-sidebar', this.note)
    },
    resetNote () {
      this.note = {
        title: new Date().toDateString(),
        description: '',
        clientId: this.clientId,
        tags: this.type ? [this.type] : []
      }
    },
    loadMore () {
      this.page++
      this.loading = true
      const payload = { clientId: this.clientId }
      if (this.type) { payload.tags = [this.type] }
      this.fetchNotes({
        ...payload,
        page: this.page,
        limit: 20
      })
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
