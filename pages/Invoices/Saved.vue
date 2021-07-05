<template>
  <div>
    <div
      class="tail-grid tail-grid-cols-8 gap-2 tail-mt-5 tail-w-100 tail-rounded-md tail-bg-white tail-p-4 tail-items-center"
    >
      <div
        class="tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
      >
        Select
      </div>
      <div
        class="tail-col-span-3 tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
      >
        Name
      </div>
      <div
        class="tail-mr-auto tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
      >
        Invoice #
      </div>
      <div
        class="tail-mr-auto tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
      >
        Created
      </div>
      <div
        class="tail-mr-auto tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
      >
        Amount
      </div>
      <div
        class="tail-mr-auto tail-text-left tail-font-medium tail-text-gray-400 tail-uppercase tail-tracking-wider tail-text-sm"
      >
        Status
      </div>
    </div>

    <div
      class="tail-grid tail-grid-cols-8 gap-2 tail-my-2 tail-w-100 tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-items-center"
    >
      <input type="checkbox" name="vehicle1" value="Bike">
      <div class="tail-col-span-3 tail-whitespace-nowrap">
        <div class="tail-flex tail-items-center">
          <div class="tail-flex-shrink-0 tail-h-10 tail-w-10">
            <img class="tail-h-10 tail-w-10 tail-rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
          </div>
          <div class="tail-ml-4">
            <div class="tail-font-medium">Jane Cooper</div>
          </div>
        </div>
      </div>
      <div class="tail-mr-auto tail-whitespace-nowrap">
        <div class="tail-font-normal">039211224</div>
      </div>
      <div class="tail-mr-auto tail-whitespace-nowrap">
        <div class="tail-font-normal">Friday 30 April, 2021</div>
      </div>
      <div class="tail-mr-auto tail-whitespace-nowrap">
        <div class="tail-font-medium">£60</div>
      </div>
      <div class="tail-mr-auto tail-whitespace-nowrap">
        <span
          class="tail-px-4 tail-py-1 tail-rounded-full tail-bg-gray-100 tail-text-gray-500 tail-text-sm tail-font-light"
        >Draft</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Saved',
  computed: {
    ...mapGetters({
      getAllInvoices: 'invoice/getAllInvoices'
    })
  },
  mounted () {
    this.getInvoices()
  },
  methods: {
    ...mapActions({
      getInvoices: 'invoice/getAllInvoices'
    })
  }
}
</script>

<style lang="scss" scoped></style>
