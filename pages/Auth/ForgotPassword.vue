<template>
  <div class="tail-grid tail-gap-4">
    <div class="col-12">
      <h3>Forgot your password?</h3>
      <small class="text-muted">
        Enter your registered email below to receive password reset instruction.
      </small>
    </div>
    <div>
      <form>
        <div class="tail-mb-4">
          <label for="email" class="">Email address</label>
          <input
            id="email"
            type="email"
            class=""
            aria-describedby="emailHelp"
          >
        </div>

        <button
          type="button"
          class="btn primary-color tail-text-white tail-border-0 tail-w-full tail-mt-2"
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
