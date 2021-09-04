if (localStorage.getItem('auth_token.local')) {
  const user = JSON.parse(localStorage.getItem('getWelpUser'))
  window.intercomSettings = {
    app_id: 'ovxbm9hr',
    name: user.firstName, // Full name from currently logged in user
    email: user.email, // Email address from currently logged in user
    created_at: new Date(user.createdAt).getTime() // Signup date as a Unix timestamp
  }
} else {
  window.intercomSettings = {
    app_id: 'ovxbm9hr'
  }
}
// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/ovxbm9hr'
const intercom = function () {
  const w = window
  const ic = w.Intercom
  if (typeof ic === 'function') {
    ic('reattach_activator')
    ic('update', w.intercomSettings)
  } else {
    const d = document
    const i = function () {
      i.c(arguments)
    }
    i.q = []
    i.c = function (args) {
      i.q.push(args)
    }
    w.Intercom = i
    const l = function () {
      const s = d.createElement('script')
      s.type = 'text/javascript'
      s.async = true
      s.src = 'https://widget.intercom.io/widget/ovxbm9hr'
      const x = d.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
    }
    if (w.attachEvent) {
      w.attachEvent('onload', l)
    } else {
      w.addEventListener('load', l, false)
    }
  }
}
intercom()
