<template>
  <main
    :class="[
      $route.name === 'Auth-ForgotPassword' ||
        $route.name === 'Auth-CreateNewPassword'
        ? 'border-collie'
        : 'shiba-inu'
    ]"
    class=""
  >
    <div
      class="tail-flex tail-flex-col tail-items-center tail-w-full md:tail-w-5/6 md:tail-px-4 lg:tail-px-0 centered"
    >
      <header
        class="tail-py-4 tail-sticky tail-top-0 tail-z-10 md:tail-static tail-w-full body-background"
      >
        <img
          class="tail-mx-auto"
          src="~/assets/img/svgs/logomark.svg"
          alt="getWelp logo"
        />
      </header>
      <article
        class="tail-z-0 tail-rounded-lg tail-m-4 tail-overflow-hidden tail-max-w-xs  md:tail-max-w-lg md:tail-mb-5"
      >
        <div
          class="tail-h-full md:tail-h-auto"
        >
          <Nuxt />
        </div>
      </article>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
