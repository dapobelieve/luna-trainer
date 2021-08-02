<template>
  <div class="tail-min-h-screen tail-bg-gray-100">
    <GwHeader />
    <div class="tail-py-0 tail-max-w-12xl tail-mx-auto sm:tail-px-0 lg:tail-px-0 lg:tail-pl-0 lg:tail-grid lg:tail-grid-cols-12">
      <Navigation />
      <main class="lg:tail-col-span-9 xl:tail-col-span-10">
        <Nuxt :key="$route.fullpath" />
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      page: this.$route.name
    }
  }
}
</script>

<style lang="scss"></style>
