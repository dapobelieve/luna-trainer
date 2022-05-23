<template>
  <div class="no-notifications">
    <div class="max-width">
      <i class="fi-rr-bell-ring text-sky-500 text-4xl"></i>
      <p class="title">
        You have no notifications yet
      </p>
      <p class="sub-title">
        Your notifications and alerts abut your luna account will show here.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoNotifications'
}
</script>

<style lang="scss" scoped>
.no-notifications {
    @apply w-full font-normal text-center mt-36;
    .max-width {
        @apply mx-auto;
        max-width: 384px;
        .title {
            @apply text-lg text-center text-gray-700 mb-1;
        }
        .sub-title {
            @apply text-sm text-center text-gray-500;
        }
    }
}
</style>
