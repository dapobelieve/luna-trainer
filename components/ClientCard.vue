<template>
  <containers-summary-information-with-avatar url="Client-id-Information">
    <template v-slot:avatar>
      <ClientAvatar :client-info="client" />
    </template>
    <template v-slot:content>
      <span class="tail-font-medium tail-capitalize">{{ client.firstName }}</span>
    </template>
    <template v-slot:button>
      <button
        v-if="client.status === 'invited'"
        type="button"
        class="tail-w-36 tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border"
        @click="resendInvite"
      >
        <i class="ns-refresh"></i>
        <span class="tail-capitalize tail-ml-1 tail-text-gray-700 tail-text-sm">resend invite</span>
      </button>
      <div v-else class="tail-relative">
        <button type="button" @click="showDropdown">
          <i class="ns-ellipsis tail-text-2xl tail-text-blue-500 tail-pb-3"></i>
        </button>
        <!-- dropdown menu -->
        <div v-show="showDropDown" class="tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-44 tail-rounded-lg tail-shadow-lg tail-bg-white tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none tail-z-40">
          <div class="tail-py-2" role="none">
            <nuxt-link
              :to="{ name: 'CreateInvoice' }"
              class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
            >
              Create Invoice
            </nuxt-link>
            <a href="#" class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100">Archive</a>
          </div>
        </div>
      </div>
    </template>
  </containers-summary-information-with-avatar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ClientCard',
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDropDown: false
    }
  },
  methods: {
    showDropdown () {
      this.showDropDown = !this.showDropDown
    },
    ...mapActions({ resendInvite: 'client/resendClientInvite' }),
    resendInvite () {
      return this.$axios.$get(`${process.env.BASEURL_HOST}/client/${this.client._id}/resend-invite`).then((response) => {
        if (response && response.status === true) {
          this.$toast.success(
          `Client invitation resent to ${this.client.firstName} ${this.client.lastName}`
          )
          this.$emit('close', false)
        } else {
          this.$toast.error('Error resending invite. Retry!!!')
        }
      }).catch((err) => {
        if (err.response) {
          this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
        } else if (err.request) {
          this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
        } else {
          this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
