<template>
  <div class="bg-blue-50 w-full min-h-screen">
    <div
      class="flex justify-between lg:grid grid-cols-3 bg-white px-4 py-3 items-center border-b border-gray-200"
    >
      <span class="text-2xl to-gray-700 font-normal">
        {{ sharedPage.page }}
      </span>
      <span class="text-xs text-gray-500 lg:justify-self-center">
        Saving as draft...
      </span>
      <i
        role="button"
        class="ns-cross text-blue-500 text-lg lg:justify-self-end"
        @click="$router.go(-1)"
      ></i>
    </div>
    <Nuxt
      class="m-4 lg:m-0 lg:pt-12 flex justify-center"
    />
  </div>
</template>
<script>
export default {
  name: 'Invoice',
  provide () {
    return {
      sharedPage: this.sharedPage
    }
  },
  data () {
    return {
      sharedPage: {
        page: 'Create Invoice'
      }
    }
  }
}
</script>
<style lang="scss"></style>
