<template>
  <div class="w-full">
    <div
      class="bg-white rounded-xl border p-4 md:p-6 flex flex-col gap-4 md:gap-6"
    >
      <div>
        <h1 class="text-xl font-bold mt-0 md:mt-2">
          Create New Password
        </h1>
        <p class="text-gray-500 mt-2 text-sm">
          Your new password must be different from previously used
          passwords.
        </p>
      </div>
      <form class="flex flex-col gap-4" @submit.prevent="reset">
        <div class="flex flex-col gap-1.5 relative mb-3">
          <label
            for="password"
            class="required"
            :class="{'text-red-500' : $v.userInfo.oldPassword.$error}"
          >Old Password</label>
          <div
            class="
            flex
            justify-between
            items-center
            relative"
          >
            <input
              v-model.trim="$v.userInfo.oldPassword.$model"
              tabindex="1"
              :disabled="isLoading"
              :type="showPassword ? 'text':'password'"
              class="bg-white h-10 flex justify-center py-2 px-3 mb-2 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500 pr-8"

              :class="{'border-red-500' : $v.userInfo.oldPassword.$error}"
            />
            <password-toggle v-model="showOldPassword" class="absolute right-0 p-3" />
          </div>
          <div v-if="$v.userInfo.oldPassword.$error" class="absolute -bottom-5">
            <small v-if="!$v.userInfo.oldPassword.minLength" class="error text-red-500">
              Password must have at least
              {{ $v.userInfo.oldPassword.$params.minLength.min }} characters.
            </small>
          </div>
        </div>
        <div class="flex flex-col gap-1.5 relative mb-3">
          <div class="flex justify-between items-center">
            <label for="password" class="required" :class="{'text-red-500' : $v.userInfo.newPassword.$error}">New Password</label>
          </div>
          <div class="flex justify-between items-center relative">
            <input
              v-model.trim="$v.userInfo.newPassword.$model"
              tabindex="2"
              :disabled="isLoading"
              :type="showNewPassword ? 'text':'password'"
              class="bg-white h-10 flex justify-center py-2 px-3 mb-2 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500 pr-8"

              :class="{'border-red-500' : $v.userInfo.newPassword.$error}"
            />
            <password-toggle v-model="showNewPassword" class="absolute right-0 p-3" />
          </div>
          <div v-if="$v.userInfo.newPassword.$error" class="absolute -bottom-5">
            <small v-if="!$v.userInfo.newPassword.minLength" class="error text-red-500">
              Password must have at least
              {{ $v.userInfo.newPassword.$params.minLength.min }} characters.
            </small>
          </div>
        </div>

        <div class="flex justify-end py-1">
          <button
            :class="{ 'opacity-50 cursor-not-allowed': $v.$invalid }"
            type="submit"
            :disabled="isLoading"
            class="button-fill"
          >
            <SingleLoader v-if="isLoading" class="mr-2" />
            {{ isLoading ? 'Resetting...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'CreateNewPassword',
  layout: 'authPassword',
  auth: false,
  data () {
    return {
      showOldPassword: false,
      showNewPassword: false,
      isLoading: false,
      userInfo: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  head () {
    return {
      title: 'Password Change'
    }
  },
  validations: {
    userInfo: {
      oldPassword: {
        required,
        minLength: minLength(8)
      },
      newPassword: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    async reset () {
      if (this.userInfo) {
        this.isLoading = true
        await this.$store.dispatch('authorize/resetPassword', this.userInfo).then((response) => {
          if (response.status === 'successful') {
            this.$auth.strategy.token.reset()
            this.$toast.success('Reset successful', { position: 'bottom-right' })
            this.$router.push({ name: 'Auth-SignIn' })
          }
        }).catch((err) => {
          if (err.response) {
            this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
          }
        }).finally(() => {
          this.isLoading = false
        })
      }
    }
  }
}
</script>
<style scoped>
.required:after {
  content: " *";
  @apply text-red-500 text-sm;
}
</style>
