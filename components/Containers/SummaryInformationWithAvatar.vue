<template>
  <div
    class="tail-relative tail-py-4 tail-flex tail-items-center hover:tail-bg-gray-100 tail-rounded-lg tail-px-3 tail-transition-all"
  >
    <div class="tail-mr-auto tail-flex tail-items-center tail-space-x-4">
      <div class="flex-shrink-0 tail-h-12 tail-w-12">
        <slot name="avatar" />
      </div>
      <div class="tail-flex-1 tail-min-w-0">
        <a href="#" class="focus:tail-outline-none">
          <!-- Extend touch target to entire panel -->
          <span class="tail-absolute tail-inset-0" aria-hidden="true"></span>
          <p class="tail-text-base tail-font-normal tail-text-gray-700">
            <slot name="content" />
          </div>
          <span class="tail-text-xs tail-text-gray-500 tail-truncate">
            <slot name="date" />
          </span>
        </a>
      </div>
    </div>
    <img
      v-if="showChevronRight"
      class="tail-h-4 tail-ml-4"
      src="~/assets/img/svgs/chevron-right.svg"
      alt="arrow-right"
    />
  </div>
</template>

<script>
export default {
  name: 'SummaryInformationWithAvatar',
  props: {
    showChevronRight: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
