export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      store.commit('authorize/TOKEN_EXPIRED', true)
    } else {
      throw error.response.data
    }
  })
}
