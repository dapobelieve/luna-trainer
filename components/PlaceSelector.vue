<template>

<div class="flex flex-row">
  <v-select
  v-model="location"
  class="w-full"
  label="description"
  :filterable="false"
  :options="searchResults"
  @search="onSearch">
    <template slot="no-options">
      Type to search places...
    </template>
    <template slot="option" slot-scope="option">
      <div class="flex flex-row items-center">
        <i class="mr-2" :class="option.icon"></i>
        <span>{{option.description}}</span>
      </div>
    </template>
    <template slot="selected-option" slot-scope="option">
      <div>
        <i class="mr-2" :class="option.icon"></i>
        <span class="pb-2">{{option.description}}</span>
      </div>
    </template>
  </v-select>
</div>

</template>
<script>
export default {
  data () {
    return {
      location: '',
      searchResults: [],
      service: null
    }
  },
  created () {
    this.MapsInit()
  },
  methods: {
    MapsInit () {
      this.service = new window.google.maps.places.AutocompleteService()
    },
    displaySuggestions (predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = []
        return
      }
      predictions.forEach((prediction) => {
        prediction.icon = 'fi fi-rr-marker'
      })

      this.searchResults = predictions
    },
    onSearch (search, loading) {
      if (search === '') {
        this.searchResults = []
      }
      if (search) {
        loading(true)
        this.service.getPlacePredictions({
          input: search,
          types: ['(cities)']
        }, this.displaySuggestions)
        loading(false)
      }
    }
  },
  watch: {
    location (newValue) {
      if (newValue !== null) {
        this.$emit('place', newValue.description)
      } else {
        this.$emit('place', '')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.v-select {
  @apply border-none
}
.v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}
</style>
