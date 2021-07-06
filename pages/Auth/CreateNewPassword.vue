<template>
  <div class="tail-grid gap-4">
    <div class="tail-col-12 tail-mb-5">
      <h3 class="tail-text-3xl">
        Create new password
      </h3>
      <small class="tail-text-gray-400 tail-text-sm">
        Your new password must be different from previously used passwords.
      </small>
    </div>
    <div class="tail-grid tail-gap-6">
      <form class="tail-grid tail-gap-6">
        <div class="tail-grid">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Password</label>
            <button type="button" class="focus:tail-outline-none" @click="showPassword = !showPassword">
              <img v-if="showPassword" class="tail-h-4" src="~/assets/img/eye-off-outline.svg" alt="" srcset="">
              <img v-else class="tail-h-4" src="~/assets/img/eye-outline.svg" alt="" srcset="">
            </button>
          </div>
          <input v-model.trim="$v.userInfo.password.$model" :type="showPassword ? 'text':'password'" class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" :class="{'invalid':$v.userInfo.password.$error}" />
          <div v-if="$v.userInfo.password.$error" class="tail-mt-2">
            <small
              v-if="!$v.userInfo.password.required"
              class="error tail-text-red-500"
            >
              Password is required.
            </small>
            <small
              v-if="!$v.userInfo.password.minLength"
              class="error tail-text-red-500"
            >
              Password must have at least
              {{ $v.userInfo.password.$params.minLength.min }} letters.
            </small>
          </div>
        </div>
        <div class="tail-grid">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password" class="tail-block tail-text-base tail-font-medium tail-text-gray-700">Confirm Password</label>
            <button type="button" class="focus:tail-outline-none" @click="showConfirmPassword = !showConfirmPassword">
              <img v-if="showConfirmPassword" class="tail-h-4" src="~/assets/img/eye-off-outline.svg" alt="" srcset="">
              <img v-else class="tail-h-4" src="~/assets/img/eye-outline.svg" alt="" srcset="">
            </button>
          </div>
          <input v-model.trim="$v.userInfo.confirmPassword.$model" :type="showConfirmPassword ? 'text':'password'" class="tail-bg-white tail-p-2.5 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          <div v-if="$v.userInfo.confirmPassword.$error" class="tail-mt-2">
            <small
              v-if="!$v.userInfo.confirmPassword.required"
              class="error tail-text-red-500"
            >
              Password is required.
            </small>
            <small
              v-if="!$v.userInfo.confirmPassword.minLength"
              class="error tail-text-red-500"
            >
              Password must have at least
              {{ $v.userInfo.confirmPassword.$params.minLength.min }} letters.
            </small>
          </div>
        </div>
        <div class="tail-flex tail-justify-center">
          <button
            type="submit"
            class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-p-1.5 tail-rounded btn-size"
          >
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
  name: 'CreateNewPassword',
  layout: 'authLayout',
  auth: false,
  data () {
    return {
      showPassword: false,
      showConfirmPassword: false,
      userInfo: {
        password: '',
        confirmPassword: '',
        domain: 'getwelp-trainer-ui'
      }
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
    }
  }
}
</script>
<style scoped></style>
