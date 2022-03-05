<template>
  <div class="w-full hover:bg-blue-50 py-2 px-4 rounded-md flex items-center">
    <div class="mr-auto flex">
      <div
        class="bg-blue-50 rounded-full p-3 h-12 w-12 flex justify-center shadow-sm flex-shrink mr-4"
      >
        <i class="fi-rr-calendar text-base text-blue-500 h-4"></i>
      </div>
      <div class="text-gray-700">
        <p class="text-base font-medium">
          You have a session with Abi Carpenter
        </p>
        <small class="text-sm font-normal">Happening now . Remote</small>
        <div class="space-x-2 mt-3">
          <button type="button" class="button-fill">
            Join
          </button>
          <button type="button" class="button-outline">
            Message
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="rounded-full h-2.5 w-2.5 bg-blue-500"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SessionReminder',
  props: {
    notification: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
