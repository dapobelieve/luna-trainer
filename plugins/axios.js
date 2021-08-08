export default function ({ $axios, redirect, $toast, store }) {
  $axios.onError((error) => {
    if (
      parseInt(error.response && error.response.status) === 401 &&
      (error.response.data.message === 'jwt expired' ||
        error.response.data.message === 'No token is Supplied!')
    ) {
      redirect('/auth/SignIn')
      $toast.error('Session Expired. Kindly Re-login', {
        position: 'bottom-right'
      })
      store.dispatch('authorize/logOut')
    }
  })
}
