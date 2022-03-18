<template>
  <DashboardCard class="pt-4">
    <div class="flex items-center px-4">
      <div class="inline-flex items-center">
        <div class="h-12 mr-2 w-12 bg-sky-50 rounded-full inline-flex justify-center items-center">
          <i class="fi-rr-comment-alt text-xl text-sky-500 mt-1"></i>
        </div>
        <h3 class="text-black text-xl">Messages</h3>
      </div>
      <div class="ml-auto ">
        <span class="text-gray-500">0 new messages</span>
      </div>
    </div>
    <div class="h-full">
      <div class="flex items-center h-full justify-center">
        <div class="flex flex-col items-center">
          <i class="fi-rr-comment-alt text-5xl text-sky-500"></i>
          <h3 class="text-gray-700 text-lg">
            You have no messages
          </h3>
          <small class="text-base text-gray-500">Your messages would be displayed here</small>
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<script>
import DashboardCard from "~/components/dashboard/DashboardCard";
export default {
  components: { DashboardCard }

//     `10
// 4
// Project A, 9, 20
// Project B, 4, 13
// Project C, 5, 8
// Project D, 1, 4`
}
</script>

<style scoped>

</style>