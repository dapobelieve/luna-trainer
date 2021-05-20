<template>
  <div class="d-flex justify-content-center pt-3">
    <div class="card w-50 h-50">
      <div class="p-4  d-grid gap-2">
        <div class="col-12">
          <h4>Forgot your password?</h4>
        </div>
        <div class="col-12 mb-5">
          <span class="text-muted"
            >Enter your registered email below to receive password reset
            instruction</span
          >
        </div>

        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <button type="submit" class="btn btn-primary border-0 w-100">
            Send
          </button>
        </form>
        <div class="text-center pt-4">
          <a class="text-dark">Back to Sign in</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
