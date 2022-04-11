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
  props: {
    addingMode: {
      type: Boolean,
      default: true
    },
    noteInView: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('add-note')
      this.$modal.hide('expand-add-note')
    },
    toggle () {
      console.log('toggle')
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
