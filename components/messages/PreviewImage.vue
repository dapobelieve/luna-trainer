<template>
  <div
    v-show="isUploading"
    class="flex flex-col justify-between h-full bg-black absolute right-0 left-0 z-10"
  >
    <div class="flex justify-between bg-white pt-5 px-4 pb-2">
      <p class="text-gray-700 text-xl font-normal">
        Preview
      </p>
      <button type="button" @click="removeImage">
        <i class="fi-rr-cross text-xl text-blue-500"></i>
      </button>
    </div>
    <div class="flex justify-center">
      <img
        style="max-width: 568px; max-height: 568px"
        class="w-full"
        :src="fileImage"
      />
    </div>
    <div class="bg-white flex justify-between items-center p-4">
      <div
        class="overflow-hidden relative rounded-lg"
        style="border: 3px solid #3B82F6;"
      >
        <img
          style="max-width: 80px; max-height: 80px"
          class="inline-block object-contain"
          :src="fileImage"
        />
        <button
          type="button"
          class="absolute right-1 top-1"
          @click="removeImage"
        >
          <i class="fi-rr-cross text-md text-white"></i>
        </button>
      </div>
      <button
        class="button-fill button-sm w-11"
        style="height: 40px"
        @click="sendFile"
      >
        <i class="fi-rr-paper-plane text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewImage'
}
</script>

<style lang="scss" scoped>

</style>
