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
                  v-model.trim="$v.userInfo.password.$model"
                  type="password"
                  class="form-control"
                  :class="{'invalid':$v.userInfo.password.$error}"
                  @click="$v.userInfo.password.$touch()"
                >
                <div v-if="$v.userInfo.password.$error" class="tail-mt-2">
                  <small
                    v-if="!$v.userInfo.password.required"
                    class="error tail-text-red-500"
                  >
                    Password is required.
                  </small>
                </div>

                <small
                  v-if="!$v.userInfo.password.minLength"
                  class="error tail-text-red-500"
                >
                  Password must have at least
                  {{ $v.userInfo.password.$params.minLength.min }} letters.
                </small>
              </div>
              <div class="tail-grid tail-mb-3">
                <label
                  for="exampleInputConfirmPassword1"
                  class="form-label"
                >Confirm Password</label>
                <input
                  id="exampleInputConfirmPassword1"
                  v-model.trim="$v.userInfo.confirmPassword.$model"
                  type="password"
                  class="form-control"
                  @click="$v.userInfo.confirmPassword.$touch()"
                >
                <div v-if="$v.userInfo.confirmPassword.$error" class="tail-mt-2">
                  <small
                    v-if="!$v.userInfo.confirmPassword.sameAsPassword"
                    class="error tail-text-red-500"
                  >
                    Passwords must be identical.
                  </small>
                </div>
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
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'ResetPassword',
  layout: 'authLayout',
  auth: false,
  data () {
    return {
      userInfo: {
        password: null,
        confirmPassword: null,
        domain: 'getwelp-trainer-ui'
      }
    }
  },
  validations: {
    userInfo: {
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  }

}
</script>
<style scoped></style>
