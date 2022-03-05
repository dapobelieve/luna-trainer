<template>
  <button
    type="button"
    :class="[
      notification.status === 'UNREAD' ? '' : 'bg-blue-50',
      'w-full hover:bg-blue-50 py-2 px-4 rounded-md flex items-center',
    ]"
  >
    <div
      :class="[
        notification.status === 'UNREAD' ? 'font-bold' : 'font-normal',
        'mr-auto flex',
      ]"
    >
      <div class="mr-4 flex">
        <span class="relative inline-block">
          <ClientAvatar
            :client-info="{ firstName: notification.data.vendorId.name }"
          />
          <span
            class="absolute -bottom-1 -right-1 bg-white rounded-full p-2 h-6 w-6 grid place-content-center flex-shrink"
          >
            <i class="fi-rr-bank text-xs h-3 text-blue-500"></i>
          </span>
        </span>
      </div>
      <div class="text-gray-700 truncate">
        <p :class="[notification.status === 'UNREAD' ? 'font-bold' : 'font-normal', 'text-base truncate']">
          Bank payment of {{ $store.state.profile.currency
          }}{{ notification.data.amount }} from
          <span class="capitalize font-medium">{{
            notification.data.vendorId.name
          }}</span>
        </p>
        <small :class="[notification.status === 'UNREAD' ? 'font-bold text-blue-500' : 'font-normal', 'block text-sm text-left']">{{
          notification.createdAt | howLongAgo
        }}</small>
      </div>
    </div>
    <div v-if="notification.status === 'UNREAD'">
      <div class="rounded-full h-2.5 w-2.5 bg-blue-500"></div>
    </div>
    <i v-else class="fi-rr-angle-right text-blue-500"></i>
  </button>
</template>

<script>
export default {
  name: 'ReceivedPayment',
  props: {
    notification: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
