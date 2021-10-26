<template>
  <div class="tail-grid tail-grid-cols-3 tail-gap-4">
    <div
      v-for="n in 5"
      :key="n"
      class="tail-rounded-md tail-bg-white tail-p-8 tail-grid tail-justify-items-center tail-mr-4 md:tail-mb-4 tail-mb-0"
    >
      <img
        class="tail-rounded-full tail-h-14"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      />
      <b class="tail-capitalize tail-text-sm tail-mt-3">elena b</b>
      <div class="tail-flex tail-items-center">
        <i
          class="ns-comment tail-bg-green-400 tail-p-1 tail-rounded-full tail-text-xs"
        ></i>
        <small
          class="tail-text-gray-500 tail-ml-1 tail-capitalize tail-text-sm"
        >roxy</small>
      </div>
    </div>
    <div
      class="tail-rounded-md tail-bg-white tail-p-8 tail-grid tail-justify-items-center tail-mr-4 tail-mb-4"
    >
      <div class="tail-flex tail-justify-center tail-items-center tail-rounded-full tail-w-10 tail-h-10" style="background: rgba(240, 245, 250, 1);">
        <i
          class="ns-angle-right tail-p-1"
        ></i>
      </div>

      <a
        class="tail-capitalize tail-text-sm tail-mt-3 tail-text-blue-400 tail-no-underline tail-font-bold"
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
