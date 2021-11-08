<template>
  <div class="rounded-xl overflow-hidden border bg-gray-50">
    <slot name="content" :pageNumber="pageNumber" />
    <div v-if="totalItems" class="w-max flex ml-auto px-4 py-2">
      <div class="flex items-center">
        <button
          class="button-text px-2"
          :disabled="pageNumber <= 1"
          :class="[pageNumber <= 1 ? 'disabled' : 'cursor-auto', 'capitalize text-blue-500 opacity-50']"
          @click="changePageNumber(pageNumber - 1)"
        >
          previous
        </button>
        <span v-for="(item, index) in new Array(numberOfPages)" :key="index" class>
          <button class="button-text px-2" @click="changePageNumber(index + 1)">{{ index + 1 }}</button>
        </span>
        <button
          class="button-text px-2"
          :disabled="pageNumber >= numberOfPages"
          :class="[pageNumber >= numberOfPages ? 'disabled' : 'cursor-auto', 'opacity-50']"
          @click="changePageNumber(pageNumber + 1)"
        >
          next
        </button>
      </div>
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
.disabled {
  cursor: not-allowed;
}
</style>
