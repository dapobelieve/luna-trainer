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
      <NotesAddNote :adding-mode="addingMode" :note-in-view="noteInView" :expanded="expanded" @toggle="toggle" @close="closeModal" />
    </modal>

    <!-- expanded view -->
    <modal
      name="expand-add-note"
      height="100%"
      width="100%"
      :adaptive="true"
      :click-to-close="false"
    >
      <NotesAddNote :adding-mode="addingMode" :note-in-view="noteInView" :expanded="expanded" @toggle="toggle" @close="closeModal" />
    </modal>
  </div>
</template>

<script>
export default {
  name: 'AddingNotes',
  data () {
    return {
      addingMode: true,
      noteInView: {},
      expanded: false
    }
  },
  created () {
    this.$nuxt.$on('openNoteModalSm', ($event) => {
      if ($event) {
        this.addingMode = $event.addingMode
        this.noteInView = $event.note
      }
      this.$modal.show('add-note')
    })
    this.$nuxt.$on('closeNoteModalSm', ($event) => {
      if ($event) {
        this.addingMode = $event.addingMode
        this.noteInView = $event.noteInView
      }
      this.$modal.hide('add-note')
    })
    this.$nuxt.$on('openNoteModalLg', ($event) => {
      this.$modal.show('expand-add-note')
    })
    this.$nuxt.$on('closeNoteModalLg', ($event) => {
      this.$modal.hide('expand-add-note')
    })
  },
  methods: {
    closeModal () {
      this.$modal.hide('add-note')
      this.$modal.hide('expand-add-note')
      this.expanded = false
    },
    toggle () {
      this.expanded = !this.expanded
      if (!this.expanded) {
        this.$modal.hide('expand-add-note')
        this.$modal.show('add-note')
      } else {
        this.$modal.hide('add-note')
        this.$modal.show('expand-add-note')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
