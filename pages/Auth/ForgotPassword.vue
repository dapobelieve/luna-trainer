<template>
  <div class="d-grid gap-4">
    <div class="col-12">
      <h3>Forgot your password?</h3>
      <small class="text-muted">
        Enter your registered email below to receive password reset instruction.
      </small>
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

        <button
          type="button"
          class="btn primary-color text-white border-0 w-100 mt-2"
          @click="
            $router.push({
              name: 'Auth-CreateNewPassword'
            })
          "
        >
          Send
        </button>
      </form>
      <div class="text-center pt-4">
        <NuxtLink :to="{ name: 'Auth-SignIn' }" class="text-dark">
          Back to Sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ForgotPassword',
  layout: 'authLayout'
}
</script>
<style scoped></style>
