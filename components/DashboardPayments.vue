<template>
  <containers-summary-card-with-notifications
    :display-view-all-button="Boolean(paidInvoices.length)"
    url="Invoices"
  >
    <template v-slot:icon>
      <i
        class="ns-receipt tail-bg-blue-50 tail-p-1 tail-rounded-full tail-text-blue-500 tail-text-2xl"
      ></i>
    </template>
    <template v-slot:title>
      invoices
    </template>
    <template v-slot:notifications>
      {{ paidInvoices.length }} new notification{{
        paidInvoices.length > 1 ? "s" : ""
      }}
    </template>
    <template v-slot:content>
      <div v-if="$store.state.invoice.isLoading" class="tail-flex tail-place-content-center tail-mt-16">
        <SingleLoader />
      </div>
      <template v-else>
        <ul v-if="paidInvoices.length" role="list" class="tail-relative tail-z-0 tail-mx-0.5">
          <li
            v-for="invoice in paidInvoices"
            :key="invoice.index"
          >
            <containers-summary-information-with-avatar>
              <template v-slot:avatar>
                <ClientAvatar :client-info="invoice.customerId" />
              </template>
              <template v-slot:content>
                {{ invoice.customerId.firstName }}
                {{ invoice.customerId.lastName }} has paid you.
              </template>
              <template v-slot:date>
                {{ invoice.dueDate | date }}
              </template>
            </containers-summary-information-with-avatar>
          </li>
        </ul>
        <div v-else class="tail-text-center tail-mt-10 tail-px-4">
          Newly paid invoices will be displayed here.
        </div>
      </template>
    </template>
  </containers-summary-card-with-notifications>
</template>

<script>
export default {
  name: 'DashboardPayments',
  props: {
    paidInvoices: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
