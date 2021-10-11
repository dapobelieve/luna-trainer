<template>
  <div class="tail-rounded-xl tail-border tail-bg-white tail-shadow-sm tail-overflow-hidden">
    <div class="tail-font-normal tail-p-4 tail-pt-5 tail-flex tail-flex-col tail-space-y-2">
      <h1 class="tail-capitalize tail-text-3xl">hey {{ $auth.user.firstName }}!</h1>
      <p
        class="tail-text-gray-500"
      >Welcome back! If you need the GetWelp Team’s help with anything, just pop us a message in the live chat below!</p>
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
