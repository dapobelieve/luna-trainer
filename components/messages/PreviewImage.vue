<template>
  <div
    class="flex flex-col justify-between h-full bg-black absolute inset-0 z-50"
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
        class="imgSize"
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
        @click="send"
      >
        <i class="fi-rr-paper-plane h-6 text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewImage',
  props: {
    fileImage: {
      type: String,
      required: true
    }
  },
  methods: {
    removeImage () {
      this.$emit('removeImage')
    },
    send () {
      this.$emit('sendFile')
    }
  }
}
</script>

<style lang="scss" scoped>
.imgSize {
  @apply object-contain;
  max-width: 568px;
  max-height: 568px;
}
</style>
