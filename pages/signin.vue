<template>
  <div>
    <div class="d-flex justify-content-center pt-3">
      <div class="card w-50 h-50">
        <div class="p-4  d-grid gap-2">
          <div class="col-12">
            <h4>Sign In</h4>
          </div>
          <div class="col-12">
            <button type="button" class="btn btn-white border w-100">
              Google
            </button>
          </div>
          <div class="position-relative">
            <hr />
            <small
              class="position-absolute top-50 start-50 translate-middle-y border rounded-circle or-secondary text-muted p-2"
              >OR</small
            >
          </div>
          <div>
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
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <button type="submit" class="btn btn-primary border-0 w-100">
                Get Started
              </button>
            </form>
            <div class="text-center pt-4">
              <a class="text-dark">
                Forgot your password?
              </a>
            </div>
            <div class="text-center pt-4">
              <span class="text-muted"
                >Don't have an account? <a class="text-dark">Sign up</a></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
