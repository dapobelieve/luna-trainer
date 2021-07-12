<template>
  <div class="tail-py-5 tail-rounded-lg">
    <div class="tail-bg-white tail-rounded-lg tail-p-4">
      <div class="tail-pb-4">
        <h1 class="tail-font-medium">
          {{ $auth.user.businessName }}
        </h1>
      </div>
      <div class="tail-p-0">
        <div class="tail-border tail-rounded">
          <div class="tail-grid tail-grid-cols-2 tail-gap-4 tail-p-3">
            <div>
              <span class="tail-text-gray-400">From</span>
              <p>Brand Name</p>
            </div>
            <div>
              <span class="tail-text-gray-400">To</span>
              <p>Client's Name</p>
            </div>
          </div>
          <div class=" tail-py-2 tail-px-3">
            <div class="tail-rounded" style="background-color: #f0f5fa;">
              <div class="tail-p-3">
                <p class="tail-text-gray-400">
                  Amount
                </p>
                <p class="tail-text-2xl">
                  £0.00
                </p>
                <p class="tail-text-sm">
                  Due on May 25, 2021
                </p>
              </div>
            </div>
          </div>
          <div class="tail-p-1">
            <hr />
          </div>
          <div class="tail-p-3">
            <div class="tail-flex tail-justify-between">
              <div>
                <p><strong>Behaviour Consuming</strong></p>
                <p class="tail-text-gray-500">
                  Qty <span>1</span>
                </p>
              </div>
              <div class="tail-p-3">
                <span>£60</span>
              </div>
            </div>
            <div class="tail-flex tail-justify-between">
              <div>
                <p><strong>Milage</strong></p>
                <p class="tail-text-gray-500">
                  Qty <span>1</span>
                </p>
              </div>
              <div class="tail-p-3">
                <span>£10</span>
              </div>
            </div>
            <div class="tail-p-1">
              <hr />
            </div>
            <div class="tail-flex tail-justify-between tail-py-4">
              <div>
                <p><strong>Amount Due</strong></p>
              </div>
              <div class="tail-pr-2">
                <span>£70</span>
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
  name: 'RightInvoiceEmail'
}
</script>
<style scoped>
</style>
