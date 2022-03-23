<template>
  <div class="grid gap-4">
    <div>
      <span class="block text-sm">
        Send invoice for {{ sendDetails.total | amount }} to {{ sendDetails.customerId.email }}?
      </span>
      <small class="text-gray-500">
        Invoices can’t be edited after they’re sent.
      </small>
    </div>
    <div>
      <label class="text-sm">
        Include on this email
      </label>
      <input v-model="email" class="py-1 px-2 border border-gray-300 rounded-md w-full">
    </div>
    <div class="flex justify-end">
      <button :disabled="isLoading" class="base-button" @click.prevent="sendInvoice">
        <SingleLoader v-if="isLoading" class="mr-2" />
        {{ isLoading ? 'Sending Invoice...' : 'Send Invoice' }}
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
      fetchInvoices: 'invoice/getInvoices'
    }),
    sendInvoice () {
      this.isLoading = true
      const details = {
        id: this.sendDetails._id,
        recipient: this.email
      }
      this.send(details).then((result) => {
        if (result.status === 'success') {
          this.$lunaToast.success('Invoice sent')
          this.fetchInvoices()
          this.$emit('close', false)
        }
      }).catch((err) => {
        if (err.response) {
          this.$lunaToast.error(`${err.response.data.message}`)
        } else if (err.request) {
          this.$lunaToast.error('Something went wrong. Try again')
        } else {
          this.$lunaToast.error(`${err.message}`)
        }
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
