<template>
  <div class="flex flex-row">
    <i class="fi fi-rr-marker pt-2 px-1 text-xl"></i>
    <v-select
    v-model="location"
    :options="searchResults"
    class="w-full"
    >
    </v-select>
    <!-- <input type="text" v-model="location">
      <ul>
        <li v-for="(result, i) in searchResults" :key="i">
          {{ result }}
        </li>
      </ul>  -->
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
      this.searchResults = predictions.map(prediction => prediction.description)
    }
  },
  watch: {
    location (newValue) {
      if (newValue === '') {
        this.searchResults = []
      }
      if (newValue) {
        this.service.getPlacePredictions({
          input: this.location,
          types: ['(cities)']
        }, this.displaySuggestions)
      }
    }
  }
}
</script>
