export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      store.commit('authorize/TOKEN_EXPIRED', true)
    } else {
      console.log(error.response)
      throw error.response.data
    }
  })
}
