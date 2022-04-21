<template>
  <li class="relative mb-6 px-4">
    <div class="flex items-start">
      <div class="mr-2 w-5 h-5 rounded-full bg-gray-100 p-1">
        <img :src="result.imgURL || '~/assets/img/search-user.svg'">
      </div>
      <div class="flex items-center">
        <a class="hover:underline text-gray-700 font-medium" :href="`/client/${result.id}/information`">
          {{ `${result.firstName} ${result.lastName || ""}` }}
        </a>

        <i class="fi-rr-angle-small-right w-4 h-4"></i>
        <button class="inline-flex text-sm items-center mr-4 text-primary-color cursor-pointer" @click.stop="gotToPayments">
          <span>Payment requests</span>
        </button>
        <div class="flex">
          <a v-if="false" :to="{name: 'schedule'}" class="inline-flex items-center">
            <img class="h-4 mr-2" src="~/assets/img/search-calendar.svg">
            <span>Upcoming session</span>
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
  mounted () {
    console.log('search item mounted', this.result)
  },
  methods: {
    close () {
      this.$emit('close')
    },
    gotToPayments () {
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
