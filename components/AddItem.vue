<template>
  <div class="tail-flex tail-justify-center tail-align-center">
    <div class="size tail-border tail-rounded tail-bg-white tail-p-4">
      <form>
        <h1><bold>Add Item</bold></h1>
        <div class="tail-py-3">
          <label for="item" class="">Item</label>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="tail-grid tail-grid-cols-2 tail-gap-4">
          <div class="tail-py-3">
            <label for="item" class="">Quantity</label>
            <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="tail-py-3">
            <label for="item" class="">Price</label>
            <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
        </div>
      </form>
    </div>
    <!-- <form>
      <div class="tail-flex tail-justify-end tail-gap-5">
        <button
          type="button"
          style="width: fit-content"
          class="base-button tail-bg-white tail-text-black tail-border tail-border-gray-300 tail-px-3"
          @click="$emit('close', false)"
        >
          cancel
        </button>
        <button
          :disabled="disabled"
          style="width: fit-content"
          type="submit"
          class="base-button tail-px-3"
        >
          save &amp; send invite
        </button>
      </div>
    </form> -->
  </div>
</template>

<style scoped>
.size {
    width: 45rem;
    margin: auto;
}
</style>
