<template>
  <div class="tail-h-screen bg-gray-50 tail-flex tail-overflow-hidden">
    <div class="tail-flex-1 tail-flex tail-flex-col tail-overflow-hidden">
      <!-- Main content -->
      <div class="tail-flex-1 tail-flex tail-items-stretch tail-overflow-hidden">
        <main class="tail-flex-1 tail-overflow-y-auto">
          <div class="tail-pt-8 tail-max-w-7xl tail-mx-auto tail-px-4 sm:tail-px-6 lg:tail-px-8">
            <!-- <LeftInvoiceForm client="client" /> -->
          </div>
        </main>

        <!-- sidebar -->
        <aside class="tail-hidden tail-w-5/12 tail-bg-white tail-p-8 border-l tail-border-gray-200 tail-overflow-y-auto lg:tail-block">
          <div class="tail-pb-16 tail-space-y-6">
            new new divs
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invoice',
  layout: 'invoiceLayout'
}
</script>

<style lang="scss" scoped>
</style>
