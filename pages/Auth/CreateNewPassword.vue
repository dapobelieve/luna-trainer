<template>
  <div class="tail-grid gap-4">
    <div class="tail-col-12">
      <h3>Create new password</h3>
      <small class="tail-text-gray-400">
        Your new password must be different from previously used passwords.
      </small>
    </div>
    <div>
      <form>
        <div class="tail-grid tail-mb-4">
          <label for="password" class="form-label">Password</label>
          <input id="password" type="password" class="form-control">
        </div>
        <div class="tail-grid tail-mb-4">
          <label for="password" class="form-label">Confirm Password</label>
          <input id="password" type="password" class="form-control">
        </div>

        <button
          type="submit"
          class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-p-1.5 tail-rounded"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CreateNewPassword',
  layout: 'authLayout'
}
</script>
<style scoped></style>
