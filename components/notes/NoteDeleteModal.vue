<template>
  <modal name="delete-note" height="auto" width="400" :adaptive="true">
    <div class="px-4 py-4">
      <p class="text-2xl text-gray-700 font-normal py-4">
        Delete Note?
      </p>
      <p class="text-base font-normal text-gray-700">
        This note will permanently be deleted.
      </p>
      <div class="mt-10 flex justify-end space-x-4">
        <button
          class="button-outline"
          @click.prevent="$modal.hide('delete-note')"
        >
          No, don't
        </button>
        <button class="button-fill" @click.prevent="$emit('yes')">
          Yes, Delete
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'NoteDeleteModal'
}
