<template>
  <div
    :class="[matchedRoute ? 'active' : '' ,`tail-relative tail-py-4 tail-flex tail-items-center tail-rounded-lg tail-px-3 tail-transition-all hover:tail-${hoverColor}`]"
  >
    <nuxt-link v-if="url !== '#' && Boolean(parameter)" :to="{ name: url, params: { ...parameter } }" class="tail-mr-auto tail-flex tail-items-center tail-space-x-4 tail-w-full">
      <div class="flex-shrink-0 tail-h-12 tail-w-12">
        <slot name="avatar" :matchedRoute="matchedRoute" />
      </div>
      <div class="tail-flex-1 tail-min-w-0">
        <div class="focus:tail-outline-none">
          <span class="tail-absolute tail-inset-0" aria-hidden="true"></span>
          <p class="tail-text-base tail-text-gray-700" :class="[matchedRoute ? 'tail-font-bold' : 'tail-font-extralight']">
            <slot name="content" />
          </p>
        </div>
      </div>
      <span class="tail-text-xs tail-text-gray-500 tail-truncate">
        <slot name="date" />
      </span>
    </nuxt-link>
    <nuxt-link v-else-if="url !== '#'" :to="{ name: url }" class="tail-mr-auto tail-flex tail-items-center tail-space-x-4 tail-w-full">
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
    <div v-if="showChevronRight" :class="[hoverOnRightButton ? 'hover:tail-bg-gray-300' : '', 'tail-absolute tail-right-0 tail-px-3 tail-rounded-lg']">
      <slot name="button" :matchedRoute="matchedRoute">
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
    },
    parameter: {
      type: Object,
      default: () => {}
    },
    hoverOnRightButton: {
      type: Boolean,
      default: false
    },
    defaultColor: {
      type: String,
      default: 'red'
    },
    hoverColor: {
      type: String,
      default: 'bg-gray-100'
    }
  },
  computed: {
    matchedRoute () {
      return this.url === this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  @apply tail-bg-blue-50 tail-border-none tail-outline-none;
}</style>
