<template>
  <async-view>
    <div class="bg-white border border-gray-200 rounded-xl py-4">
      <div class="flex justify-between md:mb-5 px-4">
        <h5 class="text-lg">
          Security
        </h5>
      </div>
      <div class="px-4">
        <div class="mb-4" v-if="isAuthLocal">
          <p
            class="tracking-wide uppercase font-medium text-gray-500 text-xs mb-8"
          >
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
              <button
                :disabled="!isAuthLocal"
                :class="{ 'cursor-not-allowed': !isAuthLocal }"
                class="button-outline"
                @click="$modal.show('change-password-modal')"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        <!-- <div class="mb-6">
          <p
            class="tracking-wide uppercase font-medium text-gray-500 text-xs mb-8"
          >
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
              <button
                :disabled="!isAuthLocal"
                :class="{ 'cursor-not-allowed': !isAuthLocal }"
                class="button-outline"
                @click="$modal.show('change-email-modal')"
              >
                Change Email
              </button>
            </div>
          </div>
        </div>
        <div v-show="secondaryEmail" class="mb-6">
          <div class="flex justify-between items-center">
            <div>
              <h6 class="text-grey-700 font-medium text-lg mb-1">
                Your Email
              </h6>
              <p class="text-gray-500 text-sm">
                We have sent a verification link to {{ secondaryEmail }}. <br />
                Please confirm your email to complete the setup.
              </p>
            </div>
            <div>
              <button class="button-outline" @click="cancelChange">
                Cancel
              </button>
            </div>
          </div>
        </div> -->
        <settings-device-pairing />
      </div>
      <!-- <ChangeEmailComponent @display-cancel-change="cancelEmailChange = true" /> -->
      <ChangePasswordComponent />
    </div>
  </async-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ChangePasswordComponent from '~/components/modals/ChangePasswordComponent'
import AsyncView from '~/components/util/AsyncView.vue'
export default {
  components: { ChangePasswordComponent, AsyncView },
  computed: {
    ...mapGetters({
      getUser: 'profile/getUser'
    }),
    isAuthLocal () {
      return this.getUser.authProvider === 'local'
    },
    secondaryEmail () {
      return this.$auth.user.secondaryEmail
    }
  },
  mounted () {
    this.getConnectedDevices()
  },
  methods: {
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile',
      getConnectedDevices: 'qrCode/getConnectedDevices'
    }),
    async cancelChange () {
      this.isLoading = true
      try {
        await this.$store.dispatch('authorize/cancelChangeEmail', {
          ...this.form
        })
        this.$lunaToast.success('Successfully cancelled ')
        this.$modal.hide('change-password-modal')
        await this.fetchUserProfile()
      } catch (e) {
        this.$lunaToast.error(e.response.data.message)
      }
    }
  }
}
</script>

<style scoped></style>
