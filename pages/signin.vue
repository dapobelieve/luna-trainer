<template>
  <div>
    <div>
      <div class="d-flex justify-content-center py-3">
        <img src="~/assets/img/getWelpLogo.png" alt="">
      </div>
      <div class="d-flex justify-content-center p-4">
        <div class="card form-size p-4">
          <div class="p-4  d-grid gap-2">
            <div class="col-12">
              <h2>Sign In</h2>
            </div>
            <div class="col-12">
              <button type="button" class="btn btn-white border w-100">
                <img src="~/assets/img/googleLogoImg.png" alt=""> Google
              </button>
            </div>
            <div class="position-relative">
              <hr>
              <div class="w-100 position-absolute top-50 start-50 translate-middle-y d-flex align-items-center">
                <small
                  class="border rounded-circle or-secondary text-muted p-2 bg-danger"
                >OR</small>
              </div>
            </div>
            <div>
              <form>
                <div class="mb-3">
                  <label
                    for="exampleInputEmail1"
                    class="form-label fst-normal"
                  >Email address</label>
                  <input
                    id="exampleInputEmail1"
                    type="email"
                    class="form-control"
                    aria-describedby="emailHelp"
                  >
                </div>
                <div class="mb-3">
                  <label
                    for="exampleInputPassword1"
                    class="form-label fst-normal"
                  >Password</label>
                  <input
                    id="exampleInputPassword1"
                    type="password"
                    class="form-control"
                  >
                </div>

                <button type="submit" class="btn btn-primary border-0 w-100 fst-normal">
                  Get Started
                </button>
              </form>
              <div class="text-center pt-4">
                <a class="text-dark">
                  Forgot your password?
                </a>
              </div>
              <div class="text-center pt-4">
                <span
                  class="text-muted"
                >Don't have an account? <a class="text-dark">Sign up</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped></style>
