<template>
  <div class="relative">
    <div
      v-if="client"
      style="background: #eaecef; border-color: #ced4da !important"
      class="border rounded-2 w-100 px-3 py-2 flex items-center"
    >
      picture of client
      <p class="mb-0 ml-2 mr-auto">
        {{ client.fullName }}
      </p>
      <small
        role="button"
        @click="removeClient"
      ><u class="text-danger"> remove client</u></small>
    </div>
    <input
      v-else
      :value="searchTerm"
      class="form-control p-2 border border-gray-300 w-full rounded-md"
      placeholder="Search for a client"
      autocomplete="off"
      @focus="openPanel = true"
      @blur="blurrPanel"
      @input="searchTerm = $event.target.value"
    />
    <div
      v-if="openPanel"
      class="border shadow absolute w-full rounded-bottom bg-white"
      style="z-index: 1"
    >
      <div class="w-full flex justify-center items-center">
        <em
          v-if="!searchTerm"
          style="cursor: not-allowed"
          class="my-2 w-full text-center"
        >Start typing to begin search</em>
        <Spinner v-else class="my-2" :show="isListLoading" />

        <ul
          v-if="!isListLoading && suggestions"
          class="list-unstyled w-100 bg-white my-0"
        >
          <template v-if="suggestions.length">
            <li v-for="suggestion in suggestions" :key="suggestion.index">
              <a
                class="w-100 border-bottom px-3 py-2 flex items-center"
                role="button"
                @click.prevent="pinSelection(suggestion)"
              >
                picture of person
                <p class="mb-0">
                  suggestions.errorMessage
                </p>
              </a>
            </li>
          </template>
          <li
            v-else-if="suggestions.errorMessage"
            class="bg-white"
            style="cursor: not-allowed"
          >
            <p class="text-center mb-0 py-2">
              suggestions.errorMessage
            </p>
          </li>
          <li v-else class="bg-white" style="cursor: not-allowed">
            <p class="text-center mb-0 py-2">
              Client Not Found
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'SearchComponent',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: { value: null },
  data () {
    return {
      searchTerm: this.value,
      openPanel: false,
      client: null,
      isListLoading: false,
      suggestions: null,
      pinned: false
    }
  },
  watch: {
    searchTerm (newValue) {
      if (!newValue) { this.suggestions = null }
      this.debounceWait()
    }
  },
  created () {
    this.debounceWait = _.debounce(this.fetchSuggestions, 500)
  },
  methods: {
    async fetchSuggestions () {
      if (this.searchTerm) {
        this.isListLoading = true
        try {
          const { result } = await this.$axios.$get(
            '' +
              this.searchTerm
          )
          this.suggestions = result
          this.isListLoading = false
        } catch (e) {
          const networkError = {
            errorMessage: 'Something went wrong'
          }
          this.suggestions = networkError
          this.isListLoading = false
        }
      } else {
        this.isListLoading = false
      }
    },
    pinSelection (client) {
      this.pinned = true
      this.client = client
      this.$emit('pinned', client)
      this.openPanel = false
      this.suggestions = []
      this.searchTerm = null
    },
    removeClient () {
      this.client = null
      this.pinned = false
    },
    blurrPanel () {
      setTimeout(() => {
        if (!this.pinned) {
          this.openPanel = false
          this.pinned = false
        }
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
// a {
//   text-decoration: none;
// }
// li:hover {
//   background: rgb(212, 212, 212);
// }
</style>
