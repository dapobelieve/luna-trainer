<template>
  <div
    class="tail-relative tail-py-4 tail-flex tail-items-center hover:tail-bg-gray-100 tail-rounded-lg tail-px-3 tail-transition-all"
  >
    <nuxt-link v-if="url !== '#'" :to="{ name: url }" class="tail-mr-auto tail-flex tail-items-center tail-space-x-4 tail-w-full">
      <div class="flex-shrink-0 tail-h-12 tail-w-12">
        <slot name="avatar" />
      </div>
      <div class="tail-flex-1 tail-min-w-0">
        <div class="focus:tail-outline-none">
          <span class="tail-absolute tail-inset-0" aria-hidden="true"></span>
          <p class="tail-text-base tail-font-normal tail-text-gray-700">
            <slot name="content" />
          </p>
        </div>
      </div>
      <span class="tail-text-xs tail-text-gray-500 tail-truncate">
        <slot name="date" />
      </span>
    </nuxt-link>
    <div v-else class="tail-mr-auto tail-flex tail-items-center tail-space-x-4 tail-w-full">
      <div class="flex-shrink-0 tail-h-12 tail-w-12">
        <slot name="avatar" />
      </div>
      <div class="tail-flex-1 tail-min-w-0">
        <div class="focus:tail-outline-none">
          <span class="tail-absolute tail-inset-0" aria-hidden="true"></span>
          <p class="tail-text-base tail-font-normal tail-text-gray-700">
            <slot name="content" />
          </p>
        </div>
      </div>
      <span class="tail-text-xs tail-text-gray-500 tail-truncate">
        <slot name="date" />
      </span>
    </div>
    <div class="tail-absolute tail-right-0 tail-px-3 hover:tail-bg-gray-300 tail-rounded-lg">
      <slot v-if="showChevronRight" name="button">
        <img
          class="tail-h-4 tail-ml-4"
          src="~/assets/img/svgs/chevron-right.svg"
          alt="arrow-right"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryInformationWithAvatar',
  props: {
    showChevronRight: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style lang="scss" scoped></style>
