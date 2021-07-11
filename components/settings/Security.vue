<template>
  <div>
    <div class="tail-py-6">
      <h3 class="tail-text-2xl tail-font-medium sec-color">
        Security
      </h3>
    </div>
    <div class="tail-pb-4 tail-py-5 tail-px-5 tail-rounded-md tail-bg-white">
      <form autocomplete="off" class="tail-grid tail-gap-6" @submit.prevent="submit">
        <div >
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password2">Old Password</label>
            <password-toggle v-model="showOldPassword"/>
          </div>
          <input
            :type="!showOldPassword ? 'password' : 'text'"
            v-model="password.oldPassword"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div >
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password2">New Password</label>
            <password-toggle v-model="showNewPassword"/>
          </div>
          <input
            :type="!showNewPassword ? 'password' : 'text'"
            v-model="$v.password.newPassword.$model"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div >
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password2">Confirm New Password</label>
            <password-toggle v-model="showConfirmNewPassword"/>
          </div>
          <input
            :type="!showConfirmNewPassword ? 'password' : 'text'"
            v-model="$v.password.confirmNewPassword.$model"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          <small
            v-if="$v.password.newPassword.$dirty && !$v.password.confirmNewPassword.sameAsPassword"
            class="tail-text-red-500"
           >New password must match with confirm password</small>
        </div>
        <div class="tail-flex tail-justify-end">
          <button-spinner type="submit" :loading="loading" :disabled="$v.$anyError" style="width:fit-content">Save Password</button-spinner>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      showConfirmNewPassword: false,
      showOldPassword: false,
      showNewPassword: false,
      password: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  },
  validations: {
    password: {
      oldPassword: {
        required
      },
      newPassword: {
        required,
        minLength: minLength(8),
        sameAsPassword: sameAs('confirmNewPassword')
      },
      confirmNewPassword: {
        required,
        sameAsPassword: sameAs('newPassword'),
        minLength: minLength(8)
      }
    }
  },
  methods: {
    ...mapActions({ resetPassword: 'authorize/resetPassword' }),
    submit () {
      console.log(this.$v)
      this.loading = true
      this.resetPassword(this.password).then((response) => {
        this.$toast.success('Password changed successfully', { position: 'top-right' })
      }).catch((error) => {
        this.$toast.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
