<template>
  <div class="tail-absolute tail-right-0 tail-border tail-overflow-hidden tail-rounded-xl tail-bg-white tail-border-gray-200 tail-shadow-2xl tail-top-full tail-mr-3 tail-max-w-xs">
    <div class="tail-block tail-rounded tail-bg-white">
      <div class="tail-border-b">
        <div class="tail-px-4 tail-pt-5 tail-pb-4 tail-bg-white">
          <span class="tail-text-base tail-py-2 tail-border-b-2 tail-border-black">
            Notifications
          </span>
        </div>
      </div>
      <div class="tail-grid tail-grid-cols-1" style="background: #F0F5FA">
        <div v-if="0" class="tail-flex tail-items-center hover:tail-bg-gray-200 tail-py-3 tail-px-4 tail-cursor-pointer">
          <img
            class="tail-rounded-full tail-h-11"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          >
          <div class="tail-grid tail-pl-4">
            <p class="tail-text-base tail-font-medium tail-truncate">
              James R
              <span class="tail-font-light">accepted your invite.</span>
            </p>
            <p class="tail-text-sm tail-text-gray-400">
              2 hours ago.
            </p>
          </div>
        </div>
        <div v-else-if="null" class="tail-flex tail-py-4 tail-px-4">
          <div class="tail-bg-gray-200 tail-w-12 tail-h-12 tail-rounded-full tail-flex tail-justify-center tail-items-center">
            <i
              class="ns-bell-ring tail-text-gray-600"
            />
          </div>
          <div>
            <div class="tail-grid">
              <p class="tail-text-base tail-px-4 tail-font-light">
                Your app needs a reload.
              </p>
            </div>
            <span class="tail-px-4">
              <button class="tail-text-sm tail-rounded-md tail-border-2 tail-px-2 tail-py-1 tail-font-medium tail-border-gray-400">
                Reload App
              </button>
            </span>
          </div>
        </div>
        <p v-else class="tail-text-center tail-capitalize tail-my-5 tail-px-4 tail-text-sm">
          no notification at this time.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotificationDropdown'
}
</script>
