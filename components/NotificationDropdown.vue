<template>
  <div class="tail-absolute tail-right-0 tail-border tail-overflow-hidden tail-rounded-lg tail-border-gray-200 tail-top-full tail-mr-3">
    <div class="tail-block notification-dropdown-box tail-rounded tail-bg-white">
      <div class="tail-border-b">
        <div class="tail-px-4 tail-pt-5 tail-pb-2">
          <h3 class="tail-text-base">
            Notifications
          </h3>
          <hr class="divider-color tail-w-28">
        </div>
      </div>
      <div class="tail-grid tail-grid-cols-1 tail-gap-3 tail-p-2">
        <div class="tail-flex tail-py-1">
          <div>
            <img
              class="tail-rounded-full tail-h-14"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            >
          </div>
          <div class="tail-grid tail-px-4">
            <span class="tail-text-base"><strong>James R </strong><small>uploaded an update</small></span>
            <span class="tail-text-xs tail-text-gray-400">2 hours ago</span>
          </div>
        </div>
        <div class="tail-flex tail-py-1">
          <div>
            <img
              class="tail-rounded-full tail-h-14"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            >
          </div>
          <div class="tail-grid tail-px-4">
            <span class="tail-text-base"><strong>Mart R </strong><small>uploaded an update</small></span>
            <span class="tail-text-xs tail-text-gray-400">1 week ago</span>
          </div>
        </div>
        <div class="tail-flex tail-py-1">
          <div>
            <img
              class="tail-rounded-full tail-h-14"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            >
          </div>
          <div class="tail-grid tail-px-4">
            <span class="tail-text-base"><strong>Ali R </strong><small>uploaded an update</small></span>
            <span class="tail-text-xs tail-text-gray-400">1 week ago</span>
          </div>
        </div>
        <div class="tail-flex tail-py-1">
          <div class="tail-w-14 tail-h-14 tail-bg-gray-300 tail-rounded-full tail-flex tail-justify-center tail-items-center">
            <i
              class="ns-bell-ring tail-text-white"
            />
          </div>
          <div>
            <div class="tail-grid">
              <span class="tail-text-base tail-px-4">Your system needs updating</span>
              <span class="tail-text-xs tail-px-4 tail-text-gray-400">1 months ago</span>
            </div>
            <span class="tail-px-4">
              <button class="tail-text-sm tail-rounded tail-border-2 tail-p-1">
                <b>Update</b>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotificationDropdown'
}
</script>
