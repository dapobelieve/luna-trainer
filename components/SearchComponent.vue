<template>
  <div class="tail-relative">
    <div
      v-if="client"
      style="background: #eaecef; border-color: #ced4da !important"
      class="tail-border tail-rounded-2 tail-w-100 tail-px-3 tail-py-2 tail-flex tail-items-center"
    >
      picture of client
      <p class="tail-mb-0 tail-ml-2 tail-mr-auto">
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
      class="form-control tail-p-2 tail-border tail-border-gray-300 tail-w-full tail-rounded-md"
      placeholder="Search for a client"
      autocomplete="off"
      @focus="openPanel = true"
      @blur="blurrPanel"
      @input="searchTerm = $event.target.value"
    />
    <div
      v-if="openPanel"
      class="tail-border shadow tail-absolute tail-w-full tail-rounded-bottom tail-bg-white"
      style="z-index: 1"
    >
      <div class="tail-w-full tail-flex tail-justify-center tail-items-center">
        <em
          v-if="!searchTerm"
          style="cursor: not-allowed"
          class="tail-my-2 tail-w-full tail-text-center"
        >Start typing to begin search</em>
        <Spinner v-else class="tail-my-2" :show="isListLoading" />

        <ul
          v-if="!isListLoading && suggestions"
          class="list-unstyled tail-w-100 tail-bg-white tail-my-0"
        >
          <template v-if="suggestions.length">
            <li v-for="suggestion in suggestions" :key="suggestion.index">
              <a
                class="tail-w-100 tail-border-bottom tail-px-3 tail-py-2 tail-flex tail-items-center"
                role="button"
                @click.prevent="pinSelection(suggestion)"
              >
                picture of person
                <p class="tail-mb-0">
                  suggestions.errorMessage
                </p>
              </a>
            </li>
          </template>
          <li
            v-else-if="suggestions.errorMessage"
            class="tail-bg-white"
            style="cursor: not-allowed"
          >
            <p class="tail-text-center mb-0 py-2">
              suggestions.errorMessage
            </p>
          </li>
          <li v-else class="tail-bg-white" style="cursor: not-allowed">
            <p class="tail-text-center tail-mb-0 py-2">
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
          console.log(e)
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
