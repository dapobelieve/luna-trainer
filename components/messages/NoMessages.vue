<template>
  <div class="no-messages">
    <div class="max-width">
      <i class="fi-rr-comment-alt text-sky-500 text-4xl"></i>
      <p class="title">
        You have no messages yet
      </p>
      <p class="sub-title">
        Looks like you haven’t started a conversation with your client.
      </p>
      <button class="action-btn">
        <span>Start a conversation</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoMessages'
}
</script>

<style lang="scss" scoped>
.no-messages {
  @apply w-full font-normal text-center mt-36;
  .max-width {
    @apply mx-auto;
    max-width: 384px;
    .title {
      @apply text-lg text-center text-gray-700 mb-1;
    }
    .sub-title {
      @apply text-sm text-center text-gray-500 pb-4;
    }
    .action-btn {
      @apply bg-blue-500 text-white py-2 px-4;
    }
  }
}
</style>
