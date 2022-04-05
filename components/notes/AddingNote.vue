<template>
  <div id="no-border">
    <modal
      name="add-note"
      height="100%"
      :adaptive="true"
      :shift-x="1"
      width="25%"
      :click-to-close="false"
    >
      <NotesAddNote :adding-mode="$store.state.notes.addingMode" :note-in-view="$store.state.notes.noteInView" />
    </modal>

    <!-- expanded view -->
    <modal
      name="expand-add-note"
      height="100%"
      width="100%"
      :adaptive="true"
      :click-to-close="false"
    >
      <NotesAddNote :adding-mode="$store.state.notes.addingMode" :note-in-view="$store.state.notes.noteInView" />
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddingNotes',
  computed: {
    ...mapState({
      addNoteModal: state => state.notes.addNoteModal,
      expandModal: state => state.notes.expandModal
    })
  },
  watch: {
    addNoteModal (newValue) {
      if (newValue) {
        this.$modal.show('add-note')
      } else if (!newValue) {
        this.$modal.hide('add-note')
      }
    },
    expandModal (newValue) {
      if (newValue) {
        this.$modal.show('expand-add-note')
      } else if (!newValue) {
        this.$modal.hide('expand-add-note')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
