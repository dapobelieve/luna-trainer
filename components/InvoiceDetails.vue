<template>
  <div class="tail-bg-white tail-grid tail-gap-4">
    <div class="tail-flex tail-space-x-6">
      <i class="tail-text-gray-400 tail-text-xl ns-receipt"></i>
      <div>
        <p class="tail-block tail-text-sm">
          Invoice Number
        </p>
        <p class="tail-text-sm">
          {{ details.invoiceNo }}
        </p>
      </div>
    </div>
    <div class="tail-flex tail-space-x-6">
      <i class="tail-text-gray-400 tail-text-xl ns-time-check"></i>
      <div>
        <p class="tail-block tail-text-sm">
          Created
        </p>
        <p class="tail-text-sm">
          {{ new Date(details.createdAt).toDateString() }}
        </p>
      </div>
    </div>
    <div class="tail-flex tail-space-x-6">
      <i class="tail-text-gray-400 tail-text-xl ns-time-check"></i>
      <div>
        <p class="tail-block tail-text-sm">
          Due Date
        </p>
        <p class="tail-text-sm">
          {{ new Date(details.dueDate).toDateString() }}
        </p>
      </div>
    </div>
    <div class="tail-flex tail-space-x-6">
      <i class="tail-text-gray-400 tail-text-xl ns-label"></i>
      <div>
        <p class="tail-block tail-text-sm">
          Amount
        </p>
        <p class="tail-text-sm">
          {{ details.total | amount }}
        </p>
      </div>
    </div>
    <div class="tail-flex tail-space-x-6">
      <i class="tail-text-gray-400 tail-text-xl ns-envelope"></i>
      <div>
        <p class="tail-block tail-text-sm">
          Email
        </p>
        <p class="tail-text-sm">
          {{ details.customerId.email }}
        </p>
      </div>
    </div>
    <div class="tail-flex tail-space-x-6">
      <i class="tail-text-gray-400 tail-text-xl ns-user"></i>
      <div>
        <p class="tail-text-sm tail-mb-3">
          Dog Owner
        </p>
        <div class="tail-flex tail-items-center tail-space-x-3">
          <div class="tail-flex-shrink-0">
            <ClientAvatar :client-info="details.customerId" />
          </div>
          <div class="tail-flex-1 tail-min-w-0">
            <div>
              <p class="tail-text-sm tail-font-medium tail-text-gray-900">
                {{ details.customerId.firstName }} {{ details.customerId.lastName }}
              </p>
              <p class="tail-text-sm tail-text-gray-500 tail-truncate">
                {{ details.customerId.pet[0] && details.customerId.pet[0].name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="details.status === 'draft'" class="tail-flex tail-justify-center">
      <button class="base-button" @click.prevent="sendInvoice = true">
        Send Invoice
      </button>
    </div>
    <Modal :input-width="100" :is-open="sendInvoice" @close="sendInvoice = $event" @closeBackDrop="sendInvoice = $event">
      <template v-slot:status>
        <div class="tail-bg-gray-100 tail-text-gray-500 tail-px-2 tail-rounded-3xl">
          Send Invoice
        </div>
      </template>
      <SendInvoice :send-details="details" @close="closeAllModal($event)" />
    </Modal>
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
