<template>
  <section>
    <ul
      class="tabs"
    >
      <button
        v-for="(link, index) in links"
        :key="link.index"
        :class="[{ active: tab === index + 1 }, 'py-2.5']"
        @click.prevent="switchTabs(index + 1)"
      >
        {{ link }}
      </button>
    </ul>
    <div class="my-6 mx-4">
      <slot name="tabviews" :tab="tab" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'TabbedItems',
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tab: 1
    }
  },
  methods: {
    switchTabs (tabNumber) {
      this.tab = tabNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  @apply text-base font-normal text-gray-500 overflow-y-hidden flex justify-between lg:justify-start md:space-x-[2rem] px-4 border-b border-gray-200 overflow-x-scroll;
  overflow-x: overlay;
}

.tabs::-webkit-scrollbar {
    width: 0 !important;
}

.tabs {
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
}

.tabs button {
  transition: 0.3s;
  position: relative;
}
.tabs button.active {
  @apply text-gray-700;
  &::after {
    content: "";
    @apply bg-blue-500 h-1 w-14 rounded-full shadow-md absolute -bottom-0;
  }
}
</style>
