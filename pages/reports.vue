<template>
  <div class="bg-blue-50 h-full">
    <PageHeader>
      <template v-slot:title>
        <span class="font-normal">Reporting</span>
      </template>
    </PageHeader>
    <div class="bg-white sticky top-[56px] z-10 flex items-center border border-t-0 border-l-0 border-r-0 pl-5">
      <nuxt-link :to="{name: 'reports-financials'}" :class="[currentRoute.includes('financials') ? 'active' : '']" @click="tab = 'financial'" class="py-3 cursor-pointer font-medium relative flex mr-7">
        Financial
      </nuxt-link>
      <nuxt-link :to="{name: 'reports-client'}" :class="[currentRoute.includes('client') ? 'active' : '']" @click="tab = 'client'" class="py-3 cursor-pointer relative flsex font-medium text-gray-500">
        Client
      </nuxt-link>
    </div>
    <div class="w-full p-4 flex justify-center">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 'financial'
    }
  },
  computed: {
    currentRoute() {
      return this.$route.path
    }
  },
}
</script>

<style scoped lang="scss">
.active {
  @apply text-gray-700 font-medium;
  &::before {
    @apply bg-blue-500 w-full h-1 rounded-sm shadow-md absolute left-0 bottom-0;
    content: "";
  }
}
</style>
