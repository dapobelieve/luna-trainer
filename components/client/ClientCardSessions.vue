<template>
  <containers-summary-card-with-notifications
    :enable-view-all="invoices && invoices.length > 3"
    @view-all="goToClientInvoices"
  >
    <template v-slot:icon>
      <i
        class="fi-rr-receipt bg-gray-100 p-1 rounded-full text-gray-500 text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0"
      ></i>
    </template>
    <template v-slot:title>
      <span class="text-base">payments</span>
    </template>
    <template v-slot:content>
      <Async :state="$fetchState">
        <template>
          <ul v-if="invoices && invoices.length" role="list" class="relative z-0 px-1">
            <li v-for="invoice in invoices" :key="invoice.index">
              <Nuxtlink :to="{ name: 'payments-requests-sent', params: { id: invoice.id } }">
                <containers-summary-information-with-avatar>
                  <template v-slot:avatar>
                    <ClientAvatar :client-info="invoice.customerId" />
                  </template>
                  <template v-slot:content>
                    <span class="font-medium">
                      {{ invoice.customerId.firstName }}
                      {{ invoice.customerId.lastName }}
                    </span> has paid you.
                  </template>
                  <template v-slot:date>
                    {{ invoice.dueDate | date }}
                  </template>
                </containers-summary-information-with-avatar>
              </Nuxtlink>
            </li>
          </ul>
          <div
            v-else
            class="text-center pt-8 pb-12 px-4 text-gray-500 text-sm"
          >
            Newly paid invoices will be displayed here.
          </div>
        </template>
      </Async>
    </template>
  </containers-summary-card-with-notifications>
</template>
<script>
import { mapActions } from 'vuex'
import Async from '../util/Async.vue'
export default {
  name: 'ClientCardInvoices',
  components: { Async },
  data () {
    return {
      invoices: []
    }
  },
  fetch () {
    this.getInvoices({ status: 'paid', limit: 4 }).then((r) => { this.invoices = r })
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
