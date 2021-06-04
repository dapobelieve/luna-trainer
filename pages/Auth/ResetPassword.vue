<template>
  <div>
    <div class="tail-flex tail-justify-center tail-pt-3">
      <div class="card w-50 h-50">
        <div class="tail-p-4  tail-grid tail-gap-2">
          <div class="tail-col-12">
            <h4>Create new passowrd</h4>
          </div>
          <div class="tail-col-12 tail-mb-3">
            <span
              class="tail-text-gray-400"
            >Your new password must be different from previously used
              passwords.</span>
          </div>
          <div>
            <form>
              <div class="tail-grid tail-mb-3">
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
              <div class="tail-grid tail-mb-3">
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

              <div class="tail-flex tail-justify-center">
                <button type="submit" class="primary-color tail-border-0 tail-w-100 tail-p-1.5 tail tail-rounded btn-size">
                  Save
                </button>
              </div>
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
