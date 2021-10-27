<template>
  <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
    <div class="font-normal p-4 pt-5 flex flex-col space-y-2">
      <h1 class="capitalize text-3xl">
        hey {{ $auth.user.firstName }}!
      </h1>
      <p
        class="text-gray-500"
      >
        Welcome back! If you need the GetWelp Team’s help with anything, just pop us a message in the live chat below!
      </p>
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
