<template>
  <div>
    <div class="flex items-center border-b px-4 py-3">
      <p class="mr-auto font-bold text-gray-700 text-xl">
        New note
      </p>
      <div class="flex space-x-7 pr-4">
        <i role="button" class="fi-rr-expand text-blue-500 h-4 w-4" @click.prevent="toggleWidth"></i>
        <i role="button" class="fi-rr-cross text-blue-500 h-4 w-4" @click.prevent="$emit('closeModal')"></i>
      </div>
    </div>
    <div class="min-h-screen px-4 pt-3">
      hi
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNote',
  data () {
    return {
      expand: false
    }
  },
  methods: {
    toggleWidth () {
      this.expand = !this.expand
      this.$emit('expand', this.expand)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
