<template>
  <li class="relative mb-6 px-4">
    <div class="flex items-start">
      <div class="mr-4">
        <img src="~/assets/img/search-user.svg">
      </div>
      <div>
        <h3 class="text-gray-700 mb-2 font-medium">{{result.firstName}}</h3>
        <div class="flex">
          <a @click.stop="gotToPayments" class="inline-flex items-center mr-4 cursor-pointer">
            <img class="h-4 mr-2" src="~/assets/img/search-payments.svg">
            <span>payment requests</span>
          </a>
          <a v-if="false" :to="{name: 'schedule'}" class="inline-flex items-center">
            <img class="h-4 mr-2" src="~/assets/img/search-calendar.svg">
            <span>upcoming session</span>
          </a>
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
  methods: {
    close() {
      this.$emit('close')
    },
    gotToPayments() {
      this.$router.push({
        name: 'payments-requests-sent',
        query: {
          name: this.result.userId
        }
      })
      this.close()
    }
  }
}
</script>

<style scoped>

</style>