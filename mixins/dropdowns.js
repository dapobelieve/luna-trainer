export default {
  watch: {
    inputValue (newValue) {
      this.showDropdown = true
      if (newValue) {
        this.showFilteredOptions = true
      } else {
        this.showFilteredOptions = false
      }
    }
  }
}
