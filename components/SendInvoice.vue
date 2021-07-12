<template>
  <div class="tail-grid tail-gap-4">
    <div>
      <span class="tail-block tail-text-sm">
        Send invoice for £{{ sendDetails.total }}.00 to {{ sendDetails.customerId.email }}?
      </span>
      <small class="tail-text-gray-500">
        Invoices can’t be edited after they’re sent.
      </small>
    </div>
    <div>
      <label class="tail-text-sm">
        Include on this email
      </label>
      <input v-model="email" class="tail-py-1 tail-px-2 tail-border tail-border-gray-300 tail-rounded-md tail-w-full">
    </div>
    <div class="tail-flex tail-justify-end">
      <button :disabled="isLoading" class="base-button" @click.prevent="sendInvoice">
        <SingleLoader v-if="isLoading" class="tail-mr-2" />
        {{ isLoading ? 'Sending Invoice...' : 'Send Invoice' }}
      </button>
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SendInvoice',
  props: {
    sendDetails: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isLoading: false,
      email: ''
    }
  },
  computed: {
    isStripeConnected () {
      return false
    }
  },
  methods: {
    ...mapActions({
      send: 'invoice/sendInvoice',
      allDraftInvoices: 'invoice/getAllDraftInvoices'
    }),
    sendInvoice () {
      this.isLoading = true
      console.log('the this.sendDetails', this.sendDetails)
      const details = {
        id: this.sendDetails._id,
        recipient: this.email
      }
      this.send(details).then((result) => {
        if (result.status === 'success') {
          this.$toast.success('Invoice sent', { position: 'top-right' })
          this.allDraftInvoices()
          this.$emit('close', false)
        }
      }).catch((err) => {
        if (err.response) {
          this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
        } else if (err.request) {
          this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
        } else {
          this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
        }
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
