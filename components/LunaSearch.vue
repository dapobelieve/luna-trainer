<template>
  <modal
    name="luna-search-modal"
    class="luna-search"
    height="auto"
    :adaptive="true"
  >
    <div class="pb-1">
      <div class="search-header rounded-t-lg  px-4 pt-4">
        <div class="border rounded-lg mb-5 px-3">
          <form @submit.prevent="" role="search" novalidate class="flex items-center justify-center">
            <label class="mt-1"><i class="fi-rr-search text-md text-gray-700"></i></label>
            <input autofocus v-model="query" class="flex-grow text-base ml-3 mr-4 h-12 focus:outline-none" autocomplete="off" placeholder="Search" spellcheck="false">
            <button @click.prevent="query='', $emit('close')" class="cancel text-sm text-black px-1 font-bold text-xs" style="font-size: 10px">
              <i class="fi-rr-cross"></i>
            </button>
          </form>
        </div>
      </div>
      <div class="search-body h-full max-h-[28rem] md:max-h-[35rem] overflow-y-auto">
        <div class="px-4 mb-6">
          <p v-if="query" class="text-gray-600">Showing all results for <span class="text-gray-900 font-bold">{{query}}</span></p>
        </div>
        <div v-if="!loading">
          <div v-if="results.length > 0" class="search-items">
            <ul class="list-none">
              <div class="mb-4 ml-4 text-sm uppercase leading-5">
                Clients
              </div>
              <LunaSearchItem @close="$emit('close')" v-for="result in results" :result="result" />
            </ul>
          </div>
          <div v-else class="h-28 flex items-center justify-center">
            <div class="flex flex-col items-center">
              <img src="~/assets/img/search.svg">
              <h3 class="text-gray-600">No search results found</h3>
              <p class="text-center">Please try again with a different search <br> query</p>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-28">
          <SingleLoader height="40px" width="40px" />
        </div>
      </div>
      <div class="search-footer flex rounded-t-lg">
        <div class="ml-auto px-4 py-3"><img class="h-3" src="~/assets/img/logo-v2.svg" /></div>
      </div>
    </div>
  </modal>
</template>

<script>
import LunaSearchItem from "~/components/search/LunaSearchItem";
import debounce from "lodash.debounce";
export default {
  name: 'LunaSearch',
  components: {LunaSearchItem},
  data () {
    return {
      query: '',
      loading: false,
      results: []
    }
  },
  watch: {
    "query": {
      async handler(val) {
        if(val)
          await this.searchApp(val)
        else
          this.results = []
      }
    }
  },
  methods: {
    searchApp: debounce(async function (val) {
      this.loading = true;
      try {
        const res = await this.$store.dispatch('search/search', {query: val})
        this.results = res.data
      }catch (e) {
        console.log(e)
      }finally {
        this.loading = false
      }
    }, 500)
  },
  created() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.query = ""
        this.$modal.hide('luna-search-modal')
      }
    })
  }
}
</script>

<style scoped lang="scss">
.luna-search {
  ::v-deep .vm--modal {
    border-radius: 1rem !important;
  }
}
</style>