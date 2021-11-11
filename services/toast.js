export class ToastService {
  constructor ($toast) {
    this.$toast = $toast
    this.options = {
      position: 'top-right',
      duration: 6000,
      keepOnHover: true
    }
  }

  success (message, options) {
    const optionsObj = { ...this.options, ...options }
    this.$toast.success(message, optionsObj)
  }

  show (message, options) {
    const optionsObj = { ...this.options, ...options }
    this.$toast.show(message, optionsObj)
  }

  error (message, options) {
    const optionsObj = { ...this.options, ...options }
    this.$toast.error(message, optionsObj)
  }
}
