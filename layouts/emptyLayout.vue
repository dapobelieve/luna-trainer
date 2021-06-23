<template>
  <main>
    <div>
      <Nuxt />
    </div>
  </main>
</template>
<script>
export default {
  name: 'EmptyLayout',
  data () {
    return {}
  }
}
</script>
<style lang="scss">
@media only screen and (min-width: 769px) {
  .views {
    margin-left: 99px;
    width: 100%;
  }
}
</style>
