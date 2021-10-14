<template>
  <div class="tail-w-full">
    <div
      class="tail-bg-white tail-rounded-xl tail-border tail-p-4 md:tail-p-6 tail-flex tail-flex-col tail-gap-4 md:tail-gap-6"
    >
      <div>
        <h1 class="tail-text-xl tail-font-bold tail-mt-0 md:tail-mt-2">
          Create New Password
        </h1>
        <p class="tail-text-gray-500 tail-mt-2 tail-text-sm">
          Your new password must be different from previously used
          passwords.
        </p>
      </div>
      <form class="tail-flex tail-flex-col tail-gap-4" @submit.prevent="reset">
        <div class="tail-flex tail-flex-col tail-gap-1.5">
          <label
            for="password"
            class="required"
            :class="{'tail-text-red-500' : $v.userInfo.oldPassword.$error}"
          >Old Password</label>
          <div
            class="
            tail-flex
            tail-justify-between
            tail-items-center
            tail-relative"
          >
            <input
              v-model.trim="$v.userInfo.oldPassword.$model"
              tabindex="1"
              :disabled="isLoading"
              :type="showOldPassword ? 'text':'password'"
              class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500 tail-pr-8"
              :class="{'tail-border-red-500' : $v.userInfo.oldPassword.$error}"
              @blur="$v.userInfo.oldPassword.$touch()"
            />
            <password-toggle v-model="showOldPassword" class="tail-absolute tail-right-0 tail-p-3" />
          </div>
          <div v-if="$v.userInfo.oldPassword.$error" class="tail-mt-0.5">
            <small v-if="!$v.userInfo.oldPassword.minLength" class="error tail-text-red-700">
              Password must have at least
              {{ $v.userInfo.oldPassword.$params.minLength.min }} characters.
            </small>
          </div>
        </div>
        <div class="tail-flex tail-flex-col tail-gap-1.5">
          <div class="tail-flex tail-justify-between tail-items-center">
            <label for="password" class="required" :class="{'tail-text-red-700' : $v.userInfo.newPassword.$error}">New Password</label>
          </div>
          <div class="tail-flex tail-justify-between tail-items-center tail-relative">
            <input
              v-model.trim="$v.userInfo.newPassword.$model"
              tabindex="2"
              :disabled="isLoading"
              :type="showNewPassword ? 'text':'password'"
              class="tail-bg-white tail-h-10 tail-flex tail-justify-center tail-py-2 tail-px-3 tail-w-full tail-border tail-shadow-sm tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500 tail-pr-8"
              :class="{'tail-border-red-500' : $v.userInfo.newPassword.$error}"
              @blur="$v.userInfo.newPassword.$touch()"
            />
            <password-toggle v-model="showNewPassword" class="tail-absolute tail-right-0 tail-p-3" />
          </div>
          <div v-if="$v.userInfo.newPassword.$error" class="tail-mt-0.5">
            <small v-if="!$v.userInfo.newPassword.minLength" class="error tail-text-red-700">
              Password must have at least
              {{ $v.userInfo.newPassword.$params.minLength.min }} characters.
            </small>
          </div>
        </div>

        <div class="tail-flex tail-justify-end tail-py-1">
          <button
            :class="{ 'tail-opacity-50 tail-cursor-not-allowed': $v.$invalid }"
            type="submit"
            :disabled="isLoading"
            class="button-fill"
          >
            <SingleLoader v-if="isLoading" class="tail-mr-2" />
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
        minLength: minLength(6)
      },
      newPassword: {
        required,
        minLength: minLength(6)
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
  @apply tail-text-red-500 tail-text-sm;
}
</style>
