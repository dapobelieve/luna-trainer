<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <span
          v-if="$route.name === 'myFiles'"
          class="hidden lg:block capitalize ml-5 font-normal text-2xl"
        >My files</span>
        <FilesBreadCrumb v-else />
      </template>
    </PageHeader>
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
  name: 'MyFiles'
}
</script>

<style lang="scss" scoped>
.minimum-height{
  min-height: calc(100vh - 56px);
}
</style>
