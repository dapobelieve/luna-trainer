<template>
  <nav class="tail-flex tail-overflow-y-auto tail-text-sm">
    <div class="tail-flex-grow tail-flex">
      <div class="tail-flex-1 tail-space-y-4">
        <slot name="petSummary" />
        <client-card-navigation />
        <gw-summary-card :data="nextupData">
          <div class="tail-flex">
            <div class="tail-flex tail-items-center tail-space-x-3">
              <span class="tail-p-1 tail-bg-green-600 tail-rounded-full"></span>
              <div class="">
                <p>
                  <b>
                    1:1</b> with <b>Abi Carpenter</b>
                </p>
                <p>
                  23 May, 1:00 PM
                </p>
              </div>
            </div>
          </div>
          <div class="tail-flex">
            <div class="tail-flex tail-items-center tail-space-x-3">
              <span class="tail-p-1 tail-bg-green-600 tail-rounded-full"></span>
              <div class="">
                <p>
                  <b>
                    1:1</b> with <b>Abi Carpenter</b>
                </p>
                <p>
                  23 May, 1:00 PM
                </p>
              </div>
            </div>
          </div>
        </gw-summary-card>
        <gw-summary-card :data="receiptData">
          <button v-for="n in 2" :key="n" class="tail-flex tail-justify-between tail-items-center tail-w-full hover:tail-bg-gray-50">
            <div class="tail-flex tail-items-center tail-space-x-3">
              <ClientAvatar firstname="get" lastname="welp" />
              <div class="tail-text-left">
                <p>
                  Abi Carpenter has paid you
                </p>
                <p>
                  1:00 PM
                </p>
              </div>
            </div>
            <img src="~/assets/img/svgs/chevron-right.svg" alt="" srcset="">
          </button>
        </gw-summary-card>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ClientSidebarContent',
  data () {
    return {
      receiptData: { title: 'payments', icon: 'receipt' },
      nextupData: { title: 'Next up', icon: 'calendar' }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
