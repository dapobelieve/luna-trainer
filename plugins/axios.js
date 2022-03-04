export default function ({ $axios, redirect, $toast, store, $modal }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      store.commit('authorize/TOKEN_EXPIRED', true)
    } else {
      throw error.response.data
    }
  })
  $axios.onResponse(() => {
    // store.commit('profile/SET_STATE', { loading: false })
  })
}
