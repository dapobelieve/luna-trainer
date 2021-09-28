<template>
  <main>
    <h1 class="tail-sr-only">
      Registration page
    </h1>
    <nuxt />
  </main>
</template>

<script>
export default {
  middleware: ['validToken']
}
</script>

<style lang="scss" scoped></style>
