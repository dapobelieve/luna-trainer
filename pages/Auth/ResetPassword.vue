<template>
  <div>
    <div class="d-flex justify-content-center pt-3">
      <div class="card w-50 h-50">
        <div class="p-4  d-grid gap-2">
          <div class="col-12">
            <h4>Create new passowrd</h4>
          </div>
          <div class="col-12 mb-3">
            <span
              class="text-muted"
            >Your new password must be different from previously used
              passwords.</span>
          </div>
          <div>
            <form>
              <div class="mb-3">
                <label
                  for="exampleInputPassword1"
                  class="form-label"
                >Password</label>
                <input
                  id="exampleInputPassword1"
                  type="password"
                  class="form-control"
                >
              </div>
              <div class="mb-3">
                <label
                  for="exampleInputConfirmPassword1"
                  class="form-label"
                >Confirm Password</label>
                <input
                  id="exampleInputConfirmPassword1"
                  type="password"
                  class="form-control"
                >
              </div>

              <button type="submit" class="btn btn-primary border-0 w-100">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResetPassword',
  layout: 'authLayout'
}
</script>
<style scoped></style>
