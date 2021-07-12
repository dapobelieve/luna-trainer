<template>
  <header class="lg:tail-hidden tail-bg-white tail-shadow-sm tail-py-2 sm:py-4 tail-sticky tail-top-0">
    <div class="tail-max-w-7xl tail-mx-auto tail-px-4 sm:tail-px-6 lg:tail-px-8">
      <div class="tail-relative tail-flex tail-justify-between xl:tail-grid xl:tail-grid-cols-12 lg:tail-gap-8">
        <div class="tail-flex">
          <div class="tail-flex-shrink-0 tail-flex tail-items-center">
            <button class="tail-border tail-flex tail-border-gray-300 tail-p-1 tail-rounded">
              <i class="ns-caret-down tail-text-lg" />
            </button>
          </div>
        </div>
        <div class="tail-flex tail-items-center lg:tail-hidden tail-space-x-2">
          <button class="tail-border tail-flex tail-border-gray-300 tail-p-1 tail-rounded">
            <i class="ns-comment-alt tail-text-lg" />
          </button>

          <button class="tail-border tail-flex tail-border-gray-300 tail-p-1 tail-rounded">
            <i class="ns-bell-ring tail-text-lg" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <nav class="tail-hidden tail-absolute tail-bg-white tail-right-0 tail-left-0" aria-label="Global">
      <div class="tail-max-w-3xl tail-mx-auto tail-px-2 tail-pt-2 tail-pb-3 tail-space-y-1">
        <!-- not done -->
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'GwHeader'
}
</script>

<style lang="scss" scoped>
</style>
