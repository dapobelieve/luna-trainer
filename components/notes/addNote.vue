<template>
  <div>
    <div class="flex items-center border-b px-4 py-3">
      <p class="mr-auto font-bold text-gray-700 text-xl">
        New note
      </p>
      <div class="flex space-x-7 pr-4">
        <i role="button" class="fi-rr-expand text-blue-500 h-4 w-4" @click.prevent="toggleWidth"></i>
        <i role="button" class="fi-rr-cross text-blue-500 h-4 w-4" @click.prevent="closeModal"></i>
      </div>
    </div>
    <div class="min-h-screen px-4 pt-3 flex flex-col relative">
      <div class="pb-8 pr-4">
        <input v-model="title" class="focus:outline-none w-full" placeholder="Enter title (Optional)" />
      </div>
      <div class="pr-4">
        <textarea id="" v-model="body" name="" class="w-full focus:outline-none pr-4">
          Enter note
        </textarea>
      </div>
      <div class="-mx-4 absolute right-0 left-0 bottom-12">
        <button class="w-full -mx-4 py-4 text-blue-500 text-base font-medium" @click.prevent="createNotes">
          Create Note
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNote',
  data () {
    return {
      expand: false,
      title: '',
      body: ''
    }
  },
  methods: {
    toggleWidth () {
      this.expand = !this.expand
      this.$emit('expand', this.expand)
    },
    closeModal () {
      this.$emit('closeModal')
    },
    cancel () {
      this.closeModal()
    },
    createNotes () {
      this.$store.commit('notes/addNotes', { title: this.title, body: this.body, date: new Date() })
      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
