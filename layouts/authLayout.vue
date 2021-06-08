<template>
  <main :style="$store.state.bodyClass">
    <div class="tail-flex tail-flex-col tail-items-center md:tail-px-4 lg:tail-px-0">
      <header
        class="tail-py-4 tail-sticky tail-top-0 tail-z-10 md:tail-static tail-w-full body-background"
      >
        <img
          class="tail-mx-auto"
          src="~/assets/img/getWelpLogo.png"
          alt="getWelp logo"
        />
      </header>
      <article class="md:tail-shadow-md tail-z-0 tail-rounded-md tail-overflow-hidden md:tail-max-w-xl md:tail-mb-5 lg:tail-max-w-full md:tail-border tail-border-gray-300">
        <div
          class="tail-h-full md:tail-h-auto tail-px-6 lg:tail-px-6 tail-py-8 md:tail-bg-white"
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

@media only screen and (max-width: 768px) {
  article {
    width: 100%;
  }
}

@media only screen and (min-width: 769px) {
  .views {
    margin-left: 99px;
    width: 100%;
  }

  article {
    min-width: 30rem;
  }
}
</style>
