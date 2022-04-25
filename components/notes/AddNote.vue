<template>
  <div>
    <transition
      enter-active-class="transition-all ease-in-out duration-[100ms]"
      leave-active-class="transition-all ease-in-out duration-[100ms]"
      enter-class="transform opacity-100"
      leave-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed left-0 top-0 w-full h-full bg-white z-[38] opacity-50"
        @click="cancel"
      ></div>
    </transition>
    <transition
      enter-active-class="transition-all ease-in-out duration-[300ms]"
      leave-active-class="transition-all ease-in-out duration-[300ms]"
      enter-class="transform translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="open"
        class="
          add-note
          h-full
          md:w-96
          w-full
          shadow-indigo-500/40
          shadow-lg
          fixed
          right-0
          top-0
          z-[40]
          overflow-y-auto
          bg-white
        "
        :class="[expanded ? 'expanded' : 'colapsed']"
      >
        <div class="flex items-center min-h-[5.2vh] border-b px-4 py-[10px]">
          <div class="mr-auto space-x-2 flex items-center">
            <p class="font-bold text-gray-700 text-xl">
              <span>{{ note._id ? "Editing" : "Create" }} note</span>
            </p>
            <small class="text-xs ml-10 pt-1 block">Auto save changes</small>
          </div>
          <div class="flex space-x-7">
            <i
              role="button"
              class="text-blue-500 h-4 w-4"
              :class="[expanded ? 'fi-rr-compress' : 'fi-rr-expand']"
              @click.prevent="toggleWidth"
            ></i>
            <i
              role="button"
              class="fi-rr-cross text-blue-500 h-4 w-4"
              @click.prevent="cancel"
            ></i>
          </div>
        </div>
        <div
          class="min-h-[92.8vh] pl-4 pt-5 flex flex-col relative"
          :class="{ 'max-w-2xl mx-auto': expanded }"
        >
          <div class="pb-4">
            <input
              ref="title-area"
              v-model.trim="note.title"
              tabindex="1"
              class="
                focus:outline-none
                w-full
                font-normal
                text-gray-500
                placeholder:font-normal
                text-xl
              "
              placeholder="Enter title (Optional)"
              @keyup.enter="enterPressed"
            />
          </div>
          <div class="pb-8" style="height: calc(100vh - 160px)">
            <textarea
              ref="text-area"
              v-model.trim="note.description"
              tabindex="2"
              class="w-full h-full focus:outline-none pr-4 placeholder-gray-400"
              placeholder="Enter note"
            >
            </textarea>
          </div>
          <div class="absolute right-0 left-0 bottom-0 bg-white">
            <button
              v-if="!note._id"
              class="w-full py-4 text-blue-500 text-base font-medium"
              @click.prevent="cancel"
            >
              Cancel
            </button>
            <button
              v-if="note._id"
              class="w-full py-4 text-red-500 text-base font-medium"
              @click.prevent="$modal.show('delete-note')"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
    <NoteDeleteModal @yes="deleteSingleNote"></NoteDeleteModal>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapActions } from 'vuex'
import NoteDeleteModal from './NoteDeleteModal.vue'
export default {
  name: 'AddNote',
  components: { NoteDeleteModal },
  data () {
    return {
      note: {},
      open: false,
      expanded: false,
      autoSaving: false
    }
  },
  watch: {
    note: {
      handler () {
        this.autoSave()
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    this.$nuxt.$on('open-add-note-sidebar', (note) => {
      this.open = true
      this.note = note
    })
  },
  methods: {
    ...mapActions({
      createNote: 'notes-v2/createNote',
      updateNote: 'notes-v2/updateNote',
      deleteNote: 'notes-v2/deleteNote'
    }),
    cancel () {
      this.open = false
      this.$nuxt.$emit('close-add-note-sidebar')
    },
    enterPressed () {
      this.$refs['text-area'].focus()
    },
    autoSave: debounce(function () {
      this.autoSaving = true
      if (this.note.description) {
        if (this.note._id) {
          this.editNote()
        } else {
          this.saveNote()
        }
      }
      this.autoSaving = false
    }, 1000),
    async deleteSingleNote () {
      try {
        await this.deleteNote(this.note._id)
        this.$modal.hide('delete-note')
        this.cancel()
        this.$lunaToast.success('Note deleted succesfully')
      } catch (error) {
        this.$lunaToast.error('Something went wrong')
      }
    },
    saveNote () {
      this.createNote(this.note)
        .then((result) => {
          this.note._id = result._id
        })
        .catch((err) => {
          this.$lunaToast.error(err.message)
          console.error(err)
        })
    },
    editNote () {
      this.updateNote(this.note)
        .then((result) => {
          this.note._id = result._id
        })
        .catch((err) => {
          this.$lunaToast.error(err.message)
          console.error(err)
        })
    },
    toggleWidth () {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
}

.add-note {
  &.colapsed {
    max-width: 100%;
    width: 27rem;
  }
  &.expanded {
    width: 100%;
  }
}
</style>
