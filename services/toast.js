export class ToastService {
  constructor ($toast) {
    this.$toast = $toast
    this.options = {
      position: 'top-right',
      duration: 6000,
      keepOnHover: true,
      iconPack: 'custom-class',
      action: {
        icon: 'fi-rr-cross',
        class: 'toast-close',
        onClick: (e, toastObject) => {
          toastObject.goAway(0)
        }
      }
    }
  }

  success (message, options) {
    this.$toast.success(message, {
      icon: 'fi-rr-check',
      className: 'toast-success',
      ...this.options,
      ...options
    })
  }

  show (message, options) {
    this.$toast.show(message, {
      icon: 'fi-rr-info',
      className: 'toast-info',
      ...this.options,
      ...options
    })
  }

  error (message, options) {
    this.$toast.error(message, {
      icon: 'fi-rr-info',
      className: 'toast-error',
      ...this.options,
      ...options
    })
  }

  // warning (message, options) {
  //   this.$toast.warning(message, {
  //     icon: 'fi-rr-info',
  //     className: 'toast-warning',
  //     ...this.options,
  //     ...options
  //   })
  // }

  // note (message, options) {
  //   this.$toast.note(message, {
  //     ...this.options,
  //     ...options
  //   })
  // }
}
