<template>
  <nav class="tail-flex tail-overflow-y-auto tail-text-sm">
    <div class="tail-flex-grow tail-flex">
      <div class="tail-flex-1 tail-space-y-4">
        <div
          class="tail-bg-white tail-rounded-lg tail-flex tail-justify-between tail-p-4 tail-mb-3"
          aria-current="page"
        >
          <div>
            <p>
              Dog: Diesel
            </p>
            <p>
              Age: 9
            </p>
            <p>
              Breed: Pitbull
            </p>
          </div>
          <p>
            2 courses
          </p>
        </div>
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
          <button class="tail-flex tail-justify-between tail-items-center tail-w-full hover:tail-bg-gray-50">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 512 512"
            >
              <title>ionicons-v5-a</title>
              <polyline
                points="184 112 328 256 184 400"
                style="fill:none;stroke:#56CCF2;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
              />
            </svg>
          </button>
          <button class="tail-flex tail-justify-between tail-items-center tail-w-full hover:tail-bg-gray-50">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 512 512"
            >
              <title>ionicons-v5-a</title>
              <polyline
                points="184 112 328 256 184 400"
                style="fill:none;stroke:#56CCF2;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
              />
            </svg>
          </button>
        </gw-summary-card>
      </div>
    </div>
  </nav>
</template>

<script>
import GwSummaryCard from './util/GwSummaryCard.vue'
export default {
  name: 'ClientSidebarContent',
  components: { GwSummaryCard },
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
