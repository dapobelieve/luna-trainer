<template>
  <div class="tail-rounded-xl tail-border tail-border-gray-50 tail-bg-white tail-shadow tail-overflow-hidden">
    <div class="tail-font-normal tail-p-3 tail-flex tail-flex-col tail-space-y-2">
      <h1 class="tail-capitalize tail-text-2xl tail-text-gray-700">
        hey {{ $auth.user.firstName }}!
      </h1>
      <small class="tail-text-gray-500 tail-text-base">
        Welcome back! If you need the GetWelp Team’s help with anything, just pop us a message in the live chat below!
      </small>
    </div>
    <dashboard-status-card />
  </div>
</template>

<script>
export default {
  name: 'DashboardIntroCard'
}
</script>

<style lang="scss" scoped>

</style>
