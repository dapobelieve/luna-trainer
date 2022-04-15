<template>
  <transition
    enter-active-class="transition-all ease-in-out duration-[500ms]"
    leave-active-class="transition-all ease-in-out duration-[500ms]"
    enter-class="transform translate-x-full"
    leave-class="-translate-x-0"
    enter-to-class="-translate-x-0"
    leave-to-class="translate-x-full"
  >
    <template>
      <div
        v-if="open"
        class="
          add-note
          h-full
          md:w-96
          w-full
          shadow
          fixed
          right-0
          top-0
          z-[60]
          overflow-y-auto
          bg-white
        "
        :class="[expanded ? 'expanded' : 'colapsed']"
      >
        <div class="flex items-center min-h-[5.2vh] border-b px-4 py-[10px]">
          <div class="mr-auto space-x-2 flex items-center">
            <p class="font-bold text-gray-700 text-xl">
              <span>{{ this.note._id ? "Editing" : "Create" }} note</span>
            </p>
            <small class="text-xs ml-10 block"> Auto save on </small>
           
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
              @click.prevent="$emit('close')"
            ></i>
          </div>
        </div>
        <div
          class="min-h-[92.8vh] pl-4 pt-5 flex flex-col relative"
          :class="{ 'max-w-2xl mx-auto': expanded }"
        >
          <div class="pb-4">
            <input
              v-model.trim="note.title"
              tabindex="1"
              ref="title-area"
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
              tabindex="2"
              ref="text-area"
              v-model.trim="note.description"
              class="w-full h-full focus:outline-none pr-4 placeholder-gray-400"
              placeholder="Enter note"
            >
            </textarea>
          </div>
          <div class="absolute right-0 left-0 bottom-0 bg-white">
            <button
              v-if="!this.note._id"
              class="w-full py-4 text-blue-500 text-base font-medium"
              @click.prevent="cancel"
            >
              Cancel
            </button>
            <button
              v-if="this.note._id"
              class="w-full py-4 text-red-500 text-base font-medium"
              @click.prevent="$modal.show('delete-note')"
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </template>
  </transition>
</template>

<script>
import debounce from "lodash.debounce";
import { mapActions } from "vuex";
export default {
  name: "AddNote",
  props: {
    note: {
      type: Object,
      required: true,
    },
    expanded: {
      type: Boolean,
      required: false,
    },
    open: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      autoSaving: false,
    };
  },
  watch: {
    note: {
      handler() {
        this.autoSave();
      },
      immediate:true,
      deep: true,
    }
  },
  methods: {
    ...mapActions({
      createNote: "notes-v2/createNote",
      updateNote: "notes-v2/updateNote",
    }),
    cancel() {
      this.$emit("close");
    },
    enterPressed(){
      this.$refs['text-area'].focus()
    },
    autoSave: debounce(function () {
      this.autoSaving = true;
      if (this.note.description) {
        if (this.note._id) {
          this.editNote();
        } else {
          this.saveNote();
        }
      }
      this.autoSaving = false;
    }, 1000),
    saveNote() {
      this.createNote(this.note)
        .then((result) => {
          this.note._id = result._id
        })
        .catch((err) => {
          this.$lunaToast.error(err.message);
          console.error(err);
        });
    },
    editNote() {
      this.updateNote(this.note)
        .then((result) => {
          console.log([result._id])
          this.note._id = result._id
        })
        .catch((err) => {
          this.$lunaToast.error(err.message);
          console.error(err);
        });
    },
    toggleWidth() {
      this.expanded = !this.expanded;
    },
  },
};
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
