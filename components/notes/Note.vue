<template>
  <div class="note" role="button" @click="viewNote">
    <div class="mr-auto">
      <p class="title">
        {{ note.title }}
      </p>
      <p class="body">
        {{ note.description }}
      </p>
      <span class="date">
        {{ note.updatedAt | howLongAgo }}
      </span>
    </div>
    <i class="fi-rr-angle-small-right text-blue-500 h-2 w-2"></i>
  </div>
</template>

<script>
import AddNote from '~/components/notes/AddNote.vue'
export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewNote () {
      this.$modal.show(
        AddNote,
        { addingMode: false, noteInView: this.note },
        {
          height: '100%',
          adaptive: true,
          'shift-x': 1,
          width: '25%',
          'click-to-close': false
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.note {
  @apply py-4 px-3 text-gray-700 flex items-center rounded-md hover:bg-blue-50;
  .title {
    @apply text-base font-medium capitalize;
  }
  .body {
    @apply text-sm font-normal max-w-[18rem] md:max-w-xl xl:max-w-2xl truncate;
  }
  .date {
    @apply text-gray-500 font-normal;
  }
}
</style>
