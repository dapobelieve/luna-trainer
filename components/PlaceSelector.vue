<template>
<div class="flex flex-row mt-2">
  <i class="fi fi-rr-marker pt-3 pl-0.5 mr-1.5 text-lg"></i>
  <v-select
  v-model="location"
  class="w-full repeat-selector"
  label="description"
  :filterable="false"
  :options="searchResults"
  placeholder="Select a place"
  @search="onSearch">
    <template slot="no-options">
      Type to search places...
    </template>
    <template slot="option" slot-scope="option">
      <div class="flex flex-row items-center">
        <div class="pb-3 mr-2">
          <img class="w-5 h-5" src="../assets/img/svgs/icon/map-marker-icon.png" alt="">
        </div>
        <div class="flex flex-col">
          <span class="font-medium">{{option.description.split(',')[0]}}</span>
          <span class="text-xs">{{option.description}}</span>
        </div>
      </div>
    </template>
    <template slot="selected-option" slot-scope="option">
      <div>
        <span>{{option.description}}</span>
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
      return predictions
    },
    async onSearch (search, loading) {
      const placeHolder = []
      if (search === '') {
        this.searchResults = []
      }
      if (search) {
        loading(true)
        placeHolder.push(await this.service.getPlacePredictions({
          input: search,
          types: ['(cities)']
        }, this.displaySuggestions))
        this.searchResults = placeHolder[0].predictions
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
<style>
.vs__dropdown-toggle {
  border: none !important
}
</style>
