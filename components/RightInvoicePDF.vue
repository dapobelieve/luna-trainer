<template>
  <div class="right-card tail-px-10 tail-py-8 tail-rounded-lg">
    <h1 class="tail-font-medium tail-text-xl tail-py-2">
      Preview
    </h1>
    <div class="tail-pb-4">
      <span
        class="tail-text-gray-400 tail-text-sm"
      >A short description about this section</span>
    </div>
    <div class="tail-flex tail-pb-4">
      <div class="">
        <span class="tail-text-gray-500">Email</span>
      </div>
      <div class="tail-px-5">
        <span>Invoice PDF</span>
      </div>
    </div>
    <div class="tail-bg-white tail-rounded-md tail-p-8">
      <div class="tail-pb-4 tail-grid tail-grid-cols-2 tail-gap-8">
        <div>
          <h1 class="tail-text-xl tail-font-semibold">
            {{ $auth.user.businessName }}
          </h1>
          <span class="tail-text-gray-500 tail-text-xs">+44 000 000 0000</span>
        </div>
        <div class="tail-text-right">
          <h1 class="tail-text-xl tail-font-medium tail-text-gray-500">
            Invoice
          </h1>
          <p class="tail-text-gray-500 tail-text-xs">
            Invoice No.: #########-##
          </p>
          <p class="tail-text-gray-500 tail-text-xs">
            Date of Issue: {{ new Date().toDateString() }}
          </p>
          <p class="tail-text-gray-500 tail-text-xs">
            Date Due: Jul 23, 2021
          </p>
        </div>
      </div>
      <div>
        <div class="">
          <div>
            <p class="tail-text-gray-500 tail-text-sm">
              Bill to
            </p>
            <p class="tail-text-gray-500 tail-text-sm">
              {{ `${$route.params.client.firstName} ${$route.params.client.lastName}` }}
            </p>
            <p class="tail-text-gray-500 tail-text-sm">
              {{ `${$route.params.client.email}` }}
            </p>
          </div>
          <div class="tail-py-4">
            <span class="tail-text-xl tail-font-semibold">£120.00 due June 23, 2021</span>
          </div>
          <div>
            <div class="tail-grid tail-grid-cols-12 tail-gap-4  tail-text-sm">
              <div class="tail-col-span-5">
                <span class="tail-text-gray-500">Description</span>
                <p>Behaviour Consulting</p>
                <p>Milage</p>
              </div>
              <div class="tail-col-span-1">
                <span class="tail-text-gray-500">Qty</span>
                <p class="tail-text-gray-500">
                  1
                </p>
                <p class="tail-text-gray-500">
                  1
                </p>
              </div>
              <div class="tail-col-span-3">
                <span class="tail-text-gray-500">Unit Price</span>
                <p class="tail-text-gray-500">
                  £100
                </p>
                <p class="tail-text-gray-500">
                  £20
                </p>
              </div>
              <div class="tail-col-span-3">
                <span class="tail-text-gray-500">Amount</span>
                <p>£100</p>
                <p>£20</p>
              </div>
            </div>
            <div class="tail-p-1">
              <hr />
            </div>
            <div class="tail-flex tail-justify-end tail-py-4">
              <div>
                <div class="tail-grid tail-grid-cols-6">
                  <div
                    class="
                    tail-col-span-3
                  tail-text-gray-500"
                  >
                    <p><strong>Sub Total</strong></p>
                  </div>
                  <div>
                    <span>£70</span>
                  </div>
                </div>
                <div class="tail-grid tail-grid-cols-6">
                  <div class="tail-text-gray-500 tail-col-span-3">
                    <p><strong>Total</strong></p>
                  </div>
                  <div>
                    <span>£120</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RightInvoicePdf'
}
</script>
<style scoped>
.right-card {
  width: 36.25rem;
  height: 51.25rem;
  background-color: #f0f5fa;
}
</style>
