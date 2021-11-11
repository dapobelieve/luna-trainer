<template>
  <div>
    <div class="py-6">
      <h3 class="text-2xl font-medium sec-color">
        Security
      </h3>
    </div>
    <div class="pb-4 py-5 px-5 rounded-md bg-white">
      <form autocomplete="off" class="grid gap-6" @submit.prevent="submit">
        <div>
          <div class="flex justify-between items-center">
            <label for="password2">Old Password</label>
            <password-toggle v-model="showOldPassword" />
          </div>
          <input
            v-model="password.oldPassword"
            :type="!showOldPassword ? 'password' : 'text'"
            class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
          >
          <small
            v-if="$v.$anyDirty && !$v.password.oldPassword.required"
            class="text-gray-500"
          >Old password is required</small>
        </div>
        <div>
          <div class="flex justify-between items-center">
            <label for="password2">New Password</label>
            <password-toggle v-model="showNewPassword" />
          </div>
          <input
            v-model="$v.password.newPassword.$model"
            :type="!showNewPassword ? 'password' : 'text'"
            class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
          >
        </div>
        <div class="flex justify-end">
          <button-spinner type="submit" :loading="loading" :disabled="$v.$invalid" style="width:fit-content">
            Save Password
          </button-spinner>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      showOldPassword: false,
      showNewPassword: false,
      password: {
        oldPassword: '',
        newPassword: ''
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
        minLength: minLength(8)
      }
    }
  },
  methods: {
    ...mapActions({ resetPassword: 'authorize/resetPassword' }),
    submit () {
      if (this.password.oldPassword === this.password.newPassword) {
        this.$gwtoast.error('Please choose a new password', { position: 'bottom-right' })
      } else {
        this.loading = true
        this.resetPassword(this.password).then((response) => {
          this.password.oldPassword = ''
          this.password.newPassword = ''
          this.$gwtoast.success('Password changed successfully', { position: 'top-right' })
        }).catch((error) => {
          this.$gwtoast.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
