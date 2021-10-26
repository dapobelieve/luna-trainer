<template>
  <div class="flex flex-col space-y-5 rounded-lg px-4 py-3 bg-white">
    <div class="flex items-center">
      <span
        :class="[ data.title === 'payments' ? 'bg-gray-100' : 'bg-yellow-200', 'items-center', 'flex', 'rounded-full', 'p-2']"
      >
        <i
          :class="[ data.title === 'payments' ? 'text-green-400' : 'text-yellow-500', `ns-${data.icon}`, 'text-lg']"
        ></i>
      </span>
      <span class="pl-3 font-semibold capitalize">{{ data.title }} in {{ getMonth }}</span>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GwSummaryCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    getMonth () {
      const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
      const thisMonth = new Date().getMonth()
      return monthNames[thisMonth]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
