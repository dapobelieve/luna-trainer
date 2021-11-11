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
    this.$toast.success(message, { ...this.options, ...options })
  }

  show (message, options) {
    this.$toast.show(message, { ...this.options, ...options })
  }

  error (message, options) {
    this.$toast.error(message, { ...this.options, ...options })
  }
}
