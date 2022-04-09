<template>
  <li class="relative mb-6 px-4">
    <div class="flex items-start">
      <div class="mr-4">
        <img src="~/assets/img/search-user.svg">
      </div>
      <div>
        <h3 class="text-gray-700 mb-2 font-medium">{{result.firstName}}</h3>
        <div class="flex">
          <nuxt-link :to="{name: 'payments-requests-sent'}" class="inline-flex items-center mr-4">
            <img class="h-4 mr-2" src="~/assets/img/search-payments.svg">
            <span>payment requests</span>
          </nuxt-link>
          <nuxt-link :to="{name: 'schedule'}" class="inline-flex items-center">
            <img class="h-4 mr-2" src="~/assets/img/search-calendar.svg">
            <span>upcoming session</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>