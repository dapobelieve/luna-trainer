export default (context, inject) => {
  const toast = {
    show: (options) => {
      window.$nuxt.$emit('toast', {...options})
    }
  }

  inject('gwToast', toast)
}