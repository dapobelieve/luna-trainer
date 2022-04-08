<template>
  <nav class="flex overflow-y-auto text-sm">
    <div class="flex-grow flex">
      <div class="flex-1 space-y-4">
        <!-- navigation -->
        <client-card-navigation />

        <!-- invoices -->
        <div>
          <containers-summary-card-with-notifications
            :display-view-all-button="Boolean(paidInvoices.length)"
            url="Invoices"
            :class="{'payment-tab__hidden': displayComponent}"
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
              <div v-if="$store.state.invoice.isLoading" class="flex place-content-center mt-16">
                <SingleLoader />
              </div>
              <template v-else>
                <ul v-if="paidInvoices.length" role="list" class="relative z-0 px-1">
                  <li v-for="invoice in paidInvoices" :key="invoice.index">
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
                  </li>
                </ul>
                <div
                  v-else
                  class="text-center pt-8 pb-12 px-4 text-gray-500 text-sm"
                >
                  Newly paid invoices will be displayed here.
                </div>
              </template>
            </template>
          </containers-summary-card-with-notifications>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
import Helpers from '~/mixins/helpers'
export default {
  name: 'ClientSidebarContent',
  mixins: [Helpers],
  data () {
    return {
      paidInvoices: []
    }
  },
  mounted () {
    // this.fetchPaidInvoices({ status: 'paid', limit: 3 }).then((r) => { this.paidInvoices = r }).catch(e => console.error(e))
  },
  methods: {
    ...mapActions({
      // fetchPaidInvoices: 'invoice/fetchInvoiceWithStatusAndLimit'
    })
  }
}
</script>

<style lang="scss" scoped>
 .payment-tab__hidden {
    display: none;
  }
@media only screen and (min-width: 1024px) {
 .payment-tab__hidden {
    display: block;
  }
}
</style>
