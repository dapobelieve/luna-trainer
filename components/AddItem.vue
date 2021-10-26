<template>
  <div class="flex justify-center align-center">
    <div class="size border rounded bg-white p-4">
      <form>
        <h1><strong>Add Item</strong></h1>
        <div class="py-3">
          <label for="item" class="">Item</label>
          <input type="text" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="py-3">
            <label for="item" class="">Quantity</label>
            <input type="text" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md">
          </div>
          <div class="py-3">
            <label for="item" class="">Price</label>
            <div class="flex">
              <span class="w-11 h-11 border-r-0 mt-1 text-xl bg-gray-300 text-center rounded-l flex justify-center items-center">£</span>
              <input type="text" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 border-l-0 rounded-r">
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-5">
          <button
            type="button"
            style="width: fit-content"
            class="base-button bg-white text-black border border-gray-300 px-3 rounded"
            @click="$emit('close', false)"
          >
            cancel
          </button>
          <button
            :disabled="disabled"
            style="width: fit-content"
            type="submit"
            class="base-button px-3 primary-color rounded text-white"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.size {
    width: 45rem;
    margin: auto;
}
</style>
