<template>
  <div
    class="tail-rounded-md tail-bg-white tail-mb-4 tail-flex tail-items-center tail-px-2 hover:tail-bg-gray-100 hover:tail-shadow-lg"
  >
    <div class="tail-flex tail-items-center tail-w-full tail-p-4 tail-cursor-pointer" @click="$router.push({ name: 'Client-id-Information', params: { id: client._id } })">
      <span
        :class="[client.status !== 'invited' ? ['tail-rounded-full', 'tail-border-2', 'tail-border-red-400', 'tail-p-0.5', 'tail-flex', 'tail-items-center'] : ['']]"
      >
        <ClientAvatar
          :client-info="client"
        />
      </span>
      <div class="tail-ml-4 tail-truncate tail-mr-2 md:tail-mr-0">
        <h3 class="tail-capitalize tail-font-medium">
          {{ client.firstName }} {{ client.lastName }}
        </h3>
        <div v-if="client.pet.length && 'location' in client" class="tail-flex tail-items-center">
          <img
            class="tail-bg-green-400 tail-p-1 tail-rounded-full"
            src="~/assets/img/dog-paw.svg"
            alt="dog paw"
          />
          <span class="tail-ml-1 tail-text-gray-500 tail-truncate tail-capitalize">
            {{ client.pet.length ? `(${client.pet[0] && client.pet[0].name}) ,` : '' }} {{ 'location' in client ? client.location : '' }}
          </span>
        </div>
      </div>
    </div>
    <Modal :is-open="openModal" @close="openModal = $event">
      <template v-slot:status>
        <div class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl">
          {{ client.status }}
        </div>
      </template>
      <ClientInfoPreview :client="client" @close="openModal = $event" />
    </Modal>
    <div class="">
      <div class="tail-flex tail-gap-3">
        <button
          v-if="client.status === 'invited'"
          type="button"
          class="tail-w-36 tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          @click="resendInvite"
        >
          <i class="ns-refresh"></i>
          <span class="tail-capitalize tail-ml-1">resend invite</span>
        </button>
      </div>
    </div>
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
