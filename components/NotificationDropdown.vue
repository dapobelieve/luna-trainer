<template>
  <div class="absolute right-0 border overflow-hidden rounded-xl bg-white border-gray-200 shadow-2xl top-full mr-3 max-w-xs">
    <div class="block rounded bg-white">
      <div class="border-b">
        <div class="px-4 pt-5 pb-4 bg-white">
          <span class="text-base py-2 border-b-2 border-black">
            Notifications
          </span>
        </div>
      </div>
      <div class="grid grid-cols-1" style="background: #F0F5FA">
        <div v-if="0" class="flex items-center hover:bg-gray-200 py-3 px-4 cursor-pointer">
          <img
            class="rounded-full h-11"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          >
          <div class="grid pl-4">
            <p class="text-base font-medium truncate">
              James R
              <span class="font-light">accepted your invite.</span>
            </p>
            <p class="text-sm text-gray-400">
              2 hours ago.
            </p>
          </div>
        </div>
        <div v-else-if="null" class="flex py-4 px-4">
          <div class="bg-gray-200 w-12 h-12 rounded-full flex justify-center items-center">
            <i
              class="fi-rr-bell-ring text-gray-600"
            />
          </div>
          <div>
            <div class="grid">
              <p class="text-base px-4 font-light">
                Your app needs a reload.
              </p>
            </div>
            <span class="px-4">
              <button class="text-sm rounded-md border-2 px-2 py-1 font-medium border-gray-400">
                Reload App
              </button>
            </span>
          </div>
        </div>
        <p v-else class="text-center capitalize my-5 px-4 text-sm">
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
