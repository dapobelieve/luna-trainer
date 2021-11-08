<template>
  <containers-summary-information-with-avatar
    url="Client-id-Information"
    :parameter="{ id: client._id }"
  >
    <template v-slot:avatar>
      <ClientAvatar :client-info="client" />
    </template>
    <template v-slot:content>
      <span class="font-medium capitalize">
        {{
          client.firstName
        }}
      </span>
    </template>
    <template v-slot:button>
      <button
        v-if="client.status === 'invited'"
        type="button"
        class="button-text button-sm"
        @click="resendInvite"
      >
        <i class="ns-refresh"></i>
        <span class="capitalize ml-2">resend invite</span>
      </button>
      <div v-else>
        <button type="button" class="button-text button-sm w-8" @click="showDropdown">
          <i class="ns-ellipsis text-lg"></i>
        </button>
        <div
          v-show="showDropDown"
          class="origin-top-right absolute right-0 mt-2 p-1 min-w-[6rem] w-48 rounded-xl border shadow-lg bg-white z-40"
        >
          <div role="none">
            <nuxt-link
              :to="{ name: 'NewInvoice', params: { pushedClient: client } }"
              class="block p-3 hover:bg-gray-100 rounded-md transition-all"
            >
              Create Invoice
            </nuxt-link>
            <a href="#" class="block p-3 hover:bg-gray-100 rounded-md transition-all">Archive</a>
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
