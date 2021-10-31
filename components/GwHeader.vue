<template>
  <header
    class="lg:hidden bg-white sticky top-0 z-10 h-14 w-full flex items-center px-4 py-1 gw-header"
  >
    <button class="button-outline w-10" @click="toggle">
      <i class="ns-menu-burger text-xl" />
    </button>

    <div class="flex items-center lg:hidden space-x-2 ml-auto">
      <button class="button-outline" style="padding: .5rem">
        <i class="ns-comment-alt text-xl mr-1" />
        <span class="text-sm">9</span>
      </button>

      <button class="button-outline" style="padding: .5rem">
        <i class="ns-bell-ring text-xl mr-1" />
        <span class="text-sm">999</span>
      </button>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <!-- <transition name="slide">
      <nav
        class="block h-screen lg:hidden absolute overflow-hidden"
        aria-label="Global"
      >
        <div
          class="max-w-3xl space-y-1"
          :class="[open ? 'max-w-lg' : 'max-w-0']"
        >
          <Navigation @closeSidebar="externalClick()" />
        </div>
      </nav>
    </transition> -->
  </header>
</template>

<script>
export default {
  name: 'GwHeader',
  data () {
    return {
      open: false
    }
  },
  methods: {
    toggle () {
      this.$nuxt.$emit('toggleSideBar')
    },
    externalClick () {
      this.open = false
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: width 0.5s;
}
.slide-enter,
.slide-leave-to {
  width: 0;
}
</style>
