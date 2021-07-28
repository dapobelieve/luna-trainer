<template>
      <form @submit.prevent="setEditedItem">
        <div class="tail-pb-3">
          <label for="item">Description</label>
          <input type="text" v-model="item.description" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" disabled="disabled">
        </div>
        <div class="tail-grid tail-grid-cols-2 tail-gap-4 tail-py-3">
          <div>
            <label for="item">Quantity</label>
            <input type="number" min="1" v-model="item.qty" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div>
            <label for="item">Price</label>
            <div class="tail-flex">
              <span class="tail-w-11 tail-h-11 tail-border-r-0 tail-mt-1 tail-text-xl tail-bg-gray-300 tail-text-center tail-rounded-l tail-flex tail-justify-center tail-items-center">£</span>
              <input type="number" min="1" v-model="item.price" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-border-l-0 tail-rounded-r">
            </div>
          </div>
        </div>
        <div class="tail-flex tail-justify-end tail-gap-5">
          <button
            type="button"
            style="width: fit-content"
            class="base-button tail-bg-white tail-text-black tail-border tail-border-gray-300 tail-px-3 tail-rounded"
            @click.prevent="$emit('close', false)"
          >
            cancel
          </button>
          <button
            style="width: fit-content"
            type="submit"
            class="base-button tail-px-3 primary-color tail-rounded tail-text-white"
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
  methods: {
    setEditedItem(){
      this.$emit('input', this.item);
      this.$emit('close', false)
    }
  },
  data () {
    return {
      item: { ...this.value }
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
