<template>
  <div class="d-grid gap-4">
    <div class="col-12">
      <h3>Sign in</h3>
    </div>
    <div class="col-12">
      <button
        type="button"
        class="btn btn-white border w-100 d-flex align-items-center justify-content-center"
      >
        <img src="~/assets/img/googleLogoImg.png" alt="google logo">
        <span class="ms-1">Google</span>
      </button>
    </div>
    <div class="position-relative">
      <hr>
      <div
        class="w-100 position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center"
      >
        <small
          class="border rounded-circle or-secondary text-muted p-2 body-background"
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
