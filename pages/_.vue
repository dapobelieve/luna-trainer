<template>
  <div class="error-screen grid gap-4 place-content-center text-center">
    <h1>404</h1>
    <p>
      Page not found
    </p>
    <p>
      The page you’re looking for was not found
    </p>
    <div class="justify-items-center">
      <button class="base-button" style="width: fit-content" @click="$router.push({ name: 'Dashboard' })">
        Back to home
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'error'
}
</script>

<style lang="scss" scoped>
h1, p {
    color: rgba(23, 41, 66, 1)
}

h1 {
    font-size: 180px;
    font-weight: bolder;
    line-height: 1;
}

p:first-of-type {
    font-size: 30px;
    line-height: 1;
}

.error-screen {
    height: calc(100vh - 89px);
}
</style>
