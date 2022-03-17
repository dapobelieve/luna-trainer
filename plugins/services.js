import { LunaToast } from '~/services/LunaToast'

export default (context, inject) => {
  const lunaToast = new LunaToast()
  inject('lunaToast', lunaToast)
}
