import _cloneDeep from 'lodash.clonedeep'
import _merge from 'lodash.merge'
const _defaultOptions = {
  position: 'top-right',
  actions: false,
  timeout: 5000,
  image: 'https://res.cloudinary.com/rohing/image/upload/v1587700139/photo-1542393545-10f5cde2c810_zvvwje.jpg',
  cancel: {
    text: 'cancel',
    resolver: () => { console.log('cancel clicked') }
  },
  confirm: {
    text: 'Confirm',
    resolver: () => { console.log('confirm clicked') }
  }
}

export class LunaToast {
  #instanceOptions
  constructor (options) {
    this.#instanceOptions = _merge(_cloneDeep(_defaultOptions), options)
  }

  success (message, options) {
    options = options || {}
    options.icon = 'fi-rr-check'
    options.iconColor = 'text-teal-500'
    options.iconBg = 'bg-teal-50'
    this.#display(this, message, options)
  }

  info (message, options) {
    options = options || {}
    options.icon = 'fi-rr-info'
    options.iconColor = 'text-sky-500'
    options.iconBg = 'bg-sky-50'
    this.#display(this, message, options)
  }

  error (message, options) {
    options = options || {}
    options.icon = 'fi-rr-exclamation'
    options.iconColor = 'text-rose-500'
    options.iconBg = 'bg-rose-50'
    this.#display(this, message, options)
  }

  warning (message, options) {
    options = options || {}
    options.icon = 'fi-rr-exclamation'
    options.iconColor = 'text-amber-500'
    options.iconBg = 'bg-amber-50'
    this.#display(this, message, options)
  }

  show (message, options) {
    this.#display(this, message, options)
  }

  #display (instance, message, options) {
    options = options || {}
    if (options.confirm && typeof options.confirm !== 'object') {
      console.error('LunaToastErr: confirm should be an object ⚠️')
    }
    if (options.cancel && typeof options.cancel !== 'object') {
      console.error('LunaToastErr: cancel should be an object ⚠️')
    }

    const currentOptions = _merge(_cloneDeep(this.#instanceOptions), options)
    currentOptions.message = message
    
    const toast = this.#composeToast(currentOptions)
    if(currentOptions.icon){
      toast.append(this.#composeIcon(currentOptions))
    }else {
      toast.append(this.#composeImage(currentOptions))
    }
    
    toast.append(this.#composeBody(currentOptions))
    toast.append(this.#composeClose())
    document.body.append(toast)
    
    const timeout = setTimeout(() => {
      toast.remove()
    }, currentOptions.timeout)
    
    toast.addEventListener('mouseover', () => {
      clearTimeout(timeout)
    })    
  }
  
  #composeActions (options) {
    const actions = document.createElement('div')
    actions.classList.add('actions')
    actions.classList.add('mt-3')
    if (options.cancel) {
      const cancel = document.createElement('button')
      cancel.className = 'text-sm border text-md rounded-lg py-1 px-3 mr-3'
      cancel.innerText = options.cancel.text
      cancel.addEventListener('click', () => {
        options.cancel.resolver()
        actions.remove()
      })
      actions.appendChild(cancel)
    }
    if (options.confirm) {
      const confirm = document.createElement('button')
      confirm.className = 'text-sm text-md rounded-lg text-white bg-blue-500 px-3 py-1'
      confirm.innerText = options.confirm.text
      confirm.addEventListener('click', () => {
        options.confirm.resolver()
        actions.remove()
      })
      actions.appendChild(confirm)
    }
    return actions
  }
  
  #composeToast = options => {
    const toast = document.createElement('div')
    let toastClasses = 'luna-toast w-80 absolute z-1000 flex items-start bg-white border p-4 rounded-xl shadow-lg'
    toastClasses += ' ' + options.position + ' ' + options.position.split('-')[0]
    toast.className = toastClasses
    return toast
  }
  
  #composeBody = options => {
    const body = document.createElement('div')
    body.className = 'flex-grow ml-2'
    if(options.heading){
      const h3 = this.#createElement('h3', 'text-black font-medium text-base')
      console.log(h3)
      h3.innerText = options.heading
      body.appendChild(h3)
    }
    const p = this.#createElement('p', 'text-gray-600')
    p.innerText = options.message
    body.appendChild(p)
    if(options.actions){
      body.appendChild(this.#composeActions(options))
    }
    return body
  }
  
  #composeClose = () => {
    const close = this.#createElement('button', 'ml-2 mt-1')
    close.innerHTML = `<i style="font-size: 12px; font-weight: 900" class="cursor-pointer fi-rr-cross font-bold text-primary-color"></i>`
    close.addEventListener('click', () => {
      close.parentNode.remove()
    })
    
    return close
  }

  #composeIcon = options => {
    let iconClasses = 'flex-shrink-0 h-8 w-8 rounded-full inline-flex items-center justify-center'
    iconClasses += ' ' + options.iconBg
    const icon = this.#createElement('div', iconClasses)
    icon.className = iconClasses
    icon.innerHTML = `<i class="${options.icon} ${options.iconColor} mt-1"></i>`
    return icon
  }
  
  #composeImage = options => {
    const image = this.#createElement('img', 'flex-shrink-0 h-6 w-6 rounded-full')
    image.src = options.image
    return image
  }
  
  #createElement = (tag, classNames) => {
    const element = document.createElement(tag)
    const classes = classNames.split(' ')
    classes.forEach(className => {
      element.classList.add(className)
    })
    return element
  }
}
