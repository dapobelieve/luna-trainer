<template>
  <div class="tail-w-full">
    <div
      class="tail-bg-white tail-rounded-xl tail-border tail-p-4 md:tail-p-6 tail-flex tail-flex-col tail-gap-4 md:tail-gap-6"
    >
      <div>
        <h1 class="tail-text-xl tail-font-bold tail-mt-0 md:tail-mt-2">Create New Passowrd</h1>
        <p class="tail-text-gray-500 tail-mt-2 tail-text-sm">
          Your new password must be different from previously used
          passwords.
        </p>
      </div>
      <form class="tail-flex tail-flex-col tail-gap-4">
        <div class="tail-flex tail-flex-col tail-gap-1.5">
          <label for="exampleInputPassword1" class="required">Password</label>
          <input
            id="exampleInputPassword1"
            v-model.trim="$v.userInfo.password.$model"
            type="password"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            :class="{'invalid':$v.userInfo.password.$error}"
            @click="$v.userInfo.password.$touch()"
          />
          <div v-if="$v.userInfo.password.$error">
            <small
              v-if="!$v.userInfo.password.required"
              class="error tail-text-gray-500"
            >Password is required.</small>
          </div>

          <small v-if="!$v.userInfo.password.minLength" class="error tail-text-gray-500">
            Password must have at least
            {{ $v.userInfo.password.$params.minLength.min }} letters.
          </small>
        </div>
        <div class="tail-flex tail-flex-col tail-gap-1.5">
          <label for="exampleInputConfirmPassword1" class="required">Confirm Password</label>
          <input
            id="exampleInputConfirmPassword1"
            v-model.trim="$v.userInfo.confirmPassword.$model"
            type="password"
            class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
            @click="$v.userInfo.confirmPassword.$touch()"
          />
          <div v-if="$v.userInfo.confirmPassword.$error">
            <small
              v-if="!$v.userInfo.confirmPassword.sameAsPassword"
              class="error tail-text-gray-500"
            >Passwords must be identical.</small>
          </div>
        </div>
        <div class="tail-flex tail-justify-end">
          <button type="submit" class="button-fill">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'ResetPassword',
  layout: 'authPassword',
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
  head () {
    return {
      title: 'Reset Password'
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
