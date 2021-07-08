<template>
  <div class="tail-w-full">
    <div
      v-if="$store.state.loader.isLoading"
      class="tail-mt-40 tail-px-5 tail-grid tail-gap-5 tail-justify-center tail-text-center"
    >
      <SingleLoader width="50px" height="50px" />
    </div>

    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'PageLoaderView'
}
</script>
