<template>
  <header
    class="lg:hidden bg-white sticky top-0 z-10 h-14 w-full flex items-center px-4 py-1 gw-header"
  >
    <button class="button-outline w-10" @click="openPageSidebar">
      <i class="fi-rr-menu-burger mt-1 text-base" />
    </button>

    <div class="flex items-center lg:hidden space-x-2 ml-auto">
      <button class="button-outline" style="padding: .5rem">
        <i class="fi-rr-comment-alt text-base mt-1 mr-1" />
        <span class="text-sm">9</span>
      </button>

      <button class="button-outline" style="padding: .5rem">
        <i class="fi-rr-bell-ring text-base mt-1 mr-1" />
        <span class="text-sm">999</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'GwHeader',
  methods: {
    openPageSidebar () {
      this.$nuxt.$emit('displayPageSidebar')
    }
  }
}
</script>
