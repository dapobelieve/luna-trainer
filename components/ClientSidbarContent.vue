<template>
  <nav class="tail-flex tail-overflow-y-auto tail-text-sm">
    <div class="tail-flex-grow tail-flex">
      <div class="tail-flex-1 tail-space-y-4">
        <!-- navigation -->
        <client-card-navigation />

        <!-- invoices -->
        <div class="tail-hidden lg:tail-block">
          <containers-summary-card-with-notifications
            :display-view-all-button="Boolean(paidInvoices.length)"
            url="Invoices"
          >
            <template v-slot:icon>
              <i
                class="ns-receipt tail-bg-indigo-50 tail-p-1 tail-rounded-full tail-text-gray-500 tail-text-2xl tail-h-12 tail-w-12 tail-flex tail-items-center tail-justify-center tail-flex-shrink-0"
              ></i>
            </template>
            <template v-slot:title>
              <span class="tail-text-base">
                payments
              </span>
            </template>
            <template v-slot:content>
              <div
                v-if="$store.state.invoice.isLoading"
                class="tail-flex tail-place-content-center tail-mt-16"
              >
                <SingleLoader />
              </div>
              <template v-else>
                <ul v-if="paidInvoices.length" role="list" class="tail-relative tail-z-0 tail-px-1">
                  <li v-for="invoice in paidInvoices" :key="invoice.index">
                    <containers-summary-information-with-avatar>
                      <template v-slot:avatar>
                        <ClientAvatar :client-info="invoice.customerId" />
                      </template>
                      <template v-slot:content>
                        <span class="tail-font-medium">{{ invoice.customerId.firstName }}
                          {{ invoice.customerId.lastName }}</span> has paid you.
                      </template>
                      <template v-slot:date>
                        {{ invoice.dueDate | date }}
                      </template>
                    </containers-summary-information-with-avatar>
                  </li>
                </ul>
                <div
                  v-else
                  class="tail-text-center tail-pt-8 tail-pb-12 tail-px-4 tail-text-gray-500 tail-text-sm"
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
export default {
  name: 'ClientSidebarContent',
  data () {
    return {
      paidInvoices: []
    }
  },
  mounted () {
    this.fetchPaidInvoices({ status: 'paid', limit: 3 }).then((r) => { this.paidInvoices = r }).catch(e => console.error(e))
  },
  methods: {
    ...mapActions({
      fetchPaidInvoices: 'invoice/fetchInvoiceWithStatusAndLimit'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
