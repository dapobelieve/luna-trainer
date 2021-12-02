import { mapState } from 'vuex'

export default {
  data () {
    return {
      isLoading: false,
      form: {
        password: null
      }
    }
  },
  watch: {
    "tokenExpired": {
      handler(val) {
        if(val) {
          this.$modal.show('auth-modal')
        }
      }
    }
  },
  computed: {
    ...mapState({
      tokenExpired: state => state.authorize.tokenExpired
    })
  },
  methods: {
    async fnLogin () {
      this.isLoading = true
      try {
        await this.$store.dispatch('authorize/loginUser', {
          email: this.$auth.user.email,
          password: this.form.password,
          domain: 'getwelp-trainer-ui'
        })
        this.$gwtoast.success('Login Successful')
        this.$modal.hide('auth-modal')
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
