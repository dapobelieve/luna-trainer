<template>
  <div>
    <PageLoader v-if="isLoading" />
    <div v-else id="printInvoice" class="flex flex-col justify-center align-center mt-6 w-full md:w-4/5 lg:w-3/6 text-gray-700 mx-auto bg-white rounded-md">
      <div class="m-4">
        <div class="flex items-center justify-between px-3">
          <h3 class="text-xl md:text-2xl">
            Getwelp Limited
          </h3>
          <InvoiceStatusComponent status="paid" />
        </div>
        <dl
          class=" grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 mt-4"
        >
          <div class="sm:col-span-1 flex">
            <div class="ml-4">
              <dt class="text-base">
                Tel:
              </dt>
              <dd class="mt-1 truncate">
                {{ client && client.customerId.phoneNumber }}
              </dd>
            </div>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-base">
              Invoice no.
            </dt>
            <dd class="mt-1 truncate">
              {{ client && client.invoiceNo }}
            </dd>
          </div>

          <div class="sm:col-span-2  flex">
            <div class="ml-4">
              <dt class="text-base">
                Bill to
              </dt>
              <dd class="">
                <div class="flex  items-center">
                  <template v-if="client">
                    <ClientAvatar :client-info="client.customerId" />
                  </template>
                  <div class="ml-4">
                    <h6 class=" text-base  text-gray-700  text-capitalize">
                      {{ client && client.customerId.firstName }}  {{ client && client.customerId.lastName }}
                    </h6>
                    <span class=" text-sm  text-gray-500"> {{ client && client.customerId.email }}</span>
                  </div>
                </div>
              </dd>
            </div>
          </div>
          <div class="sm:col-span-1  flex">
            <div class="ml-4">
              <dt class="text-base">
                Date of Issue:
              </dt>
              <dd class="mt-1 truncate">
                {{ client && client.updatedAt | date }}
              </dd>
            </div>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-base">
              Date Due:
            </dt>
            <dd class="mt-1 truncate">
              {{ client && client.dueDate | date }}
            </dd>
          </div>
        </dl>
        <div class="mt-6">
          <table class="table-auto bg-white w-full text-xs rounded-md">
            <thead class="">
              <tr class="uppercase tracking-wider text-gray-500">
                <th class="py-4 font-medium text-xs text-left pr-6 pl-4 w-2/6">
                  Description
                </th>
                <th class="py-4 font-medium text-xs px-6">
                  QTY
                </th>
                <th class="py-4 font-medium text-xs px-6">
                  UNIT PRICE
                </th>
                <th class="py-4 font-medium text-xs pl-6">
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in client && client.items" :key="item._id" class="text-center  text-gray-500">
                <td class=" py-4  text-left text-base text-gray-700 pl-4 pr-6  w-2/5">
                  {{ item.description || '' }}
                </td>
                <td class=" py-4 text-base text-gray-700 px-6">
                  {{ item.qty }}
                </td>
                <td class=" py-4 text-base text-gray-700 px-6">
                  {{ currency }}  {{ item.price }}
                </td>
                <td class=" py-4 text-base text-gray-700 pl-6">
                  {{ currency }} {{ item.price * item.qty }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class=" border-b  my-2 mx-3" />
          <div class="flex items-center justify-between px-3">
            <p class="text-sm my-3">
              SubTotal
            </p>
            <p>{{ currency }} {{ client && client.total }}</p>
          </div>
          <div class="flex items-center justify-between px-3">
            <h4 class="text-lg my-3">
              Total
            </h4>
            <h4 class="text-lg my-3">
              {{ currency }} {{ client && client.total }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  asyncData ({ params }) {
    return { id: params.id }
  },
  data () {
    return {
      client: null,
      isLoading: true
    }
  },
  computed: {
    ...mapState({
      currency: state => state.profile.trainnerRegData.personalProfile.currency
    })
  },
  mounted () {
    this.getSingleInvoice(this.id)
      .then((response) => {
        this.isLoading = false
        this.client = response.data
      })
      .catch((err) => {
        console.log(err)
        this.isLoading = false
      })
  },
  methods: {
    ...mapActions({
      getSingleInvoice: 'invoice/getSingleInvoice'
    })
  }
}
</script>

<style>

</style>
