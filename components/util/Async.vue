<template>
  <div class="w-full" style="height: 100%">
    <div
      v-if="state.pending"
      class="mt-40 px-5 grid gap-5 justify-center text-center"
    >
      <SingleLoader width="50px" height="50px" />
    </div>

    <div
      v-if="state.error"
      class="mt-40 px-5 grid gap-5 justify-center text-center"
    >
        <p>
          <i class="fi-rr-cross text-5xl text-amber-500"></i>
        </p>
        <p>Something went wrong</p>
    </div>

    <slot v-if="!state.pending && !state.error"></slot>
  </div>
</template>
<script>
export default {
  name: "Async",
  props:{
    state:{
      type:Object,
      required:true
    },
  },
}
</script>
<style lang="scss" scoped></style> 