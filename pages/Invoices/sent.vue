<template>
  <div>
    <div class="tail-flex tail-mt-6 tail-px-3 tail-mb-5">
      <div class="actions">
        <span class="tail-cursor-pointer tail-mr-4 tail-inline-flex tail-items-center tail-text-sm tail-font-medium text-primary-color tail-text-base" to="/">
          <i class="ns-archive tail-mr-1"></i>
          <span>Archive</span>
        </span>
        <span class="tail-cursor-pointer tail-inline-flex tail-items-center tail-text-sm tail-font-medium text-primary-color tail-text-base" to="/">
          <i class="ns-download tail-mr-1"></i>
          <span>Export</span>
        </span>
      </div>
    </div>
    <div class="tail-px-3">
      <table class="tail-table-auto tail-bg-white tail-w-full tail-text-xs tail-rounded-md">
        <thead class="">
        <tr class="tail-uppercase tail-tracking-wider tail-text-gray-500">
          <th class="tail-w-12  tail-py-4 tail-font-medium tail-pl-1">
            <div>
              <AppCheckboxComponent  />
            </div>
          </th>
          <th class="tail-py-4 tail-font-medium tail-text-left tail-px-6 tail-w-3/6">Name</th>
          <th class="tail-py-4 tail-font-medium tail-px-6">INVOICE#</th>
          <th class="tail-py-4 tail-font-medium tail-px-6">CREATED</th>
          <th class="tail-py-4 tail-font-medium tail-px-6">AMOUNT</th>
          <th class="tail-py-4 tail-font-medium tail-px-6">STATUS</th>
        </tr>
        </thead>
        <tbody class="tail-px-8">
        <tr v-for="x in 12" class="tail-text-center tail-text-gray-500 hover:tail-bg-blue-50 hover:tail-cursor-pointer">
          <td class="tail-w-12  tail-py-4 tail-font-medium tail-pl-1">
            <div>
              <AppCheckboxComponent :id="x" v-model="checkedItems" :value="x"  />
            </div>
          </td>
          <td class="tail-py-4 tail-text-left tail-px-6 tail-w-3/6">
            <div class="tail-flex tail-items-center">
              <ClientAvatar />
              <div class="tail-ml-4">
                <h6 class="tail-text-base tail-text-gray-700">Abi Carpenter</h6>
                <span class="tail-text-sm tail-text-gray-500">believe.gmail.com</span>
              </div>
            </div>
          </td>
          <td class="tail-py-4  tail-px-6">
            <div class="tail-text-base tail-text-gray-700">039211224</div>
          </td>
          <td class="tail-py-4  tail-px-6">
            <div class="tail-text-base tail-text-gray-700">
              Friday 30 April, 2021
            </div>
          </td>
          <td class="tail-py-4  tail-px-6">
            <div class="tail-text-base tail-text-gray-700">
              {{"\uFFE1"}}56
            </div>
          </td>
          <td class="tail-py-4 tail-px-6">
            <InvoiceStatusComponent status="outstanding" />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedItems: []
    }
  }
}
</script>

<style lang="scss" scoped>
input[type=checkbox] {
  background: red;
}
</style>