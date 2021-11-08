export default function ({ $axios, redirect, $toast, store }) {
  $axios.onError((error) => {
    // if(error.response.status === 401) {
    //   console.log()
    //   let prevRequest = error.config
    //   return $axios.patch(`${process.env.ACCOUNT_HOST_URL}/auth/renew-token`, {
    //     access_token: localStorage.getItem('auth._token.local'),
    //     refresh_token: localStorage.getItem('auth._refresh_token.local')
    //   }).then(res =>  {
    //     if(res.status === 200) {
    //       localStorage.setItem('auth._token.local', '')
    //       localStorage.setItem('auth._refresh_token.local', '');
    //       $axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('auth._token.local')}`
    //     }
    //   })
    // }
    if (
      parseInt(error.response && error.response.status) === 401 && error.response.data.message === 'jwt expired') {
      redirect('/auth/SignIn')
      $toast.error('Session Expired. Kindly Re-login', {
        position: 'bottom-right'
      })
      store.dispatch('authorize/logOut')
    }
  })
}
