<template>
  <containers-summary-card-with-notifications
    :display-view-all-button="Boolean(paidInvoices.length)"
    url="Invoices"
  >
    <template v-slot:icon>
      <i
        class="ns-receipt tail-bg-indigo-50 tail-p-1 tail-rounded-full tail-text-indigo-500 tail-text-2xl tail-h-12 tail-w-12 tail-flex tail-items-center tail-justify-center tail-flex-shrink-0"
      ></i>
    </template>
    <template v-slot:title>invoices</template>
    <template v-slot:notifications>
      {{ paidInvoices.length }} new notification{{
      paidInvoices.length > 1 ? "s" : ""
      }}
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
              <template v-slot:date>{{ invoice.dueDate | date }}</template>
            </containers-summary-information-with-avatar>
          </li>
        </ul>
        <div
          v-else
          class="tail-text-center tail-pt-8 tail-pb-12 tail-px-4 tail-text-gray-500 tail-text-sm"
        >Newly paid invoices will be displayed here.</div>
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
