<template>
  <div class="note" role="button" @click="$emit('click')">
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
export default {
  name: 'NoteItem',
  props: {
    note: {
      type: Object,
      required: true
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
