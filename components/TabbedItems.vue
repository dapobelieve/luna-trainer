<template>
  <section class="tabbedItems">
    <div class="top">
      <slot name="title" />
      <ul class="tabs">
        <button
          v-for="(link, index) in links"
          :key="index"
          :class="[{ active: tab === index + 1 }, 'switcher']"
          @click.prevent="switchTabs(index + 1)"
        >
          <span class="link">
            {{ link.link }}
          </span>
          <span v-if="link.count" class="badge">
            {{ link.count >= 9 ? "9+" : link.count }}
          </span>
        </button>
      </ul>
    </div>
    <div class="views">
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
.tabbedItems {
  .top {
    @apply sticky top-0 bg-white;
  }
  .tabs {
    @apply flex bg-white items-center text-base font-normal text-gray-500 overflow-y-hidden justify-start space-x-[2rem] px-4 border-b border-gray-200 overflow-x-scroll z-30;
    overflow-x: overlay;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;

    .switcher {
      @apply py-2.5;
      transition: 0.3s;
      position: relative;
      &.active {
        @apply text-gray-700;
        &::after {
          content: "";
          @apply bg-blue-500 h-1 w-full rounded-full shadow-md absolute -bottom-0;
        }
      }
    }

    .badge {
      @apply rounded-full bg-blue-500 text-white ml-2 px-1.5 py-0.5 text-xs;
    }
  }

  .views {
    @apply my-6 mx-1;
  }

  .tabs::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
