<template>
  <header
    class="lg:tail-hidden tail-bg-white tail-sticky tail-top-0 tail-z-10 tail-h-14 tail-w-full tail-flex tail-items-center tail-px-4 tail-py-1"
  >
    <button class="button-outline tail-w-10" @click.prevent="toggle()">
      <i class="ns-menu-burger tail-text-xl" />
    </button>

    <div class="tail-flex tail-items-center lg:tail-hidden tail-space-x-2 tail-ml-auto">
      <button class="button-outline" style="padding: .5rem">
        <i class="ns-comment-alt tail-text-xl tail-mr-1" />
        <span class="tail-text-sm">9</span>
      </button>

      <button class="button-outline" style="padding: .5rem">
        <i class="ns-bell-ring tail-text-xl tail-mr-1" />
        <span class="tail-text-sm">999</span>
      </button>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <transition name="slide">
      <nav
        class="tail-block tail-h-screen lg:tail-hidden tail-absolute tail-overflow-hidden"
        aria-label="Global"
      >
        <div
          class="tail-max-w-3xl tail-space-y-1"
          :class="[open ? 'tail-max-w-lg' : 'tail-max-w-0']"
        >
          <MobileNavigation @closeSidebar="externalClick()" />
        </div>
      </nav>
    </transition>
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
      this.open = !this.open
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
