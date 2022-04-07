<template>
  <div class="bg-white grid gap-4">
    <div class="flex space-x-6">
      <i class="text-gray-400 text-lg fi-rr-receipt"></i>
      <div>
        <p class="block text-sm">
          Invoice Number
        </p>
        <p class="text-sm">
          {{ details.invoiceNo }}
        </p>
      </div>
    </div>
    <div class="flex space-x-6">
      <i class="text-gray-400 text-lg fi-rr-time-check"></i>
      <div>
        <p class="block text-sm">
          Created
        </p>
        <p class="text-sm">
          {{ new Date(details.createdAt).toDateString() }}
        </p>
      </div>
    </div>
    <div class="flex space-x-6">
      <i class="text-gray-400 text-lg fi-rr-time-check"></i>
      <div>
        <p class="block text-sm">
          Due Date
        </p>
        <p class="text-sm">
          {{ new Date(details.dueDate).toDateString() }}
        </p>
      </div>
    </div>
    <div class="flex space-x-6">
      <i class="text-gray-400 text-lg fi-rr-label"></i>
      <div>
        <p class="block text-sm">
          Amount
        </p>
        <p class="text-sm">
          {{ details.total | amount }}
        </p>
      </div>
    </div>
    <div class="flex space-x-6">
      <i class="text-gray-400 text-lg fi-rr-envelope"></i>
      <div>
        <p class="block text-sm">
          Email
        </p>
        <p class="text-sm">
          {{ details.customerId.email }}
        </p>
      </div>
    </div>
    <div class="flex space-x-6">
      <i class="text-gray-400 text-lg fi-rr-user"></i>
      <div>
        <p class="text-sm mb-3">
          Dog Owner
        </p>
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <ClientAvatar :client-info="details.customerId" />
          </div>
          <div class="flex-1 min-w-0">
            <div>
              <p class="text-sm font-medium text-gray-900">
                {{ details.customerId.firstName }} {{ details.customerId.lastName }}
              </p>
              <p class="text-sm text-gray-500 truncate">
                {{ details.customerId.pet[0] && details.customerId.pet[0].name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="details.status === 'draft'" class="flex justify-center">
      <button class="base-button" @click.prevent="sendInvoice = true">
        Send Payment Request
      </button>
    </div>
    <GwModal :input-width="100" :is-open="sendInvoice" @close="sendInvoice = $event" @closeBackDrop="sendInvoice = $event">
      <template v-slot:status>
        <div class="bg-gray-100 text-gray-500 px-2 rounded-3xl">
          Send Payment Request
        </div>
      </template>
      <SendInvoice :send-details="details" @close="closeAllModal($event)" />
    </GwModal>
  </div>
</template>

<script>
export default {
  name: 'InvoiceDetails',
  props: {
    details: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      sendInvoice: false,
      isLoading: false
    }
  },
  methods: {
    closeAllModal (event) {
      this.sendInvoice = event
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
