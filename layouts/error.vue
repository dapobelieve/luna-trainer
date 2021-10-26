<template>
  <div class="error-page">
    <header class="bg-white py-5">
      <img
        class="mx-auto"
        src="~/assets/img/getWelpLogo.png"
        alt="getWelp logo"
      />
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style lang="scss" scoped>
.error-page {
    background-image: url("~assets/img/dog1.png");
    background-repeat: no-repeat;
    background-position: 95% bottom;
    background-attachment: fixed;
  }
</style>
