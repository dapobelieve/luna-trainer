<template>
  <div class="tail-grid tail-gap-4 tail-mx-8 tail-my-2">
    <div class="tail-grid tail-grid-col-12">
      <h3>Sign up</h3>
    </div>
    <div class="tail-grid tail-grid-col-12 tail-mb-4">
      <button
        type="button"
        class="tail-bg-white tail-border tail-w-100 tail-flex tail-align-center tail-justify-center tail-p-1.5 tail-rounded"
      >
        <img src="~/assets/img/googleLogoImg.png" alt="google logo">
        <span class="tail-ml-1">Google</span>
      </button>
    </div>
    <div class="tail-relative">
      <hr class="tail-z-0">
      <div
        class="tail-w-100 tail-absolute tail-z-40 tail-transform tail-translate-x-28 tail--translate-y-4 tail-flex tail-align-center tail-justify-center"
      >
        <small
          class="tail-border tail-rounded-full or-secondary tail-text-grey tail-p-2 body-background"
        >OR</small>
      </div>
    </div>
    <div class="tail-py-3.5">
      <form>
        <div class="tail-mb-4 tail-grid">
          <label for="email" class="form-label fst-normal">Email address</label>
          <input
            id="email"
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
          >
        </div>
        <div class="tail-mb-4 tail-grid">
          <label for="password" class="form-label">Password</label>
          <input id="password" type="password" class="form-control">
        </div>

        <div class="tail-mb-4 tail-grid">
          <label for="password" class="form-label">Confirm Password</label>
          <input id="password" type="password" class="form-control input-size">
        </div>
        <div class="tail-flex tail-justify-center">
          <button
            type="submit"
            class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-rounded tail-p-1.5 btn-size"
          >
            Get started
          </button>
        </div>
      </form>
      <div class="tail-text-center tail-pt-4">
        <span
          class="tail-text-gray-400"
        >Already have an account?
          <NuxtLink
            :to="{ name: 'Auth-SignIn' }"
            class="tail-text-gray-900"
          >Sign In</NuxtLink></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignUp',
  layout: 'authLayout'
}
</script>
<style scoped></style>
