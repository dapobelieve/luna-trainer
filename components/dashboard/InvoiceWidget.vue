<template>
  <DashboardCard
    :view-all="widgetData && widgetData.length > 0"
    class="pt-4"
    @action="$router.push({ name: 'payments-requests-sent' })"
  >
    <div class="flex items-center px-4">
      <div class="inline-flex items-center">
        <div
          class="
            h-12
            mr-2
            w-12
            bg-amber-50
            rounded-full
            inline-flex
            justify-center
            items-center
          "
        >
          <i class="fi-rr-receipt text-xl text-amber-500 mt-1"></i>
        </div>
        <h3 class="text-black text-xl">
          Billing
        </h3>
      </div>
      <div class="ml-auto overflow-auto flex items-end">
        <button
          :class="[
            selectedOption === 'paid_awaiting_confirmation' ? 'active' : '',
          ]"
          class="px-1.5 py-0.5 text-sm text-gray-500"
          @click="selectedOption = 'paid_awaiting_confirmation'"
        >
          Awaiting Confirmation
        </button>
        <button
          :class="[selectedOption === 'paid' ? 'active' : '']"
          class="px-1.5 py-0.5 text-sm mr-2 text-gray-500"
          @click="selectedOption = 'paid'"
        >
          Paid
        </button>
        <button
          :class="[selectedOption === 'overdue' ? 'active' : '']"
          class="font-bold px-1.5 py-0.5 text-sm mr-2 text-gray-500"
          @click="selectedOption = 'overdue'"
        >
          Overdue
        </button>
      </div>
    </div>
    <div class="h-full flex-col justify-center">
    <async :state="$fetchState">
      <template class="">
        <div
          v-if="!widgetData || !widgetData.length"
          class="flex items-center h-full justify-center"
        >
          <div class="flex flex-col items-center">
            <i class="fi-rr-receipt text-5xl text-amber-500"></i>
            <h3 class="text-gray-700 text-lg">
              You have no billing items
            </h3>
            <small
              class="text-base text-gray-500"
            >Your payment requests would be displayed here</small>
            <button
              class="button-fill mt-3"
              @click="$router.push({ name: 'payments-request' })"
            >
              Create a Payment Request
            </button>
          </div>
        </div>
        <template v-else>
          <InvoiceWidgetCard
            v-for="(data, dataIndex) in widgetData"
            :key="dataIndex"
            :invoice="data"
          />
        </template>
      </template>
    </async>
    </div>
  </DashboardCard>
</template>

<script>
import { mapActions } from 'vuex'
import Async from '../util/Async.vue'
import DashboardCard from '~/components/dashboard/DashboardCard'
import InvoiceWidgetCard from '~/components/dashboard/InvoiceWidgetCard'
export default {
  components: { InvoiceWidgetCard, DashboardCard, Async },
  data () {
    return {
      imgUrl: null,
      selectedOption: 'paid_awaiting_confirmation',
      widgetData: []
    }
  },
  watch: {
    async selectedOption () {
      await this.$fetch()
    }
  },
  created () {
    this.$nuxt.$on('paid', async () => {
      await this.$fetch()
    })
  },
  async fetch () {
    this.widgetData = await this.getWidgetData(this.selectedOption)
  },
  methods: {
    ...mapActions({
      getWidgetData: 'invoice/getWidgetData'
    })
  }
}
</script>

<style scoped lang="scss">
.active {
  @apply bg-blue-50 text-blue-500;
}
</style>
