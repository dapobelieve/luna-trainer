<template>
  <containers-summary-card-with-notifications
    :display-view-all-button="Boolean(paidInvoices.length)"
    url="invoices-sent"
  >
    <template v-slot:icon>
      <i
        class="fi-rr-receipt bg-indigo-50 p-1 rounded-full text-indigo-500 text-lg h-12 w-12 flex items-center justify-center flex-shrink-0"
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
      <div
        v-if="$store.state.invoice.isLoading"
        class="flex place-content-center mt-16"
      >
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
                <span class="font-medium">{{ invoice.customerId.firstName }}
                  {{ invoice.customerId.lastName }}</span> has paid you.
              </template>
              <template v-slot:date>
                {{ invoice.dueDate | howLongAgo }}
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
