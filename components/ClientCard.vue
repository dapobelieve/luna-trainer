<template>
  <nuxt-link :to="{ name: 'Client-id-Information', params: { id: client._id } }">
    <containers-summary-information-with-avatar>
      <template v-slot:avatar>
        <ClientAvatar :client-info="client" />
      </template>
      <template v-slot:content>
        <span class="tail-font-medium tail-capitalize">{{ client.firstName }}</span>
      </template>
      <template v-slot:button>
        <i class="ns-ellipsis tail-text-2xl tail-text-blue-500"></i>
      </template>
    </containers-summary-information-with-avatar>
  </nuxt-link>
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
  methods: {
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
