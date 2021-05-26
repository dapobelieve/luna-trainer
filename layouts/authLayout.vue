<template>
  <main :style="$store.state.bodyClass">
    <div class="d-flex flex-column align-items-center pb-4">
      <header class="py-4">
        <img src="~/assets/img/getWelpLogo.png" alt="getWelp logo">
      </header>
      <article class="card shadow">
        <div class="card-container">
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
body {
  background: rgba(240, 245, 250, 1);
}

main {
  height: 100vh;
}

.card {
  min-width: 484px;

  .card-container {
    padding: 2rem;
  }
}
</style>
