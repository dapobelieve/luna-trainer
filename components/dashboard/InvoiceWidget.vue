<template>
  <DashboardCard view-all class="pt-4">
    <div class="flex items-center px-4">
      <div class="inline-flex items-center">
        <div class="h-12 mr-2 w-12 bg-amber-50 rounded-full inline-flex justify-center items-center">
          <i class="fi-rr-receipt text-xl text-amber-500 mt-1"></i>
        </div>
        <h3 class="text-black text-xl">Billing</h3>
      </div>
      <div class="ml-auto ">
        <button class="active text-sm mr-2 text-gray-500">All</button>
        <button class="text-sm mr-2 text-gray-500">Paid</button>
        <button class="text-sm mr-2 text-gray-500">Overdue</button>
        <button class="text-sm text-gray-500">Pending</button>
      </div>
    </div>
    <div class="h-full flex-col justify-center">
      <div v-if="fetching" class="flex h-full items-center justify-center">
        <SingleLoader height="40px" width="40px" />
      </div>
      <div v-else class="">
        <div class="px-4 flex items-center mb-4 mt-6" v-for="x in 4">
          <div class="flex items-start">
            <div class="relative w-12 mr-4 flex-shrink-0">
              <img :src="imgUrl" class="h-12 w-12 rounded-full">
              <img class="absolute rounded-full shadow-md bottom-0 right-0" src="~/assets/img/billing/paypal.svg">
            </div>
            <div>
              <h3>Overdue bank transfer of <span class="font-medium">£800</span> from <span class="font-medium">Abi Carpenter</span></h3>
              <p class="text-sm mt-">Last sent: 6th June</p>
              <p class="text-sm text-gray-400">6th June</p>
            </div>
          </div>
          <div class="ml-auto">
            <button class="border px-2">
              <i class="fi-rr-bell-ring text-primary-color mt-1"></i>
            </button>
          </div>
        </div>
<!--        <div class="flex items-center justify-center">-->
<!--          <div class="flex flex-col items-center">-->
<!--            <i class="fi-rr-receipt text-5xl text-amber-500"></i>-->
<!--            <h3 class="text-gray-700 text-lg">-->
<!--              You have no billing items-->
<!--            </h3>-->
<!--            <small class="text-base text-gray-500">Your invoices would be displayed here</small>-->
<!--            <button class="button-fill mt-3">-->
<!--              Create an invoice-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </DashboardCard>
</template>

<script>
import DashboardCard from "~/components/dashboard/DashboardCard";
export default {
  data() {
    return {
      imgUrl: 'https://res.cloudinary.com/rohing/image/upload/v1646190983/gitProfile_qje88s.png',
      fetching: false,
      selectedOption: null,
      invoices: [],
    }
  },
  computed: {
    getInvoices() {
      return this.invoices
    }
  },
  components: { DashboardCard },
  methods: {
    async fetchInvoices() {
      this.fetching = true
      try {
        this.invoices = await this.$store.dispatch('invoice/getFetchCustomerInvoice')
      }catch (e) {

      }finally {
        this.fetching = false
      }
    }
  },
  async mounted() {
    await this.fetchInvoices()
  }
}
</script>

<style scoped lang="scss">
.active {
  
}
</style>