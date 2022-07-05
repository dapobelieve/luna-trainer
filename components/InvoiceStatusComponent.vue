<template>
  <div class="inline-flex px-4 rounded-3xl text-sm" :class="[`${computedStatus.textColor}`, `${computedStatus.bgColor}`]">
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
          textColor: 'text-teal-700',
          bgColor: 'bg-teal-100',
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
        draft: {
          textColor: 'text-slate-600',
          bgColor: 'bg-slate-100',
          text: 'Draft'
        },
        pending: {
          textColor: 'text-sky-700',
          bgColor: 'bg-sky-100',
          text: 'Pending'
        },
        cancelled: {
          textColor: 'text-white',
          bgColor: 'bg-red-500',
          text: 'Cancelled'
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
