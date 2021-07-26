<template>
  <div>
    <slot name="content" :pageNumber="pageNumber" />
    <div v-if="visible" class="tail-w-max flex tail-space-x-2 tail-ml-auto">
      <button :disabled="pageNumber <= 1" :class="[pageNumber <= 1 ? 'disabled' : 'cursor-auto', 'tail-capitalize', 'tail-border-2', 'tail-border-gray-300', 'tail-bg-white', 'tail-rounded-md', 'tail-px-2', 'tail-font-normal', 'tail-shadow-2xl']" @click="changePageNumber(pageNumber - 1)">
        previous
      </button>
      <span v-for="(item, index) in new Array(numberOfPages)" :key="index" class="">
        <button :class="[pageNumber === index + 1 ? 'active' : '', 'tail-capitalize', 'tail-border-2', 'tail-border-gray-300', 'tail-bg-white', 'tail-rounded-md', 'tail-px-2', 'tail-font-normal']" @click="changePageNumber(index + 1)">
          {{ index + 1 }}
        </button>
      </span>
      <button :disabled="pageNumber >= numberOfPages" :class="[pageNumber >= numberOfPages ? 'disabled' : 'cursor-auto', 'tail-capitalize', 'tail-border-2', 'tail-border-gray-300', 'tail-bg-white', 'tail-rounded-md', 'tail-px-2', 'tail-font-normal']" @click="changePageNumber(pageNumber + 1)">
        next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GwPagination',
  props: {
    visible: Boolean,
    totalItems: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      pageNumber: Number(this.$route.query.page) || 1
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.totalItems / 10)
    }
  },
  methods: {
    changePageNumber (pageNumber) {
      this.pageNumber = pageNumber
      this.$router.push({
        path: this.$route.path,
        query: {
          page: pageNumber
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  box-shadow: 0 2px rgb(196, 191, 191);

  &:active {
    box-shadow: 0 3px rgb(165, 164, 164);
    transform: translateY(4px);
  }
}
.active {
  color: #000;
  box-shadow: none;
}
.disabled {
  cursor: not-allowed;
}
</style>
