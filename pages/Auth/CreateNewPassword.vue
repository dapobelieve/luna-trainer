<template>
  <div class="tail-max-w-full">
    <div class="tail-grid tail-gap-4 tail-w-full tail-p-6 tail-bg-white tail-rounded-md tail-text-gray-600">
      <div class="tail-grid tail-grid-col-12">
        <div class="">
          <h2 class="tail-text-2xl tail-font-semibold tail-my-2">
            Create new password
          </h2>
        </div>
        <small class="tail-text-gray-400 tail-text-base tail-my-2">
          Your new password must be different from previously used passwords.
        </small>
      </div>
      <div class="tail-grid tail-gap-4">
        <form class="tail-grid tail-gap-4" @submit.prevent="reset">
          <div class="">
            <div class="tail-grid tail-mb-6">
              <div class="tail-flex tail-justify-between tail-items-center">
                <label for="password" class="tail-block tail-text-base tail-font-medium tail-text-gray-700 required">Old Password</label>
                <password-toggle v-model="showOldPassword" />
              </div>
              <input
                v-model.trim="$v.userInfo.oldPassword.$model"
                tabindex="2"
                :disabled="isLoading"
                :type="showPassword ? 'text':'password'"
                class="tail-bg-white tail-py-2 tail-px-4 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
                :class="{invalid: $v.userInfo.oldPassword.$error}"
              />
              <div v-if="$v.$anyDirty" class="tail-mt-0.5">
                <small
                  v-if="!$v.userInfo.oldPassword.required"
                  class="tail-text-gray-600"
                >
                  Password is required.
                </small>
                <small
                  v-if="!$v.userInfo.oldPassword.minLength"
                  class="tail-text-gray-600"
                >
                  Password must have at least
                  {{ $v.userInfo.oldPassword.$params.minLength.min }} letters.
                </small>
              </div>
            </div>
            <div class="tail-grid">
              <div class="tail-flex tail-justify-between tail-items-center">
                <label for="password" class="tail-block tail-text-base tail-font-medium tail-text-gray-700 required">New Password</label>
                <password-toggle v-model="showNewPassword" />
              </div>
              <input
                v-model.trim="$v.userInfo.newPassword.$model"
                tabindex="2"
                :disabled="isLoading"
                :type="showPassword ? 'text':'password'"
                class="tail-bg-white tail-py-2 tail-px-4 tail-block tail-w-full sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
                :class="{invalid: $v.userInfo.newPassword.$error}"
              />
              <div v-if="$v.$anyDirty" class="tail-mt-0.5">
                <small
                  v-if="!$v.userInfo.newPassword.required"
                  class="tail-text-gray-600"
                >
                  Password is required.
                </small>
                <small
                  v-if="!$v.userInfo.newPassword.minLength"
                  class="tail-text-gray-600"
                >
                  Password must have at least
                  {{ $v.userInfo.newPassword.$params.minLength.min }} letters.
                </small>
              </div>
            </div>
          </div>

          <div class="tail-flex tail-justify-end tail-py-1">
            <button :loading="isLoading" class="primary-button" style="width: fit-content" :class="{ 'tail-opacity-50 tail-cursor-not-allowed': $v.$invalid }" :disabled="$v.$invalid">
              <SingleLoader v-if="isLoading" class="tail-mr-2" />
              {{ isLoading ? 'Resetting...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
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
    content:" *";
    color: red;
  }
  </style>
