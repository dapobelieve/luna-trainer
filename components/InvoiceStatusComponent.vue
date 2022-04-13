<template>
  <div class="inline-flex px-2 rounded-3xl text-sm" :class="[`${computedStatus.text}`, `${computedStatus.bg}`]">
    {{ `${status.substring(0,1).toUpperCase()}${status.substring(1).toLowerCase().replaceAll('_',' ')}` }}
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'paid'
    }
  },
  data () {
    return {
      statuses: {
        paid: {
          text: 'text-green-500',
          bg: 'bg-green-50'
        },
        overdue: {
          text: 'text-pink-500',
          bg: 'bg-red-50'
        },
        outstanding: {
          text: 'text-red-500',
          bg: 'bg-red-50'
        },
        pending: {
          text: 'text-yellow-500',
          bg: 'bg-yellow-50'
        },
        awaiting: {
          text: 'text-blue-500',
          bg: 'bg-blue-50'
        }
      }
    }
  },
  computed: {
    computedStatus () {
      return this.statuses[this.status?.toLowerCase()] || 'paid'
    }
  }
}
</script>
