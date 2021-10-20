export default {
  watch: {
    inputValue (newValue) {
      if (newValue) {
        this.showfilteredDropdown = true
        this.showDropdown = false
      } else {
        this.showfilteredDropdown = false
        this.showDropdown = false
      }
    }
  }
}
