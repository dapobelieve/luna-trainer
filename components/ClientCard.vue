<template>
  <div
    class="tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-flex tail-items-center"
  >
    <div class="tail-flex tail-w-full tail-cursor-pointer hover:tail-bg-gray-100" @click="openModal = true">
      <span
        :class="[client && client.status !== 'invited' ? ['tail-rounded-full', 'tail-border-2', 'tail-border-red-400', 'tail-p-0.5', 'tail-flex', 'tail-items-center'] : ['']]"
      >
        <ClientAvatar
          :firstname="client.firstName"
          :lastname="client.lastName"
        />
      </span>
      <div class="tail-ml-4 tail-truncate tail-mr-2 md:tail-mr-0">
        <h3 class="tail-capitalize tail-font-medium">
          {{ client.firstName }} {{ client.lastName }}
        </h3>
        <div class="tail-flex tail-items-center">
          <img
            class="tail-bg-green-400 tail-p-1 tail-rounded-full"
            src="~/assets/img/dog-paw.svg"
            alt="dog paw"
          />
          <span class="tail-ml-1 tail-text-gray-500 tail-truncate">
            {{ client.pet[0].name }}, {{ client.pet[0].breed }}
          </span>
        </div>
      </div>
    </div>
    <div>
      <div class="tail-flex tail-gap-3">
        <button
          v-if="client.status === 'accepted'"
          type="button"
          class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          @click="newClientInvoice"
        >
          <i class="ns-receipt"></i>
          <span class="tail-capitalize tail-ml-1">invoice</span>
        </button>

        <button
          v-if="client.status === 'invited'"
          type="button"
          class="tail-w-36 tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          @click="resendInvite"
        >
          <i class="ns-refresh"></i>
          <span class="tail-capitalize tail-ml-1">resend invite</span>
        </button>
        <button
          v-else
          type="button"
          class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          @click="openMessage"
        >
          <i class="ns-comment-alt"></i>
          <span class="tail-capitalize tail-ml-1">message</span>
        </button>
      </div>
    </div>
    <Modal :is-open="openModal" :status="client.status" @close="openModal = $event">
      <ClientInfoPreview :client="client" @close="openModal = $event" />
    </Modal>
  </div>
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
      openModal: false
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
    },
    openMessage () {
      this.$router.push({
        name: 'Clients-id-Messages',
        params: {
          id: this.client.userId
        }
      })
    },
    newClientInvoice () {
      this.$router.push({
        name: 'NewInvoice-id',
        params: {
          id: this.client.userId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
