<template>
  <div>
    <button
      type="button"
      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in duration-200 focus:outline-none"
      :class="[showToasts ? 'justify-start bg-blue-700' : 'justify-end bg-gray-700']"
      role="switch"
      @click="toggle"
    >
      <span
        class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        :class="{ 'translate-x-0' : showToasts }"
      ></span>
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showToasts: true
    }
  },
  mounted () {
    const isNotificationsOn = sessionStorage.getItem('notificationOn')
    if (isNotificationsOn === null) {
      sessionStorage.setItem('notificationOn', true)
      this.showToasts = true
      return
    }
    this.showToasts = false
    this.$emit('toggleState', this.showToasts)
  },
  methods: {
    toggle () {
      if (this.showToasts) {
        sessionStorage.setItem('notificationOn', false)
        this.showToasts = false
        this.$emit('toggleState', this.showToasts)
        return
      }
      sessionStorage.setItem('notificationOn', true)
      this.showToasts = true
      this.$emit('toggleState', this.showToasts)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
