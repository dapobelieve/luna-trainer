<template>
  <div
    :class="[matchedRoute ? 'active' : '' ,`relative py-4 flex items-center rounded-lg px-3 transition-all hover:${hoverColor}`]"
  >
    <nuxt-link
      v-if="url !== '#' && Boolean(parameter)"
      :to="{ name: url, params: { ...parameter } }"
      class="flex items-center space-x-4 w-full"
    >
      <div class="flex-shrink-0 h-12 w-12">
        <slot name="avatar" :matchedRoute="matchedRoute" />
      </div>
      <div class="flex-grow min-w-0">
        <div class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p
            class="text-base text-gray-700"
            :class="[matchedRoute ? 'font-bold' : 'font-extralight']"
          >
            <slot name="content" />
          </p>
        </div>
      </div>
      <span class="text-xs text-gray-500 truncate">
        <slot name="date" />
      </span>
    </nuxt-link>
    <nuxt-link
      v-else-if="url !== '#'"
      :to="{ name: url }"
      class="mr-auto flex items-center space-x-4 w-full"
    >
      <div class="flex-shrink-0 h-12 w-12">
        <slot name="avatar" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p class="text-base font-normal text-gray-700">
            <slot name="content" />
          </p>
        </div>
      </div>
      <span class="text-xs text-gray-500 truncate">
        <slot name="date" />
      </span>
    </nuxt-link>
    <div v-else class="mr-auto flex items-center space-x-4 w-full">
      <div class="flex-shrink-0 h-12 w-12">
        <slot name="avatar" />
      </div>
      <div class="flex-grow min-w-0">
        <div class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p>
            <slot name="content" />
          </p>
        </div>
      </div>
      <span class="text-xs text-gray-500 truncate">
        <slot name="date" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryInformationWithAvatar',
  props: {
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
  @apply bg-blue-50 border-none outline-none;
}
</style>
