<template>
  <div
    class="tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-flex tail-items-center"
  >
    <div class="tail-flex tail-mr-auto tail-cursor-pointer hover:tail-bg-gray-100" @click="openModal = true">
      <ClientAvatar :firstname="client.firstName" :lastname="client.lastName" />
      <div class="tail-ml-4 tail-truncate tail-mr-2 md:tail-mr-0">
        <h3 class="tail-capitalize tail-font-medium">
          {{ client.firstName }} {{ client.lastName }}
        </h3>
        <div class="tail-flex tail-items-center">
          <div>
            <img
              class="tail-bg-green-700 tail-rounded-full"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
          </div>
          <span
            class="tail-capitalize tail-ml-1 tail-text-gray-500 tail-truncate"
          >
            {{ client.location.address }}, {{ client.city }}.
          </span>
        </div>
      </div>
    </div>

    <Modal :is-open="openModal" :status="client.status" @close="openModal = $event">
      <ClientInfoPreview :client="client" @close="openModal = $event" />
    </Modal>

    <div class="">
      <div class="tail-flex tail-gap-3">
        <button
          v-if="$route.name === 'Clients-InvitedInvites'"
          type="button"
          class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          @click="resendInvite"
        >
          <i class="ns-refresh"></i>
          <span class="tail-capitalize tail-ml-1">resend</span>
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
        <!-- <button
          class="tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
        >
          <i class="ns-menu-dots"></i>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
  ...mapGetters({
    getUnreadMessageCount: 'qb/getMessageCount'
  }),
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
