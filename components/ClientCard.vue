<template>
  <containers-summary-information-with-avatar
    url="Client-id-Information"
    :parameter="{ id: client._id }"
  >
    <template v-slot:avatar>
      <ClientAvatar :client-info="client" />
    </template>
    <template v-slot:content>
      <span class="font-medium capitalize">{{
        client.firstName
      }}</span>
    </template>
    <template v-slot:button>
      <button
        v-if="client.status === 'invited'"
        type="button"
        class="w-36 hidden md:flex items-center px-2.5 py-1 rounded-md bg-white border"
        @click="resendInvite"
      >
        <i class="ns-refresh"></i>
        <span
          class="capitalize ml-1 text-gray-700 text-sm"
        >resend invite</span>
      </button>
      <div v-else class="relative">
        <button type="button" @click="showDropdown">
          <i class="ns-ellipsis text-2xl text-blue-500 pb-3"></i>
        </button>
        <div
          v-show="showDropDown"
          class="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
        >
          <div class="py-2" role="none">
            <nuxt-link
              :to="{ name: 'NewInvoice', params: { pushedClient: client } }"
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Create Invoice
            </nuxt-link>
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            >Archive</a>
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
      return this.$axios
        .$get(
          `${process.env.BASEURL_HOST}/client/${this.client._id}/resend-invite`
        )
        .then((response) => {
          if (response && response.status === true) {
            this.$toast.success(
              `Client invitation resent to ${this.client.firstName} ${this.client.lastName}`
            )
            this.$emit('close', false)
          } else {
            this.$toast.error('Error resending invite. Retry!!!')
          }
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(
              `Something went wrong: ${err.response.data.message}`,
              { position: 'bottom-right' }
            )
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', {
              position: 'bottom-right'
            })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, {
              position: 'bottom-right'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
