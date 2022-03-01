<template>
  <div class="mb-6">
    <p
      class="tracking-wide uppercase font-medium text-gray-500 text-xs mb-8"
    >
      connection access
    </p>
    <div class="flex justify-between items-center">
      <div>
        <h6 class="text-grey-700 font-medium text-lg mb-1">
          {{ connectedDevices.length ? "Linked devices" : "Connect to a device" }}
          <p class="text-gray-500 text-sm">
            {{
              connectedDevices.length
                ? "Tap a device to disconnect"
                : "Connect to a device or login to your mobile app using QR code"
            }}
          </p>
        </h6>
      </div>
      <div>
        <button class="button-outline" @click="deviceConnection">
          {{
            connectedDevices.length
              ? "Link A Device"
              : generatingQr
                ? "Generating qr..."
                : "Connect Device"
          }}
        </button>
      </div>
    </div>

    <template v-if="connectedDevices.length">
      <button
        v-for="device in connectedDevices"
        :key="device.id"
        class="flex items-center justify-start w-full mt-4 px-4 py-1 hover:bg-gray-50 focus:outline-none"
        @click="deleteModal(device)"
      >
        <i class="fi-rr-mobile text-gray-500"></i>
        <div class="ml-4">
          <p class="text-lg text-left font-medium text-gray-700 mb-1">
            {{ device.model }} {{ device.version }}
          </p>
          <p class="text-sm text-left font-normal text-gray-500">
            Last Active {{ device.updatedAt | howLongAgo }}
          </p>
        </div>
      </button>
    </template>

    <modal name="link-device" height="535px" width="512px" :adaptive="true">
      <settings-link-device
        :img-src="qrCode"
        @close="$modal.hide('link-device')"
      />
    </modal>

    <delete-modal v-model="showDeleteModal" title="Disconnect Device">
      <template v-slot:subTitle>
        <p class="text-base font-normal text-gray-700">
          Are you sure you want to disconnect device
          <span
            class="font-medium"
          >{{ currentDevice.model }} {{ currentDevice.version }}</span>.
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
import deleteModal from '../DeleteModal.vue'
export default {
  name: 'DevicePariring',
  components: { deleteModal },
  data () {
    return {
      qrCode: '',
      generatingQr: false,
      currentDevice: '',
      showDeleteModal: false
    }
  },
  computed: {
    ...mapGetters({
      connectedDevices: 'qrCode/connectedDevices'
    })
  },
  created () {
    this.$nuxt.$on('device-paired', async () => {
      await this.$store.dispatch('qrCode/getConnectedDevices')
      this.$modal.hide('link-device')
      this.$gwtoast.success('Device pairing successful')
    })
  },
  beforeDestroy () {
    this.$nuxt.$off('device-paired')
  },
  methods: {
    ...mapActions({
      generateQrCode: 'qrCode/generateQrCode',
      disconnectDevice: 'qrCode/disconnectDevice'
    }),
    async deviceConnection () {
      this.generatingQr = true
      try {
        this.qrCode = await this.generateQrCode()
      } catch (error) {
        this.$gwtoast.error(error.response.data.message)
      }
      this.$modal.show('link-device')
      this.generatingQr = false
    },
    deleteModal (device) {
      this.currentDevice = device
      this.showDeleteModal = true
    },
    disconnect () {
      this.disconnectDevice(this.currentDevice.id)
      this.showDeleteModal = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
