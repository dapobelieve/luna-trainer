<template>
  <div class="d-grid gap-4">
    <div class="col-12">
      <h3>Create new password</h3>
      <small class="text-muted">
        Your new password must be different from previously used passwords.
      </small>
    </div>
    <div>
      <form>
        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <input id="password" type="password" class="form-control">
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Confirm Password</label>
          <input id="password" type="password" class="form-control">
        </div>

        <button
          type="submit"
          class="btn primary-color text-white border-0 w-100 mt-2"
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
