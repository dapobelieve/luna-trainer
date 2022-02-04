<template>
  <div
    class="w-full min-h-screen flex justify-center space-x-8"
    style="padding-top: 60px"
  >
    <div
      v-for="(items, index) in links"
      :key="index"
      class="overflow-hidden border border-gray-200 flex flex-col rounded-md cursor-pointer"
      style="width: 234px; height: 234px"
      @click="$router.push({ name: `myFiles-${items.url}` })"
    >
      <div class="flex-1">
        <div class="grid place-content-center h-full">
          <img :src="require(`~/assets/img/${items.img}.png`)" />
        </div>
      </div>
      <div class="flex-none">
        <div
          class="justify-between flex items-center bg-white"
          style="padding: 16px"
        >
          <p>
            {{ items.title }}
          </p>
          <i class="fi-rr-angle-small-right text-blue-500"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileHome',
  data () {
    return {
      links: [
        {
          title: 'Local storage',
          img: 'get-welp-logo',
          url: 'localStorage'
        },
        {
          title: 'Google drive',
          img: 'google-drive-logo',
          url: 'googleDrive'
        },
        {
          title: 'Dropbox',
          img: 'drop-box',
          url: 'dropbox'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 80px !important;
}
</style>
