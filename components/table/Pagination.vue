<template>
  <ul class="flex md:justify-end text-lg items-center text-gray-400">
    <li class="mr-4">
      <button :disabled="isFirstPage" @click="pageClicked(currentPage - 1)" class="text-primary-color w-7">
        <i class="fi-rr-arrow-small-left text-xl mt-2"></i>
      </button>
    </li>
    <li v-for="(page, pageIndex) in pages" :key="pageIndex" class="mr-4">
      <button
        :disabled="page.active"
        @click="pageClicked(page.number)"
        class="w-7" :class="{'text-primary-color': 
     page.active}">
        {{ page.number }}
      </button>
    </li>
    <li>
      <button @click="pageClicked(currentPage + 1)" :disabled="isLastPage" class="text-primary-color w-7">
        <i class="fi-rr-arrow-small-right text-xl mt-2"></i>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LunaTablePagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    totalPages: {
      type: Number,
      required: true
    },
    numberOfButtons: {
      type: Number,
      default: 3
    },
  },
  computed: {
    startPage() {
      if(this.currentPage === 1) {
        return 1;
      }      
      if(this.currentPage === this.totalPages) {
        return this.totalPages - this.numberOfButtons + 1;
      }
      return this.currentPage - 1;
    },
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.totalPages;
    },
    pages() {
      const pages = [];
      for(let i = this.startPage; i <= this.startPage + this.numberOfButtons - 1; i++) {
        pages.push({
          number: i,
          active: i === this.currentPage
        });
      }
      return pages;
    }
  },
  methods: {
    pageClicked(pageNumber) {
      this.$emit('page-clicked', pageNumber);
    }
  }
}
</script>

<style scoped>

</style>