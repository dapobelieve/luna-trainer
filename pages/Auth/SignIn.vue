<template>
  <div class="tail-grid tail-gap-4">
    <div class="">
      <h2>Sign in</h2>
    </div>
    <div class="">
      <button
        type="button"
        class="tail-border tail-border-gray-300 tail-w-full tail-flex tail-items-center tail-justify-center tail-py-2 tail-rounded-md"
      >
        <img src="~/assets/img/googleLogoImg.png" alt="google logo">
        <span class="tail-ml-1">Google</span>
      </button>
    </div>
    <div class="tail-relative">
      <hr>
      <div
      style="top: 50"
        class="tail-w-full tail-absolute tail-flex tail-items-center tail-justify-center"
      >
        <small
          class="tail-border tail-rounded-full text-muted tail-p-2 body-background"
        >OR</small>
      </div>
    </div>
    <div>
      <form>
        <div class="mb-4">
          <label for="email" class="form-label fst-normal">Email address</label>
          <input
            id="email"
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
          >
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <input id="password" type="password" class="form-control">
        </div>

        <button
          type="button"
          class="btn primary-color text-white border-0 w-100 mt-2"
          @click="$router.push({name: 'Auth-ProfileSetup'})"
        >
          Login
        </button>
      </form>
      <div class="text-center pt-4">
        <NuxtLink :to="{ name: 'Auth-ForgotPassword' }" class="text-dark">
          Forgot your password?
        </NuxtLink>
      </div>
      <div class="text-center pt-4">
        <span
          class="text-muted"
        >Don't have an account?
          <NuxtLink
            :to="{ name: 'Auth-SignUp' }"
            class="text-dark"
          >Sign up</NuxtLink></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignIn',
  layout: 'authLayout'
}
</script>
<style scoped></style>
