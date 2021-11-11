import { ToastService } from '~/services/toast'

export default (context, inject) => {
  const gwtoast = new ToastService(context.$toast)

  inject('gwtoast', gwtoast)
}
