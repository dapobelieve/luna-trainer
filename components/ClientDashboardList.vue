<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="n in 5"
      :key="n"
      class="rounded-md bg-white p-8 grid justify-items-center mr-4 md:mb-4 mb-0"
    >
      <img
        class="rounded-full h-14"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      />
      <b class="capitalize text-sm mt-3">elena b</b>
      <div class="flex items-center">
        <i
          class="ns-comment bg-green-400 p-1 rounded-full text-xs"
        ></i>
        <small
          class="text-gray-500 ml-1 capitalize text-sm"
        >roxy</small>
      </div>
    </div>
    <div
      class="rounded-md bg-white p-8 grid justify-items-center mr-4 mb-4"
    >
      <div class="flex justify-center items-center rounded-full w-10 h-10" style="background: rgba(240, 245, 250, 1);">
        <i
          class="ns-angle-right p-1"
        ></i>
      </div>

      <a
        class="capitalize text-sm mt-3 text-blue-400 no-underline font-bold"
        href="#"
      >View All</a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style scoped>

</style>
