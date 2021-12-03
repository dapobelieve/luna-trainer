import { mapState } from 'vuex'

export default {
  watch: {
    tokenExpired: {
      handler (val) {
        if (val) {
          this.$modal.show('auth-modal')
        }
      }
    }
  },
  computed: {
    ...mapState({
      tokenExpired: state => state.authorize.tokenExpired
    })
  }
}
