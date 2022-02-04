<template>
  <div>
    <!-- view -->
    <div class="w-full p-4 pb-24 bg-gray-50 flex justify-center minimum-height ">
      <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
        <NuxtChild />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleDrive'
}
</script>

<style lang="scss" scoped>
.minimum-height{
  min-height: calc(100vh - 56px);
}
</style>
