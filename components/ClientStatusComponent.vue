<template>
  <div class="inline-flex px-4 py-2 font-bold rounded-3xl text-sm" :class="[`${computedStatus.textColor}`, `${computedStatus.bgColor}`]">
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
        accepted: {
          textColor: 'text-sky-500',
          bgColor: 'bg-sky-50',
          text: 'Accepted'
        },
        archived: {
          textColor: 'text-slate-600',
          bgColor: 'bg-slate-50',
          text: 'Archived'
        },
        invited: {
          textColor: 'text-teal-500',
          bgColor: 'bg-teal-50',
          text: 'Pending'
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

<style scoped>

</style>
