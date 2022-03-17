import _cloneDeep from "lodash.clonedeep"
import _merge from "lodash.merge"
const _defaultOptions = {
  position: 'top-right',
  actions: false,
  timeout: 5000,
  cancel: {
    text: 'cancel',
    resolver: () => {console.log('cancel clicked')},
  },
  confirm: {
    text: 'Confirm',
    resolver: () => {console.log('confirm clicked')},
  }
}

export class LunaToast {
  #instanceOptions
  constructor(options) {
    this.#instanceOptions = _merge(_cloneDeep(_defaultOptions), options)
  }  
  success(message, options) {
    console.log('called')
    options = options || {}
    options.icon = 'fi-rr-check'
    options.iconColor = 'text-teal-500'
    options.iconBg = 'bg-teal-50'
    this.#display(this, message, options)
  }
  info(message, options) {
    options = options || {}
    options.icon = 'fi-rr-info'
    options.iconColor = 'text-sky-500'
    options.iconBg = 'bg-sky-50'
    this.#display(this, message, options)
  }
  error(message, options) {
    options = options || {}
    options.icon = 'fi-rr-exclamation'
    options.iconColor = 'text-rose-500'
    options.iconBg = 'bg-rose-50'
    this.#display(this, message, options)
  }
  warning(message, options) {
    options = options || {}
    options.icon = 'fi-rr-exclamation'
    options.iconColor = 'text-amber-500'
    options.iconBg = 'bg-amber-50'
    this.#display(this, message, options)
  }
  show(message, options) {
    this.#display(this, message, options)
  }
  #display(instance, message, options) {
    options = options || {}
    if(options.confirm && typeof options.confirm !== 'object') {
      console.error('LunaToastErr: confirm should be an object ⚠️')
    }
    if(options.cancel && typeof options.cancel !== 'object') {
      console.error('LunaToastErr: cancel should be an object ⚠️')
    }
    
    let currentOptions = _merge(_cloneDeep(this.#instanceOptions), options)
    currentOptions.message = message
    window.$nuxt.$emit('toast', {...currentOptions})
  }
}
