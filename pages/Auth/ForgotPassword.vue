<template>
  <div class="tail-grid tail-gap-4">
    <div class="tail-col-12">
      <h3 class="tail-text-3xl tail-mb-3">Forgot your password?</h3>
      <small class="tail-text-gray-400 tail-text-sm">
        Enter your registered email below to receive password reset instruction.
      </small>
    </div>
    <div class="tail-grid tail-gap-4">
      <form class="tail-grid tail-gap-4">
        <div class="">
          <div class="tail-grid">
          <label for="email" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Email address</label>
          <input autocomplete="off" type="text" class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
        </div>
        </div>

        <div class="tail-flex tail-justify-center">
          <button
            type="button"
            class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-rounded tail-p-1.5 btn-size"
            @click="
              $router.push({
                name: 'Auth-CreateNewPassword'
              })
            "
          >
            Send
          </button>
        </div>
      </form>
      <div class="tail-text-center tail-pt-4">
        <NuxtLink :to="{ name: 'Auth-SignIn' }" class="tail-text-gray-900 tail-underline">
          Back to Sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ForgotPassword',
  layout: 'authLayout',
  auth: false
}
</script>
<style scoped></style>
