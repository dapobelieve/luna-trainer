<template>
  <div class="bg-white border border-gray-200 rounded-xl py-4">
    <div class="flex justify-between md:mb-5 px-4">
      <h5 class="text-lg">
        Security
      </h5>
    </div>
    <div class="px-4">
      <div class="mb-4">
        <p class="tracking-wide uppercase font-medium text-gray-500 text-xs mb-8">
          Password
        </p>
        <div class="flex justify-between items-center">
          <div>
            <h6 class="text-grey-700 font-medium text-lg mb-1">
              Password
            </h6>
            <p class="text-gray-500 text-sm">
              **********
            </p>
          </div>
          <div>
            <button class="text-primary-color font-medium text-sm" @click="$modal.show('change-password-modal')">
              Change Password
            </button>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <p class="tracking-wide uppercase font-medium text-gray-500 text-xs mb-8">
          Email
        </p>
        <div class="flex justify-between items-center">
          <div>
            <h6 class="text-grey-700 font-medium text-lg mb-1">
              Your Email
            </h6>
            <p class="text-gray-500 text-sm">
              {{ $auth.user.email }}
            </p>
          </div>
          <div>
            <button class="text-primary-color font-medium text-sm" @click="$modal.show('change-email-modal')">
              Change Email
            </button>
          </div>
        </div>
      </div>
      <div v-show="cancelEmailChange">
        <div class="flex justify-between items-center">
          <div>
            <h6 class="text-grey-700 font-medium text-lg mb-1">
              Your Email
            </h6>
            <p class="text-gray-500 text-sm">
              We have sent a verification link to {{ $auth.user.secondaryEmail }}. <br>
              Please confirm your email to complete the setup.
            </p>
          </div>
          <div>
            <button class="text-primary-color font-medium text-sm" @click="cancelChange">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <ChangeEmailComponent
      @display-cancel-change="cancelEmailChange = true"
    />
    <ChangePasswordComponent />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ChangePasswordComponent from '~/components/modals/ChangePasswordComponent'
import ChangeEmailComponent from '~/components/modals/ChangeEmailComponent'
export default {
  components: { ChangeEmailComponent, ChangePasswordComponent },
  data () {
    return {
      cancelEmailChange: false
    }
  },
  methods: {
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile'
    }),
    async  cancelChange () {
      this.isLoading = true
      try {
        await this.$store.dispatch('authorize/cancelChangeEmail', { ...this.form })
        this.$gwtoast.success('Successfully cancelled ')
        await this.fetchUserProfile()
        this.cancelEmailChange = false
      } catch (e) {
        this.$gwtoast.error(e.response.data.message)
      }
    }
  }
}
</script>

<style scoped>

</style>
