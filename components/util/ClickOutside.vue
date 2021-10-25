<script>
export default {
  props: ['do'], // function to run
  mounted () {
    const listener = (e) => {
      // console.log(e.target)
      console.log(this.$el.contains(e.target))
      if (e.target === this.$el || this.$el.contains(e.target)) {
        console.log(this.$el)
        return
      }
      this.do()
    }
    document.addEventListener('click', listener)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', listener)
    })
  },
  render () {
    return this.$slots.default[0]
  }
}
</script>
