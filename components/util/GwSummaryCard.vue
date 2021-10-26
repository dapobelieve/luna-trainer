<template>
  <div class="tail-flex tail-flex-col tail-space-y-5 tail-rounded-lg tail-px-4 tail-py-3 tail-bg-white">
    <div class="tail-flex tail-items-center">
      <span
        :class="[ data.title === 'payments' ? 'tail-bg-gray-100' : 'tail-bg-yellow-200', 'tail-items-center', 'tail-flex', 'tail-rounded-full', 'tail-p-2']"
      >
        <i
          :class="[ data.title === 'payments' ? 'tail-text-green-400' : 'tail-text-yellow-500', `ns-${data.icon}`, 'tail-text-lg']"
        ></i>
      </span>
      <span class="tail-pl-3 tail-font-semibold tail-capitalize">{{ data.title }} in {{ getMonth }}</span>
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
