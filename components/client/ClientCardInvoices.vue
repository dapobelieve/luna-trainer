<template>
  <containers-summary-card-with-notifications
    :enable-view-all="size > (invoices && invoices.length)"
    @view-all="goToClientInvoices"
  >
    <template v-slot:icon>
      <i
        class="fi-rr-receipt bg-gray-100 p-1 rounded-full text-gray-500 text-2xl h-10 w-10 flex items-center justify-center flex-shrink-0"
      ></i>
    </template>
    <template v-slot:title>
      <span class="text-base">payments</span>
    </template>
    <template v-slot:content>
      <Async :state="$fetchState">
        <template>
          <ul v-if="invoices && invoices.length" role="list" class="relative z-0 px-1">
            <li v-for="invoice in invoices" :key="invoice.id" class="cursor">
              <NuxtLink :to="{ name: 'payments-requests-sent', params: { id: invoice.id } }">
                <containers-summary-information-with-avatar>
                  <template v-slot:avatar class="w-6 h-6">
                    <ClientAvatar :client-info="invoice.customerId" />
                  </template>
                  <template v-slot:content>
                    <span class="font-medium">
                      {{ invoice.customerId.firstName }}
                      {{ invoice.customerId.lastName }}
                    </span>
                    <p class="mt-2">
                      {{ invoice.total | amount }}
                    </p>
                  </template>
                  <template v-slot:date>
                    <div class="flex flex-col items-end">
                      <InvoiceStatusComponent :status="invoice.status" />
                      <p class="mt-2">{{ invoice.dueDate | date }}</p>
                    </div>
                  </template>
                </containers-summary-information-with-avatar>
              </NuxtLink>
            </li>
          </ul>
          <div
            v-else
            class="text-center pt-8 pb-12 px-4 text-gray-500 text-sm"
          >
            Payment requests will be displayed here.
          </div>
        </template>
      </Async>
    </template>
  </containers-summary-card-with-notifications>
</template>
<script>
import { mapActions } from 'vuex'
import Async from '../util/Async.vue'
import InvoiceStatusComponent from '../InvoiceStatusComponent.vue'
export default {
  name: 'ClientCardInvoices',
  components: { Async, InvoiceStatusComponent },
  props: {
    clientUserId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      invoices: [],
      size: 0
    }
  },
  fetch () {
    if (this.clientUserId) {
      this.getInvoices({ workflowStatus: 'sent', limit: 3, customerUserId: this.clientUserId }).then((r) => {
        this.invoices = r.data
        this.size = r.size
      })
    }
  },
  methods: {
    ...mapActions({
      getInvoices: 'invoice/getInvoices'
    }),
    goToClientInvoices () {
      this.$router.push({
        name: 'payments-requests-sent',
        query: { name: this.$route.params.id }
      })
    }
  }
}
</script>
