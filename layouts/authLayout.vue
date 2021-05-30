<template>
  <main :style="$store.state.bodyClass">
    <div class="d-flex flex-column align-items-center md:tail-pb-4">
      <header
        class="py-4 tail-sticky tail-top-0 tail-z-10 md:tail-static tail-w-full body-background"
      >
        <img
          class="mx-auto"
          src="~/assets/img/getWelpLogo.png"
          alt="getWelp logo"
        >
      </header>
      <article class="card md:tail-shadow-md tail-z-0">
        <div
          class="card-container tail-h-full md:tail-h-auto tail-px-3 md:tail-px-6 tail-py-8"
        >
          <Nuxt />
        </div>
      </article>
    </div>
  </main>
</template>
<script>
export default {
  middleware: 'switchBackgroundImages'
}
</script>
<style lang="scss">
main {
  height: 100vh;
}
</style>
