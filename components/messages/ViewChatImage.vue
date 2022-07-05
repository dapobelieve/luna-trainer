<template>
  <div>
    <div class="bg-black flex items-center justify-between px-4 py-2 text-white">
      <div class="flex items-center">
        <ClientAvatar
          :client-info="{
            firstName: Boolean(imageDetails.nickname) ? imageDetails.nickname : '',
            imgUrl: imageDetails.profileImg
          }"
        />
        <div class="ml-4">
          <small>
            {{ new Date(imageDetails.dateTime).toDateString() }}
          </small>
        </div>
      </div>
      <div class="space-x-4 text-xl cursor-pointer">
        <button class="md:inline-block text-white" type="button" @click="downloadImage(imageDetails.url)">
          <i class="fi-rr-download text-md"></i>
        </button>
        <i class="fi-rr-cross" @click="$emit('close')"></i>
      </div>
    </div>
    <div class="flex justify-center bg-black" style="height: calc(100vh - 64px)">
      <img
        class="w-full h-full object-contain"
        :src="imageDetails.url"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ViewChatmage',
  props: {
    imageDetails: {
      type: Object,
      required: true
    }
  },
  methods: {
    downloadImage ({ url, label }) {
      this.$axios.get(JSON.stringify(url), { responseType: 'blob' })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'image/*' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = 'download.jpg'
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
