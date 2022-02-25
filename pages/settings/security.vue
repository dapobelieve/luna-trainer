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
            <button :disabled="isAuthLocal" :class="{ 'cursor-not-allowed' : isAuthLocal }" class="button-outline" @click="$modal.show('change-password-modal')">
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
            <button :disabled="isAuthLocal" :class="{ 'cursor-not-allowed' : isAuthLocal }" class="button-outline" @click="$modal.show('change-email-modal')">
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
              We have sent a verification link to {{ secondaryEmail }}. <br>
              Please confirm your email to complete the setup.
            </p>
          </div>
          <div>
            <button class="button-outline" @click="cancelChange">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <p class="tracking-wide uppercase font-medium text-gray-500 text-xs mb-8">
          connection access
        </p>
        <div class="flex justify-between items-center">
          <div>
            <h6 class="text-grey-700 font-medium text-lg mb-1">
              {{ connectedDevices ? 'Linked devices' : 'Connect to a device' }}
              <p class="text-gray-500 text-sm">
                {{ connectedDevices ? 'Tap a device to disconnect' : 'Connect to a device or login to your mobile app using QR code' }}
              </p>
            </h6>
          </div>
          <div>
            <button class="button-outline" @click="deviceConnection">
              {{ connectedDevices ? 'Link A Device' : generatingQr ? 'Generating qr...' : 'Connect Device' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <template v-if="connectedDevices.length">
      <button v-for="device in connectedDevices" :key="device.id" class="flex items-center justify-start w-full mt-4 px-4 py-1 hover:bg-gray-50 focus:outline-none" @click="deleteModal(device.id)">
        <i class="fi-rr-mobile text-gray-500"></i>
        <div class="ml-4">
          <p class="text-lg font-medium text-gray-700 mb-1">
            {{ device.model }} {{ device.qrCodeId }}
          </p>
          <p class="text-sm text-left font-normal text-gray-500">
            Last Active {{ device.updatedAt | howLongAgo }}
          </p>
        </div>
      </button>
    </template>
    <ChangeEmailComponent
      @display-cancel-change="cancelEmailChange = true"
    />
    <ChangePasswordComponent />

    <modal
      name="link-device"
      height="535px"
      width="512px"
      :adaptive="true"
    >
      <settings-link-device :img-src="qrCode" @close="$modal.hide('link-device')" />
    </modal>

    <delete-modal v-model="showDeleteModal" title="Disconnect Device">
      <template v-slot:subTitle>
        <p class="text-base font-normal text-gray-700">
          Are you syre you want to disconnect device <span class="font-medium">{{ currentId }}</span>.
        </p>
      </template>
      <template v-slot:confirm>
        <button class="button-fill" @click.prevent="disconnect">
          Yes, Disconnect
        </button>
      </template>
    </delete-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ChangePasswordComponent from '~/components/modals/ChangePasswordComponent'
import ChangeEmailComponent from '~/components/modals/ChangeEmailComponent'
import DeleteModal from '~/components/util/modals/deleteModal.vue'
export default {
  components: { ChangeEmailComponent, ChangePasswordComponent, DeleteModal },
  data () {
    return {
      showDeleteModal: false,
      qrCode: '',
      generatingQr: false,
      currentId: ''
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'profile/getUser',
      connectedDevices: 'qrCode/connectedDevices'
    }),
    isAuthLocal () {
      return this.getUser.authProvider === 'local'
    },
    secondaryEmail () {
      return this.$auth.user.secondaryEmail
    }
  },
  created () {
    // this.$nuxt.$on('device-paired', () => {
    //   console.log('listened ')
    //   this.$modal.hide('link-device')
    // })
  },
  mounted () {
    // this.connectedDevices()
    this.getConnectedDevices()
  },
  beforeDestroy () {
    this.$nuxt.$off('device-paired')
  },
  methods: {
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile',
      generateQrCode: 'qrCode/generateQrCode',
      getConnectedDevices: 'qrCode/getConnectedDevices',
      disconnectDevice: 'qrCode/disconnectDevice'
    }),
    async cancelChange () {
      this.isLoading = true
      try {
        await this.$store.dispatch('authorize/cancelChangeEmail', { ...this.form })
        this.$gwtoast.success('Successfully cancelled ')
        await this.fetchUserProfile()
      } catch (e) {
        this.$gwtoast.error(e.response.data.message)
      }
    },
    async deviceConnection () {
      this.generatingQr = true
      try {
        this.qrCode = await this.generateQrCode()
      } catch (error) {
        this.$gwtoast.error(error.response.data.message)
      }
      this.$modal.show('link-device')
      this.generatingQr = false
      this.connectedDevices = !this.connectedDevices
    },
    deleteModal (id) {
      this.currentId = id
      this.showDeleteModal = true
      console.log('id ', this.currentId)
    },
    disconnect () {
      // this.connectedDevices = false
      this.disconnectDevice(this.currentId)
      this.showDeleteModal = false
    }
  }
}
</script>

<style scoped>

</style>
