<template>
  <main>
    <div class="d-flex flex-column align-items-center">
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

<style lang="scss">
body {
  background: rgba(240, 245, 250, 1);
  background-image: url('~/assets/img/leftDogImg.png');
  background-repeat: no-repeat;
  background-position: left bottom;
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
