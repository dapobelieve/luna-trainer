<template>
  <div class="bg-white border rounded-xl w-full py-3.5 min-h-screen relative">
    <Note></Note>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Note from "../../../components/notes/Note.vue"

export default{
  components: { Note },
  name: "Notes"
};
</script>

<style lang="scss" scoped></style>
