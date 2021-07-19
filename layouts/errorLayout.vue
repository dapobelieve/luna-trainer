<template>
  <div class="error-page">
    <header class="tail-bg-white tail-py-5">
      <img
        class="tail-mx-auto"
        src="~/assets/img/getWelpLogo.png"
        alt="getWelp logo"
      />
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout'
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
