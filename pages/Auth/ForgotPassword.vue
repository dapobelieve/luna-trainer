<template>
  <div class="tail-grid tail-gap-4">
    <div class="tail-col-12">
      <h3>Forgot your password?</h3>
      <small class="tail-text-gray-400">
        Enter your registered email below to receive password reset instruction.
      </small>
    </div>
    <div>
      <form>
        <div class="tail-mb-4 tail-grid ">
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
          class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-rounded tail-p-1.5"
          @click="
            $router.push({
              name: 'Auth-CreateNewPassword'
            })
          "
        >
          Send
        </button>
      </form>
      <div class="tail-text-center tail-pt-4">
        <NuxtLink :to="{ name: 'Auth-SignIn' }" class="tail-text-gray-900">
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
