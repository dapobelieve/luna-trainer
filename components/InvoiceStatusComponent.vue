<template>
  <div class="inline-flex px-2 rounded-3xl text-sm" :class="[`${computedStatus.textColor}`, `${computedStatus.bgColor}`]">
    {{ computedStatus.text }}
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
          textColor: 'text-green-500',
          bgColor: 'bg-green-50',
          text: 'Paid'
        },
        overdue: {
          textColor: 'text-pink-500',
          bgColor: 'bg-red-50',
          text: 'Overdue'
        },
        outstanding: {
          textColor: 'text-red-500',
          bgColor: 'bg-red-50',
          text: 'Outstanding'
        },
        pending: {
          textColor: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          text: 'Pending'
        },
        awaiting: {
          textColor: 'text-blue-500',
          bgColor: 'bg-blue-50',
          text: 'Awaiting'
        },
        paid_awaiting_confirmation: {
          textColor: 'text-blue-500',
          bgColor: 'bg-blue-50',
          text: 'Awaiting Confirmation'
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
