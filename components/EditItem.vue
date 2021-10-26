<template>
  <form @submit.prevent="setEditedItem">
    <div class="pb-3">
      <label for="item">Description</label>
      <input v-model="item.description" type="text" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md" disabled="disabled">
    </div>
    <div class="grid grid-cols-2 gap-4 py-3">
      <div>
        <label for="item">Quantity</label>
        <input v-model="item.qty" type="number" min="1" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md">
      </div>
      <div>
        <label for="item">Price</label>
        <div class="flex">
          <span class="w-11 h-11 border-r-0 mt-1 text-xl bg-gray-300 text-center rounded-l flex justify-center items-center">£</span>
          <input v-model="item.price" type="number" min="1" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 border-l-0 rounded-r">
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-5">
      <button
        type="button"
        style="width: fit-content"
        class="base-button bg-white text-black border border-gray-300 px-3 rounded"
        @click.prevent="$emit('close', false)"
      >
        cancel
      </button>
      <button
        style="width: fit-content"
        type="submit"
        class="base-button px-3 primary-color rounded text-white"
      >
        save
      </button>
    </div>
  </form>
  </div>
  </div>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data () {
    return {
      item: { ...this.value }
    }
  },
  methods: {
    setEditedItem () {
      this.$emit('input', this.item)
      this.$emit('close', false)
    }
  }
}
</script>
<style scoped>
.size {
    width: 45rem;
    margin: auto;
}
</style>
