<template>
  <div class="w-full">
    <div
      class="bg-white rounded-xl border p-4 md:p-6 flex flex-col gap-4 md:gap-6"
    >
      <div>
        <h1 class="text-xl font-bold mt-0 md:mt-2">
          Create New Passowrd
        </h1>
        <p class="text-gray-500 mt-2 text-sm">
          Your new password must be different from previously used
          passwords.
        </p>
      </div>
      <form class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="exampleInputPassword1" class="required">Password</label>
          <input
            id="exampleInputPassword1"
            v-model.trim="$v.userInfo.password.$model"
            type="password"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{'invalid':$v.userInfo.password.$error}"
          />
          <div v-if="$v.userInfo.password.$error">
            <small
              v-if="!$v.userInfo.password.required"
              class="error text-gray-500"
            >Password is required.</small>
          </div>

          <small v-if="!$v.userInfo.password.minLength" class="error text-gray-500">
            Password must have at least
            {{ $v.userInfo.password.$params.minLength.min }} letters.
          </small>
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="exampleInputConfirmPassword1" class="required">Confirm Password</label>
          <input
            id="exampleInputConfirmPassword1"
            v-model.trim="$v.userInfo.confirmPassword.$model"
            type="password"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            @click="$v.userInfo.confirmPassword.$touch()"
          />
          <div v-if="$v.userInfo.confirmPassword.$error">
            <small
              v-if="!$v.userInfo.confirmPassword.sameAsPassword"
              class="error text-gray-500"
            >Passwords must be identical.</small>
          </div>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="button-fill">
            Save
          </button>
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
        minLength: minLength(8)
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
