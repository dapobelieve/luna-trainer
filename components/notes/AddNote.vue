<template>
  <div>
    <div class="flex items-center border-b px-4 py-3">
      <div class="mr-auto space-x-2 flex items-center">
        <p class="font-bold text-gray-700 text-xl">
          {{ mode === 'create' ? 'New note' : 'Editing note' }}
        </p>
        <small v-if="autoSaving" class="text-xs">
          Saving...
        </small>
      </div>
      <div class="flex space-x-7 pr-4">
        <i
          role="button"
          class="text-blue-500 h-4 w-4"
          :class="[expanded ? 'fi-rr-compress' : 'fi-rr-expand']"
          @click.prevent="toggleWidth"
        ></i>
        <i
          role="button"
          class="fi-rr-cross text-blue-500 h-4 w-4"
          @click.prevent="closeModal"
        ></i>
      </div>
    </div>
    <div
      class="min-h-screen px-4 pt-3 flex flex-col relative"
      :class="{'max-w-md mx-auto' : expanded}"
    >
      <div class="pb-8 pr-4">
        <input
          v-model="title"
          class="focus:outline-none w-full font-normal text-gray-500 placeholder:font-normal text-xl"
          placeholder="Enter title (Optional)"
          @keyup.enter="nextInput"
        />
      </div>
      <div class="pr-4" style="height: calc(100vh - 160px)">
        <textarea
          ref="text-area"
          v-model="body"
          class="w-full h-full focus:outline-none pr-4 placeholder-gray-400"
          placeholder="Enter note"
        >
        </textarea>
      </div>
      <div class="-mx-4 absolute right-0 left-0 bottom-12">
        <button
          v-if="mode !== 'editing'"
          class="w-full -mx-4 py-4 text-blue-500 text-base font-medium"
          @click.prevent="cancel"
        >
          Cancel
        </button>
        <button
          v-if="mode === 'editing'"
          class="w-full -mx-4 py-4 text-red-500 text-base font-medium"
          @click.prevent="$modal.show('delete-note')"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- delete modal -->
    <div id="use-border">
      <modal name="delete-note" height="auto" :adaptive="true">
        <div class="px-4 py-4">
          <p class="text-2xl text-gray-700 font-normal py-4">
            Delete Note?
          </p>
          <p class="text-base font-normal text-gray-700">
            This note will permanently be deleted.
          </p>
          <div class="mt-10 flex justify-end space-x-4">
            <button class="button-outline" @click.prevent="$modal.hide('delete-note')">
              No, don't
            </button>
            <button class="button-fill" @click.prevent="deleteSingleNote">
              Yes, Delete
            </button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapActions } from 'vuex'
export default {
  name: 'AddNote',
  props: {
    addingMode: {
      type: Boolean,
      default: true
    },
    noteInView: {
      type: Object,
      default: () => {}
    },
    expanded: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      noteId: this.addingMode ? null : this.noteInView._id,
      expand: false,
      title: this.addingMode ? '' : this.noteInView.title,
      body: this.addingMode ? '' : this.noteInView.description,
      autoSaving: false,
      mode: this.addingMode ? 'create' : 'editing',
      open: true
    }
  },
  watch: {
    // body (newValue) {
    //   if (this.noteId === null && newValue) {
    //     this.createNotes()
    //   } else {
    //     this.updateNote()
    //   }
    // }
  },
  mounted () {
    this.$watch(
      vm => [vm.title, vm.body],
      (val) => {
        if (val[1].length) {
          if (val[1].length && this.noteId === null) {
            this.createNotes()
          } else {
            this.updateNote()
          }
        }
      }
      // {
      //   immediate: true
      // }
    )
  },
  methods: {
    ...mapActions({
      createNote: 'notes/addNotes',
      updatingNote: 'notes/updateNote',
      deleteNote: 'notes/deleteNote'
    }),
    toggleWidth () {
      // this.$emit('toggle')
    },
    closeModal () {
      this.$nuxt.$emit('closeNoteModalSm', { addingMode: true, note: {} })
      this.$nuxt.$emit('closeNoteModalLg', { addingMode: true, note: {} })
    },
    cancel () {
      this.closeModal()
    },
    autoSave () {
      this.autoSaving = true
      setTimeout(() => {
        this.autoSaving = false
      }, 3500)
    },
    createNotes: debounce(function () {
      this.createNote({ title: this.title.length ? this.title : 'Untitled', description: this.body, clientId: this.id, tags: this.$route.name === 'client-id-information' ? 'health' : '' }).then((result) => {
        this.noteId = result
        this.mode = 'editing'
        this.autoSave()
      })
    }, 1000),
    updateNote: debounce(function () {
      this.updatingNote({ title: this.title.length ? this.title : 'Untitled', description: this.body, noteId: this.noteId })
      this.$emit('updating-note', { id: this.id, title: this.title.length ? this.title : 'Untitled', description: this.body })
      this.autoSave()
    }, 1000),
    async deleteSingleNote () {
      try {
        await this.deleteNote(this.noteId)
        this.closeModal()
      } catch (error) {
        this.$lunaToast.error('Something went wrong')
      }
    },
    nextInput () {
      this.$refs['text-area'].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>
