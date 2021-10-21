<template>
  <div class="tail-inline-flex tail-px-2 tail-rounded-3xl tail-text-sm" :class="[`tail-${computedStatus.text}`, `tail-${computedStatus.bg}`]">
    {{ `${status.charAt(0).toUpperCase()}${status.substring(1)}` }}
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: "overdue"
    }
  },
  data () {
    return {
      statuses: {
        paid: {
          text: 'text-blue-500',
          bg: 'bg-blue-50'
        },
        overdue: {
          text: 'text-red-500',
          bg: 'bg-red-50'
        },
        outstanding: {
          text: 'text-yellow-500',
          bg: 'bg-yellow-50'
        }
      }
    }
  },
  computed: {
    computedStatus() {
      return this.statuses[this.status];
    }
  },
}
</script>
