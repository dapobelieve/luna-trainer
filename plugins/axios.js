export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error && error.response && error.response.status === 401) {
      store.commit('authorize/TOKEN_EXPIRED', true)
    } else if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw new Error('Service unreachable')
    }
  })
}
