<template>
  <div class="no-notes">
    <div class="max-width">
      <i class="fi-rr-bell-notebook text-sky-500 text-4xl"></i>
      <p class="title">
        No health notes yet
      </p>
      <p class="sub-title">
        Your clients dog health notes would be displayed here
      </p>
      <button type="button" class="action-btn" @click="addNote">
        <i class="fi-rr-plus h-5"></i>
        <span>Create a health note</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'NoNotes',
  methods: {
    ...mapMutations({
      toggleModal: 'notes/toggleModal'
    }),
    addNote () {
      this.toggleModal({ status: true, addingMode: true, note: {} })
    }
  }
}
</script>

<style lang="scss" scoped>
.no-notes {
    @apply w-full font-normal text-center mt-36;
    .max-width {
        @apply mx-auto;
        max-width: 384px;
        .title {
            @apply text-lg text-center text-gray-700 mb-1;
        }
        .sub-title {
            @apply text-sm text-center text-gray-500 pb-4;
        }
        .action-btn {
            @apply bg-blue-500 text-white space-x-3 py-2 px-4;
        }
    }
}
</style>
