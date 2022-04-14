<template>
  <div id="no-border" class="notes">
    <modal
      name="notyy"
      height="100%"
      :adaptive="true"
      :shift-x="1"
      width="25%"
      :click-to-close="false"
    >
      <div class="header">
        <div class="caption">
          <p class="title">
            New Note
          <!-- {{ mode === 'create' ? 'New note' : 'Editing note' }} -->
          </p>
          <small class="text-xs">
            Save...
          </small>
        </div>
        <div class="action-btns">
          <i
            role="button"
            :class="[expanded ? 'fi-rr-compress' : 'fi-rr-expand']"
            @click.prevent="toggleWidth"
          ></i>
          <i
            role="button"
            class="fi-rr-cross"
            @click.prevent="closeModal"
          ></i>
        </div>
      </div>

      <div class="body" :class="{'max-w-md mx-auto' : expanded}">
        <Note />
      </div>
    </modal>
  </div>
</template>

<script>
import Note from '~/components/notes/note_2.vue'
export default {
  name: 'NotesPanel',
  components: {
    Note
  },
  data () {
    return {
      expanded: false
    }
  },
  created () {
    this.$nuxt.$on('openNotesPanel', ($event) => {
      console.log('happening')
    //   if ($event) {
    //     this.addingMode = $event.addingMode
    //     this.noteInView = $event.note
    //   }
    //   this.$modal.show('add-note')
    // })
    // this.$nuxt.$on('closeNoteModalSm', ($event) => {
    //   if ($event) {
    //     this.addingMode = $event.addingMode
    //     this.noteInView = $event.noteInView
    //   }
    //   this.$modal.hide('add-note')
    // })
    // this.$nuxt.$on('openNoteModalLg', ($event) => {
    //   this.$modal.show('expand-add-note')
    // })
    // this.$nuxt.$on('closeNoteModalLg', ($event) => {
    //   this.$modal.hide('expand-add-note')
    })
  },
  methods: {
    toggleWidth () {
      //
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.notes {
    .header {
        @apply flex items-center border-b px-4 py-3;
        .caption {
            @apply mr-auto space-x-2 flex items-center;
            .title {
                @apply font-bold text-gray-700 text-xl;
            }
        }
        .action-btns {
            @apply flex space-x-7 pr-4;
            i {
                @apply text-blue-500 h-4 w-4;
            }
        }
    }

    .body {
        @apply min-h-screen px-4 pt-3 flex flex-col relative;
    }
}
</style>
